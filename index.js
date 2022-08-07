const express = require("express");
const router = require("./router/auth");


const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(router);


app.listen(PORT, ("0.0.0.0"), () => {
    console.log(`connected at PORT ${PORT}`);
})
