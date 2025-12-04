const express = require("express");
const router = express.Router();
const { createContribution, getContributions, updateContributionStatus, deleteContribution } = require("../controllers/contributionController");
const { verifyAdmin } = require("../middleware/adminMiddleware");

router.post("/", createContribution);
router.get("/", verifyAdmin, getContributions);
router.put("/:id/status", verifyAdmin, updateContributionStatus);
router.delete("/:id", verifyAdmin, deleteContribution);

module.exports = router;
