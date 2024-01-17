const express=require('express')

// router object
const router=new express.Router()
const user=require('../controllers/userControl')
const upload = require('../middlewares/multerMiddleware')
const { jwtMiddleware } = require('../middlewares/jwtmiddleware')


// signup
router.post('/user/register',user.register)

// login 
router.post('/user/login',user.login)

// update profile
router.put('/user/update-profile/:_id',jwtMiddleware,upload.single('profile'),user.editProfile)

// // getProfile
// router.get('/user/getprofile/:_id',user.getProfile)

// add new projects
router.post('/user/add-project',jwtMiddleware,upload.single('projectImage'),user.addProject)

// get user project
router.get('/user/get-user-projects/:id',jwtMiddleware,user.getUserProjects)

// get all projects
router.get('/user/get-all-projects',user.getAllProjects)

// get 3 of all projects
router.get('/user/get-home-projects',user.getHomeProjects)

// edit project
router.put('/user/edit-project/:_id',jwtMiddleware,upload.single('projectImage'),user.editProject)

// delete project
router.delete('/user/delete-project/:_id',jwtMiddleware,user.deleteProject)

module.exports=router


