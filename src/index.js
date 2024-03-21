import express from "express"
import { configDotenv } from "dotenv"
import cors from "cors"
import groupsRoutes from "./routes/groups.routes.js";
import loginRouter from "./routes/login.routes.js";
import publicationRouter from "./routes/publications.routes.js";


configDotenv()

const app = express();
app.use(cors())

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

app.use(express.json())
app.use("/api", groupsRoutes, loginRouter, publicationRouter)

const {PORT} = process.env
app.listen(PORT, () => {
  console.log("Server running on", PORT )
})
