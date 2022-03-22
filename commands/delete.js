const { SlashCommandBuilder } = require("@discordjs/builders")

const fs = require("fs")
const path = require("path")

module.exports = {
	data: new SlashCommandBuilder().setName("delete").setDescription("Deletes channels for all trials!"),
	async execute(interaction) {
		let rawdata = fs.readFileSync(path.resolve(__dirname, "../config.json"))
		let config = JSON.parse(rawdata)

		await interaction.guild.channels.fetch()

		let category = interaction.guild.channels.cache.get(config.categoryId)

		let deletedChannelAmount = 0

		await Promise.all(
			category.children.map(async (channel) => {
				if (channel.id !== config.messageBoxId) {
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
