import { constants } from "http2"
import { default as db } from "../models/index.cjs"
const { Users, Links } = db

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function getAllUsers(req, res) {
    try {
        const result = await Users.findAll({
            attributes: {
                exclude:["password"]
            },
            include: [
                {
                    model: Links,
                    as: "links",
                },
            ],
        })
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get all data",
            results: result
        })
    } catch (err) {
        console.log(err)
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}

export async function getUserById(req, res) {
    try {
        const id = req.params.id
        const result = await Users.findOne({
            where: {
                id:parseInt(id)
            },
            attributes:{
                exclude: ["password"]
            },
            include: [
                {
                    model: Links,
                    as: "links",
                },
            ],
        })
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get data",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message,
        })
    }
}


export async function getUserByCred(req, res) {
    try {
        console.log(req.data)
        const id = req.data.id
        const result = await Users.findOne({
            where: {
                id:parseInt(id)
            },
            attributes:{
                exclude: ["password"]
            },
            include: [
                {
                    model: Links,
                    as: "links",
                },
            ],
        })
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get data",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: req.data,
            test:"test"
        })
    }
}