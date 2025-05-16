import jwt from "jsonwebtoken"
 

export const generateToken = (userId:any,res:any) => {
   
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET || "secret",
            {expiresIn:'24h'}
        )
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            samesite: "none",
            maxAge: 24 * 60 * 60 * 1000
        })
    console.log(token);
    return token;
}