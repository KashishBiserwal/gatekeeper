import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import middleware from "./utils/middleware";
import { User } from "./models/user";
import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import path from "path";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  console.log("Establishing new database connection");
  await mongoose.connect('mongodb+srv://krish:gatekeeper@cluster0.7fby9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  isConnected = true;
};

connectToDatabase();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/ping", (req, res) => {
  return res.status(200).send({ message: "pong" });
});

app.get("/", (req, res) => res.send("Server running..."));



app.use("/auth", authRouter);
// @ts-ignore
app.use("/user", middleware.AuthMiddleware, userRouter);
// @ts-ignore
app.use("/admin", middleware.AuthMiddleware, adminRouter);

export const getUserToken = async (userId: any) => {
  console.log("Getting user token:", userId);
  const user = await User.findById(userId).select("registrationToken");
  console.log("User registration token:", user?.registrationToken);
  if (!user) return null;
  if (!user.registrationToken) return null;

  return user.registrationToken;
};

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => console.log("db connected..."))
//   .catch((err) => {
//     console.log(err);
//   });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

