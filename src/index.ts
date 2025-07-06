import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import sequelize from "./db/config";
import AuditLog from "./models/AuditLog";

dotenv.config();
const app = express();
app.use(express.json());

// Sync models
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Automatically creates tables if they don't exist
    console.log("Database connected and models synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth microservice running on port ${PORT}`);
});
