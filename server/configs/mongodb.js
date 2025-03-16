import mongoose from "mongoose";

//connect to the mongodb database

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>console.log('database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/1ms`)
}

export default connectDB

