require('dotenv').config();
const axios = require('axios').default;

async function getCryptoPrice() {
    try {
      const response = await axios.get(`${process.env.CryptoExchangeURL}/v1/exchangerate/BTC/INR`,{
          headers:{
              'X-CoinAPI-Key':`${process.env.CryptoAPIKEY}`
          }
      });
      console.log(response.data);
      //Now pushing price to discord server
      const res = await axios.post(process.env.CryptoInformerBotWebhookURL, {
        content: `
        New Bitcoin price update:
        Time: ${response.data.time}
        Rate BTC/INR: ${response.data.rate}
        `
      });
    } catch (error) {
      console.error(error);
    }
  }
  getCryptoPrice()