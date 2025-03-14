const { Message } = require("azure-iot-device");

module.exports = function GenerateData(){

    let payload = {}

    payload.id = Date.now();

    payload.timestamp = new Date().toISOString();

    payload.temperature = (Math.random() * (35 - 15) + 15).toFixed(2);

    payload.humidity = (Math.random() * (80 - 40) + 40).toFixed(2);

    payload.pressure = (Math.random() * (1025 - 980) + 980).toFixed(2);

    payload.co2Gas = (Math.random() * (500 - 300) + 300).toFixed(2);

    const msg = new Message(JSON.stringify(payload))

    console.log(msg);

    return msg;
}

