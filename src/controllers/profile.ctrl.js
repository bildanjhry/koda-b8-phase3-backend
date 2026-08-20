import { constants } from "http2"
import { default as db } from "../models/index.cjs"
const { Profile, Users } = db

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res 
*/
export async function getAllProfile(req, res) {
    try {
        const result = await Profile.findAll({
            include: [{
                model: Users,
                as: "user",
            }]
        })
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success get all profile",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
            success: false,
            message: "Unanthorized",
            results: null
        })
    }
}

export async function getProfileByUser(req, res) {
    try {
        const id_user = req.params.id
        const result = await Profile.findOne({
            where: {
                user_id: parseInt(id_user)
            },
            include: [{
                model: Users,
                as: "user",
            }]
        })

        if(!result){
            const err = {}
            err.code = 400
            err.message = "User Not found"
            throw err
        }

        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success get user profile",
            results: result
        })
    } catch (err) {
        res.status(err.code || constants.HTTP_STATUS_UNAUTHORIZED).json({
            success: false,
            message: err.message || "Unanthorized",
            results: null
        })
    }
}