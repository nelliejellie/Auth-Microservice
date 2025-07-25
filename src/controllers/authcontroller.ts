import { authenticateWithMicrosoftGraph } from "../services/graphServices";
import AuditLog from "../models/AuditLog";

export async function authenticateUser(req: any, res: any) {
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"] || "unknown";
  const source = "authService";
  const { email, password } = req.body;

  const createAuditLog = async (status: string) => {
    try {
      await AuditLog.create({
        email: email || "unknown",
        status,
        ipAddress,
        userAgent,
        source,
      });
    } catch (error: any) {
      console.error("Error creating audit log:", error);
    }
  };

  if (!email || !password || !email.endsWith("@sanlamallianz.com.ng")) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    const user = await authenticateWithMicrosoftGraph(email, password);

    if (user) {
      await createAuditLog("success");
      return res.status(200).json({ message: "User exists", user });
    }

    await createAuditLog("failure");
    return res.status(400).json({ error: "User not found" });
  } catch (err: any) {
    if (err.statusCode === 404) {
      await createAuditLog("failure");
      return res.status(400).json({ error: "User not found" });
    }

    await createAuditLog("failure");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
