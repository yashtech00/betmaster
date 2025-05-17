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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Admin_1 = __importDefault(require("../models/Admin"));
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const Mongo_Url = process.env.MONGO_URL || "";
    console.log("MongoDB URL:", Mongo_Url); // Debugging line
    try {
        yield mongoose_1.default.connect(Mongo_Url);
        const email = "yash123@gmail.com";
        const plainPassword = "123456789";
        const existing = yield Admin_1.default.findOne({ email });
        if (existing) {
            console.log("✅ Admin already exists");
            return process.exit();
        }
        const hashedPassword = yield bcryptjs_1.default.hash(plainPassword, 10);
        const admin = yield Admin_1.default.create({ email, password: hashedPassword });
        yield admin.save();
        console.log("✅ Admin created successfully");
        process.exit();
    }
    catch (err) {
        console.error("❌ Error creating admin:", err);
        process.exit(1);
    }
});
createAdmin();
