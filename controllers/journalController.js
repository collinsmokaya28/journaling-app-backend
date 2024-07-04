const Journal = require('../models/Journal');

exports.create = async (req, res) => {
    const { title, content, category } = req.body;
    const userId = req.user.id;
    try {
        const journal = await Journal.create(userId, title, content, category);
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ error: 'Error creating journal entry' });
    }
};

exports.getByUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const journals = await Journal.findByUserId(userId);
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching journal entries' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    try {
        const journal = await Journal.update(id, title, content, category);
        res.status(200).json(journal);
    } catch (error) {
        res.status(500).json({ error: 'Error updating journal entry' });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await Journal.delete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting journal entry' });
    }
};
