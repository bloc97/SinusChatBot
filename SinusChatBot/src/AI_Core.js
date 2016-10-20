registerPlugin({
	name: 'Chat Bot (Core)', //TS-CHAP CHAtbot Project
	version: '0.01',
	description: 'Custom AI Chatbot',
	author: 'Bloc97',
	vars: [
	]
	
	},

	function(sinusbot, config){
            
            AI = {
                Core : {
                    compare : function(string, substr){ //checks if substring is in string
                        return (string.search(substr) !== -1);
                    },
                    contains : function(array, string){ //checks if string is in array
                        return (array.indexOf(string) !== -1);
                    }
                },
                Event : {
                    packetise : function(event){ //transforms the event into a packet for modules
                        var that = {};
                        that.rawmsg = event.msg||"_NULL_";
                        that.msg = event.msg.toLowerCase()||"_NULL_";
                        that.mode = event.mode;
                        that.clientId = event.clientId;
                        //that.clientUid = event.clientUid;
                        that.clientNick = event.clientNick;
                        that.botNick = sinusbot.getNick(); //Nick that appears in teamspeak
                        that.botName = ""; //Name that bot responds to
                        //that.isBotCalled = (AI.Core.compare(that.msg,that.botName)||that.mode<=1);
                        return that;
                    },
                    infopacket : function(){ //information packet reserved for modules
                        this.output={};
                        this.output.message = [[],[],[],[]]; //[message, delay (ms), mode of speech, user]
                        this.output.action = [[],[],[],[]];
                        this.isHalted = false;
                        
                        
                    }
                },
                Module : {
                    loaded : { //object used to track all modules
                        module : [],
                        names : [],
                        sorted : false,
                        check : function(modulename){ //checks if module is loaded (in names array)
                            return AI.Core.contains(this.names,modulename);
                        }
                    },
                    register : function(module){
                        this.loaded.module.push(module); //pushes the module object into the array, so it can be accessed through iteration
                        this.loaded.names.push(module.name);
                        AI.Module[module.name]=module; //pushes the module object into the AI object, so it can be accessed manually using AI.Module.obj
                        this.loaded.sorted=false; //sets array to false, for re-sorting
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
                    sort : function(){ //sorts the module array by ID, increasing order
                        if (!this.loaded.sorted){
                            this.loaded.module.sort(this.comparefunc);
                            this.loaded.sorted=true;
                        }
                    },
                    send : function(eventpacket,infopacket){ //sends the eventpacket and infopacket to all modules
                        for (var i=0, j=this.loaded.module.length; i<j; i++){
                            infopacket = this.loaded.module[i].main(eventpacket,infopacket);
                            if (infopacket.isHalted) break;
                        }
                        if (!this.loaded.check("Latency")){
                            AI.Output.message(eventpacket,infopacket);
                            AI.Output.action(eventpacket,infopacket);
                        }
                    }
                },
                Output : {
                    message : function(eventpacket,infopacket){
                        for (var i=0, j=infopacket.output.message[0].length; i<j; i++){
                            sinusbot.chatChannel(infopacket.output.message[0][i]);
                        }
                    },
                    action : function(eventpacket,infopacket){
                        
                    }
                }
            };
	
            sinusbot.on("chat", function(e){
                AI.Module.sort();
                var event = e;
                
                var eventpacket = AI.Event.packetise(event); //packet that contains the event information
                var infopacket = new AI.Event.infopacket(); //packet that contains information passed on by modules
                //var metadata = {}; //packet that contains misc info, such as which modules to ignore, or used to send the same event twice across modules.
                
                AI.Module.send(eventpacket,infopacket);

            });
                
            sinusbot.on("poke", function(e){
                AI.Module.sort();
                var event = e;
                event.mode = 0;
                
                var eventpacket = AI.Event.packetise(event);
                var infopacket = new AI.Event.infopacket();
                //var metadata = {};
                
                AI.Module.send(eventpacket,infopacket);

            });


	}
);
