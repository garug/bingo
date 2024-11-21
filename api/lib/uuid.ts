export function generateUUID() {
  return crypto.randomUUID();
}

export type UUID = ReturnType<typeof generateUUID>;

export function isValidUUID(str: string) {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(str);
}
