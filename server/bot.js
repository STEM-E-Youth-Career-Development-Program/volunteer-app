const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
async function checkServer(interns) {
    let res = new Array(interns.length).fill(0);
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    await new Promise((resolve) => {
        client.once(Events.ClientReady, async (readyClient) => {
            console.log(`Ready! Logged in as ${readyClient.user.tag}`);
            const guild = client.guilds.resolve("1151346763337318492");

            await Promise.all(
                interns.map(async (intern, i) => {
                    try {
                        const members = await guild.members.fetch({ query: intern, limit: 1 });
                        if (Array.from(members.keys()).length !== 0) {
                            res[i] = 1;
                        }
                    } catch (error) {
                        console.error("Error fetching member:", intern, error);
                    }
                })
            );
            console.log(res);
            client.destroy();
            resolve();
            
        });

        client.login(token); //Replace with repository secret TOKEN
    })
    return res;
};


module.exports = { checkServer };