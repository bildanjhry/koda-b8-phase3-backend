import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { Router } from "express";
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import linksRoutes from "./links_routes.js";
import usersRoutes from "./users_routes.js";
import authRoutes from "./auth_routes.js";
import shortedRoutes from "./shorted_routes.js";
import profileRoutes from "./profile_routes.js";

const swaggerOpt = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shorter Link Backend",
      version: "1.0.0",
      description: "API Documetation for Shorter Link web app",
    },

    servers: [
      {
        url: process.env.SWAGGER_URL || "http://localhost:8082",
      },
    ],

    components: {
      securitySchemes: {
        token: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: `Insert Bearer before token`
        }
      }
    }
  },
  apis: [
    path.join(__dirname, "./*routes.js")
  ],
}

const routes = Router()
const swagger = swaggerJSDoc(swaggerOpt)
routes.use("/api/links", linksRoutes)
routes.use("/api/users", usersRoutes)
routes.use("/api", authRoutes)
routes.use("", shortedRoutes)
routes.use("/api/profile", profileRoutes)
routes.use("/api-docs/api", swaggerUi.serve, swaggerUi.setup(swagger))

export default routes