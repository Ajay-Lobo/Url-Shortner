import express from "express";
import router from "./routes/url.js";
import user from "./routes/user.js";
import staticRouter from "./routes/staticRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import fetchURL from "./middleware/fetchURL.js";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fetchURL);
app.get("/", async (req, res) => {
  return res.render("index");
});

app.use("/api/url", router);
app.use("/", staticRouter);
app.use("/user", user);

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
