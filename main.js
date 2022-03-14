require("dotenv").config()

const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { Client, Intents } = require("discord.js")

const commands = [
	new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!"),
	new SlashCommandBuilder().setName("server").setDescription("Replies with server info!"),
	new SlashCommandBuilder().setName("user").setDescription("Replies with user info!"),
].map((command) => command.toJSON())

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN)

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error)

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

// When the client is ready, run this code (only once)
client.once("ready", () => {
	console.log("Ready!")
})

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return

	const { commandName } = interaction

	if (commandName === "ping") {
		await interaction.reply("Pong!")
	} else if (commandName === "server") {
		await interaction.reply(
			`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
		)
	} else if (commandName === "user") {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
	}
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)
