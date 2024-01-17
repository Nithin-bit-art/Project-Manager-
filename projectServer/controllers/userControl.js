const projects = require("../models/projectModel")
const users=require("../models/userModel")
const jwt=require('jsonwebtoken')


exports.register=async(req,res)=>{
    const {userName,email,password}=req.body
    // console.log(username);
    // console.log(email);
    // console.log(password);
    // res.status(200).json("register worked")

 try{
    const existingUser=await users.findOne({email})
    if(existingUser){
        res.status(400).json("user already exists !! please login")
    }
    else{
        const newUSer=new users({
            userName,email,password,gitHub:"",linkedIn:"",profile:""
        })
        await newUSer.save()
        res.status(200).json(newUSer)
    }
}
    catch (err) {
        res.status(401).json(`Register api failed ${err}`)
    }
}


exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const existUser=await users.findOne({email,password})
        if(existUser){

             // login success -token generate
        const token=jwt.sign({_id:existUser._id},"supersecretkey123")
        console.log(token);
            res.status(200).json({
                user:existUser,
                token
            })
        }
        else{
            res.status(404).json("incorrect email or password")
        }
    }
    catch(err){
        res.status(404).json(`Login API failed ${err}`)
    }
}

exports.editProfile=async(req,res)=>{
    const {userName,gitHub,linkedIn,profile}=req.body
    const {_id}=req.params
    const profile1=req.file?req.file.filename:profile

try {const selectedUser=await users.findOne({_id})
if(selectedUser){
    selectedUser.userName=userName
    selectedUser.gitHub=gitHub
    selectedUser.linkedIn=linkedIn
    selectedUser.profile=profile1


    // save changes in mongodb
    await selectedUser.save()
    res.status(200).json(selectedUser)

}
else{
    res.status(404).json(`${userName} is not present`)
}}
catch (err){
    res.status(401).json(`Login Api Failed ${err}`)
}
    
}

exports.addProject=async(req,res)=>{
    const {title,languages,overView,gitHub,website}=req.body

    // image -from multer
    const projectImage=req.file?.filename

    // useId-access from jwt middleware
    const userId=req.payload

    try{
        const existingProject=await projects.findOne({gitHub})
        if(existingProject){
            res.status(400).json(`${existingProject.title} is already exist`)
        }
        else{
            const newProject=new projects({
                title,languages,overView,gitHub,website,projectImage,userId
            })
            // save in mdb
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(401).json(`Project Add Api Failed ${err}`)
    }
    

}

exports.getUserProjects=async(req,res)=>{
    const {id}=req.params
    try{
        const projectsArray=await projects.find({userId:id})
        if(projectsArray){
            res.status(200).json(projectsArray)
        }
        else{
            res.status(404).json("no projects uploaded yet")
        }
    }
    catch(err){
        res.status(401).json(`Project get Api Failed ${err}`)
    }
}

exports.getAllProjects=async(req,res)=>{
    // query data
    const searchQuery=req.query.search
    try{
        // reqex query
        const query={
            languages:{$regex:searchQuery, $options:"i"}  //i=case-insensitive
        }

        const allProjectsArray=await projects.find(query)
        if (allProjectsArray.length > 0) {
            res.status(200).json(allProjectsArray);
        } else {
            res.status(404).json("No projects uploaded yet");
        }
        
    }
    catch (err) {
        console.error(`Project get API failed: ${err}`);
        res.status(401).json(`Project get API failed: ${err}`);
    }
    
}

exports.getHomeProjects=async(req,res)=>{
    
    try{
        
        const homeProjectsArray=await projects.find().limit(3)
        if(homeProjectsArray){
            res.status(200).json(homeProjectsArray)
        }
        else{
            res.status(404).json("no projects uploaded yet")
        }
    }
    catch(err){
        res.status(401).json(`Project get Api Failed ${err}`)
    }
}

exports.editProject=async(req,res)=>{
    const {title,languages,overView,gitHub,website,projectImage}=req.body
    const {_id}=req.params
    const uploadImage=req.file?req.file.filename:projectImage

    try{
       const updatedProject=await projects.findByIdAndUpdate({_id},{title,languages,overView,gitHub,website,projectImage:uploadImage},{new:true})
       
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }
    catch(err){
        res.status(401).json(`Project edit Api Failed ${err}`)
    }
}

exports.deleteProject=async(req,res)=>{
    const {_id}=req.params
    try{
        const response=await projects.deleteOne({_id})
        if(response){
            res.status(200).json("project deleted !")
        }
    }
    catch(err){
        res.status(401).json(`Project delete Api Failed ${err}`)
    }
}