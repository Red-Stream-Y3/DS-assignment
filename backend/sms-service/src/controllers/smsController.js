import Sms from '../models/smsModel.js';
import axios from 'axios';

// dotenv.config({ path: findConfig('.env.sms') });
// @desc Send a SMS
// @route POST /api/sms
// @access Public
const sendSms = async (req, res) => {
  try {
    const { to, message } = req.body;

    const { data } = await axios.post(
      `https://app.notify.lk/api/v1/send?user_id=${process.env.user_id}&api_key=${process.env.SMS_API_KEY}&sender_id=${process.env.sender_id}&to=${to}&message=${message}`
    );

    // const sms = new Sms({
    //   to,
    //   message,
    // });

    // await sms.save();

    // Return a success response to the client
    res.status(200).json({ message: data.message });
  } catch (error) {
    // Return an error response to the client
    res.status(500).json({ message: error.message });
  }
};

export { sendSms };
