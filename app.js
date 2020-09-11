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

// bot.login('NzUzNzQwODkwNjQzNzU5MTA0.X1ql6A.tSKFDrmHCBWkt8xp2mEFE4KEah0') //bot prod
// bot.login('NzUzOTA3MDM4MDM1MjQ3MTk0.X1tApA.wimz_JROI7-1sUrzx_bzYzc5nP0') //bot dev
bot.login(process.env.TOKEN)