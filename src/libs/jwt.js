import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_KEY

function sign(payload){
    return jwt.sign(payload, SECRET_KEY,{
    expiresIn: "1h",
  })
}

function verify(payload){
    return jwt.verify(payload, SECRET_KEY)
}

const libsJwt = {sign, verify}
export default libsJwt