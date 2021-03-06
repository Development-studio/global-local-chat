//██╗░░░░░░█████╗░░█████╗░░█████╗░██╗░░░░░░█████╗░██╗░░██╗░█████╗░████████╗
//██║░░░░░██╔══██╗██╔══██╗██╔══██╗██║░░░░░██╔══██╗██║░░██║██╔══██╗╚══██╔══╝
//██║░░░░░██║░░██║██║░░╚═╝███████║██║░░░░░██║░░╚═╝███████║███████║░░░██║░░░
//██║░░░░░██║░░██║██║░░██╗██╔══██║██║░░░░░██║░░██╗██╔══██║██╔══██║░░░██║░░░
//███████╗╚█████╔╝╚█████╔╝██║░░██║███████╗╚█████╔╝██║░░██║██║░░██║░░░██║░░░
//╚══════╝░╚════╝░░╚════╝░╚═╝░░╚═╝╚══════╝░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░
//
//Allows to use local and global chat in your game!
//Author: qIMIXERIp vk.com/svtlng
//Version 2.0.1

//config
let radius = 10 //Radius of local message (in blocks)
let globalSymbol = '!' //Symbol that marks message as global
let globalPrefix = '[G]' //Prefix that marks message as global

let headChat = true //Displays messages above player's head
	let smallMessage = 10 //Amount of symbols that small message has

let useMuteSystem = true //Set to true if you are using this script witn MixerAPI
//yes, I could make it in JSON but I don't want to

function setHeadMsg(mes, plr) {
	let name = plr.realName
	plr.rename(`${name}\n>> ${mes}`)
	function nameback(){
		plr.rename(plr.realName)
	}
	if(mes.length >= smallMessage){
		setTimeout(nameback, mes.length * 500)
	}else{
		setTimeout(nameback, mes.length * 1000)
	}
}

function sendMsgToChat(type, mssg, name, x, y, z){
	switch(type){
		case 0:
			mc.runcmd(`tellraw @a[x=${x},y=${y},z=${z},r=${radius}] {"rawtext":[{"text":"<${name}> ${mssg}"}]}`)
			break;
		case 1:
			mc.runcmd(`tellraw @a {"rawtext":[{"text":"${globalPrefix} <${name}> ${mssg}"}]}`)
			break;
	}
}

mc.listen('onChat', function(player, msg){
	let isMuted = player.hasTag(`is_muted`)
	let rname = player.realName
	let x = player.pos.x
	let y = player.pos.y
	let z = player.pos.z
	let muteMsg
	let isGlobal = msg[0] == globalSymbol
	if (isMuted && useMuteSystem){
		return false
		muteMsg = true
	}
	if (headChat && !muteMsg) {
		if (isGlobal){
			msg = msg.replace(globalSymbol,'')
			setHeadMsg(msg, player)
		}else{
			setHeadMsg(msg, player)
		}
	}
	if (!muteMsg){
		if (isGlobal){
			sendMsgToChat(1, msg, rname, x, y, z)
			return false
		}else{
			sendMsgToChat(0, msg, rname, x, y, z)
			return false
		}
	}
})
