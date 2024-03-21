import { connection } from "../config/db_config.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";


export const getLogin = async (req, res) => {
  try {
    const [row] = await connection.query('SELECT * FROM users');

    return res.status(200).json(row);
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};
// //funciona 
// export const loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     const [row] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
//     if (row.length === 0) {
//       return res.status(401).json({ message: "Credenciales inválidas" });
//     }
    
//     const storedPassword = row[0].password;
//     const passwordMatch = await bcrypt.compare(password, storedPassword);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Credenciales inválidas" });
//     }

//     return res.status(200).json({ message: "Inicio de sesión exitoso" });
//   } catch (error) {
//     console.error("Error en loginUser:", error);
//     res.status(500).json({
//       message: "Error en el servidor",
//       error: error,
//     });
//   }
// };

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica si el usuario existe en la base de datos
    const [row] = await connection.query("SELECT * FROM users WHERE username = ?", [username]);
    if (row.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const storedPassword = row[0].password;

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, storedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Genera un token JWT
    const token = jwt.sign({ username: row[0].username }, process.env.ACCESS_TOKEN_SECRET);

    // Envía el token como respuesta al cliente
    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};


export const createUser = async (req, res) => {
  try {
    
    const { username, password } = req.body;
        
    const [existingUser] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await connection.query(insertQuery, [username, hashedPassword]);
    
    return res.status(200).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error en createUser:", error);
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
}

export const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;
    
    const [row] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    if (row.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await connection.query('DELETE FROM users WHERE id = ?', [id]);
    
    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error en deleteUser:", error);
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Obtén el ID del usuario que deseas actualizar desde los parámetros de la solicitud
    const { id } = req.params;

    // Verifica si el usuario existe en la base de datos
    const [row] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    if (row.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtén los nuevos datos del usuario desde el cuerpo de la solicitud
    const { username, password } = req.body;

    // Genera un hash de la nueva contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Realiza la actualización del usuario en la base de datos, incluyendo el hash de la nueva contraseña
    await connection.query("UPDATE users SET username = ?, password = ? WHERE id = ?", [
      username,
      hashedPassword,
      id,
    ]);

    return res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error("Error en updateUser:", error);
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};