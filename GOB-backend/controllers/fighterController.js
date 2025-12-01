const FreedomFighter = require("../models/FreedomFighter");
require("../models/Activity");
require("../models/Contribution");

exports.getAllFighters = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc', role, location } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // Role filter
    if (role && role !== 'all') {
      query.role = { $regex: role, $options: "i" };
    }

    // Location filter
    if (location && location !== 'all') {
      query.location = { $regex: location, $options: "i" };
    }

    // Build sort object
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const [fighters, total] = await Promise.all([
      FreedomFighter.find(query)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort(sortOptions),
      FreedomFighter.countDocuments(query),
    ]);

    res.json({
      fighters: fighters.map(f => ({
        id: f._id,
        ...f.toObject()
      })),
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching fighters:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFighterById = async (req, res) => {
  try {
    const { id } = req.params;
    const fighter = await FreedomFighter.findById(id)
      .populate("activities")
      .populate("contributions");

    if (!fighter) {
      return res.status(404).json({ message: "Freedom fighter not found" });
    }

    res.json({
      id: fighter._id,
      ...fighter.toObject()
    });
  } catch (error) {
    console.error("Error fetching fighter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createFighter = async (req, res) => {
  try {
    const { name, role, description, born, died, location, imageUrl } = req.body;
    const fighter = await FreedomFighter.create({
      name, role, description, born, died, location, imageUrl
    });
    res.status(201).json(fighter);
  } catch (error) {
    console.error("Error creating fighter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateFighter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, description, born, died, location, imageUrl } = req.body;

    const fighter = await FreedomFighter.findById(id);
    if (!fighter) {
      return res.status(404).json({ message: "Fighter not found" });
    }

    // Update fields
    if (name) fighter.name = name;
    if (role) fighter.role = role;
    if (description) fighter.description = description;
    if (born !== undefined) fighter.born = born;
    if (died !== undefined) fighter.died = died;
    if (location) fighter.location = location;
    if (imageUrl) fighter.imageUrl = imageUrl;

    await fighter.save();

    res.json({ message: "Fighter updated successfully", fighter });
  } catch (error) {
    console.error("Error updating fighter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteFighter = async (req, res) => {
  try {
    const { id } = req.params;
    const fighter = await FreedomFighter.findById(id);

    if (!fighter) {
      return res.status(404).json({ message: "Fighter not found" });
    }

    // Delete associated activities
    const Activity = require("../models/Activity");
    await Activity.deleteMany({ freedomFighterId: id });

    // Delete associated contributions (optional, or just unlink them)
    const Contribution = require("../models/Contribution");
    await Contribution.updateMany({ freedomFighterId: id }, { freedomFighterId: null });

    await FreedomFighter.findByIdAndDelete(id);

    res.json({ message: "Fighter deleted successfully" });
  } catch (error) {
    console.error("Error deleting fighter:", error);
    res.status(500).json({ message: "Server error" });
  }
};
