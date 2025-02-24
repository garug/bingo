import type { Handle } from "@sveltejs/kit";

const handleApi: Handle = async ({ event }) => {
  const path = event.url.pathname.split("/api")[1];

  const url = `${import.meta.env.VITE_API_URL || ""}${path}`;

  const init: RequestInit = {
    method: event.request.method,
  };

  const headers = new Headers();

  const credential = event.cookies.get("credential");

  if (credential) {
    headers.append("Authorization", `Bearer ${credential}`);
  }

  if (event.request.body) {
    init.body = await event.request.text();
  }

  init.headers = headers;

  const req = await event.fetch(url, { ...init, headers });

  const data = req.body && (await req.json());

  return Response.json(data, {
    status: req.status,
    statusText: req.statusText,
  });
};

export const handle: Handle = async (params) => {
  const { event, resolve } = params;

  if (event.url.pathname.startsWith("/api")) {
    return handleApi(params);
  }

  const response = await resolve(event);
  return response;
};
