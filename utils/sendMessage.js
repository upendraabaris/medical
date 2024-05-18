const axios = require('axios');

// Replace these variables with your Gupshup API credentials and message details
const userId = '2000202345';
const password = 'W69@3DyJ';
const phone = '8440821748';
const message = 'Your SMS message content';

// Construct the request body
const data = new FormData();
data.append('userid', userId);
data.append('password', password);
data.append('send_to', phone);
data.append('msg', message);
data.append('msg_type', 'TEXT');

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'apikey': 'https://api.gupshup.io/sm/api/v1/msg' // Replace 'your_api_key' with your Gupshup API key
};

// Send the SMS using Axios
axios.post('https://api.gupshup.io/sm/api/v1/msg', data)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });


// var request = require("request");

// var options = {
//     method: 'POST',
//     url: 'https://enterprise.smsgupshup.com/GatewayAPI/rest',
//     form: {
//         method: 'sendMessage',
//         send_to: '8440821748', // Replace with the recipient's phone number
//         msg: 'This is a sample test message from GupShup', // Replace with your message
//         msg_type: 'TEXT',
//         userid: '2000202345', // Replace with your GupShup user ID
//         auth_scheme: 'PLAIN',
//         password: 'W69@3DyJ', // Replace with your GupShup password
//         format: 'JSON'
//     },
//     agentOptions: {
//       secureProtocol: 'TLSv1_method' // Specify the SSL/TLS version here
//   }
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);
//     console.log(body);
// });
