module.exports = {
	name: "messageCreate",
	async execute(message) {
		let category = message.guild.channels.cache.get("953453092500819969")

		let reviewBox = category.children.get("953454471894155294")

		if (message.channel.parentId === "953453092500819969" && message.channel.id !== "953454471894155294") {
			console.log(message.content)
			await reviewBox.send(
				`Trial: ${message.channel.name}\nReviewer: ${message.author.username}\nContent: ${message.content}`
			)

			await message.delete()
		}
	},
}
