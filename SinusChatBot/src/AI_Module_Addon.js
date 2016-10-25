/* global AI */

registerPlugin({
	name: 'TS-CHAP (Module: ADDM)', //TS-CHAP CHAtbot Project
	version: '0.01',
	description: 'TS-CHAP Addon Manager Module, allows the use of addons.',
	author: 'Bloc97',
	vars: [
	]
	
	},

	function(sinusbot, config){
            
            var addonmanager = {
                name : "ADDM",
                desc : "Addon Manager",
                refname : "Addon", //use this name to call AI.Module.<refname>
                id : 100, //ID used to load modules in order
                uid : "addm1000", //unique ID used by database, do not change after setting one. Can be any string.
                main : function(eventpacket,infopacket){

                    
                }
                
                
            };

            sinusbot.on("connect", function(){
                AI.Module.register(addonmanager); //registers module
                AI.Module.load(addonmanager); //loads addon manager
            });
	}
);
