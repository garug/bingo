import type { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { writable, derived, type Writable } from "svelte/store";

type Auth = string | undefined;

type TokenInfo = {
  given_name: string;
} & JwtPayload;

export const credential = writable<Auth>(undefined);

export const user = derived<Writable<Auth>, undefined | TokenInfo>(
  credential,
  ($a) => {
    if ($a) {
      return jwtDecode($a);
    }

    return undefined;
  }
);
