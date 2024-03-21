// import express from "express"
// import { configDotenv } from "dotenv"
// import cors from "cors"
// import groupsRoutes from "./routes/groups.routes.js";
// import loginRouter from "./routes/login.routes.js";
// import publicationRouter from "./routes/publications.routes.js";


// configDotenv()

// const app = express();
// app.use(cors())

// app.get("/", (req, res) => {
//   res.send("Backend funcionando!");
// });

// app.use(express.json())
// app.use("/api", groupsRoutes, loginRouter, publicationRouter)


// const {PORT} = process.env
// app.listen(PORT, () => {
//   console.log("Server running on", PORT )
// })

import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import groupsRoutes from "./routes/groups.routes.js";
import loginRouter from "./routes/login.routes.js";
import publicationRouter from "./routes/publications.routes.js";

configDotenv();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

app.use(express.json());

// Middleware de autenticación con JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Aplica el middleware de autenticación a las rutas que lo necesiten
app.use("/api", authenticateToken, groupsRoutes);
app.use("/api", authenticateToken, publicationRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log("Server running on", PORT );
});
