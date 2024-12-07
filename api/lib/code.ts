const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateCode(length: number) {
  return Array.from({ length }, () => {
    const idx = Math.floor(Math.random() * allowedChars.length);
    return allowedChars[idx];
  }).join();
}
