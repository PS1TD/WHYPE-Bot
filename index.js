require("dotenv").config()

const fs = require("node:fs")
const { Client, Collection, Intents } = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")

async function main() {
	// Create a new client instance
	const client = new Client({
		intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
		partials: ["GUILD_MEMBER", "GUILD_MESSAGES"],
	})

	const commands = []
	client.commands = new Collection()
	const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"))

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`)
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command)
		commands.push(command.data.toJSON())
	}

	const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN)

	await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	console.log("Successfully registered application commands.")

	const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"))

	for (const file of eventFiles) {
		const event = require(`./events/${file}`)
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args))
		} else {
			client.on(event.name, (...args) => event.execute(...args))
		}
	}

	// Login to Discord with your client's token
	client.login(process.env.DISCORD_TOKEN)
}

main()
