const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("__MongoDB Atlas Connected__");
}).catch((err)=>{
    console.log(`__MongoDB Atlas Connection Failed !! ${err}__`);
})

