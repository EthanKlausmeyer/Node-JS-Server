const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const dateTime = format(new Date(), "MM-dd-yyyy\thh:mm:ss");
const uuid = uuidv4();

console.log(dateTime, uuid);

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "MM-dd-yyyy\thh:mm:ss")}`
    const logItem = `${dateTime} \t ${uuid} \t ${message} \n`;
    try {
        if (!fs.existsSync(path.join(__dirname, "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        }
        await fsPromises.appendFile(
            path.join(__dirname, "logs", "..", logName),
            logItem
        );
    } catch (error) {
        console.log(error);
    }
}
module.exports = logEvents;