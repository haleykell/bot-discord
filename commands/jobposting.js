const {job_channel, job_board} = require("./../config.json");
const Discord = require("discord.js");

module.exports = {
    name: "job",
    description: "Job posting",
    args: true,
    execute(message, args) {
        if (message.channel.name != job_channel) return;
        message.delete();
        let company, title, level, description;

        let url = args[0].split(/ +/)[1];

        company = args[1];
        title = args[2];
        level = args[3];
        description = args[4];

        const job = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('New Job Posting at' + company)
            .setURL(url)
            .setAuthor('Posted by ' + message.author.tag)
            .addFields(
                {name: 'Job Title', value: title, inline: true},
                {name: 'Experience Level', value: level, inline: true}
            )
            .addField('Description', description)
            .setTimestamp();

        let client = message.client;
        client.channels.fetch(job_board)
            .then(channel => channel.send(job))
            .catch(console.error);
    },
};