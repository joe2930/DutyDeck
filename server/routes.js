const express=require("express")
const router=express.Router()
const {getConnectedClient} =require("./database")
const {ObjectId}=require("mongodb")



//get
const getCollection=()=>
    {
        const client=getConnectedClient()
        const collection=client.db("todosdb").collection("todos")
        return collection
    }
// router.get("/help",(req,res)=>
// {
//     res.send("fs")
// })
router.get("/todos",async (req,res)=>
{
    const collection=getCollection()
    const todos= await collection.find({}).toArray()
    res.status(200).json(todos)
})
//post
router.post("/todos",async(req,res)=>
{

    const collection=getCollection()
    let {todo}=req.body
    const newtodo= await collection.insertOne({todo, status:false})

    if(!todo)
        {
            res.status(400).json({msg:"error no todo data is found"})
        }
        
    todo=(typeof todo === "string")?todo:JSON.stringify(todo)

    res.status(200).json(
        {
            todo,status:false,_id:newtodo.insertedId
        }
    )
    
})



//delete
router.delete("/todos/:id",async (req,res)=>
    {
        const collection=getCollection()
        const _id=new ObjectId(req.params.id)
        const deletedTodo = await collection.deleteOne({_id})
        res.status(200).json(deletedTodo)
    })
//put
router.put("/todos/:id",async (req,res)=>
    {
        const collection=getCollection()
        const _id=new ObjectId(req.params.id)
        const {status}=req.body

        if(typeof status!=="boolean")
            {
                return res.status(400).json({msg:"Invalid Status"})
            }

        const updatedTodo = await collection.updateOne({_id}, {$set:{status:!status}})
        res.status(200).json(updatedTodo)
    })
module.exports=router;


// Client Request: A client sends a GET request to http://example.com/api/todos.
// Main App: The main Express.js app receives the request.
// Route Matching: The app sees the /api prefix and passes the request to the router.
// Router Handling: The router matches the request to the GET /todos route.
// Handler Function: The handler function for GET /todos is executed, sending back a response with the message "get req".

// Middleware can be added to an Express.js application using the app.use() method or specific HTTP method functions like app.get(), app.post(), etc., where they are applied only to routes with matching paths.

// endpoint also known as url

{/* <body>
    <h2>Create a New Todo</h2>
    <form action="http://localhost:3000/api/todos" method="POST">
        <label for="task">Task:</label><br>
        <input type="text" id="task" name="task" required><br><br>
        <button type="submit">Submit</button>
    </form>
</body> */}


// using postman
// we can made req to server with specific url or endpoint with the specdifc method and we can
// checj whether the corresponding handler funtion work or Notification
// handler funtion is (req,req=>{})


// const todo = req.body.todo;