import { nanoid } from "nanoid";
import Url from "../models/url.js";
const shortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }
    const shortid = nanoid(8);
    await Url.create({
      shortID: shortid,
      originalURL: url,
      visitHistory: [],
    });
    return res.status(201).json({ id: shortid });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUrl = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from params correctly
    console.log(id);
    const url = await Url.findOneAndUpdate(
      { shortID: id },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.redirect(url.originalURL);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getStats = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findOne({ shortID: id });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.status(200).json({ visitCount: url.visitHistory.length });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { shortUrl, getUrl, getStats };
