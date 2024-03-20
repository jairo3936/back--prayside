//conexion a la base de datos

import { config } from "dotenv";

config();

export default {
    port: process.env.PORT || "4006",
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",
    db_port: process.env.DB_PORT || ""
};