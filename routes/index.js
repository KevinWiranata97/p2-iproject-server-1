const router = require('express').Router();
const ControllerAuth = require('../controllers/authController')
const ControllerTmdb = require('../controllers/tmdbController')
const authentication = require('../middlewares/authentication')

router.post('/register', ControllerAuth.register)
router.post('/login', ControllerAuth.login)


router.use(authentication)
router.get('/populars', ControllerTmdb.getPopular)
router.get('/nowPlaying', ControllerTmdb.getNowPlaying)
router.get('/upcoming', ControllerTmdb.getUpcoming)
router.get('/movies/:movieId', ControllerTmdb.getMovieById)
module.exports = router