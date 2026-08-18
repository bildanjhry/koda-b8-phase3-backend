import { Router } from "express";
import { default as db} from "../models/index.cjs"
import * as linksControllers from "../controllers/links.crtl.js"
import authMiddleware from "../middlewares/auth.js";
const linksRoutes = Router()

linksRoutes.use(authMiddleware)

/**
 * @swagger
 * /links:
 *   get:
 *     description: Get all links
 *     tags:
 *       - Links
 *     responses:
 *       "200":
 *          description: Success add new link
 *       "400":
 *          description: Invalid input
 *     security:
 *        - token: []
*/
linksRoutes.get("", linksControllers.getAllLinks)

/**
 * @swagger
 * /links:
 *   post:
 *     description: Add new link
 *     tags:
 *       - Links
 *     requestBody:
 *       description: Create new link
 *       content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                 type: object
 *                 required:
 *                    - url
 *                 properties:
 *                    url:
 *                      type: string
 *                    slugs:
 *                      type: string
 *     responses:
 *       "200":
 *          description: Success add new category
 *       "400":
 *          description: Invalid input
 *     security:
 *        - token: []
*/
linksRoutes.post("", linksControllers.createShortedUrl)

/**
 * @swagger
 * /links/{shorted}:
 *   delete:
 *     description: delete shorted url
 *     tags:
 *       - Links
 *     parameters:
 *       - in: path
 *         name: shorted
 *         required: true
 *         schema:
 *            type: string
 *         description: Shorted Url
 *     responses:
 *        "200":
 *          description: Success Delete url
 *        "400":
 *          description: Url not found
 *     security:
 *        - token: []
 */
linksRoutes.delete("/:shorted", linksControllers.deleteShorted)


export default linksRoutes