const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
    contributorName: {
        type: String,
        required: true,
    },
    contributorEmail: String,
    content: {
        type: String,
        required: true,
    },
    imageUrl: String,
    type: {
        type: String,
        default: "story", // story, new_profile
    },
    fighterName: String, // Only for new_profile
    status: {
        type: String,
        default: "pending", // pending, approved, rejected
    },
    freedomFighterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FreedomFighter",
    },
    sources: [String],
    timeline: [{
        title: String,
        year: String,
        description: String
    }],
}, { timestamps: true });

module.exports = mongoose.model("Contribution", contributionSchema);
