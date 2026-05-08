import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app= express();
const port = process.env.PORT || 4000

connectDB();

const allowedOrigins=['http://localhost:5173']

app.use(express.json());
app.use(cookieParser())
//so we can send cookies from express in form of response
app.use(cors({origin:allowedOrigins,credentials: true}))

//Api endpoints
app.get("/",(req, res)=>res.send("API working fine"))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.listen(port,()=>console.log(`Server started on PORT: ${port}`))