const { SlashCommandBuilder } = require("@discordjs/builders")
const { roleId } = require("../config.json")

module.exports = {
	data: new SlashCommandBuilder().setName("test").setDescription("Test command description"),
	async execute(interaction) {
		await interaction.guild.members.fetch()
		await interaction.guild.roles.fetch()

		// let role = await interaction.guild.roles.fetch(roleId, { cache: true, force: true })

		// let role = interaction.guild.roles.cache.get(roleId) || (await interaction.guild.roles.fetch(roleId))

		// console.log(role)

		// console.log(interaction.member.guild.roles.cache.get(roleId).members)

		return interaction.reply("Interaction reply")
	},
}
