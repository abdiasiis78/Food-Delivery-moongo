import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRouter from './api/routers/auth.router.js'
dotenv.config();

const server = express();
const PORT = process.env.PORT;
server.use(express.json());
mongoose.connect(process.env.MOONGODB).then(() => {
  console.log(`connected to moongoDB`);
}).catch((err)=> {
    console.log(err);
})


server.use("/api/auth", AuthRouter)




server.use((err , req, res, next )=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"
    return res.status(statusCode).json(({
        success: false,
        statusCode,
        message
    }))

})





server.listen(PORT, console.log(`server is runing port ${PORT}`));
