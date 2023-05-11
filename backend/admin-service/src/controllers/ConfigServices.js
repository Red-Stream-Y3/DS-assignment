const Config = require("../models/ApplicationConfig");

const DOC_ID = "6431b70d546809a792408963"

const getCommission = async (req, res) => {
  const commission = await Config.findById(DOC_ID);

  if(!commission) {
    res.status(400).json({msg: 'No commission found'});
} else {
    res.status(200).json(commission);
}
};

const updateCommission = async (req, res) => {
    const {commission} = req.body;

    const config = await Config.findById(DOC_ID);

    if(!config) {
        res.status(400).json({msg: 'No commission found'});
    } else {
        config.commission = commission;
        config.save();
        res.status(200).json(config);
    }
};

module.exports = {
    getCommission,
    updateCommission
};