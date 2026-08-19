import { constants } from "http2"
import { default as db } from "../models/index.cjs"
const { Users } = db
import libsBcrypt from "../libs/bcrypt.js"
import libsJwt from "../libs/jwt.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function registerUser(req, res) {
    try {
        const { email, password } = req.body
        const hashedPass = await libsBcrypt.hashed(password)
        const user = await Users.create({
            email: email,
            password: hashedPass
        })
        const result = {
            id: user.id,
            created_at: user.createdAt,
        }
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success create user",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new Error("User Not Found")
        }
        const isMatch = await libsBcrypt.comparePass(password, user.password)
        if (!isMatch) {
            throw new Error("Invalid Password")
        }
        const token = libsJwt.sign({ id: user.id })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60
        })
        
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Login Success",
            results: {
                users:{
                    id:user.id,
                    email:user.email
                }
            }
        })

    } catch (err) {
        res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
            success: false,
            message: err.message
        })
    }
}
