/* global AI */

registerPlugin({
	name: 'Chat Bot (Module: SNLP)', //TS-CHAP CHAtbot Project
	version: '0.01',
	description: 'TS-CHAP SNLP Module, enables simple language processing.',
	author: 'Bloc97',
	vars: [
	]
	
	},

	function(sinusbot, config){
            
            var snlp = {
                name : "SNLP",
                id : 100,
                main : function(eventpacket,infopacket){
                    
                    if (eventpacket.rawmsg==="Status"){
                        infopacket.output.message[0].push("SNLP Registered.");
                        infopacket.output.message[0].push("Test 1.");
                        infopacket.output.message[0].push("Test 2.");
                    }
                    infopacket.output.message[1].push(500);
                    infopacket.output.message[2].push(eventpacket.mode);
                    infopacket.output.message[3].push(eventpacket.clientId);
                    
                    return infopacket;
                    
                }
                
                
            };

            sinusbot.on("connect", function(){
                AI.Module.register(snlp);
            });
	}
);
