module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		client.user.setPresence({ activities: [{ type: "WATCHING", name: "your every move🦀" }] })
		console.log(`Ready! Logged in as ${client.user.tag}`)
	},
}
