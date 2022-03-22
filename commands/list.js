const { SlashCommandBuilder } = require("@discordjs/builders")

const fs = require("fs")
const path = require("path")

module.exports = {
	data: new SlashCommandBuilder().setName("list").setDescription("Lists members with trial role!"),
	async execute(interaction) {
		let rawdata = fs.readFileSync(path.resolve(__dirname, "../config.json"))
		let config = JSON.parse(rawdata)

		await interaction.guild.members.fetch()
		await interaction.guild.roles.fetch()

		let role = interaction.guild.roles.cache.get(config.roleId)

		let outputEmbeds = []

		role.members.map((member) => {
			outputEmbeds.push({
				color: role.hexColor,
				title: `${member.nickname ? `${member.nickname}` : `${member.user.username}`}`,
				description: `${member.user.tag}`,
				thumbnail: {
					url: member.user.displayAvatarURL(),
				},
			})
		})
		return interaction.reply({ embeds: outputEmbeds })
	},
}
