const { SlashCommandBuilder } = require("@discordjs/builders")
const { categoryId, messageBoxId } = require("../config.json")

module.exports = {
	data: new SlashCommandBuilder().setName("delete").setDescription("Deletes channels for all trials!"),
	async execute(interaction) {
		await interaction.guild.channels.fetch()

		let category = interaction.guild.channels.cache.get(categoryId)

		let deletedChannelAmount = 0

		await Promise.all(
			category.children.map(async (channel) => {
				if (channel.id !== messageBoxId) {
					await channel.delete()
					deletedChannelAmount++
				}
			})
		)

		const outputEmbed = {
			color: "#4BB543",
			title: `Deleted ${deletedChannelAmount} channels!`,
		}

		return interaction.reply({ embeds: [outputEmbed] })
	},
}
