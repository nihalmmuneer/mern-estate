import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB successfully connected!!");
  })
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server running on 3000");
});

// app.get("/test", (req, res) => {
//   res.send("Test api");
// });
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
