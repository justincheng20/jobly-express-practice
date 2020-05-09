const Router = require("express").Router;

const router = new Router();

router.get("/", async function (req, res, next){
  try {
    let companies = await Company.get();
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

