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
exports.Logout = exports.GetMe = exports.AdminLogin = void 0;
const generateToken_1 = require("../../lib/generateToken");
const Admin_1 = __importDefault(require("../../models/Admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Admin_1.default.findOne({ email });
        if (!user) {
            return res.json({ message: "Admin not found go for Signup" }, { status: 401 });
        }
        const isPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPassword) {
            return res.json({ message: "Invalid Password" }, { status: 401 });
        }
        (0, generateToken_1.generateToken)(user._id, res);
        return res.status(200).json({
            message: "Admin logged in successfully",
            data: user
        });
    }
    catch (e) {
        console.error(e.message);
        return res.json({ message: "Internal server error while SignIn" }, { status: 500 });
    }
});
exports.AdminLogin = AdminLogin;
const GetMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield Admin_1.default.findById(req.user._id).select("-password");
        return res.status(200).json({ message: "me got this", data: admin });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while fetch admin details" });
    }
});
exports.GetMe = GetMe;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout Successfully" });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while logout" });
    }
});
exports.Logout = Logout;
