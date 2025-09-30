import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import router from "./router/router.js";
import cookieParser from "cookie-parser";
import prisma from "./prisma/prisma-client.js";
import { userInfo } from "os";
dotenv.config();
const PORT = process.env.PORT || 7000;

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://chat-project-topaz.vercel.app"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(router);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-project-topaz.vercel.app"],
    methods: ["GET", "POST", "DELETE"],
  },
});

const usersOnline = new Map();
const usersSocket = new Map();

io.on("connection", (socket) => {
  console.log("user connect", socket.id);
  if (socket.id) {
    socket.on("authenticate", async (userId) => {
      if (!userId) {
        console.error("Не передан user ID!");
        socket.disconnect();
        return;
      }

      usersOnline.set(userId, socket.id);

      usersSocket.set(socket.id, userId);

      notifyFriends(socket.id, userId);
    });
  }
  socket.on("ROOM:JOIN", async ({ userName, roomId, userId }) => {
    if ((userName, roomId, userId)) {
      socket.join(roomId);
    }
  });
  socket.on(
    "ROOM:NEW_MESSAGE",
    async ({ userName, roomId, message, userId }) => {
      if ((userName, roomId, message, userId)) {
        const obj = {
          userName,
          text: message,
          userId,
          roomId,
        };

        io.to(roomId).emit("ROOM:NEW_MESSAGE", obj);
        await prisma.message.create({
          data: {
            text: message,
            user: {
              connect: {
                id: userId,
              },
            },
            room: {
              connect: {
                id: roomId,
              },
            },
          },
        });
      }
    }
  );
  socket.on("ROOM:LEAVE", ({ roomId }) => {
    socket.leave(roomId);
  });

  socket.on("disconnect", async () => {
    const userId = usersSocket.get(socket.id);
    console.log(userId, "отключился");

    if (!userId) return;

    usersOnline.delete(userId);
    usersSocket.delete(socket.id);

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        userName: true,
        friends: { select: { id: true, userName: true } },
      },
    });

    if (!user?.friends) return;

    user.friends.forEach(({ id }) => {
      const friendSocketId = usersOnline.get(id);
      if (friendSocketId) {
        io.to(friendSocketId).emit("friendStatus", {
          id: userId,
          userName: user.userName,
          status: false,
        });
      }
    });
  });
});

async function notifyFriends(soketId, userId) {
  if (!userId) {
    return;
  }
  const isOnline = true;
  const infoUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      friends: {
        select: {
          id: true,
          userName: true,
        },
      },
    },
  });
  if (!infoUser) {
    return;
  }
  infoUser?.friends.forEach(({ id, userName }) => {
    if (usersOnline.has(id)) {
      io.to(soketId).emit("friendStatus", {
        id,
        userName,
        status: true,
      });
    }
  });

  infoUser?.friends.forEach(({ id }) => {
    const socketIdUser = usersOnline.get(id);
    if (socketIdUser) {
      io.to(socketIdUser).emit("friendStatus", {
        id,
        userName: infoUser.userName,
        status: true,
      });
    }
  });
}

const start = () => {
  try {
    server.listen(PORT, "0.0.0.0", () => {
      console.log("Server started");
    });
  } catch (error) {
    console.log(error, "Server error app");
  }
};
start();
