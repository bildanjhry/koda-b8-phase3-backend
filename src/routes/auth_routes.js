import { Router } from "express";
import { default as db} from "../models/index.cjs"
import * as authControllers from "../controllers/auth.ctrl.js"
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
 * /auth/login:
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

export default authRoutes