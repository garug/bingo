type Auth = {
  credential: string | undefined;
};

export const auth: Auth = $state({
  credential: undefined,
});
