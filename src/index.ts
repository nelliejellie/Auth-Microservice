import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api", authRoutes);
// app.use(express.json());

// console.log("Starting Auth Microservice...");

// app.post("/auth", async (req: any, res: any) => {
//   const { email } = req.body;

//   if (!email || !email.endsWith("@sanlamallianz.com.ng")) {
//     return res.status(400).json({ message: "Invalid email or domain" });
//   }

//   try {
//     const token = await getToken();
//     const client = getAuthenticatedClient(token);

//     // Microsoft Graph API: GET /users/{email}
//     const user = await client.api(`/users/${email}`).get();

//     if (user) {
//       return res.status(200).json({ message: "User exists", user });
//     }

//     return res.status(400).json({ error: "User not found" });
//   } catch (err: any) {
//     if (err.statusCode === 404) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     console.error("Graph Error:", err.message || err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth microservice running on port ${PORT}`);
});
