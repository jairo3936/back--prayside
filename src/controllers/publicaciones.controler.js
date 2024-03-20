import { getConnection } from './../database/database'

//consulta publicaciones
const getPublication = async (req, res) => {
    try {
        // Obtener conexión a la base de datos
        const connection = await getConnection();

        // Ejecutar consulta SQL para obtener las publicaciones
        const publicaciones = await connection.query("SELECT * FROM publicaciones");

        // Devolver las publicaciones obtenidas al cliente
        res.json(publicaciones);
    } catch (error) {
        // Manejar errores y devolver un código de estado 500 si ocurre un error interno
        res.status(500).json({ error: error.message });
    }
};

//crear publicaciones 
const addPublication = async (req, res) => {
    try {
        const { usuario, mensajePublicacion, multimediaURL } = req.body;
        if (usuario === undefined || mensajePublicacion === undefined) {
            return res.status(400).json({ message: "Por favor llene todos los campos" });
        }

        // Crear objeto con los datos de la publicación
        const publicacion = { usuario, mensajePublicacion, multimediaURL };

        // Obtener conexión a la base de datos
        const connection = await getConnection();

        // Ejecutar consulta SQL para insertar la publicación
        await connection.query("INSERT INTO publicaciones SET ?", publicacion);

        // Devolver una respuesta exitosa al cliente
        res.json({ message: "Publicación añadida" });
    } catch (error) {
        // Manejar errores y devolver un código de estado 500 si ocurre un error interno
        res.status(500).json({ error: error.message });
    }
};



//delete publicaciones
const deletePublicacion = async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener conexión a la base de datos
        const connection = await getConnection();

        // Ejecutar consulta SQL para eliminar la publicación con el ID proporcionado
        await connection.query("DELETE FROM publicaciones WHERE id = ?", [id]);

        // Devolver una respuesta exitosa al cliente
        res.json({ message: "Publicación eliminada" });
    } catch (error) {
        // Manejar errores y devolver un código de estado 500 si ocurre un error interno
        res.status(500).json({ error: error.message });
    }
};

export const methods = {
    addPublication,
    getPublication,
    deletePublicacion
};