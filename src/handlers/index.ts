import  {Request, Response} from 'express'
import {validationResult} from "express-validator";
import slug from 'slug';
import User from "../models/User";
import {checkpassword, hashPassword} from "../utils/auth";


export const createAccount = async (req: Request, res: Response):Promise<any> => {
    //Me aseguro de que no se puedan repetir los emails con manejo de errores
    const {email, password} = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        const error = new Error('Email previamente registrado');
        //De esta manera recupero el mensaje de error que genere previamente
        return res.status(409).json({error : error.message});
    }

    const handle = slug(req.body.handle, '');
    const handleExist = await User.findOne({ handle });
    if (handleExist) {
        const error = new Error('Nombre de ususario no disponible');
        //De esta manera recupero el mensaje de error que genere previamente
        return res.status(409).json({error : error.message});
    }

//Lo que le usuario este ingresadno a la peticion se ingresa a la BD
    const user = new User(req.body);
   user.password = await hashPassword(password);
   user.handle = handle;


    await user.save();
    res.status(201).send('Usuario creado correctamente');
};

export const login = async (req: Request, res: Response):Promise<any> => {
//Manejo errores
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
//Me aseguro de que no se puedan repetir los emails con manejo de errores
    const {email, password} = req.body;
//Revisar si el usuario si esta registrado
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('El usuario no esta registrado');
        //De esta manera recupero el mensaje de error que genere previamente
        return res.status(404).json({error : error.message});
    }
//Comprobar contracena correcta
const isPasswordCorrect = await checkpassword(password, user.password)
    if (!isPasswordCorrect){
        const error = new Error('Password incorrecta');
        return res.status(401).json({error : error.message});
    }

    res.status(200).send('Usuario logueado correctamente');

}