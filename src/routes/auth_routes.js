import { Router } from "express";
import { default as db} from "../models/index.cjs"
import * as authControllers from "../controllers/auth.ctrl.js"
import authMiddleware from "../middlewares/auth.js";
const authRoutes = Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Add new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Create new user
 *       content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                 type: object
 *                 required:
 *                    - email
 *                    - password
 *                 properties:
 *                    email:
 *                      type: string
 *                    password:
 *                      type: string
 *     responses:
 *       "200":
 *          description: Success add new user
 *       "400":
 *          description: Invalid input
*/
authRoutes.post("/register", authControllers.registerUser)

/**
 * @swagger
 * /api/login:
 *   post:
 *     description: Login into system
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Login into system
 *       content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                 type: object
 *                 required:
 *                    - email
 *                    - password
 *                 properties:
 *                    email:
 *                      type: string
 *                    password:
 *                      type: string
 *     responses:
 *       "200":
 *          description: Success Login
 *       "400":
 *          description: Invalid input
*/
authRoutes.post("/login", authControllers.loginUser)

/**
 * @swagger
 * /api/logout:
 *   post:
 *     description: Logout from system
 *     tags:
 *       - Auth
 *     responses:
 *       "200":
 *          description: Success Logout
 *       "500":
 *          description: Something went wrong
*/
authRoutes.post("/logout", authControllers.logoutUser)

/**
 * @swagger
 * /api/session:
 *   get:
 *     description: Check session user
 *     tags:
 *       - Auth
 *     responses:
 *       "200":
 *          description: Success get user
 *       "401":
 *          description: User not found
 *     security:
 *        - token: []
*/
authRoutes.get("/session", authMiddleware, authControllers.sessionUser)

export default authRoutes