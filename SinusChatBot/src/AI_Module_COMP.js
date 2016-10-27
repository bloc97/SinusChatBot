/* global AI */

registerPlugin({
	name: 'TS-CHAP (Module: COMP)', //TS-CHAP CHAtbot Project
	version: '0.01',
	description: 'TS-CHAP COMP Module, enables the use of commands.',
	author: 'Bloc97',
	vars: [
	]
	
	},

	function(sinusbot, config){
            
            var command = {
                name : "COMP",
                desc : "Command Processor",
                refname : "Command", //use this name to call AI.Module.<refname>
                id : 100, //ID used to load modules in order
                uid : "comp1000", //unique ID used by database, do not change after setting one. Can be any string.
                checkIsCommand : function(msg){
                    var firstchar = msg.charAt(0);
                    if ((firstchar.toLowerCase() === firstchar.toUpperCase()) && (+firstchar !== +firstchar)){//Not a character, nor a number, nor a whitespace
                        return true;
                    } else {
                        return false;
                    }
                },
                main : function(eventpacket,infopacket){
                    if (!this.checkIsCommand(eventpacket.msg)){
                        return false;
                    }
                    var msg = eventpacket.msg;
                    infopacket.command = {};
                    infopacket.command.symbol = msg.charAt(0);
                    infopacket.command.verb = msg.substring(1, msg.indexOf(" "));
                    infopacket.command.args = msg.substring(msg.indexOf(" ")+1, msg.length);
                    
                    infopacket.output.addMessage("Debug: Command Detected.");
                    
                }
                
                
            };

            sinusbot.on("connect", function(){
                AI.Module.register(command);
                AI.Module.load(command);
            });
	}
);
