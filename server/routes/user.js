import express from "express";


const router = express.Router();

router.get("/user", getUser);

export default router;