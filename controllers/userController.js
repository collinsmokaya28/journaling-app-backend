const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create(username, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error registering new user' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
};
