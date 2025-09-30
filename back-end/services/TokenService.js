import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client.js";

class TokenService {
  GenerateAccessToken(userData) {
    const accessToken = jwt.sign(userData, process.env.SECRET_KEY_ACCESSTOKEN, {
      expiresIn: "30m",
    });
    return {
      accessToken,
    };
  }
  GenerateRefreshToken(userData) {
    const refreshToken = jwt.sign(
      userData,
      process.env.SECRET_KEY_REFRESHTOKEN,
      {
        expiresIn: "30d",
      }
    );
    return {
      refreshToken,
    };
  }
  validateAccessToken(accessToken) {
    try {
      const validAccessToken = jwt.verify(
        accessToken,
        process.env.SECRET_KEY_ACCESSTOKEN
      );

      return validAccessToken;
    } catch (error) {
      console.log(error, "Error validateAccesToken");
    }
  }
  validateRefreshToken(refreshToken) {
    try {
      const validRefreshToken = jwt.verify(
        refreshToken,
        process.env.SECRET_KEY_REFRESHTOKEN
      );

      return validRefreshToken;
    } catch (error) {
      console.log(error, "validateRefreshToken");
    }
  }
  async saveToken(id, refreshToken) {
    try {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          refreshToken,
        },
      });
    } catch (error) {
      console.log(error, "savetoken");
    }
  }
  async deleteRefreshToken(id) {
    try {
      await prisma.user.update({
        where: { id },
        data: {
          refreshToken: null,
        },
      });
    } catch (error) {
      console.log(error, "deleteRefreshToken");
    }
  }
}
export default new TokenService();
