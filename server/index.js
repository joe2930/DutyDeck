require("dotenv").config()
const express=require("express")
const mongoose=require('mongoose') 
const {connectToMongoDB}=require("./database")
const path=require("path");

const app=express()
app.use(express.json())

app.use(express.static(path.join(__dirname,"build")));
app.get("/",(req,res)=>

res.sendFile(path.join(__dirname,"/build/Index.html")))

const router =require("./routes")

app.use("/api",router)
const port=process.env.PORT || 3000;
async function startServer()
{
    await connectToMongoDB();
    app.listen(port, ()=>
        {

console.log(`Server is listening on port ${port}`);
        })
}

startServer()


