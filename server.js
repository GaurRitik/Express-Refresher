import express from "express";
import path from "path" 
import {fileURLToPath} from "url";

import posts from "./routers/posts.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'public')));
// app.use('/js', express.static(path.join(__dirname, 'js')));
                

// For body parser - for req.body
app.use(express.json()) //for json format
app.use(express.urlencoded({extended:false}));

app.use("/api/posts",posts);
//middleware
app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT
app.listen(port,()=>{
    console.log("SERVER is running at port 8000");
})