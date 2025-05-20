import { generateToken } from "../lib/generateToken";
import UserModel from "../models/User"
import bcrypt from "bcryptjs"
import WalletModel from "../models/wallets";

export const Signup = async(req:any,res:any) => {
    try {
        const { username, fullname, email, password, role } = req.body
        console.log("Received role:", role); // 👈 Debug line
        const exist = await UserModel.findOne({email});
        if (exist) {
            return res.status(500).json("User already exist, go for login")
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            fullname,
            username,
            email,
            role,
            password:hashPassword
        })
        generateToken(user._id, res);

        console.log(user,"signup user");
        
         await WalletModel.create({
      userId: user._id,
      balance: 1000, // or your desired default
    });

        return res.status(200).json("User register successfully",user)

    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json("Internal server error while signup")
    }
}

export const Login = async(req:any,res:any) => {
    try {
        const { email, password } = req.body
        const User = await UserModel.findOne({email});
        if (!User) {
            return res.status(404).json("User not found, go for signup")
        }
        const isPassword = await bcrypt.compare(password, User.password);
        
        if (!isPassword) {
            return res.status(404).json("Invalid password")
        }

        generateToken(User._id, res);
        
        return res.status(200).json("User Login successfully",User)

    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json("Internal server error while Login")
    }
}

export const Logout = (req: any, res: any) => {
    res.clearCookie("jwt")
    res.json("Logged out")
}

export const GetMe = async (req: any, res: any)=>{
    try {
        const user = await UserModel.findById(req.user._id).select("-password");
        return res.status(200).json({ message: "me got this", data: user });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while fetch user details" });
    }
}