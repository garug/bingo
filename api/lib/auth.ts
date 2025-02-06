import { OAuth2Client } from "npm:google-auth-library";
import { Err, Ok } from "@lib/result.ts";

const client = new OAuth2Client();

function verify(idToken: string) {
  return client.verifyIdToken({
    idToken,
    audience: Deno.env.get("GOOGLE_CLIENT_ID"),
  });
}

export async function authenticate(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) return Err("Unauthorized");

  try {
    await verify(token);
    return Ok();
  } catch (_error) {
    return Err("Forbbiden");
  }
}

export async function useToken(req: Request) {
  const error = await authenticate(req);

  if (error) return Err(error);

  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  return Ok(token);
}
