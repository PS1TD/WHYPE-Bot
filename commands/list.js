const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("list").setDescription("Lists users with trial role!"),
	async execute(interaction) {
		// console.log(interaction.member.guild.roles.cache)

		let memberIds = interaction.member.guild.roles.cache
			.get("670868788337573908")
			.members.map((member) => member.user.id)

		return interaction.reply(memberIds.toString())
	},
}
