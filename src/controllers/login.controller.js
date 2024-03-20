import { connection } from "../config/db_config.js";
import bcrypt from "bcrypt";

export const getLogin = async (req, res) => {
  try {
    const [row] = await connection.query("SELECT * FROM users");

    return res.status(200).json(row);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (!existingUser) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    return res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    return res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await connection.query("DELETE FROM users WHERE id = ?", [userId]);

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};
