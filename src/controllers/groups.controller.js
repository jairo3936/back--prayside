import { connection } from "../config/db_config.js";

export const getMinisterios = async (req, res) => {
  try {
    const [row] = await connection.query("SELECT * FROM creacionministerio ");
    return res.send(row);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error,
    });
  }
};

export const addMinisterios = async (req, res) => {
  try {
    const {
      TipoMinisterio,
      Nombre,
      Cobertura,
      Idioma,
      Pais,
      Region,
      Ciudad,
      Direccion,
      Telefono,
      CorreoElectronico,
      Visibilidad,
      IdentidadReligiosa,
    } = req.body;

    // Verificar si hay campos faltantes en la solicitud
    if (
      !TipoMinisterio ||
      !Nombre ||
      !Cobertura ||
      !Idioma ||
      !Pais ||
      !Region ||
      !Ciudad ||
      !Direccion ||
      !Telefono ||
      !CorreoElectronico ||
      Visibilidad === undefined ||
      !IdentidadReligiosa
    ) {
      return res
        .status(400)
        .json({ message: "Por favor llene todos los campos" });
    }

    // Verificar que el valor de Visibilidad sea válido
    if (Visibilidad !== "privada" && Visibilidad !== "publica") {
      return res.status(400).json({
        message: "El valor de Visibilidad debe ser 'privada' o 'publica'",
      });
    }

    const [row] = await connection.query(
      "INSERT INTO creacionministerio SET ?",
      {
        TipoMinisterio,
        Nombre,
        Cobertura,
        Idioma,
        Pais,
        Region,
        Ciudad,
        Direccion,
        Telefono,
        CorreoElectronico,
        Visibilidad,
        IdentidadReligiosa,
      }
    );

    return res
      .status(201)
      .json({ message: "Ministerio añadido correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al añadir ministerio",
      error: error,
    });
  }
};

export const deleteMinisterios = async (req, res) => {
  try {
    const { id } = req.params;
    const [row] = await connection.query(
      "DELETE FROM creacionministerio WHERE id =?",
      [id]
    );
    return res
      .status(200)
      .json({ message: "Ministerio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar ministerio",
      error: error,
    });
  }
};

export const updateMinisterio = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      TipoMinisterio,
      Nombre,
      Cobertura,
      Idioma,
      Pais,
      Region,
      Ciudad,
      Direccion,
      Telefono,
      CorreoElectronico,
      Visibilidad,
      IdentidadReligiosa,
    } = req.body;

    if (
      !TipoMinisterio ||
      !Nombre ||
      !Cobertura ||
      !Idioma ||
      !Pais ||
      !Region ||
      !Ciudad ||
      !Direccion ||
      !Telefono ||
      !CorreoElectronico ||
      Visibilidad === undefined ||
      !IdentidadReligiosa
    ) {
      return res
        .status(400)
        .json({ message: "Por favor llene todos los campos" });
    }

    if (Visibilidad !== "privada" && Visibilidad !== "publica") {
      return res
        .status(400)
        .json({
          message: "El valor de Visibilidad debe ser 'privada' o 'publica'",
        });
    }

    const [row] = await connection.query(
      "UPDATE creacionministerio SET ? WHERE id = ?",
      [
        {
          TipoMinisterio,
          Nombre,
          Cobertura,
          Idioma,
          Pais,
          Region,
          Ciudad,
          Direccion,
          Telefono,
          CorreoElectronico,
          Visibilidad,
          IdentidadReligiosa,
        },
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró ningún ministerio con ese ID" });
    }

    return res.json({ message: "Ministerio actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar ministerio",
      error: error,
    });
  }
};
