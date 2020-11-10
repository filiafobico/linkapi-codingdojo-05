const Discord = require('discord.js');
const { shuffle, chunk } = require('lodash');
const { prefix, token } = require('./config.json');

const id_role = '748681873567514664';
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  console.log(message)
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const [command, ...args] = message.content.slice(prefix.length).trim().split(/ +/);

	if (command === 'status') {
    const members = getKapiDevs(message);
    message.channel.send(JSON.stringify(members));
  } else if (command === 'sorteio') {
    const tam = args[0];
    const members = getKapiDevs(message);
    const membersShuflled = shuffle(members);

    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#1eac87')
      .setTitle('KapEquipes')
      .setThumbnail('https://cdn140.picsart.com/274601980000211.png?type=webp&to=min&r=640')
      .addFields(membersShuflled.map((item, index) => (({
        name: `Time ${index + 1}`,
        value: item
      }))));

    message.channel.send(exampleEmbed);
  }
});

function getKapiDevs(message) {
  return message.channel.members.filter(m => m._roles.find(r => r == id_role)).map(({ displayName, user }) => `${displayName}#${user.discriminator}`);
}

client.login(token);
