
import bcrypt from 'bcrypt';
import { getConnection } from './../database/database';

//loguear usuario (funcional)

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verifica si el usuario existe en la base de datos
        const connection = await getConnection();
        const [existingUser] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

        if (!existingUser) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }

        // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión. Inténtalo de nuevo más tarde.' });
    }
};

//consultar usuarios (funcional)
const getLogin = async (req, res) => {
    try {
        // Obtener conexión a la base de datos
        const connection = await getConnection();

        // Ejecutar consulta SQL para obtener las publicaciones
        const consulta = await connection.query("SELECT * FROM users");

        // Devolver las publicaciones obtenidas al cliente
        res.json(consulta);
    } catch (error) {
        // Manejar errores y devolver un código de estado 500 si ocurre un error interno
        res.status(500).json({ error: error.message });
    }
};

//crear usuarios  (funcional)
export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verifica si el usuario ya existe en la base de datos
        const connection = await getConnection();
        const [existingUser] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hash de la contraseña utilizando bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserta el nuevo usuario en la base de datos
        await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario. Inténtalo de nuevo más tarde.' });
    }
};

// eliminar usuarios (beta)
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Verifica si el usuario existe en la base de datos
        const connection = await getConnection();
        const [existingUser] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (!existingUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar el usuario de la base de datos
        await connection.query('DELETE FROM users WHERE id = ?', [userId]);

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario. Inténtalo de nuevo más tarde.' });
    }
};

export const methods = {
    loginUser,
    getLogin,
    createUser,
    deleteUser
};
