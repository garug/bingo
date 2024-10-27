import { OAuth2Client } from "npm:google-auth-library";

const client = new OAuth2Client();

export function verify(idToken: string) {
  return client.verifyIdToken({
    idToken,
    audience: Deno.env.get("GOOGLE_CLIENT_ID"),
  });
}
