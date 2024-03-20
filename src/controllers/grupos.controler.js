import { getConnection } from './../database/database'
// consulta
const getMinisterios = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, TipoMinisterio, Nombre, Cobertura, Idioma, Pais, Region, Ciudad, Direccion, Telefono, CorreoElectronico, Visibilidad, IdentidadReligiosa FROM creacionministerio");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// // consulta por id
// const getLanguage = async (req, res) => {
//     try {
//         const {id}=req.params;
//         const connection = await getConnection();
//         const result = await connection.query("SELECT id , name, programmers FROM language WHERE id = ?", id)
//         res.json(result);
//     } catch (error) {
// res.status(500);
//         res.send(error.message);
//     }
// };

//Crear ministerios

const addMinisterios = async (req, res) => {
    try {
        const { TipoMinisterio, Nombre, Cobertura, Idioma, Pais, Region, Ciudad, Direccion, Telefono, CorreoElectronico, Visibilidad, IdentidadReligiosa } = req.body;

        // Verificar si hay campos faltantes en la solicitud
        if (!TipoMinisterio || !Nombre || !Cobertura || !Idioma || !Pais || !Region || !Ciudad || !Direccion || !Telefono || !CorreoElectronico || Visibilidad === undefined || !IdentidadReligiosa) {
            return res.status(400).json({ message: "Por favor llene todos los campos" });
        }

        // Verificar que el valor de Visibilidad sea válido
        if (Visibilidad !== 'privada' && Visibilidad !== 'publica') {
            return res.status(400).json({ message: "El valor de Visibilidad debe ser 'privada' o 'publica'" });
        }

        // Obtener conexión a la base de datos
        const connection = await getConnection();

        // Ejecutar consulta SQL para insertar nuevo registro
        const result = await connection.query("INSERT INTO creacionministerio SET ?", {
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
            IdentidadReligiosa
        });

        // Enviar respuesta de éxito
        res.json({ message: "Ministerio añadido correctamente" });
    } catch (error) {
        // Manejar errores
        console.error("Error al añadir ministerio:", error);
        res.status(500).send("Error interno del servidor");
    }
};



// eliminar
const deleteMinisterios = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM creacionministerio WHERE id = ?", id)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// // actualizar
const updateMinisterio = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del ministerio a actualizar
        const { TipoMinisterio, Nombre, Cobertura, Idioma, Pais, Region, Ciudad, Direccion, Telefono, CorreoElectronico, Visibilidad, IdentidadReligiosa } = req.body;

        // Verificar si hay campos faltantes en la solicitud
        if (!TipoMinisterio || !Nombre || !Cobertura || !Idioma || !Pais || !Region || !Ciudad || !Direccion || !Telefono || !CorreoElectronico || Visibilidad === undefined || !IdentidadReligiosa) {
            return res.status(400).json({ message: "Por favor llene todos los campos" });
        }

        // Verificar que el valor de Visibilidad sea válido
        if (Visibilidad !== 'privada' && Visibilidad !== 'publica') {
            return res.status(400).json({ message: "El valor de Visibilidad debe ser 'privada' o 'publica'" });
        }

        // Obtener conexión a la base de datos
        const connection = await getConnection();

        // Ejecutar consulta SQL para actualizar el registro
        const result = await connection.query("UPDATE creacionministerio SET ? WHERE id = ?", [{
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
            IdentidadReligiosa
        }, id]);

        // Verificar si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No se encontró ningún ministerio con ese ID" });
        }

        // Enviar respuesta de éxito
        res.json({ message: "Ministerio actualizado correctamente" });
    } catch (error) {
        // Manejar errores
        console.error("Error al actualizar ministerio:", error);
        res.status(500).send("Error interno del servidor");
    }
};




export const methods = {
    getMinisterios,
    // getGrupo,
    addMinisterios,
    deleteMinisterios,
    updateMinisterio
};

