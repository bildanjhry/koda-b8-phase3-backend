import { constants } from "http2"
import libsJwt from "../libs/jwt.js"

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @param {function()} next  
 */
export default function authMiddleware(req, res, next) {
    try {
        if (req.method === "OPTIONS") {
            return next();
        }
        const tokenClient = req.cookies.token
        let data 
        if (tokenClient) {
            data = libsJwt.verify(tokenClient)
            req.data = data
            return next()
        }

        const auth = req.header("Authorization") || ""
        if (auth === "" || !auth.startsWith("Bearer ")) {
            return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const token = auth.split(" ")[1]
        data = libsJwt.verify(token)
        req.data = data
        return next()
    } catch (err) {
        res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
            success: false,
            message: err.message
        })
    }
}