import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client.js";
import TokenService from "../services/TokenService.js";

export default async function Auth(req, res, next) {
  try {
    const accessToken = req.headers?.authorization.split(" ")[1];

    const { refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    const existingDbRefreshToken = await prisma.user.findFirst({
      where: {
        refreshToken,
      },
    });

    if (!existingDbRefreshToken) {
      return res.status(204).json();
    }

    const validTokenAccess = TokenService.validateAccessToken(accessToken);
    const validTokenRefresh = TokenService.validateRefreshToken(refreshToken);

    if (!validTokenAccess || !validTokenRefresh) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: validTokenAccess.id,
      },
    });

    req.user = {
      id: user.id,
      email: user.email,
      userName: user.userName,
      identificationId: user.identificationId,
    };
    next();
  } catch (error) {
    console.log(error, "middleware auth");
  }
}
