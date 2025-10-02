import prisma from "../prisma/prisma-client.js";
import MailService from "../services/MailService.js";
import TokenService from "../services/TokenService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
  async register(req, res) {
    try {
      const { userName, email, password } = req.body;

      const generateNumericId = (length = 9) => {
        return Math.floor(
          10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1)
        ).toString();
      };
      const id = parseInt(generateNumericId());
      if (!userName && !email && !password) {
        return res.status(400).json({ message: "Введите корректные данные" });
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (existingUser) {
        return res.status(400).json({ message: "email занят" });
      }

      const hashPassword = await bcrypt.hash(password, 5);

      await prisma.user.create({
        data: {
          userName,
          email,
          identificationId: id,
          password: hashPassword,
        },
      });
      res.json({
        message: "Регистрация завершена , войдите на сайт залогинившись",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error Register" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email && !password) {
        return res.status(400).json({ message: "Введите корректные данные" });
      }

      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({
          message:
            "Пользователя с таким email не существует пройдите регистрацию",
        });
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const userData = {
        id: user.id,
        email: user.email,
        userName: user.userName,
      };

      const { refreshToken } = TokenService.GenerateRefreshToken(userData);
      const { accessToken } = TokenService.GenerateAccessToken(userData);

      TokenService.saveToken(user.id, refreshToken);

      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.json({
        accessToken,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          identificationId: user.identificationId,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error Login" });
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;

      const decode = jwt.decode(refreshToken);

      const userData = {
        id: decode.id,
        email: decode.email,
        userName: decode.userName,
      };

      const validRefreshToken = TokenService.validateRefreshToken(refreshToken);

      if (validRefreshToken) {
        const expiresAt = new Date(decode.exp * 1000);
        const now = new Date();
        const timeUntilExpiry = expiresAt - now;
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (timeUntilExpiry < oneDayMs) {
          const newRefreshToken = TokenService.GenerateRefreshToken(userData);
          TokenService.saveToken(userData?.id, newRefreshToken.refreshToken);

          res.cookie("refreshToken", newRefreshToken.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });
        }
      } else {
        const newRefreshToken = TokenService.GenerateRefreshToken(userData);

        res.cookie("refreshToken", newRefreshToken.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
      }

      const { accessToken } = TokenService.GenerateAccessToken(userData);

      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error refresh" });
    }
  }
  async checkAuth(req, res) {
    try {
      const user = req.user;
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error checkAuth" });
    }
  }
  async logout(req, res) {
    try {
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          refreshToken: null,
        },
      });
      res.clearCookie("refreshToken");
      res.json({ message: "Вы вышли из аккаунта" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error Logout" });
    }
  }
}
export default new AuthController();
