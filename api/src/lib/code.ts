const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateCode(length = 5) {
  return Array.from({ length }, () => {
    const idx = Math.floor(Math.random() * allowedChars.length);
    return allowedChars[idx];
  }).join("");
}
