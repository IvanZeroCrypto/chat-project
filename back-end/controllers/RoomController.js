import prisma from "../prisma/prisma-client.js";

class RoomController {
  async getRooms(req, res) {
    try {
      const rooms = await prisma.room.findMany({
        where: {
          OR: [
            {
              ownerId: req.user.id,
            },
            {
              users: {
                some: {
                  id: req.user.id,
                },
              },
            },
          ],
        },
        include: {
          users: {
            select: {
              id: true,
              userName: true,
            },
          },
          admins: {
            select: {
              id: true,
              userName: true,
            },
          },
          owner: {
            select: {
              id: true,
              userName: true,
            },
          },
        },
      });

      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Internal server error getRooms" });
    }
  }
  async createRoom(req, res) {
    try {
      const { name, id } = req.body;

      if (name && !id) {
        await prisma.room.create({
          data: {
            name,
            ownerId: req.user.id,
          },
        });
      } else if (name && id) {
        const user = await prisma.user.findFirst({
          where: {
            id,
          },
        });
        if (!user) {
          return res
            .status(400)
            .json({ message: "Пользователя не существует" });
        }
        const room = await prisma.room.findFirst({
          where: {
            private: true,
            users: {
              every: {
                id: { in: [id, req.user.id] },
              },
            },
          },
        });
        if (room) {
          return res.json(room);
        }
        await prisma.room.create({
          data: {
            name: user.userName,
            private: true,
            users: {
              connect: [{ id }, { id: req.user.id }],
            },
          },
        });
      }

      res.json({ message: "Группа создана" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error createRoom" });
    }
  }

  async addUserRoom(req, res) {
    try {
      const roomId = req.params.roomId;
      const userId = req.body.userId;

      const room = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });

      if (!room) {
        return res.status(400).json({ message: "Коммнаты не существует" });
      }

      await prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
      res.json({ message: "Пользователь добавлен в группу" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error addUserRoom" });
    }
  }
  async deleteUserRoom(req, res) {
    try {
      const { roomId } = req.params;
      const { userId } = req.query;

      const room = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });

      if (!room) {
        return res.status(400).json({ message: "Коммнаты не существует" });
      }

      await prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          users: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
      res.json({ message: "Пользователь удален из группы" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error deleteUserRoom" });
    }
  }
  async addAdminRoom(req, res) {
    try {
      const roomId = req.params.roomId;
      const userId = req.body.userId;

      const room = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });
      if (!room) {
        return res.status(400).json({ message: "Коммнаты не существует" });
      }

      await prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          admins: {
            connect: {
              id: userId,
            },
          },
        },
      });

      res.send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error addAdminRoom" });
    }
  }
  async deleteAdminRoom(req, res) {
    try {
      const roomId = req.params.roomId;
      const userId = req.body.userId;

      const room = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });
      if (!room) {
        return res.status(400).json({ message: "Коммнаты не существует" });
      }

      await prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          admins: {
            disconnect: {
              id: userId,
            },
          },
        },
      });

      res.send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error deleteAdminRoom" });
    }
  }
  async getByIdRoom(req, res) {
    try {
      const roomId = req.params.roomId;

      const room = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
        include: {
          messages: {
            include: {
              user: {
                select: {
                  id: true,
                  userName: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          users: {
            select: {
              id: true,
              userName: true,
            },
          },
          admins: {
            select: {
              id: true,
              userName: true,
            },
          },
          owner: {
            select: {
              id: true,
              userName: true,
            },
          },
        },
      });

      res.json(room);
    } catch (error) {
      res.status(500).json({ message: "Server error getByIdRoom " });
    }
  }
  async updateRoomName(req, res) {
    try {
      const roomId = req.params.roomId;

      const newName = req.body.newName;

      const room = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });

      if (!room) {
        return res.status(400).json({ message: "Комнаты не сущестует" });
      }

      if (newName === room.name) {
        return res
          .status(400)
          .json({ message: "Имя не должно совпадать с прежним" });
      }

      await prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          name: newName,
        },
      });
      res.json({ message: "Имя успешно обновлено" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error updateRoomName" });
    }
  }
}
export default new RoomController();
