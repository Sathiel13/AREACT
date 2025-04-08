import  {Request, Response} from 'express'
import User from "../models/User";


export const createAccount = async (req: Request, res: Response):Promise<any> => {
    //Me aseguro de que no se puedan repetir los emails con manejo de errores
    const {email} = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        const error = new Error('User already exists');
        //De esta manera recupero el mensaje de error que genere previamente
        return res.status(409).json({error : error.message});
    }
//Lo que le usuario este ingresadno a la peticion se ingresa a la BD
    const user = new User(req.body);
    await user.save();
    res.status(201).send('Usuario creado correctamente');
};