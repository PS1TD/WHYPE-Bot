const { roleId, messageBoxId, categoryId } = require("../config.json")

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms))
}

module.exports = {
	name: "messageCreate",
	async execute(message) {
		await message.guild.channels.fetch()

		let category = message.guild.channels.cache.get(categoryId)

		let messageBox = category.children.get(messageBoxId)

		if (
			message.channel.parentId === categoryId &&
			message.channel.id !== messageBoxId &&
			message.author.id !== "952786501303951370"
		) {
			let outputEmbed = {
				color: "#4BB543",
				title: `New trial review!`,
				fields: [
					{
						name: "Trial",
						value: message.channel.name,
						inline: true,
					},
					{
						name: "Reviwer",
						value: message.author.username,
						inline: true,
					},
					{
						name: "Content",
						value: message.content,
					},
				],
				thumbnail: {
					url: message.author.displayAvatarURL(),
				},
			}

			await messageBox.send({ embeds: [outputEmbed] })

			let reply = await message.reply({ content: "Thank you for submitting your review!" })

			await message.delete()

			await sleep(3000)

			await reply.delete()
		}
	},
}
