import prisma from "../prisma/prisma-client.js";

class FriendController {
  async friendRequest(req, res) {
    try {
      const toId = req.params.id;
      const userId = req.user.id;

      if (toId === userId) {
        return res
          .status(400)
          .json({ message: "вы не можете добавить самого себя в друзья" });
      }

      const user = await prisma.user.findFirst({
        where: {
          id: toId,
        },
        select: {
          friends: true,
        },
      });

      const existingFriend = user.friends.find((item) => item.id === userId);

      if (existingFriend) {
        return res.json({ message: "Дружба уже существует" });
      } else {
        await prisma.friendRequest.create({
          data: {
            fromId: userId,
            toId,
          },
        });
      }

      res.json({ message: "Запрос на добавление в друзья отправлен" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error friendRequest" });
    }
  }
  async deleteFriendRequest(req, res) {
    try {
      const id = req.params.id;
      await prisma.friendRequest.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.json({ message: "Запрос в друзья отменен" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error deleteFriendRequest" });
    }
  }
  async getFriendlyRequestToMe(req, res) {
    try {
      const userId = req.user.id;

      const { receivedFriendRequests } = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          receivedFriendRequests: {
            include: {
              from: {
                select: {
                  userName: true,
                },
              },
            },
          },
        },
      });

      res.json(receivedFriendRequests);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error getFriendlyRequestToMe" });
    }
  }
  async getFriendlyRequestSent(req, res) {
    try {
      const userId = req.user.id;

      const { sentFriendRequests } = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          sentFriendRequests: {
            include: {
              to: {
                select: {
                  userName: true,
                },
              },
            },
          },
        },
      });

      res.json(sentFriendRequests);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error getFriendlyRequestSent" });
    }
  }
  async getAllMyFriends(req, res) {
    try {
      const friends = await prisma.user.findFirst({
        where: {
          id: req.user.id,
        },
        select: {
          friends: {
            select: {
              id: true,
              userName: true,
            },
          },
        },
      });

      res.json(friends);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error getAllMyFriends" });
    }
  }
  async addFriend(req, res) {
    try {
      const id = req.params.id;
      const fromId = req.body.fromId;

      const existingRequest = await prisma.friendRequest.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      if (!existingRequest) {
        return res.status(400).json({ message: "Запроса не существует" });
      }

      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          friends: {
            connect: {
              id: fromId,
            },
          },
        },
      });
      await prisma.user.update({
        where: {
          id: fromId,
        },
        data: {
          friends: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });
      await prisma.friendRequest.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.send("ok");
    } catch (error) {
      res.status(500).json({ message: "Internal server error addFriend" });
    }
  }
  async searchUser(req, res) {
    try {
      const searchId = req.params.searchId;

      const user = await prisma.user.findUnique({
        where: {
          identificationId: parseInt(searchId),
        },
        select: {
          id: true,
          userName: true,
        },
      });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error searchUser" });
    }
  }
  async deleteFriend(req, res) {
    try {
      const id = req.params.id;

      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          friends: {
            disconnect: {
              id,
            },
          },
        },
      });
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          friends: {
            disconnect: {
              id: req.user.id,
            },
          },
        },
      });

      res.json({ message: "Пользователь удален из друзей" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error deleteFriend" });
    }
  }
}

export default new FriendController();
