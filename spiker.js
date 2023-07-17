/**

 spiker.js - Copyright 2023 Harshad Joshi and Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/


module.exports = function(RED) {
    function HampelIdentifierNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.windowSize = config.windowSize || 5; 
        node.scalingFactor = config.scalingFactor || 3;
        node.machineName = config.machineName || "Machine";
        node.parameter = config.parameter;
        node.values = [];
        var count = 0; //spikes

        node.on('input', function(msg) {
            var current = Number(msg.payload);
            var machine = node.machineName;
            var parameter = node.parameter;

            //reset if required
            if(msg.topic === 'reset' && msg.payload === true){
                count = 0;
                node.values = [];
                node.status({fill:"blue", shape:"ring", text:"Count Reset Done"});
                return;
            }

            // Add the current value to the window
            node.values.push(current);
            if (node.values.length > node.windowSize) {
                node.values.shift(); // Remove the oldest value if the window is full
            }

            // Calculate the median of the window values
            var median = node.values.slice().sort()[Math.floor(node.windowSize / 2)];

            // Calculate the Median Absolute Deviation (MAD)
            var mad = node.values.map(x => Math.abs(x - median)).sort()[Math.floor(node.windowSize / 2)];

            // Flag the value as an anomaly if it is more than the scaled MAD away from the median
            if (Math.abs(current - median) > node.scalingFactor * mad) {
                count = count + 1; //increment the spike count
                var pulse = 1; // make it 1
                msg.payload = {
                    value: current,
                    status: "Anomaly",
                    spikes: count,
                    machine: machine,
                    parameter: parameter,
                    pulse: pulse
                };
                node.status({fill:"red", shape:"ring", text:"Anomaly"});
            } else {
                var pulse = 0; // make it 0
                msg.payload = {
                    value: current,
                    status: "Normal",
                    spikes: count,
                    machine: machine,
                    parameter: parameter,
                    pulse: pulse
                };
                node.status({fill:"green", shape:"dot", text:"Normal"});
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("spiker", HampelIdentifierNode);
}

