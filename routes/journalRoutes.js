const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', journalController.create);
router.get('/', journalController.getByUser);
router.put('/:id', journalController.update);
router.delete('/:id', journalController.delete);
router.get('/summary', journalController.getSummary);

module.exports = router;
