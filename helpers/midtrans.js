
const midtransClient = require("midtrans-client");
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-mS7eoBxN2tcrh9N2COy2r81F',
  clientKey: 'SB-Mid-client-K4TRww4niodlkJ2v',
});

module.exports = snap