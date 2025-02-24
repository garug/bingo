import wiston from "npm:winston";

const isProduction = Deno.env.get("DENO_ENV") === "production";

const format = isProduction
  ? wiston.format.json()
  : wiston.format.combine(wiston.format.colorize(), wiston.format.simple());

const level = isProduction ? "info" : "verbose";

export const logger = wiston.createLogger({
  level,
  format,
  transports: [new wiston.transports.Console()],
});
