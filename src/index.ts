import colors from 'colors';
import server  from "./server";



const port = process.env.PORT || 4000;
//creamos el callback con un arround function
server.listen(port , () => {
    console.log(colors.magenta.italic(`Servidor corriendo en el puerto: ${port}`));
});





