export async function load({ cookies }) {
  const credential = cookies.get("credential");

  return { credential };
}
