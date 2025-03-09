const { Client } = require("azure-iot-device");
const mqtt = require("azure-iot-device-mqtt").Mqtt;
const { Message } = require("azure-iot-device");

var dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.IOT_HUB_DEVICE_CONNECTION_STRING;
const client = Client.fromConnectionString(connectionString, mqtt);

const onConnect = async () => {
  try{
    await client.open();
    console.log("IoT HUB Connection Established");
  }catch(err){
    console.log("Error While Connecting to IoT Hub..", err);
  }
}

onConnect();

module.exports = async function PublishData(msg) {
  try {
    const message = new Message(msg.getData());
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

const shutdown = async () => {
  try {
    await client.close();
    console.log("IoT Hub Connection Closed");
  } catch (err) {
    console.error("Error While Closing Connection..", err);
  }
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  shutdown();
});