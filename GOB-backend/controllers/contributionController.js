const Contribution = require("../models/Contribution");
const FreedomFighter = require("../models/FreedomFighter");

exports.createContribution = async (req, res) => {
    try {
        const { contributorName, contributorEmail, content, freedomFighterId, imageUrl, type, fighterName, sources, timeline } = req.body;

        const contribution = await Contribution.create({
            contributorName,
            contributorEmail,
            content,
            freedomFighterId: freedomFighterId || null,
            imageUrl,
            type: type || "story",
            fighterName,
            sources: sources || [],
            timeline: timeline || [],
        });

        res.status(201).json({ message: "Contribution submitted successfully", contribution });
    } catch (error) {
        console.error("Error submitting contribution:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getContributions = async (req, res) => {
    try {
        const { status } = req.query;
        const query = status ? { status } : {};

        const contributions = await Contribution.find(query)
            .populate("freedomFighterId", "name")
            .sort({ createdAt: -1 });

        res.json(contributions);
    } catch (error) {
        console.error("Error fetching contributions:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateContributionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // approved, rejected

        const contribution = await Contribution.findById(id);
        if (!contribution) {
            return res.status(404).json({ message: "Contribution not found" });
        }

        contribution.status = status;
        await contribution.save();

        // If approved and it's a new profile, create the fighter
        if (status === "approved" && contribution.type === "new_profile") {
            const fighter = await FreedomFighter.create({
                name: contribution.fighterName,
                role: "Freedom Fighter", // Default role
                description: contribution.content,
                imageUrl: contribution.imageUrl,
                sources: contribution.sources || [],
            });

            // Create activities from timeline
            if (contribution.timeline && contribution.timeline.length > 0) {
                const activities = contribution.timeline.map(item => ({
                    title: item.title,
                    year: item.year,
                    description: item.description,
                    freedomFighterId: fighter._id
                }));
                const Activity = require("../models/Activity");
                await Activity.insertMany(activities);
            }
        }

        res.json({ message: `Contribution ${status}`, contribution });
    } catch (error) {
        console.error("Error updating contribution:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteContribution = async (req, res) => {
    try {
        const { id } = req.params;

        const contribution = await Contribution.findById(id);
        if (!contribution) {
            return res.status(404).json({ message: "Contribution not found" });
        }

        await Contribution.findByIdAndDelete(id);

        res.json({ message: "Contribution deleted successfully" });
    } catch (error) {
        console.error("Error deleting contribution:", error);
        res.status(500).json({ message: "Server error" });
    }
};
