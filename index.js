const Discord = require("discord.js");
const fs = require("fs");
const bdd = require("./bdd.json");
const fetch = require('node-fetch');

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log("Le bot est allumé")
    bot.user.setStatus("dnd");
    setTimeout(() => {
        bot.user.setActivity("Levels Devils");
    }, 100)
});



bot.on("message", async message => {



    //LEVEL

    if (message.content.startsWith('!lvl')) {
        if (bdd["statut-level"] == true) {
            bdd["statut-level"] = false
            Savebdd();
            return message.channel.send('You just stoped the system levels !');
        }
        else {
            bdd["statut-level"] = true;
            Savebdd();
            return message.channel.send('You just turned on the system levels !');
        }
    }

    if (bdd["statut-level"] == true) {
        if (message.content.startsWith('!level')) {
            if (!bdd["coins-utilisateurs"][message.member.id]){
                return message.channel.send(`You haven't tested a message yet!`);
            } else {
                return message.channel.send(`You have ${bdd["coins-utilisateurs"][message.member.id]} points ! & You are at level n°${bdd["level-utilisateurs"][message.member.id]}`)
            }
        }
        else{
            addRandomInt(message.member);
            if (!bdd["coins-utilisateurs"][message.member.id]) {
                bdd["coins-utilisateurs"][message.member.id] = Math.floor(Math.random() * (4 - 1) + 1);
                bdd["level-utilisateurs"][message.member.id] = 0;
                Savebdd();
            }
            else if (bdd["coins-utilisateurs"][message.member.id] > 100 && bdd["coins-utilisateurs"][message.member.id] < 250) {
                if (bdd["level-utilisateurs"][message.member.id] == 0) {
                    bdd["level-utilisateurs"][message.member.id] = 1;
                    Savebdd();
                    return message.channel.send(`Gg ${message.author} You just reached lvl 1 !`);
                }
            }
            else if (bdd["coins-utilisateurs"][message.member.id] > 250 && bdd["coins-utilisateurs"][message.member.id] < 500) {
                if (bdd["level-utilisateurs"][message.member.id] == 1) {
                    bdd["level-utilisateurs"][message.member.id] = 2;
                    Savebdd();
                    return message.channel.send(`GG ${message.author} You just reached lvl 2 !`);
                }
            }
            else if (bdd["coins-utilisateurs"][message.member.id] > 500 && bdd["coins-utilisateurs"][message.member.id] < 1000) {
                if (bdd["level-utilisateurs"][message.member.id] == 2) {
                    bdd["level-utilisateurs"][message.member.id] = 3;
                    Savebdd();
                    return message.channel.send(`Good Job ${message.author} You moved to lvl 3 !`);
                }
            }
            else if (bdd["coins-utilisateurs"][message.member.id] > 1000) {
                if (bdd["level-utilisateurs"][message.member.id] == 3) {
                    bdd["level-utilisateurs"][message.member.id] = 4;
                    Savebdd();
                    return message.channel.send(`Noice For you ${message.author} You just got lvl 4 !`);
                }
            }
			else if (bdd["coins-utilisateurs"][message.member.id] > 1500) {
                if (bdd["level-utilisateurs"][message.member.id] == 3) {
                    bdd["level-utilisateurs"][message.member.id] = 4;
                    Savebdd();
                    return message.channel.send(`Well Good  ${message.author} You just got lvl 5 !`);
                }
            }
				else if (bdd["coins-utilisateurs"][message.member.id] > 2000) {
                if (bdd["level-utilisateurs"][message.member.id] == 3) {
                    bdd["level-utilisateurs"][message.member.id] = 4;
                    Savebdd();
                    return message.channel.send(`Eyy  ${message.author} You just got reached to lvl 6 !`);
                }
            }
        }
    }
     if(message.content.startsWith('!youtube')){
        const data = await fetch('https://www.youtube.com/channel/UCvcDItzPWvoIKue7HqpHwxw').then(response => response.json());
        console.log(data)
        const monembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Youtube')
            .setURL('https://discord.js.org/')
            .setAuthor('Mon Bot discord', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Voici les statistiques youtube')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: 'Number of subscribers', value: data.items[0].statistics.subscriberCount, inline: true },
                { name: 'Numbers of videos : ', value: data.items[0].statistics.videoCount, inline: true },
                { name: 'Views Count : ', value: data.items[0].statistics.viewCount, inline: true },
                // { name: 'Nombres de bots sur le serveur : ', value: totalbots, inline: true },
                // { name: 'Nombre d\'arrivants : ', value: totalrole, inline: true },
            )
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        message.channel.send(monembed);
    }
})
function addRandomInt(member) {
    bdd["coins-utilisateurs"][member.id] = bdd["coins-utilisateurs"][member.id] + Math.floor(Math.random() * (4 - 1) + 1);
    Savebdd();
}

function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
  }


bot.login("NzE5ODI2NDEwNDAyNzQyMzUz.Xt_k-w.8O1FU8_TnBU11tJeggwPod837SY");

