module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		if (!interaction.isCommand()) return

		const command = interaction.client.commands.get(interaction.commandName)

		if (!command) return

		try {
			await command.execute(interaction)
		} catch (error) {
			console.error(error)

			const outputEmbed = {
				color: "#D9534F",
				title: `There was an error while executing this command!`,
			}

			await interaction.reply({ embeds: [outputEmbed], ephemeral: true })
		}
	},
}
