import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todos";
import { json, urlencoded } from "body-parser";
import { config } from "./config/config";

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/todos", todoRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

mongoose.connect(config.mongo.url)
.then(()=>{ console.log("Database Connected")})
.catch(error=>{console.log(error)});

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
});