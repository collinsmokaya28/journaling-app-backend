const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes');

app.use('/api/users', userRoutes);
app.use('/api/journals', journalRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
