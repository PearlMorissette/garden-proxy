const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;
const API = "https://script.google.com/macros/s/AKfycbwkh33hUrI2O6aa-MGkL8UN8ZHgr6TYN7A-HW15frdY-fRPFtHyuqTQCUVKYEn0HNbAig/exec";
app.use(express.json());
// Allow requests from GitHub Pages
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
// Proxy all requests to Apps Script
app.get("/", async function(req, res) {
  try {
    const params = new URLSearchParams(req.query).toString();
    const url = API + (params ? "?" + params : "") + "&_=" + Date.now();
    const response = await fetch(url, { redirect: "follow" });
    const data = await response.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.toString() });
  }
});
app.listen(PORT, function() {
  console.log("Garden proxy running on port " + PORT);
});
