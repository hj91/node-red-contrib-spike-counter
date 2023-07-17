# node-red-contrib-spike-counter

A Node-RED node to detect fluctuations/spike in a stream of numeric input data.

## Description

The `node-red-contrib-spike-counter` node is a node that operates on a stream of numeric data. It detects significant changes or spikes in the incoming data stream and keeps a count of these spikes. 

The node has several potential applications:

- **Monitoring system performance**: The node can be used to monitor the fluctuation in system performance metrics, such as CPU usage or memory consumption. Significant fluctuations could indicate problems in the system.

- **Analyzing financial data**: This node can be used to track the volatility of stock prices, foreign exchange rates, or any other type of financial data where significant fluctuations can have important implications.

- **Detecting sensor anomalies**: The node can be used in an IoT context to monitor sensor data. Significant fluctuations in sensor readings could indicate a fault with the sensor, or an interesting event worth investigating further.

## Features

- **Spike Count**: This node counts the number of significant spikes in the input data and provides this count as an output message payload.
  
- **Reset Functionality**: The node can be reset to clear the spike count and start over. This is done by sending an input message with the topic set to 'reset' and the payload set to `true`.

## Usage

Just install the package, and you can start using the "Spike Counter" node in your flows. Connect it to a stream of numeric input data, and it will output messages with the current spike count and the most recent input value. You can control the node's behavior using special input messages as described in the Features section above.

## Installation

The `node-red-contrib-spike-counter` node can be installed via npm:

```bash
npm install node-red-contrib-spike-counter
```

Please note that Node-RED must be installed before installing this package.

## License

This project is licensed under the terms of the GPL-3.0 license.

## Contact

For more information or to report issues, please visit the project's repository: https://github.com/hj91/node-red-contrib-spike-counter

