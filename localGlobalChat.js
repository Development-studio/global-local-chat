//██╗░░░░░░█████╗░░█████╗░░█████╗░██╗░░░░░░█████╗░██╗░░██╗░█████╗░████████╗
//██║░░░░░██╔══██╗██╔══██╗██╔══██╗██║░░░░░██╔══██╗██║░░██║██╔══██╗╚══██╔══╝
//██║░░░░░██║░░██║██║░░╚═╝███████║██║░░░░░██║░░╚═╝███████║███████║░░░██║░░░
//██║░░░░░██║░░██║██║░░██╗██╔══██║██║░░░░░██║░░██╗██╔══██║██╔══██║░░░██║░░░
//███████╗╚█████╔╝╚█████╔╝██║░░██║███████╗╚█████╔╝██║░░██║██║░░██║░░░██║░░░
//╚══════╝░╚════╝░░╚════╝░╚═╝░░╚═╝╚══════╝░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░
//
//Allows to use local and global chat in your game!
//Author: qIMIXERIp vk.com/svtlng

//config
let radius = 10 //Radius of local message (in blocks)
let globalSymbol = '!' //Symbol that marks message as global
let globalPrefix = '[G]' //Prefix that marks message as global

let headChat = true //Displays messages above player's head
	let smallMessage = 10 //Amount of symbols that small message has
	let headDelaySmall = 1 //Message's delay above player's head for small messages (in seconds)
//yes, I could make it in JSON but I don't want to

//code
mc.listen("onChat", function(player, msg){ //listens to chat message event
	let name = player.realName //Getting player's real name
	let pos = player.pos //Getting player's position
	let x = pos.x //Pos x
	let y = pos.y //Pos y
	let z = pos.z //Pos z
	let message = msg
	if(headChat ==  true){
		if(message[0] == globalSymbol){ //checks for global chat
			let globalMessage = message.replace('!','')
			player.rename(name + "\n>> " + globalMessage) //renames player
		}else{
			player.rename(name + "\n>> " + message) //renames player
		}
		function setRname(){
			player.rename(name);
		}
		if(message.length >= smallMessage){
			setTimeout(setRname, message.length * 500) //return player's name to normal
		}else{
			setTimeout(setRname, headDelaySmall * 1000) //return player's name to normal
		}
	}
	if(message[0] == globalSymbol){ //If message has globalSymbol, then send global message
		let globalMessage = message.replace('!','')
		mc.runcmd('tellraw @a[x=' + x + ',y=' + y + ',z=' + z + '] {"rawtext":[{"text":"' + globalPrefix + ' <' + name + '> ' + globalMessage + '"}]}')
		return false
	}else{ //Else send local message
		mc.runcmd('tellraw @a[x=' + x + ',y=' + y + ',z=' + z + ',r=' + radius + '] {"rawtext":[{"text":"' + '<' + name + '> ' + message + '"}]}')
		return false
	}
});
