const { SlashCommandBuilder } = require("@discordjs/builders")
const { roleId, categoryId } = require("../config.json")

module.exports = {
	data: new SlashCommandBuilder().setName("create").setDescription("Creates channels for every trial!"),
	async execute(interaction) {
		await interaction.guild.members.fetch()
		await interaction.guild.roles.fetch()
		await interaction.guild.channels.fetch()

		let role = interaction.guild.roles.cache.get(roleId)

		let category = interaction.guild.channels.cache.get(categoryId)

		let reviewChannelNames = category.children.map((channel) => channel.name)

		let createdChannelAmount = 0

		let embedFields = []

		await Promise.all(
			role.members.map(async (member) => {
				let userName = member.user.username.toLowerCase()

				if (!reviewChannelNames.includes(userName)) {
					createdChannelAmount++
					let newChannel = await category.createChannel(userName)
					embedFields.push({
						name: `${member.nickname && `${member.nickname} | `}${member.user.tag}`,
						value: `<#${newChannel.id}>`,
					})
				}
			})
		)

		const outputEmbed = {
			color: "#4BB543",
			title: `Created ${createdChannelAmount} channels!`,
			fields: embedFields,
		}

		return interaction.reply({ embeds: [outputEmbed] })
	},
}
