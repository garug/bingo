import { newGame } from "@lib/database.ts";

export type GameOptions = {
  password: string;
};  

export function createGame(options: GameOptions) {
  return newGame(options.password);
}
