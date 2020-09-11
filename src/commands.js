const Command = require('./command')
const exec = require('child_process').exec;

function generateStandard(message)
{
    console.log("Generating")
    message.channel.send("Generating");
    exec("cp "+ __basedir +"/settings/settings.sav.std" + " " + __basedir +"/ootrando/OoT-Randomizer/settings.sav", function(_err, _stdout, _stderr) {
        console.log("standard settings received");
        message.channel.send("standard settings received");
        exec("python3 "+ __basedir +"/ootrando/OoT-Randomizer/OoTRandomizer.py", function(err, _stdout, _stderr) {
            if (err) 
            {
                console.log('Sorry, I can\'t generate seed, please contact RawZ : ' + err);
                message.reply('Sorry, I can\'t generate seed, please contact RawZ : ' + err)
            }
            else
            {
                console.log("Seed Generated");
                message.channel.send("Seed Generated");
                exec("ls "+ __basedir +"/files", function(_err, stdout, _stderr) {
                    const files = stdout.split('\n').filter(e => e.length > 0).map(e => "./files/" + e)
                    message.reply("Seed standard generated with spoiler log : ", {
                        files: files
                    });
                    exec("rm "+ __basedir +"/files/*", function() {
                        console.log("Generated seed " + files[0])
                    });
                })
            }
        });
    })
}

function generateRandom(message)
{
    console.log("Generating")
    message.channel.send("Generating");
    exec("python3 "+ __basedir +"/ootrando/OoT-Randomizer/MysterySettings.py", function(_err, _stdout, _stderr) {
        console.log("Random settings generated");
        message.channel.send("Random settings generated");
        exec("cp "+ __basedir +"/settings/settings.sav.ran" + " " + __basedir +"/ootrando/OoT-Randomizer/settings.sav", function(_err, _stdout, _stderr) {
            console.log("Random settings received");
            message.channel.send("Random settings received");
            exec("python3 "+ __basedir +"/ootrando/OoT-Randomizer/OoTRandomizer.py", function(err, _stdout, _stderr) {
                if (err) 
                {
                    message.reply('Sorry, I can\'t generate seed, please contact RawZ : ' + err)
                }
                else
                {
                    console.log("Seed Generated");
                    message.channel.send("Seed Generated");
                    exec("ls "+ __basedir +"/files", function(_err, stdout, _stderr) {
                        const files = stdout.split('\n').filter(e => e.length > 0).map(e => "./files/" + e)
                        message.reply("Seed random generated with spoiler log : ", {
                            files: files
                        });
                        exec("rm "+ __basedir +"/files/*", function() {
                            console.log("Generated seed " + files[0])
                        });
                    })
                }
            });
        })
    })
}

const commands = {
    "!help": new Command("!help", "Print this message", null, (message) => {
        let answer = "List of commands :\n";
        for(command of Object.values(commands)) {
            answer += command.help()
        }
        message.reply(answer)
    }),
    "!generate": new Command("!generate", "Generate a standard seed OoTRandomizer with Roman's fork.", null, generateStandard),
    "!genstandard": new Command("!genstandard", "Generate a standard seed OoTRandomizer with Roman's fork.", null, generateStandard),
    "!genrandom": new Command("!genrandom", "Generate a random settings seed OoTRandomizer with Roman's fork.", null, generateRandom),
    "!github": new Command("!github", "Get github link", null, (message) => {
        message.reply("Github : https://github.com/RawZ06/Bot-Generator-Seed")
    }),
    "!updateRoman": new Command("!updateRoman", "Update roman's fork", "Créateur", (message) => {
        exec("cd "+ __basedir +"/ootrando/OoT-Randomizer/; git pull", function(_err, stdout, _stderr) {
            message.reply(stdout)
            exec(process.env.UPDATE, function(_err, stdout, _stderr) {
                message.reply(stdout)
            })
        })
    }),
    "!update": new Command("!update", "Update me", "Créateur", (message) => {
        exec("cd "+ __basedir +"; git pull", function(_err, stdout, _stderr) {
            message.reply(stdout)
        })
    })
}

module.exports = commands;