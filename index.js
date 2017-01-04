var mqtt = require('mqtt');
var fs = require('fs');
var BROKER = 'mqtt://localhost:1883';
// var client = mqtt.connect('mqtt://localhost:1883');//'mqtt://192.168.37.128:1883' 'mqtt://test.mosquitto.org'

// client.on('connect', () => {
//   client.subscribe('newPresence');
// });

// client.on('message', (topic, message) => {
//   // console.log('message', topic.toString());
//   if (message == 'byebye') {
//     client.end();
//     return;
//   }
//   // console.log(message.toString());
//   // var stream = fs.createWriteStream('test.txt');
//   // client.stream.pipe(stream);
//   console.log(message);
//   // console.log(message.toString());
//   // fs.writeFile('test.jpg', message);

//   // client.end();
//   // client.publish('newPresence', 'My name is fakeName', () => {
//   //   if (add() == true) client.end();
//   // });
// });

var channelName = {
    temperature: 'temperature',
    rect: 'rect',
    switchImage: 'switchImage',
    phoneImage: 'phoneImage'
};

var switchClient = mqtt.connect(BROKER);
switchClient.on('connect', () => {
  switchClient.subscribe(channelName.switchImage);
});
switchClient.on('message', (topic, message) => {
  fs.writeFile('switch.jpg', message);
});


var phoneClient = mqtt.connect(BROKER);
phoneClient.on('connect', () => {
  phoneClient.subscribe(channelName.phoneImage);
});
phoneClient.on('message', (topic, message) => {
  fs.writeFile('phone.jpg', message);
});

var rectClient = mqtt.connect(BROKER);
rectClient.on('connect', () => {
  rectClient.subscribe(channelName.rect);
});
rectClient.on('message', (topic, message) => {
  console.log('rect:', message.toString());
  fs.appendFile('rect.txt', message.toString() + ' ', (err) => {
    console.error(err);
  });
});

var temperatureClient = mqtt.connect(BROKER);
temperatureClient.on('connect', () => {
  temperatureClient.subscribe(channelName.temperature);
});
temperatureClient.on('message', (topic, message) => {
  console.log('temperature:', message.toString());
  fs.appendFile('temperature.txt', message.toString() + ' ', (err) => {
    console.error(err);
  });
});
