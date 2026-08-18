import { Router } from "express";
import { default as db} from "../models/index.cjs"
import * as linksControllers from "../controllers/links.crtl.js"
const linksRoutes = Router()

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
*/
linksRoutes.get("", linksControllers.getAllLinks)

/**
 * @swagger
 * /links:
 *   post:
 *     description: Add new size
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
 *     responses:
 *       "200":
 *          description: Success add new category
 *       "400":
 *          description: Invalid input
*/
linksRoutes.post("", linksControllers.createShortedUrl)

export default linksRoutes