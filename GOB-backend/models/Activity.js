const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    description: String,
    freedomFighterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FreedomFighter",
        required: true,
    },
});

module.exports = mongoose.model("Activity", activitySchema);
