require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./src/commands.js')
global.__basedir = __dirname;

bot.on('ready', function () {
    console.log("Connected")
})

bot.on('message', function(message) {
    if (message.author.bot || process.env.CHANNELS.split(",").indexOf(message.channel.name) < 0) return;
    const array_message = message.content.split(' ');
    const command = commands[array_message[0]]
    const args = array_message.slice(1)
    if(command !== null && command !== undefined)
    {
        console.log(message.author.username + " : " + message.content)
        // console.log(command)
        command.execute(message, args)
    }
})
bot.login(process.env.TOKEN)