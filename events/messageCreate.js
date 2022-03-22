const fs = require("fs")
const path = require("path")

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms))
}

module.exports = {
	name: "messageCreate",
	async execute(message) {
		let configPath = path.resolve(__dirname, "../config.json")
		let rawdata = fs.readFileSync(configPath)
		let config = JSON.parse(rawdata)

		await message.guild.channels.fetch()
		await message.guild.members.fetch()

		let category = message.guild.channels.cache.get(config.categoryId)

		let trialId = message.channel.topic

		let trial = message.guild.members.cache.get(trialId)

		let messageBox = category.children.get(config.messageBoxId)

		if (
			message.channel.parentId === config.categoryId &&
			message.channel.id !== config.messageBoxId &&
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
