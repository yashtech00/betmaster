import express from "express"
import ConnectDb from "./db/db";




const app = express();
const PORT = process.env.PORT;
ConnectDb();





app.listen(PORT,() => {
    console.log(`server is connected to ${PORT}`);
})