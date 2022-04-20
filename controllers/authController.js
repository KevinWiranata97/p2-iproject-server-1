const {User} = require('../models')
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')
class Controller{
    static async register (req, res) {
        console.log('test');
        try {
            const { email, password } = req.body
            const newUser = {
                email,
                password
            }
            const createUser = await User.create(newUser)
            res.status(201).json({
                id: createUser.id,
                email: createUser.email,
            });
        } catch (error) {
            console.log(error);
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({ message: error.errors[0].message });
            } else if (error.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: error.errors[0].message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    static async login(req, res, next) {
        try {
          const { email, password } = req.body;
    
          let findUser = await User.findOne({
            where: {
              email: email,
            },
          });
          if (!findUser) {
            throw {
              name: "Unauthorized",
              code: 401,
              msg: `Invalid email or password`,
            };
          }
    
          const checkPassword = comparePassword(password, findUser.password);
          if (!checkPassword) {
            throw {
              name: "Unauthorized",
              code: 401,
              msg: `Invalid email or password`,
            };
          }
    
          const payload = {
            id: findUser.id,
            email: findUser.email,
          };
    
          const access_token = generateToken(payload);
    
          res.status(200).json({
            id: findUser.id,
            role: findUser.role,
            access_token: access_token,
            email: findUser.email
          });
        } catch (err) {
            console.log(err);
        }
      }


}

module.exports = Controller