import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  let queue: string[] = [];

  io.on("connection", (socket) => {
    io.emit("queue length", queue.length);

    socket.on("leave queue", () => {
      queue.splice(queue.findIndex((id) => id == socket.id), 1);
      io.emit("queue length", queue.length);
    });

    socket.on("join queue", () => {
      queue.push(socket.id);
      io.emit("queue length", queue.length);

      if (queue.length >= 2) {
        const [user1, user2] = queue.splice(0, 2);
        const room = `${user1}-${user2}`;

        io.sockets.sockets.get(user1)?.join(room);
        io.sockets.sockets.get(user2)?.join(room);

        io.to(room).emit("matched", { room, users: [user1, user2], endTime: (new Date()).getTime() + 90000 });
      }
    });

    socket.on("message", ({ room, message, timestamp }) => {
      socket.to(room).emit("message", { message, timestamp });
    });

    socket.on("typing", (room) => {
      socket.to(room).emit("typing");
    });

    socket.on("stop typing", (room) => {
      socket.to(room).emit("stop typing");
    });

    socket.on("leave", (room) => {
      io.to(room).emit("leave");
    });

    socket.on("disconnect", () => {
      queue = queue.filter((id) => id != socket.id);
    });
  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        // @ts-expect-error private method
        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        // @ts-expect-error private method
        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});
