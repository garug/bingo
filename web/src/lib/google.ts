export function renderButton(ref: HTMLElement) {
  google.accounts.id.renderButton(ref, {
    type: "standard",
    theme: "outline",
    size: "large",
    text: "signin",
  });
}

function callback() {
  console.log("callback called");
}

export const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function onLoad() {
  google.accounts.id.initialize({
    client_id,
    callback,
  });
  google.accounts.id.prompt();
}

export function test() {
  const client = google.accounts.oauth2.initCodeClient({
    client_id,
    redirect_uri: "https://localhost:5173/_auth",
  });
  //   google.accounts.oauth2.initCodeClient();
}

export function requestCode() {

}