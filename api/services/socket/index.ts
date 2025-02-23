import { Server } from "https://deno.land/x/socket_io@0.2.1/mod.ts";

export const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on("hello", (data) => {
    console.log("receiving data", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});


