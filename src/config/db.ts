import mongoose from 'mongoose';
import colors from "colors";

export const connectDB = async () => {
    try{

        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        const url = `${connection.host}:${connection.port}`
        console.log(colors.green.blue(`MongoDB conectado correctamente :) en: ${url}`));

    }catch(error){
        console.log(colors.bold.bgRed.black(error.message));
        process.exit(1);
    }
}