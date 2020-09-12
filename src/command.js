class Command {
    constructor(name, description, role, action) {
        this.name = name;
        this.action = action;
        this.description = description
        this.role = role
    }

    execute(message, args) {
        if(this.role !== null && message.channel.type === 'dm') return;
        if(this.role !== null && !message.member.roles.cache.some(role => role.name === this.role)) {
            message.reply("Sorry, you aren't authorized to use "+ this.name +", this command is only for " + this.role)
            return;
        }
        this.action(message, args);
    }

    help(message) {
        if(this.role !== null && message.channel.type === 'dm') return "";
        if(this.role !== null && !message.member.roles.cache.some(role => role.name === this.role)) { return ""}
        return (this.role != null ? "[\”" + this.role + "\"] " : "[everyone] ") + this.name + " : " + this.description + "\n"
    }
}

module.exports = Command;