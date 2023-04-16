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
    const updatedCommission = await Config.findByIdAndUpdate(
        DOC_ID, 
        commission, 
        {
            new: true,
            runValidators: true
        }
    );
    
    if(!updatedCommission) {
        res.status(400).json({msg: 'Update failed!'});
    } else {
        res.status(200).json(updatedCommission);
    }
};

module.exports = {
    getCommission,
    updateCommission
};