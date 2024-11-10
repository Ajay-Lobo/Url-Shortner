import express from "express";
import router from "./routes/url.js";
import staticRouter from "./routes/staticRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from 'url';
import Url from "./models/url.js";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const urls = await Url.find({});
  return res.render("index", { urls: urls });
});


app.use("/api/url", router);
app.use("/", staticRouter);


connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error(`Error starting the server: ${error.message}`);
    process.exit(1);
  });
