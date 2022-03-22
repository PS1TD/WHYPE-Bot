const { SlashCommandBuilder } = require("@discordjs/builders")

const fs = require("fs")
const path = require("path")

module.exports = {
	data: new SlashCommandBuilder().setName("create").setDescription("Creates channels for every trial!"),
	async execute(interaction) {
		let rawdata = fs.readFileSync(path.resolve(__dirname, "../config.json"))
		let config = JSON.parse(rawdata)

		await interaction.guild.members.fetch()
		await interaction.guild.roles.fetch()
		await interaction.guild.channels.fetch()

		let role = interaction.guild.roles.cache.get(config.roleId)

		let category = interaction.guild.channels.cache.get(config.categoryId)

		let reviewChannelNames = category.children.map((channel) => channel.name)

		let createdChannelAmount = 0

		let embedFields = []

		await Promise.all(
			role.members.map(async (member) => {
				let userName = member.user.username.toLowerCase()

				if (!reviewChannelNames.includes(userName)) {
					createdChannelAmount++
					let newChannel = await category.createChannel(userName, { topic: member.user.id })

					let infoEmbed = {
						color: "#0E86D4",
						title: `${member.nickname && `${member.nickname} | `}${member.user.tag} review channel.`,
						description:
							"Just write your review below and it will get sent to staff. (Trials and other Raiders cannot see your message!)",
						thumbnail: {
							url: member.user.displayAvatarURL(),
						},
					}

					await newChannel.send({ embeds: [infoEmbed] })

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
