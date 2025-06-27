const express = require("express");
const auth = require("../middlewares/authMiddleware");
const { getAll, add, delete: remove } = require("../controllers/transactionController");

const router = express.Router();

router.use(auth);
router.get("/", getAll);
router.post("/", add);
router.delete("/:id", remove);

module.exports = router;
