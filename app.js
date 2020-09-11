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
    const command = commands[message.content]
    if(command !== null && command !== undefined)
    {
        console.log(message.author.username + " : " + message.content)
        console.log(command)
        command.execute(message)
    }
})
bot.login(process.env.TOKEN)