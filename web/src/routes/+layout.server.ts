export async function load({ cookies }) {
  const credential = cookies.get("credential");

  console.log({ credential });

  return { credential, cookies: cookies.getAll() };
}
