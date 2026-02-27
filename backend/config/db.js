import mongoose from"mongoose";

const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDBConnected");
  }catch(err){
    console.log("DBError:",err.message);
    process.exit(1);
  }
};

export default connectDB;