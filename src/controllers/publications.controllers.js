import { connection } from "../config/db_config.js";

//consulta publicaciones
export const getPublication = async (req, res) => {
  try {
    const [row] = await connection.query("SELECT * FROM publicaciones");
    return res.status(200).json(row);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};

//crear publicaciones
export const addPublication = async (req, res) => {
  try {
    const { usuario, mensajePublicacion, multimediaURL } = req.body;
    if (usuario === undefined || mensajePublicacion === undefined) {
      return res
        .status(400)
        .json({ message: "Por favor llene todos los campos" });
    }

    const publication = { usuario, mensajePublicacion, multimediaURL };

    await connection.query("INSERT INTO publicaciones SET ?", publication);

    return res.status(200).json({ message: "Publicación añadida" });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};

//delete publicaciones
export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    await connection.query("DELETE FROM publicaciones WHERE id = ?", [id]);
    return res.status(200).json({ message: "Publicación eliminada" });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};


