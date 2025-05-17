import { generateToken } from "../../lib/generateToken";
import UserModel from "../../models/User"
import bcrypt from "bcryptjs"

export const Signup = async(req:any,res:any) => {
    try {
        const { username, fullname, email, password } = req.body
        
        const exist = await UserModel.findById(email);
        if (exist) {
            return res.status(500).json("User already exist, go for login")
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            fullname,
            username,
            email,
            password:hashPassword
        })
        generateToken(user._id, res);

        return res.status(200).json("User register successfully",user)

    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json("Internal server error while signup")
    }
}

export const Login = async(req:any,res:any) => {
    try {
        const { email, password } = req.body
        const User = await UserModel.findById(email);
        if (!User) {
            return res.status(404).json("User not found, go for signup")
        }
        const isPassword = await bcrypt.compare( password,User.password);

        const user = await UserModel.create({
            email,
            password
        })

        generateToken(user._id, res);
        

        return res.status(200).json("User Login successfully",user)

    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json("Internal server error while Login")
    }
}

export const Logout = (req: any, res: any) => {
    res.clearCookie("jwt")
    res.json("Logged out")
}

export const getMe = async(req: any, res: any) => {
    try {
        const user = await UserModel.findById(req.user._id).select("-password")
        return res.status(200).json("fetch user details", user);
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json("Error while fetching user details");
    }
}