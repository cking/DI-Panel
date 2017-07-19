const Eris = require('eris');

const client = new Eris(global.config.bot.token, {
    disableEvents: {
        CHANNEL_DELETE: true,
        CHANNEL_UPDATE: true,
        GUILD_BAN_ADD: true,
        GUILD_BAN_REMOVE: true,
        GUILD_DELETE: true,
        GUILD_MEMBER_ADD: true,
        GUILD_MEMBER_REMOVE: true,
        GUILD_MEMBER_UPDATE: true,
        GUILD_ROLE_CREATE: true,
        GUILD_ROLE_DELETE: true,
        GUILD_ROLE_UPDATE: true,
        GUILD_UPDATE: true,
        MESSAGE_CREATE: false,
        MESSAGE_DELETE: true,
        MESSAGE_DELETE_BULK: true,
        MESSAGE_UPDATE: true,
        PRESENCE_UPDATE: true,
        TYPING_START: true,
        USER_UPDATE: true,
        VOICE_STATE_UPDATE: true
    },
    messageLimit: 1
});

client.on('ready', () => {
    console.log('Bot is ready.');
});

client.on('messageCreate', async msg => {
    console.log('message');
    if (!msg.author.bot && (!msg.channel.guild ||
        (global.config.bot.channels.includes(msg.channel.id)
            && msg.content.toLowerCase() === global.config.bot.command))) {

        if (msg.channel.guild)
            await client.createMessage(msg.channel.id, `Got it! I'll send you a DM.`);

        let token = await global.helpers.Security.generateToken();
        let salt = await global.helpers.Security.generateSalt();

        let pc = await client.getDMChannel(msg.author.id);
        try {
            let msg2 = await client.createMessage(pc.id, token);
            await msg2.delete();

            if (await global.helpers.Security.setToken(msg.author.id, token, salt)) {
                await client.createMessage(pc.id, 'Your DI token has been generated. Thank you for your time.');
            } else {
                await client.createMessage(pc.id, 'I was unable to set your DI token. Please try again, or contact **stupid cat#8160** for assistance.');
            }
        } catch (err) {
            console.error(err);
            await client.createMessage(msg.channel.id, `I was unable to send your DI token. Please ensure you have DMs enabled for this guild.`);
        }
    }
});


client.connect();