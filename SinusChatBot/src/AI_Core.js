registerPlugin({
	name: 'Chat Bot (Core)', //S-CHAP
	version: '0.01',
	description: 'Custom AI Chatbot',
	author: 'Bloc97',
	vars: [
	]
	
	},

	function(sinusbot, config){
            
            AI ={
                Core : {
                    compare : function(string, substr){
                        return (string.search(substr) !== -1);
                    },
                    contains : function(string, array){
                        return (array.indexOf(string) !== -1);
                    },
                    packetise : function(event){
                        
                    }
                },
                Modules : {
                    loaded : {
                        module : [],
                        sorted : false
                    },
                    register : function(module){
                        this.loaded.module.push(module); //pushes the module object into the array, so it can be accessed through iteration
                        AI[module.name]=module; //pushes the module object into the AI object, so it can be accessed manually using AI.obj
                    },
                    comparefunc : function(a,b){ //used in Modules.sort() to sort the modules in the array from lowest to highest ID
                        if (a.id < b.id){
                            return -1;
                        } else if (a.id > b.id){
                            return 1;
                        } else {
                            return 0;
                        }
                    },
                    sort : function(){
                        this.loaded.module.sort(comparefunc);
                    }
                    
                    
                    
                }
            };
	
            sinusbot.on("chat", function(e){ //implement "chat"||"poke" and mode = e.mode||1

                var msg = e.msg; //Raw input message string
                var msgI = msg.toLowerCase()||"_"; //Lowercase input string (for better recognition)
                var mode = e.mode;
                var clientId = e.clientId;
                var clientNick = e.clientNick;
                var botNick = sinusbot.getNick();

                var shortname = botNick.substring(0,botNick.search("-")).toLowerCase();
                var isCalled = AI.Core.compare(msgI,shortname);

                if (clientNick !== botNick){

                    AI.Logic.process(msgI,mode,clientId,clientNick,isCalled);

                }


            });
                
            sinusbot.on("poke", function(e){

                var msg = e.msg; //Raw input message string
                var msgI = msg.toLowerCase()||"_"; //Lowercase input string (for better recognition)
                var mode = 1;
                var clientId = e.clientId;
                var clientNick = e.clientNick;
                var botNick = sinusbot.getNick();

                var isCalled = true;

                if (clientNick !== botNick){

                    AI.Logic.process(msgI,mode,clientId,clientNick,isCalled);

                }


            });


	}
);
