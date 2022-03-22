const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require("fs")
const path = require("path")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("category")
		.setDescription("Set the category for the bot to monitor and create channels in.")
		.addChannelOption((option) =>
			option
				.setName("category")
				.setDescription("Category for the bot to monitor and create channels in.")
				.setRequired(true)
		),
	async execute(interaction) {
		let configPath = path.resolve(__dirname, "../config.json")
		let rawdata = fs.readFileSync(configPath)
		let config = JSON.parse(rawdata)

		const category = interaction.options.getChannel("category")

		config.categoryId = category.id

		let data = JSON.stringify(config, null, 4)
		fs.writeFileSync(configPath, data)

		const outputEmbed = {
			color: "#4BB543",
			title: `Set category to ${category.name}`,
		}

		return interaction.reply({ embeds: [outputEmbed] })
	},
}
