const express = require("express");
const router = express.Router();
const { createContribution, getContributions, updateContributionStatus } = require("../controllers/contributionController");
const { verifyAdmin } = require("../middleware/adminMiddleware");

router.post("/", createContribution);
router.get("/", verifyAdmin, getContributions);
router.put("/:id/status", verifyAdmin, updateContributionStatus);

module.exports = router;
