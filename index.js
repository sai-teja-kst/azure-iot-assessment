const cron = require("node-cron");
const GenerateData = require("./modules/generator");
const PublishData = require("./modules/publisher");

try {
    cron.schedule("0 * * * * *", () => {
        let msg = GenerateData();
        if (msg) {
            PublishData(msg);
        }
    });
} catch (err) {
    console.error("Error:", err);
}
