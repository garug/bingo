import { jwtDecode } from "jwt-decode";

type Auth = {
  credential: string | undefined;
};

export const auth: Auth = $state({
  credential: undefined,
});

export const token = () => auth.credential && jwtDecode(auth.credential);
