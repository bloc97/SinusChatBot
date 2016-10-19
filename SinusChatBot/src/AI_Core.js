registerPlugin({
	name: 'Chat Bot (Core)', //S-CHAP
	version: '0.01',
	description: 'Custom AI Chatbot',
	author: 'Bloc97',
	vars: [
	]
	
	},

	function(sinusbot, config){
            
            AI = {
                Core : {
                    compare : function(string, substr){
                        return (string.search(substr) !== -1);
                    },
                    contains : function(string, array){
                        return (array.indexOf(string) !== -1);
                    }
                },
                Event : {
                    packetise : function(event){
                        var that = {};
                        that.rawmsg = event.msg||"_NULL_";
                        that.msg = event.msg.toLowerCase()||"_NULL_";
                        that.mode = event.mode;
                        that.clientId = event.clientId;
                        that.clientNick = event.clientNick;
                        that.botNick = sinusbot.getNick(); //Nick that appears in teamspeak
                        that.botName = ""; //Name that bot responds to
                        //that.isBotCalled = (AI.Core.compare(that.msg,that.botName)||that.mode<=1);
                        return that;
                    }
                },
                Module : {
                    loaded : {
                        module : [],
                        sorted : false
                    },
                    register : function(module){
                        this.loaded.module.push(module); //pushes the module object into the array, so it can be accessed through iteration
                        AI.Module[module.name]=module; //pushes the module object into the AI object, so it can be accessed manually using AI.obj
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
                    },
                    send : function(eventpacket){
                        
                    }
                }
            };
	
            sinusbot.on("chat", function(e){
                var event = e;
                var eventpacket = AI.Event.packetise(event);


            });
                
            sinusbot.on("poke", function(e){
                var event = e;
                event.mode = 0;
                
                var eventpacket = AI.Event.packetise(event);


            });


	}
);
