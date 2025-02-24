import wiston from "npm:winston";

const format =
  Deno.env.get("DENO_ENV") === "production"
    ? wiston.format.json()
    : wiston.format.combine(wiston.format.colorize(), wiston.format.simple());

export const logger = wiston.createLogger({
  level: "http",
  format,
  transports: [new wiston.transports.Console()],
});
