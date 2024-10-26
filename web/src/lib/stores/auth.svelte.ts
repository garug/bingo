let _credential: string | undefined = $state();

export function setCredential(str: string) {
  _credential = str;
}

export function useCredential() {
  return _credential;
}
