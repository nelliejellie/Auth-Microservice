import { Client } from "@microsoft/microsoft-graph-client";
import "cross-fetch/polyfill";
import { getToken } from "../utils/msal";

export function getAuthenticatedClient(accessToken: string): Client {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
}

export async function getUserFromGraph(email: string) {
  const token = await getToken();
  const client = getAuthenticatedClient(token);
  return await client.api(`/users/${email}`).get();
}
