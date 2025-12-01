const express = require("express");
const { getAllFighters, getFighterById, createFighter, updateFighter, deleteFighter } = require("../controllers/fighterController");
// const { verifyToken, isAdmin } = require("../middleware/authMiddleware"); // Add if needed

const router = express.Router();

router.get("/", getAllFighters);
router.get("/:id", getFighterById);
router.post("/", createFighter); // Protect this later
router.put("/:id", require("../middleware/adminMiddleware").verifyAdmin, updateFighter);
router.delete("/:id", require("../middleware/adminMiddleware").verifyAdmin, deleteFighter);

module.exports = router;
