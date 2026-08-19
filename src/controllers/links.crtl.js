import { constants } from "http2"
import { default as db } from "../models/index.cjs"
const { Links, Users } = db
import generateShortCode from "../libs/generate_code.js"
import sanitizes from "../libs/sanitizes.js"

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
        const { url, slug } = req.body
        const id_user = req.data.id
        const validUrl = new URL(url)
        if(!validUrl.protocol === "http:" || !validUrl.protocol === "https:"){
            throw new Error("Invalid Url, only accept http or https")
        }
        let shorted = ''
        if(!slug){
            shorted = generateShortCode(6)
        } else {
            const isReserved = sanitizes(slug)
            if(!isReserved){
                const err = {}
                err.code = 400
                err.message = "Reserved word are invalid for slug"
                throw err
            }
            shorted = slug
        }
        if(!url || !id_user){
            throw new Error("No data")
        }
        const resLink = await Links.create({
            user_id:id_user,
            original_url:url,
            slug:`${shorted}`,
            shorted_url:`${process.env.URL}/${shorted}`
        })

        const result = {
            id: resLink.id,
            created_at: resLink.createdAt,
            slug:resLink.slug,
            original_url:resLink.original_url,
            short_url:resLink.shorted_url
        }
        res.status(constants.HTTP_STATUS_CREATED).json({
            success:true,
            message:"Success create shorted url",
            results:result
        })
    } catch (err) {
        res.status(err.code || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message === "Validation error" ? "Slug already taken" : err.message,
            results:null
        })
    }
}

export async function deleteShorted(req, res) {
    try{
        const id = req.params.id
        const id_user = req.data.id
        const result =  await Links.destroy({
            where:{
                id:id,
                user_id:id_user
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
        const slug = req.params.slug
        const link = await Links.findOne({
            where:{
                slug:slug
            }
        })
        if(!link) {
            throw new Error("Slug Url not found")
        }
        res.redirect(link.original_url)
        
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success:false,
            message:err.message
        })
    }
}

export async function getUserByCred(req, res) {
    try {
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
            message: err.message,
        })
    }
}