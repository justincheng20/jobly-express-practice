const express = require("express");
const router = express.Router();
const Company = require("../models/company");
// const ExpressError = require("../helpers/expressError");
// const jsonschema = require("jsonschema");
// const companySchema = require("../schemas/companySchema");
// const companyUpdateSchema = require("../schemas/companyUpdateSchema");

router.get("/", async function (req, res, next){
  try {
    console.log("query:",req.query)
    let companies = await Company.getAll(req.query);
    return res.json({companies});
  } catch (err){
    return next(err);
  }
});

router.post("/", async function (req, res, next){
  try {
    let company = await Company.post(req.body);
    return res.json({company});
  } catch (err){
    return next(err);
  }
});

router.get("/:handle", async function (req, res, next){
  try {
    let company = await Company.get(req.param.handle);
    return res.json({company});
  } catch {
    return next(err);
  }
});

router.patch("/:handle", async function (req, res, next){
  try {
    let company = await Company.patch(req.param.handle);
    return res.json({company});
  } catch {
    return next(err);
  }
});

router.delete("/:handle", async function (req, res, next){
  try {
    let company = await Company.delete(req.param.handle);
    return res.json({message: "Company deleted"});
  } catch {
    return next(err);
  }
});

module.exports = router;

