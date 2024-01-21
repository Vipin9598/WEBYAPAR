const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000
const {cloudinaryConnect} = require("./config/cloudinary")
const {dbconnect} = require("./config/database")
const fileUpload = require("express-fileupload")
const route = require("./routes/route")



app.use(express.json());

cloudinaryConnect();
dbconnect();

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,DELETE,PUT",
    credentials:true
}))

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)
app.use("/api/v1",route)

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running....."
    })
})

app.listen(PORT,()=>{
    console.log(`app is running at port : ${PORT}`)
})
