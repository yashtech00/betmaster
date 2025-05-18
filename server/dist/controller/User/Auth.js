"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.Logout = exports.Login = exports.Signup = void 0;
const generateToken_1 = require("../../lib/generateToken");
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, fullname, email, password } = req.body;
        const exist = yield User_1.default.findById(email);
        if (exist) {
            return res.status(500).json("User already exist, go for login");
        }
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_1.default.create({
            fullname,
            username,
            email,
            password: hashPassword
        });
        (0, generateToken_1.generateToken)(user._id, res);
        return res.status(200).json("User register successfully", user);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("Internal server error while signup");
    }
});
exports.Signup = Signup;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const User = yield User_1.default.findOne({ email });
        if (!User) {
            return res.status(404).json("User not found, go for signup");
        }
        const isPassword = yield bcryptjs_1.default.compare(password, User.password);
        const user = yield User_1.default.create({
            email,
            password
        });
        (0, generateToken_1.generateToken)(user._id, res);
        return res.status(200).json("User Login successfully", user);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("Internal server error while Login");
    }
});
exports.Login = Login;
const Logout = (req, res) => {
    res.clearCookie("jwt");
    res.json("Logged out");
};
exports.Logout = Logout;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user._id).select("-password");
        return res.status(200).json("fetch user details", user);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("Error while fetching user details");
    }
});
exports.getMe = getMe;
