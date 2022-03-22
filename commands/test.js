const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require("fs")
const path = require("path")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Test command description")
		.addChannelOption((option) =>
			option.setName("channel").setDescription("Select a channel with #").setRequired(true)
		),
	async execute(interaction) {
		let configPath = path.resolve(__dirname, "../config.json")
		let rawdata = fs.readFileSync(configPath)
		let config = JSON.parse(rawdata)

		config.test = "HELLOTHERE?"

		let data = JSON.stringify(config, null, 4)
		fs.writeFileSync(configPath, data)

		const channel = interaction.options.getChannel("channel")

		console.log(channel.id)
		return interaction.reply("Interaction reply")
	},
}
