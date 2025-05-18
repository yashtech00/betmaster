// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// import bcrypt from "bcryptjs";

// import AdminModel from "../models/Admin";



// const createAdmin = async () => {
//   const Mongo_Url = process.env.MONGO_URL || "";
//   console.log("MongoDB URL:", Mongo_Url); // Debugging line

//   try {
//     await mongoose.connect(Mongo_Url);

//     const email = "yash123@gmail.com";
//     const plainPassword = "123456789";

//     const existing = await AdminModel.findOne({ email });
//     if (existing) {
//       console.log("✅ Admin already exists");
//       return process.exit();
//     }

//     const hashedPassword = await bcrypt.hash(plainPassword, 10);

//     const admin = await UserModel.create({ email, password:hashedPassword  });
//    await admin.save();

//     console.log("✅ Admin created successfully");
//     process.exit();
//   } catch (err) {
//     console.error("❌ Error creating admin:", err);
//     process.exit(1);
//   }
// };

// createAdmin();