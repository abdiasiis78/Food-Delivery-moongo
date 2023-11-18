import mongoose from "mongoose";

const userScheema = new mongoose.Schema({
    name: {
     type : String,
     required: true
    },

    email: {
        type: String,
        required : true,
        unique: true
    },

    profioleImage: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum:["owner", "user"]
    }

}, {timestamps: true})


const User = mongoose.model("User", userScheema)
export default User