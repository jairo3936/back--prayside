// import { getConnection } from './../database/database'
// // consulta
// const getLanguages = async (req, res) => {
//     try {
//         const connection = await getConnection();
//         const result = await connection.query("SELECT id , name, programmers FROM language")
//         res.json(result);
//     } catch (error) {
//         res.status(500);
//         res.send(error.message);
//     }
// };

// // consulta por id
// const getLanguage = async (req, res) => {
//     try {
//         const {id}=req.params;
//         const connection = await getConnection();
//         const result = await connection.query("SELECT id , name, programmers FROM language WHERE id = ?", id)
//         res.json(result);
//     } catch (error) {
//         res.status(500);
//         res.send(error.message);
//     }
// };

// //añadir lenguaje

// const addLanguages = async (req, res) => {
//     try {
//         const { name, programmers } = req.body;
//         if (name == undefined || programmers == undefined) {
//             res.status(400).json({ message: "Por favor llene todos los campos" });
//         }
//             // pasando datos por objeto
//     const languages = { name, programmers };
//     const connection = await getConnection();
//     await connection.query("INSERT INTO language SET ?", languages)
//     res.json({message:"Lenguaje añadido"});
// } catch (error) {
//     res.status(500);
//     res.send(error.message);
// }
// };

// // eliminar
// const deleteLanguage = async (req, res) => {
//     try {
//         const {id}=req.params;
//         const connection = await getConnection();
//         const result = await connection.query("DELETE FROM language WHERE id = ?", id)
//         res.json(result);
//     } catch (error) {
//         res.status(500);
//         res.send(error.message);
//     }
// };

// // actualizar
// const updateLanguage = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, programmers } = req.body;

//         if (id === undefined || name === undefined || programmers === undefined) {
//             res.status(400).json({ message: "Por favor llene todos los campos" });
//             // return; // Salir de la función si hay campos faltantes
//         }

//         const language = { name, programmers }; // No incluyas el ID en la actualización
//         const connection = await getConnection();
//         const result = await connection.query("UPDATE language SET ? WHERE id = ?", [language, id]);
//         res.json(result);
//     } catch (error) {
//         res.status(500)
//         res.send(error.message);
//     }
// };



// export const methods = {
//     getLanguages,
//     getLanguage,
//     addLanguages,
//     deleteLanguage,
//     updateLanguage
// };

