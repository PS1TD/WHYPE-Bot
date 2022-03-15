const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("delete").setDescription("Deletes channels for all trial!"),
	execute(interaction) {
		let category = interaction.member.guild.channels.cache.get("953453092500819969")

		category.children.forEach(async (channel) => {
			if (channel.id !== "953454471894155294") await channel.delete()
		})

		return interaction.reply("Deleted")
	},
}
