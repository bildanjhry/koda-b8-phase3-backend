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
        const { url, slugs } = req.body
        const id_user = req.data.id
        const validUrl = new URL(url)
        if(!validUrl.protocol === "http:" || !validUrl.protocol === "https:"){
            throw new Error("Invalid Url, only accept http or https")
        }
        let shorted = ''
        if(!slugs){
            shorted = generateShortCode(6)
        } else {
            shorted = slugs
        }
        const resLink = await Links.create({
            id_user:id_user,
            url:url,
            shorted:`${shorted}`
        })
        const result = {
            id_user: resLink.id_user,
            created_at: resLink.createdAt,
            shorted:resLink.shorted,
            newLink:`${process.env.URL}/s/${resLink.shorted}`
        }
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

export async function deleteShorted(req, res) {
    try{
        const shorted = req.params.shorted
        const id_user = req.data.id
        const result =  await Links.destroy({
            where:{
                shorted:shorted,
                id_user:id_user
            }
        })
        if(result < 1){
            throw new Error("Failed Delete Url")
        }
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success delete item",
        })

    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success:false,
            message:err.message
        })
    }
}

export async function redirectUrl(req, res) {
    try{
        const url = req.params.shorted
        const link = await Links.findOne({
            where:{
                shorted:url
            }
        })
        if(!link) {
            throw new Error("Shorted Url not found")
        }
        res.redirect(link.url)
        
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success:false,
            message:err.message
        })
    }
}