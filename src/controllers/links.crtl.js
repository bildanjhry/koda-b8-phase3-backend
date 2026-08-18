import { constants } from "http2"
import { default as db } from "../models/index.cjs"
const { Links } = db
import generateShortCode from "../libs/generate_code.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function getAllLinks(req, res) {
    try {
        const result = await Links.findAll()
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get all data",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed get data"
        })
    }
}

export async function createShortedUrl(req, res) {
    try {
        const { url } = req.body
        const id_user = req.data
        const validUrl = new URL(url)
        if(!url.protocol === "http:" || !url.protocol === "https:"){
            throw new Error("Invalid Url, only accept http or https")
        }
        const shorted = generateShortCode(6)
        const result = await Links.create({
            id_user:id_user,
            url:url,
            shorted:`http://localhost:8082/${shorted}`
        })

        res.status(constants.HTTP_STATUS_CREATED).json({
            success:true,
            message:"Success create shorted links",
            results:result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}