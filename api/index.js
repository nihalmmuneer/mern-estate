import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listRouter from "./routes/list.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

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
app.use("/api/listing", listRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
