const Command = require('./command')
const exec = require('child_process').exec;
const fs = require('fs');
const log = require('./log')

function generateStandard(message, args)
{
    log("Generating" + (args.length > 0 ? " with settings string " + args[0] : ""))
    message.channel.send("Generating" + (args.length > 0 ? " with settings string " + args[0] : ""));
    exec("cp "+ __basedir +"/settings/settings.sav.std" + " " + __basedir +"/ootrando/OoT-Randomizer/settings.sav", function(_err, _stdout, _stderr) {
        log("standard settings received");
        message.channel.send("standard settings received");
        exec("python3 "+ __basedir +"/ootrando/OoT-Randomizer/OoTRandomizer.py" + (args.length > 0 ? " --settings_string " + args[0] : ""), function(err, _stdout, _stderr) {
            if (err) 
            {
                log(message.content + ":" + err)
                message.reply('Sorry, I can\'t generate seed' + (args.length > 0 ? ", please check your settings string (" + args[0] + ")" : "."))
            }
            else
            {
                log("Seed Generated");
                message.channel.send("Seed Generated");
                exec("ls "+ __basedir +"/files", function(_err, stdout, _stderr) {
                    const files_name = stdout.split('\n').filter(e => e.length > 0);
                    const files = files_name.map(e => __basedir + "/files/" + e)
                    message.channel.send("Seed " + files_name[0].split('.')[0] + " generated");
                    log("Seed " + files_name[0].split('.')[0] + " generated");
                    message.reply("Seed standard generated with spoiler log : ", {
                        files: files
                    });
                    exec("rm "+ __basedir +"/files/*", function() {
                        log("removing seed " + files[0])
                    });
                })
            }
        });
    })
}

function generateRandom(message)
{
    log("Generating")
    message.channel.send("Generating");
    exec("cd "+ __basedir +"/ootrando/OoT-Randomizer/; python3 MysterySettings.py; cd ../..", function(_err, _stdout, _stderr) {
        log("Random settings generated");
        message.channel.send("Random settings generated");
        exec("cp "+ __basedir +"/settings/settings.sav.ran" + " " + __basedir +"/ootrando/OoT-Randomizer/settings.sav", function(_err, _stdout, _stderr) {
            log("Random settings received");
            message.channel.send("Random settings received");
            exec("python3 "+ __basedir +"/ootrando/OoT-Randomizer/OoTRandomizer.py", function(err, _stdout, _stderr) {
                if (err) 
                {
                    log(message.content + ":" + err)
                    message.reply('Sorry, I can\'t generate seed')
                }
                else
                {
                    log("Seed Generated");
                    message.channel.send("Seed Generated");
                    exec("ls "+ __basedir +"/files", function(_err, stdout, _stderr) {
                        const files_name = stdout.split('\n').filter(e => e.length > 0);
                        const files = files_name.map(e => __basedir + "/files/" + e)
                        message.channel.send("Seed " + files_name[0].split('.')[0] + " generated");
                        log("Seed " + files_name[0].split('.')[0] + " generated");
                        message.reply("Seed random generated with spoiler log : ", {
                            files: files
                        });
                        // for(let i=0; i<100; i++);
                        exec("rm "+ __basedir +"/files/*", function() {
                            message.channel.send("Seed removed on the server")
                            log("Removing seed " + files_name[0])
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
        log(answer);
        message.reply(answer)
    }),
    "!generate": new Command("!generate", "Generate a seed with settings put in argument OoTRandomizer with Roman's fork.", null, (message, args) => {
        if(args.length == 0) {
            message.reply("Expected argument : settings_string")
            log("Expected argument : settings_string")
            return;
        }
        generateStandard(message, args)
    }),
    "!genstandard": new Command("!genstandard", "Generate a standard seed OoTRandomizer with Roman's fork.", null, (message) => {
        generateStandard(message, [])
    }),
    "!genrandom": new Command("!genrandom", "Generate a random settings seed OoTRandomizer with Roman's fork.", null, generateRandom),
    "!github": new Command("!github", "Get github link", null, (message) => {
        log("Github : https://github.com/RawZ06/Bot-Generator-Seed")
        message.reply("Github : https://github.com/RawZ06/Bot-Generator-Seed")
    }),
    "!updateRoman": new Command("!updateRoman", "Update roman's fork", "Créateur", (message) => {
        exec("cd "+ __basedir +"/ootrando/OoT-Randomizer/; git pull", function(_err, stdout, _stderr) {
            log(stdout)
            message.reply(stdout)
            exec(process.env.UPDATE, function(_err, stdout, _stderr) {
                log(stdout)
                message.reply(stdout)
            })
        })
    }),
    "!update": new Command("!update", "Update me", "Créateur", (message) => {
        exec("cd "+ __basedir +"; git pull", function(_err, stdout, _stderr) {
            log(stdout)
            message.reply(stdout)
        })
    }),
    "!version": new Command("!version", "Print version of Roman's fork", null, (message) => {
        const version = fs.readFileSync(__basedir +"/ootrando/OoT-Randomizer/version.py", "utf8");
        log("Version " + version.split("'")[1])
        message.channel.send("Version " + version.split("'")[1])
    }),
    "!clear": new Command("!clear", "Clear channel", "Créateur", (message) => {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.messages.fetch().then(messages => { // Fetches the messages
                message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
            )});              
        }
        log("clean")
    })
}

module.exports = commands;