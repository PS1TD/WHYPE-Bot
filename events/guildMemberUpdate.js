const fs = require("fs")
const path = require("path")

module.exports = {
	name: "guildMemberUpdate",
	async execute(oldMember, newMember) {
		let configPath = path.resolve(__dirname, "../config.json")
		let rawdata = fs.readFileSync(configPath)
		let config = JSON.parse(rawdata)

		await newMember.guild.channels.fetch()
		await newMember.guild.roles.fetch()

		let category = newMember.guild.channels.cache.get(config.categoryId)

		let role = newMember.guild.roles.cache.get(config.roleId)

		let botChannel = newMember.guild.channels.cache.get(config.botChannelId)

		let userName = newMember.user.username.toLowerCase()

		if (newMember._roles.includes(config.roleId)) {
			let newChannel = await category.createChannel(userName, { topic: newMember.user.id })

			let infoEmbed = {
				color: "#0E86D4",
				title: `${newMember.nickname && `${newMember.nickname} | `}${newMember.user.tag} review channel.`,
				description:
					"Just write your review below and it will get sent to staff. (Trials and other Raiders cannot see your message!)",
				thumbnail: {
					url: newMember.user.displayAvatarURL(),
				},
			}

			await newChannel.send({ embeds: [infoEmbed] })

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
