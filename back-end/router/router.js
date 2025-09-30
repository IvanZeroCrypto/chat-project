import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import RoomController from "../controllers/RoomController.js";
import FriendController from "../controllers/FriendController.js";
import auth from "../middleware/auth.js";

const router = new Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/refresh", AuthController.refresh);
router.get("/check-auth", auth, AuthController.checkAuth);
router.get("/logout", auth, AuthController.logout);

router.get("/rooms", auth, RoomController.getRooms);
router.post("/rooms", auth, RoomController.createRoom);
router.post("/rooms-update-name/:roomId", auth, RoomController.updateRoomName);

router.get("/rooms/:roomId", auth, RoomController.getByIdRoom);
router.post("/rooms/:roomId", RoomController.addUserRoom);
router.delete("/rooms/:roomId", RoomController.deleteUserRoom);
router.post("/rooms-add-admin/:roomId", RoomController.addAdminRoom);
router.post("/rooms-delete-admin/:roomId", RoomController.deleteAdminRoom);

router.get("/friends", auth, FriendController.getAllMyFriends);
router.post("/friend-request/:id", auth, FriendController.friendRequest);
router.delete(
  "/friend-request/:id",
  auth,
  FriendController.deleteFriendRequest
);
router.get("/search-user/:searchId", auth, FriendController.searchUser);
router.get(
  "/friendly-request-my",
  auth,
  FriendController.getFriendlyRequestToMe
);
router.get(
  "/friendly-request-sent",
  auth,
  FriendController.getFriendlyRequestSent
);
router.post("/add-friend/:id", auth, FriendController.addFriend);
router.delete("/delete-friend/:id", auth, FriendController.deleteFriend);

export default router;
