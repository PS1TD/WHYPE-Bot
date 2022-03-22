const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require("fs")
const path = require("path")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("bot")
		.setDescription("Set the channel for the bot to spam in.")
		.addChannelOption((option) =>
			option.setName("channel").setDescription("Channel for the bot to spam in.").setRequired(true)
		),
	async execute(interaction) {
		let configPath = path.resolve(__dirname, "../config.json")
		let rawdata = fs.readFileSync(configPath)
		let config = JSON.parse(rawdata)

		const channel = interaction.options.getChannel("channel")

		config.botChannelId = channel.id

		let data = JSON.stringify(config, null, 4)
		fs.writeFileSync(configPath, data)

		const outputEmbed = {
			color: "#4BB543",
			title: `Set bot spam channel to ${channel.name}`,
		}

		return interaction.reply({ embeds: [outputEmbed] })
	},
}
