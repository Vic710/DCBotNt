const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMembers // Ensure you have this intent for managing roles
  ] 
});

const predefinedString = "worship the god praise the god believe in god";  // The string you're checking for
const targetChannelId = '1335546626302808074'; // The channel ID you want to monitor

client.on('messageCreate', async (message) => {
  // Avoid the bot responding to its own messages
  if (message.author.bot) return;

  // Check if the message is in the target channel
  if (message.channel.id === targetChannelId) {
    // Check if the message contains the predefined string
    if (message.content === predefinedString) {
      // Give the user a role (replace "RoleName" with the desired role ID)
      const roleId = '1335547801765019668';  // Your role ID
      const role = message.guild.roles.cache.get(roleId);
      
      if (role) {
        try {
          // Ensure the bot has permission to assign the role
          await message.member.roles.add(role);
          console.log(`Role ${role.name} assigned to ${message.author.tag}`);
        } catch (error) {
          console.error('Error assigning role:', error);
        }
      }
    } else {
      // If it doesn't match, kick the user
      try {
        await message.member.kick("You were wrong, now suffer.");
        console.log(`Kicked ${message.author.tag}`);
      } catch (error) {
        console.error('Error kicking user:', error);
      }
    }

    // Always delete the message
    try {
      await message.delete();
      console.log(`Deleted message from ${message.author.tag}`);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }
});

client.once('ready', () => {
  console.log('Bot is online!');
});

client.login('MTMzNTUzNDI4ODgyMDc2ODgxMA.GatPjj.CtjOJiLHvYBk153dSFFjmWz6TVotvv0pf-3kdc');