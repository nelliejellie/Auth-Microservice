import { Client } from "@microsoft/microsoft-graph-client";
import "cross-fetch/polyfill";
import { getToken } from "../utils/msal";
import { ConfidentialClientApplication } from "@azure/msal-node";

import dotenv from "dotenv";

dotenv.config();

const config = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${
      process.env.AZURE_TENANT_ID || ""
    }`,
    clientSecret: process.env.AZURE_CLIENT_SECRET || "",
  },
};

const cca = new ConfidentialClientApplication(config);

export async function authenticateWithMicrosoftGraph(
  email: string,
  password: string
) {
  try {
    const result = await cca.acquireTokenByUsernamePassword({
      scopes: ["User.Read"],
      username: email,
      password,
    });

    return result;
  } catch (err: any) {
    console.error("MS Graph Auth Failed:", err.message || err);
    throw err;
  }
}
