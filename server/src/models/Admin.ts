import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const AdminModel = mongoose.model("Admin", AdminSchema);
export default AdminModel;