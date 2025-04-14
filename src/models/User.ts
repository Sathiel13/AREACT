import mongoose, {Schema} from "mongoose";

interface IUser{
    handle:String;
    name: string;
    email: string;
    password: string;
}

//Definir lo que se conoce como un schema
const userSchema = new Schema({
    handle: {
        type: String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true

    },
    name: {
    type: String,
    required: true,//Es obligatorio o no
    trim: true,// Cuida los espacios vacios//
        lowerCase: true
},
    email: {
        type: String,
        required: true,//Es obligatorio o no
        trim: true,// Cuida los espacios vacios
        unique: true//No tener dos emails iguales registrados
    },
    password: {
        type: String,
        required: true,//Es obligatorio o no
        trim: true// Cuida los espacios vacios
    }
    });
//Defino el Schema
const User = mongoose.model<IUser>('User', userSchema);
export default User;
