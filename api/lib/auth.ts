import { OAuth2Client } from "npm:google-auth-library";

const client = new OAuth2Client();

function verify(idToken: string) {
  return client.verifyIdToken({
    idToken,
    audience: Deno.env.get("GOOGLE_CLIENT_ID"),
  });
}

export async function authenticate(req: Request): Promise<string | undefined> {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) return "Unauthorized";

  try {
    await verify(token);
  } catch (_error) {
    return "Forbbiden";
  }
}

export async function useToken(req: Request) {
  const error = await authenticate(req);

  if (error) throw Error(error);

  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  console.log(token);

  return token;
}
