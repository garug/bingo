import { Server } from "https://deno.land/x/socket_io@0.2.1/mod.ts";
import { logger } from "@lib/logger.ts";

export const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {
    logger.error(`socket ${socket.id} disconnected due to ${reason}`);
  });
});
