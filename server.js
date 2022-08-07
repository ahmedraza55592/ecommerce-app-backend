const express = require("express");
const mongoose = require("mongoose");
const adminRouter = require("./backend/routes/admin");
const authRouter = require("./backend/routes/auth");
const productRouter = require("./backend/routes/product");
const userRouter = require("./backend/routes/user");
require("dotenv").config()



//Initialize

const PORT = process.env.PORT || 3000;
const app = express();


//Middleware
app.use(express.json());
app.use(authRouter);
app.use(productRouter);
app.use(adminRouter);
app.use(userRouter);


//DatabaseConnection
// mongoose.connect(process.env.DB_STRING).then(()=> {
//     console.log("Connected to Database Successfully");
// }).catch((e) => {
//     console.log(e);
// })


app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at PORT ${PORT}`);
})
