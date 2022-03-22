const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require("fs")
const path = require("path")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("out")
		.setDescription("Set the channel where reviews will be saved. (Needs to be in review category)")
		.addChannelOption((option) =>
			option.setName("channel").setDescription("Channel where reviews will be saved.").setRequired(true)
		),
	async execute(interaction) {
		let configPath = path.resolve(__dirname, "../config.json")
		let rawdata = fs.readFileSync(configPath)
		let config = JSON.parse(rawdata)

		const channel = interaction.options.getChannel("channel")

		config.messageBoxId = channel.id

		let data = JSON.stringify(config, null, 4)
		fs.writeFileSync(configPath, data)

		const outputEmbed = {
			color: "#4BB543",
			title: `Set review box channel to ${channel.name}`,
		}

		return interaction.reply({ embeds: [outputEmbed] })
	},
}
