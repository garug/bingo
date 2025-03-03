import { format, createLogger, transports } from "npm:winston";

const isProduction = Deno.env.get("DENO_ENV") === "production";

const formatter = isProduction
  ? format.json()
  : format.combine(
      format.colorize(),
      format.timestamp({ format: "HH:mm:ss" }),
      format.printf(({ timestamp, level, message, ...rest }) => {
        const appliedTimestamp = `\x1b[90m${timestamp}\x1b[0m`;

        return `${appliedTimestamp} [${level}] ${message}${
          rest && `: ${JSON.stringify(rest, null, 2)}`
        }`;
      })
    );

const level = isProduction ? "info" : "verbose";

export const logger = createLogger({
  level,
  format: formatter,
  transports: [new transports.Console()],
});
