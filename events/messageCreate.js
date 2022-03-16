const { messageBoxId, categoryId } = require("../config.json")

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms))
}

module.exports = {
	name: "messageCreate",
	async execute(message) {
		await message.guild.channels.fetch()
		await message.guild.members.fetch()

		let category = message.guild.channels.cache.get(categoryId)

		let trialId = message.channel.topic

		let trial = message.guild.members.cache.get(trialId)

		let messageBox = category.children.get(messageBoxId)

		if (
			message.channel.parentId === categoryId &&
			message.channel.id !== messageBoxId &&
			message.author.id !== message.client.user.id
		) {
			let outputEmbed = {
				color: "#4BB543",
				title: `New trial review for ${trial.nickname ? trial.nickname : trial.user.username}`,
				author: {
					name: message.author.username,
					icon_url: message.author.displayAvatarURL(),
				},
				description: message.content,
				thumbnail: {
					url: trial.user.displayAvatarURL(),
				},
				timestamp: new Date(),
			}

			await messageBox.send({ embeds: [outputEmbed] })

			let reply = await message.reply({ content: "Thank you for submitting your review!" })

			await message.delete()

			await sleep(3000)

			await reply.delete()
		}
	},
}
