const { categoryId, roleId, botChannelId } = require("../config.json")

module.exports = {
	name: "guildMemberUpdate",
	async execute(oldMember, newMember) {
		await newMember.guild.channels.fetch()
		await newMember.guild.roles.fetch()

		let category = newMember.guild.channels.cache.get(categoryId)

		let role = newMember.guild.roles.cache.get(roleId)

		let botChannel = newMember.guild.channels.cache.get(botChannelId)

		let userName = newMember.user.username.toLowerCase()

		if (newMember._roles.includes(roleId)) {
			let newChannel = await category.createChannel(userName, { topic: newMember.user.id })

			let outputEmbed = {
				color: role.hexColor,
				title: `New ${role.name} member detected: ${
					newMember.nickname ? `${newMember.nickname}` : `${newMember.user.username}`
				}`,
				description: `Created a review channel: <#${newChannel.id}>`,
				thumbnail: {
					url: newMember.user.displayAvatarURL(),
				},
			}

			await botChannel.send({ embeds: [outputEmbed] })
		} else {
			await Promise.all(
				category.children.map(async (channel) => {
					if (channel.name.includes(userName)) {
						await channel.delete()
					}
				})
			)

			let outputEmbed = {
				color: role.hexColor,
				title: `${newMember.nickname ? `${newMember.nickname}` : `${newMember.user.username}`} is no longer ${
					role.name
				}!`,
				description: `Deleting assoiciated review channel.`,
				thumbnail: {
					url: newMember.user.displayAvatarURL(),
				},
			}

			await botChannel.send({ embeds: [outputEmbed] })
		}
	},
}
