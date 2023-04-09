const Config = require("../models/ApplicationConfig");

const DOC_ID = "6431b70d546809a792408963"

const getCommission = async () => {
  const commission = await Config.find();
  return commission;
};

const updateCommission = async (comm) => {
    const updatedCommission = await Config.findByIdAndUpdate(
        DOC_ID, 
        {commission: comm}, 
        {
            new: true,
            runValidators: true
        }
    );
    
    return updatedCommission;
};

module.exports = {
    getCommission,
    updateCommission
};