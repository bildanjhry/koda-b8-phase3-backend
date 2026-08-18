import { Router } from "express";
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

const swaggerOpt = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shorter Link Backend",
      version: "1.0.0",
      description: "API Documetation for Shorter Link web app",
    },
    components: {
      securitySchemes: {
        token: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description:`Insert Bearer before token`
        }
      }
    }
  },
  apis: ["./src/routes/*route.js"],
}

const routes = Router()
const swagger = swaggerJSDoc(swaggerOpt)
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger))

export default routes