import { Router } from "express";
import * as linksControllers from "../controllers/links.crtl.js"

const shortedRoutes = Router()

/**
 * @swagger
 * /s/{shorted}:
 *  get:
 *    description: Redirect short url
 *    tags:
 *      - Shorted
 *    parameters:
 *       - in: path
 *         name: shorted
 *         required: true
 *         schema:
 *            type: string
 *         example: a7hy6
 *    responses:
 *       "302":
 *         description: Redirect to original url
 *       "404":
 *         description: Shorted url not found 
 */
shortedRoutes.get("/s/:shorted", linksControllers.redirectUrl)

export default shortedRoutes