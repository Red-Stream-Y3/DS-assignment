const router = require('express').Router();
const dbService = require('../controllers/ConfigServices');

router.get('/commission', async (req, res) => {
    const config = await dbService.getCommission();

    if(!config) {
        res.status(400).json({msg: 'No commission found'});
    } else {
        res.status(200).json(config);
    }
});

router.post('/commission', async (req, res) => {
    const config = await dbService.updateCommission(req.body.commission);

    if(!config) {
        res.status(400).json({msg: 'Update failed!'});
    } else {
        res.status(200).json(config);
    }
});

module.exports = router;