const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require("fs")
const path = require("path")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("role")
		.setDescription("Set the trial role to be tracked by the bot.")
		.addRoleOption((option) =>
			option.setName("role").setDescription("Select a role to be tracked by the bot.").setRequired(true)
		),
	async execute(interaction) {
		let configPath = path.resolve(__dirname, "../config.json")
		let rawdata = fs.readFileSync(configPath)
		let config = JSON.parse(rawdata)

		const role = interaction.options.getRole("role")

		config.roleId = role.id

		let data = JSON.stringify(config, null, 4)
		fs.writeFileSync(configPath, data)

		const outputEmbed = {
			color: role.color,
			title: `Set trial role to ${role.name}`,
		}

		return interaction.reply({ embeds: [outputEmbed] })
	},
}
