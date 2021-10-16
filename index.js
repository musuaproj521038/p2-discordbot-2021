 // Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, mlAPI } = require ('./config.json');
const axios = require('axios').default;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'readability') {
		
        const excerpt = interaction.options.getString('excerpt');
        const splitExcerpt = excerpt.split(' ');

        if(splitExcerpt.length > 225){ // Too long of excerpt.
            await interaction.reply('Excerpt too long! Cut out some words!');
        }else if(splitExcerpt.length < 150){ // Too short of excerpt.
            await interaction.reply('Excerpt too short! Add more words!');
        }else{
            await interaction.reply('Determining readability of excerpt!');
            try{

                // Use machine learning model to determine the difficulty index.
                const response = await axios.post(mlAPI,
                    JSON.stringify({"excerpt": excerpt, "id": "69"}),
                    {headers:{"Content-Type" : "application/json"}}
                );

                const responseData = JSON.parse(response.data);
                const index = responseData["target"];

                // Using the same stat as in Recommendation Report.
                let year;
                if(index > 0){
                    year = 3;
                }else if(index > -0.3){
                    year = 4;
                }else if(index > -0.6){
                    year = 5;
                }else if(index > -1){
                    year = 6;
                }else if(index > -1.4){
                    year = 7;
                }else if(index > -1.8){
                    year = 8;
                }else if(index > -2.4){
                    year = 9;
                }else if(index > -2.8){
                    year = 10;
                }else if(index > -3.4){
                    year = 11;
                }else if(index > -6){ 
                    year = 12;
                }else{ // Someone find a text that gives a result of difficulty index lower than -6 lol.
                    year = 13;
                }

                if(year < 13){
                    await interaction.editReply(`This excerpt looks like it came from a text suitable for a student in **Year ${year}**!\nThe difficulty index was \`${index}\``);
                }else{ // Do the funny reply.
                    await interaction.editReply("That text looks like it was written for big brain people!")
                }
            }
            catch(error){
                await interaction.editReply("I think something is wrong with the model.")
            }
        }
		
	} else if (commandName === 'ping') {
		await interaction.reply('Pong!');
    }
});

// Login to Discord with your client's token
client.login(token);
