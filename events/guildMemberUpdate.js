module.exports = {
	name: "guildMemberUpdate",
	execute(oldMember, newMember) {
		console.log(oldMember)

		console.log(newMember)

		let category = newMember.guild.channels.cache.get("953453092500819969")

		let userName = newMember.user.username.toLowerCase()

		if (newMember._roles.includes("670868788337573908")) {
			category.createChannel(userName)

			console.log("Added trial role")
		} else {
			category.children.forEach(async (channel) => {
				if (channel.name.includes(userName)) {
					await channel.delete()
				}
			})

			console.log("Removed trial role")
		}
	},
}
