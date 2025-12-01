const mongoose = require("mongoose");

const freedomFighterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    born: String,
    died: String,
    location: String,
    imageUrl: String,
    sources: [String],
}, { timestamps: true });

// Virtual for activities
freedomFighterSchema.virtual('activities', {
    ref: 'Activity',
    localField: '_id',
    foreignField: 'freedomFighterId',
});

// Virtual for contributions
freedomFighterSchema.virtual('contributions', {
    ref: 'Contribution',
    localField: '_id',
    foreignField: 'freedomFighterId',
});

// Ensure virtuals are included in JSON
freedomFighterSchema.set('toJSON', { virtuals: true });
freedomFighterSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("FreedomFighter", freedomFighterSchema);
