const { Client } = require("azure-iot-device");
const mqtt = require("azure-iot-device-mqtt").Mqtt;
const { Message } = require("azure-iot-device");

var dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.IOT_HUB_CONNECTION_STRING;

module.exports = async function PublishData(msg) {
  const client = Client.fromConnectionString(connectionString, mqtt);

  try {
    await client.open();
    console.log("Connection Established");

    const message = new Message(JSON.stringify(msg.getData()));
    console.log(`Message :`, message.data);

    await client.sendEvent(message, (err) => {
      if (err) {
        console.log(`Error: `, err);
      } else {
        console.log("Message Published");
      }
    });
  } catch (err) {
    console.log(`Error :`, err);
  }
};
