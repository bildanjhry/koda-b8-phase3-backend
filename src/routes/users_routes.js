import { Router } from "express";
import * as usersControllers from "../controllers/users.ctrl.js"
import authMiddleware from "../middlewares/auth.js";

const usersRoutes = Router()
usersRoutes.use(authMiddleware)

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       "200":
 *          description: Success add new link
 *       "400":
 *          description: Invalid input
*/
usersRoutes.get("", usersControllers.getAllUsers)

usersRoutes.get("/links", usersControllers.getUserByCred)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User's id
 *     responses:
 *       "200":
 *          description: Success get users
 *       "400":
 *          description: Invalid input
*/
usersRoutes.get("/:id", usersControllers.getUserById)



export default usersRoutes