import express from "express";
import morgan from "morgan";
import grupoRoutes from "./routes/grupos.routers";
import publicationRoutes from "./routes/publicaciones.router";
import loginRoutes from "./routes/login.routers";
// import homeRoutes from "./routes/home.routes";
import helmet from "helmet";
import cors from "cors";

const app = express();

// Settings
app.set("port", 4006);

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    // origin: 'http://localhost:5173/login' // Reemplaza esta URL con el origen de tu frontend
}));


// Routes
// app.use("/api/languages", languageRoutes);
app.use("/api/grupos", grupoRoutes);
app.use("/api/publicaciones", publicationRoutes);
app.use("/api/login", loginRoutes);
// app.use("/home", homeRoutes);

export default app;