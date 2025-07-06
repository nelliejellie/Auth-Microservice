import { getUserFromGraph } from "../services/graphServices";

export async function authenticateUser(req: any, res: any) {
  const { email } = req.body;

  if (!email || !email.endsWith("@sanlamallianz.com.ng")) {
    return res.status(400).json({ message: "Invalid email or domain" });
  }

  try {
    const user = await getUserFromGraph(email);

    if (user) {
      return res.status(200).json({ message: "User exists", user });
    }

    return res.status(400).json({ error: "User not found" });
  } catch (err: any) {
    if (err.statusCode === 404) {
      return res.status(400).json({ error: "User not found" });
    }

    console.error("Graph Error:", err.message || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
