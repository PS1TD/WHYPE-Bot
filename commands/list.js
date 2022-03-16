const { SlashCommandBuilder } = require("@discordjs/builders")
const { roleId } = require("../config.json")

module.exports = {
	data: new SlashCommandBuilder().setName("list").setDescription("Lists members with trial role!"),
	async execute(interaction) {
		await interaction.guild.members.fetch()
		await interaction.guild.roles.fetch()

		let role = interaction.guild.roles.cache.get(roleId)

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

		console.log(role.members)

		return interaction.reply({ embeds: outputEmbeds })
	},
}
