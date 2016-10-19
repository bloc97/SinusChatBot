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
                main : function(metadata,eventpacket,infopacket){
                    
                }
                
                
            };

            sinusbot.on("connect", function(){
                AI.Module.register(snlp);
            });
	}
);
