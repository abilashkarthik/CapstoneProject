import mongoose from 'mongoose';


const connectToDatabase = async () =>{
    try {

        mongoose.set('strictQuery',false)
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`,{
            //must add in order to not get any error masseges:
            useUnifiedTopology:true,
            useNewUrlParser: true
        });
        console.log(`MongoDB Connected : ${conn.connection.host}` );
    } catch (error) {
        
        console.log(`Error : ${error.message}`);
    }
};

export default connectToDatabase;