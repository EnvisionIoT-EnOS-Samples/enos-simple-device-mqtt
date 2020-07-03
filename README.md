# enos-simple-device-mqtt
This is the sample codes to simulate a device that post measurement points using MQTT and enos-mqtt-sdk-nodejs, post device events and listen for service invocation.
To use with enos-simple-device-invoke-service.

## Techology stack
- NodeJS
- EnOS Platform
- https://github.com/EnvisionIot/enos-device-sdk-nodejs/tree/master/packages/enos-mqtt-sdk

## Prerequitsites

### Get the device broker url and port, save to .env file
Follow the instructions below to get the device broker url and port:
- https://www.envisioniot.com/docs/enos/en/latest/getting_started_with_enos/planning.html?highlight=environment%20information#getting-environment-information

### Create a model, service and event
Follow the instructions below to create a product and subdevice.
- https://www.envisioniot.com/docs/device-connection/en/latest/howto/model/creating_model#adding-service
- https://www.envisioniot.com/docs/device-connection/en/latest/howto/model/creating_model#adding-event

### Create a product and subdevice, save the product key and secret, subdevice key and secret to .env file
Follow the instructions below to create a product and subdevice.
- https://www.envisioniot.com/docs/device-connection/en/latest/howto/device/manage/creating_product.html
- https://www.envisioniot.com/docs/device-connection/en/latest/howto/device/manage/creating_device.html

## How to run
To run the demo, run the following command in a new terminal.
```bash
node index.js
```

