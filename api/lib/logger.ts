import winston from 'npm:winston';

export const logger = winston.createLogger({
    level: "http",
    format: Deno.env.get("DENO_ENV") === "production" ? winston.format.json() : winston.format.simple(),
    transports: [
        new winston.transports.Console(),
    ]
});