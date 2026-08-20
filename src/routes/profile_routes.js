import { Router } from "express";
import * as profileControlleres from "../controllers/profile.ctrl.js"
import authMiddleware from "../middlewares/auth.js";

const profileRoutes = Router()
profileRoutes.use(authMiddleware)

/**
 * @swagger
 * /api/profile:
 *   get:
 *    description: Get All user profile
 *    tags:
 *      - Profile
 *    responses:
 *      "200":
 *        description: Success get all profile
 *      "401":
 *        description: Unauthorized
 *    security:
 *       - token: []
*/
profileRoutes.get("", profileControlleres.getAllProfile)

/**
 * @swagger
 * /api/profile/{id}:
 *   get:
 *    description: Get user profile
 *    tags:
 *      - Profile
 *    parameters:
 *       - in: path
 *         name: id
 *         description: User's Id
 *         required: true
 *         schema:
 *            type: string
 *    responses:
 *      "200":
 *        description: Success get user profile
 *      "400":
 *        description: User not found
 *    security:
 *      - token: []
*/
profileRoutes.get("/:id", profileControlleres.getProfileByUser)

export default profileRoutes