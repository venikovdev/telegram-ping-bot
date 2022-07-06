const TeleBot = require('telebot');
const bot = new TeleBot('YOUR_TELEGRAM_BOT_TOKEN');
const net = require('net');

let oldStatus = 1;
let status = 0;

// Check server status and notify
function checkStatus() {
    const socket = new net.Socket();
    socket.setTimeout(2500);

    socket.on('connect', function() {
        socket.destroy();
        status = 1;
        if (status != oldStatus) {
            bot.sendMessage('YOUR_TELEGRAM_ID', `Server is UP`);
            oldStatus = 1;
        }
    }).on('error', function() {
        status = 0;
        if (status != oldStatus) {
            bot.sendMessage('YOUR_TELEGRAM_ID', `Server is DOWN`);
            oldStatus = 0;
        }
    }).on('timeout', function() {
        status = 0;
        if (status != oldStatus) {
            bot.sendMessage('YOUR_TELEGRAM_ID', `Server is DOWN`);
            oldStatus = 0;
        }
    }).connect(900, 'localhost');
}

setInterval(checkStatus, 1000);

bot.start();