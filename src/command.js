class Command {
    constructor(name, description, role, action) {
        this.name = name;
        this.action = action;
        this.description = description
        this.role = role
        console.log(this)
    }

    execute(message) {
        if(this.role !== null && !message.member.roles.cache.some(role => role.name === this.role)) {
            message.reply("Sorry, you aren't authorized to use "+ this.name +", this command is only for " + this.role)
            return;
        }
        this.action(message);
    }

    help() {
        return (this.role != null ? "[\”" + this.role + "\"] " : "[everyone] ") + this.name + " : " + this.description + "\n"
    }
}

module.exports = Command;