require('dotenv').config()
const express = require("express");
const connectDB = require("./utils/db");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const applicaitonFormRoute = require("./router/applicationForm-router")
const adminRoute = require("./router/admin-router");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080

app.use(cors({
        origin: "http://localhost:5173", 
        // credentials: true // if you're using cookies
}))

app.use(express.json())
app.use("/api/auth",authRoute );
app.use("/api/contact/form",contactRoute)
app.use("/api/form",applicaitonFormRoute)
app.use("/api/admin",adminRoute)
app.use(errorMiddleware)

connectDB()
.then(() => {
        app.listen(`${PORT}`, () => {
                console.log(`server is working on the http://localhost:${PORT}`);
        })
})
.catch((error) => console.log(error));