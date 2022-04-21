'use strict';
const {
  Model
} = require('sequelize');
const nodemailer = require('nodemailer')
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique:{msg:'Email must be unique'},
      allowNull:false,
      validate:{
        notNull:{msg:'Email is required'},
        notEmpty:{msg:'Email is required'},
        isEmail:{msg:'Invalid email format'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'password is required'},
        notEmpty:{msg:'password is required'},
      }
    }
  }, { hooks: {
    afterCreate: (newUser =>{
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
          user:"tokomobilidaman@gmail.com",
          pass:"@ayobelimobil"
        }
      })
      
      let mailOptions = {
        from: "tokomobilidaman@gmail.com",
        to: `${newUser.email}`,
        subject: "Registration successfull",
        text: 
        `Thanks for joining Movlix, ${newUser.email}.`
        
      }
      
      transporter.sendMail(mailOptions, function(err,succes){
        if(err){
          console.log(err);
        } else{
          console.log("Email is sent");
        }
      })
    })
   
      
  },
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password)
  })

  return User;
};