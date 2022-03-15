const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("create").setDescription("Creates channels for every trial!"),
	async execute(interaction) {
		// console.log(interaction.member.guild.roles.cache)

		let members = interaction.member.guild.roles.cache.get("670868788337573908").members

		// console.log(members)

		let category = interaction.member.guild.channels.cache.get("953453092500819969")

		let reviewChannels = interaction.member.guild.channels.cache.get("953453092500819969").children
		// console.log(reviewChannels)

		let reviewChannelNames = reviewChannels.map((channel) => channel.name)

		console.log(reviewChannelNames)

		members.forEach((member) => {
			let userName = member.user.username.toLowerCase()

			if (!reviewChannelNames.includes(userName)) {
				console.log(`Create channel for user: ${member.user.username}`)
				category.createChannel(userName)
			} else {
				console.log(`Channel for user: ${member.user.username} already exists`)
			}
		})

		return interaction.reply("blah")
	},
}
