import URL from "../models/url.js";
const fetchURL = async (req, res, next) => {
  try {
    
    const urls = await URL.find({});
    res.locals.urls = urls;
    next();
  } catch (error) {
    console.error("Error fetching URLs:", error);
    next(error);
  }
};


export default fetchURL;