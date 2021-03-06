var SlackBot = require('slackbots');
const dotenv = require('dotenv');
var express = require('express')
  , routes  = require('./routes')
  , user    = require('./routes/user')
  , path    = require('path');
var db      = require('./models');
var cors = require('cors');
const wakeDyno = require("woke-dyno");


dotenv.config();

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

//app.get('/users', user.list); 

var DYNO_URL = "https://iits-bot.herokuapp.com/";



db.sequelize.sync().then(function() {
  app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});


app.get('/sentry', (req, res) => {
	
	getSentryMan();
  return res.send('Received a GET HTTP method');
});


// create a bot
var bot = new SlackBot({
    token: process.env.BOT_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: 'Der Wendler'
});
 
bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':cat:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
   // bot.postMessageToChannel('general', 'meow!', params);
    
    // define existing username instead of 'user_name'
    bot.postMessageToUser('user_name', 'meow!', params); 
    
    // If you add a 'slackbot' property, 
    // you will post to another user's slackbot channel instead of a direct message
    bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
    
    // define private group instead of 'private_group', where bot exist
    bot.postMessageToGroup('private_group', 'meow!', params); 
});

bot.on("message", msg => {
  switch (msg.type) {
  case "message":
    if (msg.bot_id === undefined) {
		
		
		if(msg.text.includes("Sentry") )
		{
                  
			  getSentryMan();
			 
		}
		
	    if(msg.text.includes("Egal") )
		{

			  bot.getUsers().then(function(data){
				   

				   postToUserWithImage(msg,"https://media1.giphy.com/media/ZG5KTqutRAfZ6i5OVR/giphy.gif?cid=ecf05e47d1386acc4c79affd330d8fa4705ef201326fe40a&rid=giphy.gif");
				  
			  });
			 
		}
		
	    if(msg.text.includes("Danke") )
		{

			  bot.getUsers().then(function(data){
				   

				   postToUserWithImage(msg,"https://media.giphy.com/media/eyGs1FYIYgka4/giphy.gif");
				  
			  });
			 
		}
		
		
    
    }
    break
  }
});


function postToUserWithImage(message, picUrl) {
    bot.postMessageToChannel(
        "dev-team",
        'Egal!',
        params = {
			"as_user":true,
            "icon_url": picUrl,
            "attachments":
                [
                    {
                        "fallback": "this did not work",
                        "image_url": picUrl
                    }
                ]
        }
    )
}


function getSentryMan()
{
	
	bot.getUsers().then(function(data){
				   
				   console.dir(data);
	
				   
			var teamList = ["ilia.barancic","jesse.moares","marvin.jennrich","victor.getz","georg.braunbeck","soeren.schellhoff","robin.bially","bernhard.kern","alexis.hildebrandt","robin.schrage"]
					   var rnd = Math.floor(Math.random()*teamList.length);
				       console.log(rnd);
					   var user = teamList[rnd];
					   console.log(user);
					   bot.postMessageToChannel("dev-team","Heutiger Sentry Beauftragter:"+ user , { as_user:true})
				   
			  });
	
}

