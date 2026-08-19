import { Router } from "express";
import * as linksControllers from "../controllers/links.crtl.js"

const shortedRoutes = Router()

/**
 * @swagger
 * /{slugs}:
 *  get:
 *    description: Redirect short url
 *    tags:
 *      - Shorted
 *    parameters:
 *       - in: path
 *         name: slugs
 *         required: true
 *         schema:
 *            type: string
 *         example: a7hy6
 *    responses:
 *       "301":
 *         description: Redirect to original url
 *       "404":
 *         description: Shorted url not found 
 */
shortedRoutes.get("/:slugs", linksControllers.redirectUrl)

export default shortedRoutes