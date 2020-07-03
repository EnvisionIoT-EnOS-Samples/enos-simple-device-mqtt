const dotenv = require("dotenv");
const { DeviceClient, SECURE_MODE } = require("enos-mqtt-sdk-nodejs");

dotenv.config();

// create client instance
const clientOptions = {
  brokerUrl: process.env.DEVICE_BROKER_URL,
  secureMode: SECURE_MODE.VIA_DEVICE_SECRET,
  productKey: process.env.PRODUCT_KEY,
  deviceKey: process.env.DEVICE_KEY,
  deviceSecret: process.env.DEVICE_SECRET,
  mqttOptions: {
    connectionTimeout: 30,
    reconnectPeroid: 0, // The reconnection is disabled.
    keepAlive: 0 // The keepAlive disalbed.
  }
}

initConnection = async () => {
  try {
    const client = new DeviceClient(clientOptions);

    // listen to "connect" event
    client.on("connect", () => {
      console.log("connected");
    });

    // listen to "close" event
    client.on("close", () => {
      console.log("connection closed");
    });

    await client.connect();

    // listener for invocation of service
    client.deviceCommand.onInvokeService("toggleDeviceStatus", async (request, response) => {
      console.log("invoke service request: ", request);
      response.send(200, {
        deviceStatus: + !request.params.deviceStatus
      });
    });

    let count = 0;
    const STOP = 200;
    const RANGE_END = 101;

    // loop for 200 times on 1 sec interval
    let interval = setInterval(async () => {
      if (count > STOP) {
        clearInterval(interval);
        await client.close();
      } else {
                
        let temp = Math.floor(Math.random() * RANGE_END);
        let activePower = Math.floor(Math.random() * RANGE_END);

        // post an event when temp exceed 50
        if (temp > 50) {
          console.log("posting tempExceed50 event", temp);
          await client.deviceData.postEvent({
            eventName: 'tempExceed50',
            eventParams: {
              temp: temp
            }
          });
        }

        // post device data to EnOS
        await client.deviceData
          .postMeasurepoint({
            point: {
              measurepoints: {
                temp: temp,
                isOnline: 1,
                activePower: activePower,
                errorMessage: "none"
              }
            }
          });
      }
      count++;
    }, 3000);
  } catch (err) {
    console.error(err, err.stack);
  }
}

initConnection();