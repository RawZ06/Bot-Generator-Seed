const Command = require('./command')
const exec = require('child_process').exec;

function generateStandard(message, args)
{
    console.log("Generating" + (args.length > 0 ? " with settings string " + args[0] : ""))
    message.channel.send("Generating" + (args.length > 0 ? " with settings string " + args[0] : ""));
    exec("cp "+ __basedir +"/settings/settings.sav.std" + " " + __basedir +"/ootrando/OoT-Randomizer/settings.sav", function(_err, _stdout, _stderr) {
        console.log("standard settings received");
        message.channel.send("standard settings received");
        exec("python3 "+ __basedir +"/ootrando/OoT-Randomizer/OoTRandomizer.py" + (args.length > 0 ? " --settings_string " + args[0] : ""), function(err, _stdout, _stderr) {
            if (err) 
            {
                console.log(message.content + ":" + err)
                message.reply('Sorry, I can\'t generate seed' + (args.length > 0 ? ", please check your settings string (" + args[0] + ")" : "."))
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
                    console.log(message.content + ":" + err)
                    message.reply('Sorry, I can\'t generate seed')
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
    "!generate": new Command("!generate", "Generate a seed with settings put in argument OoTRandomizer with Roman's fork.", null, (message, args) => {
        if(args.length == 0) {
            message.reply("Expected argument : settings_string")
            return;
        }
        generateStandard(message, args)
    }),
    "!genstandard": new Command("!genstandard", "Generate a standard seed OoTRandomizer with Roman's fork.", null, (message) => {
        generateStandard(message)
    }),
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