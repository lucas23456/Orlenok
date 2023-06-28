// Garden Gnome Software - Skin
// Pano2VR 6.1.2/17873
// Filename: silhouette_v6_v2.ggsk
// Generated 2023-06-27T19:29:52

function pano2vrSkin(player,base) {
	player.addVariable('opt_hotspot_preview', 2, true);
	player.addVariable('opt_zoom', 2, true);
	player.addVariable('opt_autorotate', 2, true);
	player.addVariable('opt_info', 2, false);
	player.addVariable('opt_thumbnail', 2, true);
	player.addVariable('vis_thumbnail_menu_show', 2, false);
	player.addVariable('opt_thumbnail_tooltip', 2, true);
	player.addVariable('opt_projection', 2, true);
	player.addVariable('opt_gyro', 2, true);
	player.addVariable('opt_fullscreen', 2, true);
	player.addVariable('opt_loader', 2, true);
	player.addVariable('opt_loader_mulires', 2, true);
	player.addVariable('opt_url', 2, false);
	player.addVariable('opt_autohide', 2, false);
	player.addVariable('vis_userdata', 2, false);
	player.addVariable('vis_close_buton', 2, false);
	player.addVariable('vis_image_popup', 2, false);
	player.addVariable('vis_info_popup', 2, false);
	player.addVariable('vis_video_popup_file', 2, false);
	player.addVariable('vis_video_popup_url', 2, false);
	player.addVariable('vis_video_popup_vimeo', 2, false);
	player.addVariable('vis_video_popup_youtube', 2, false);
	player.addVariable('vis_website', 2, false);
	player.addVariable('vis_thumbnail_menu_mobile', 2, false);
	player.addVariable('vis_thumbnail_menu_auto_hide', 2, true);
	player.addVariable('vis_timer', 2, false);
	player.addVariable('vis_360image_once', 2, true);
	player.addVariable('vis_loader', 2, true);
	player.addVariable('pos_zoom_in', 1, 0);
	player.addVariable('pos_zoom_out', 1, 0);
	player.addVariable('pos_autorotate', 1, 0);
	player.addVariable('pos_information', 1, 0);
	player.addVariable('pos_thumbnail', 1, 0);
	player.addVariable('pos_projection', 1, 0);
	player.addVariable('pos_gyro', 1, 0);
	player.addVariable('pos_fullscreen', 1, 0);
	player.addVariable('pos_controller', 1, 0);
	player.addVariable('pos_360image', 1, 0);
	player.addVariable('pos_enter_vr', 1, 0);
	player.addVariable('category_visible', 2, false);
	player.addVariable('node_visible', 2, false);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('configloaded', function() { me.callNodeChange(me.divSkin); });
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._menu_button=document.createElement('div');
		els=me._menu_button__img=document.createElement('img');
		els.className='ggskin ggskin_menu_button';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAElklEQVR4nO2YW4wTVRjHf+dMlzbiXiRsdiUEkItiImw2sApEoyESslwkXrhGiEKihhgefPCNoIagkWRfvKDygIK6KEFMUIgPIjchsl5WBcQgsJsQWmizbLp0aWlnjg/TdtvuTFvj0A16fslk5vvm+875z9dz6QxoNBqNRqPRaDQajUaj+b8h8qwNGySHHpHUhyVgEIhLqpKSvmrb9qUkvpRECYOEX2KYEmlJACxpYRoW/oSFUCYpn0XKZzE8ZiEtk2SVRTxgASbheouHD1q8+ooCoSr+1DkMFODpHfdgGmcq3L8CEnmHEgmESgA3stdC2f6BuOtADLiWPSsRQyj7XOgzDdveteRGoQBf9irlWzgEP4YAAukj7cnRkLlW+QPVuSXlnu9L2eeV28ezY9'+
			'WF3DSZE7ygXNW3LKYxu9BlF6B1nx+YWWk9Q4BLAWqiU4FhlVZTcZSYXTif7AJIq2VIBFWeRpZ+NjnXkVkE7y6VufiBMWx9roXuSIzuSIzOrl6++TXED+cipMzyFk8h4LXFU1g0bTTtx7ppP9ZNVzj2j57gX+uQ1v3AH1lNACxr/xKhFrnl1Nf4ObV5HiOr/YPuhXrjbNxziq0HzpE0raJ9v7G8iZcX3pvn+/qXS6z//Hc6u6+W1O6JDiXWs3P5xoxpTwGhxhbruG1ls2OnAI11Ad5+dho7183CkO7b1bKZYwc9PMD85lH8/Ppc3l09nSpDOmR6qwOhxuSamR7r3OInNlSzYta4osIAHm8Zzdo5kxzvjaz2s2XN9KL5Lzw6kS9eehDhot0LHWkcCzDcLXpd6yRXUYXMmdrg6F/10F3U3lZVMn9+8yham0bdNB1pHAsQ'+
			'cAgEYO7UO8vrFei5Nuifpt1GU2PZbbjFeqEjTV51MgWIO0UO80kmNNxedsenL0Yd/eXuEm5teKUjjZlrZArguBdZSpFIFl/ZMyRNi+1HLjje29Nxsaw2zob6+PDw+ZumIxOSa2QK0OsUmTIVbfvKe0H8+GgXoV7HgcQn33fx4/meovn9CZPV751wfFCvdKTJmx8GAPc91YpgslP0wdNXCAyTTB8/Ap/LNhXpS/BE21H6E6bj/ZSp2N8ZZG5TI/U1g5eb/oTJgs2HOHIm7KraCx1pwpzc/VbGsAsw5ckZwAy3jG9PXmbrgfNc7OnnSjSOlAKl7KFpSMma90/QUeIXjl5P8tHhLhrrAjSPuyPr/+tyHwvePMzxs5Gi+V7pAIKc3L0lY9gby/JP1wLvlFTgES0TRrBpaROXrl7nxW0/0RdPlk7yjr20r3gsY9jvApbsQJ'+
			'a3yHhBx7ke5mz6rmL9FZC3mNiTKVrzGwWLw38Wof7MNe0C7J+XAI4PhZ6KI5TDCABQ4quKixkKLJk3AgY+ivpSezGNzRUX5A0KCAMhIJg9KxFEqBBKBJFWiGRVkF1LruUm5r9ePLMtQMJfiyVrMcw6lKhFiVqEqgPcr6EaJSRCSexR5XSIPFsoiRKSgU/cMYSK5XzWjiFUP5DvUyKGtGIIFUGJIJYMUhMN88HzFd1KNBqNRqPRaDQajUaj0Wg0Go1Go7kF+RuDnPYnlSqdiwAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAElklEQVR4nO2YW4wTVRjHf+dMlzbiXiRsdiUEkItiImw2sApEoyESslwkXrhGiEKihhgefPCNoIagkWRfvKDygIK6KEFMUIgPIjchsl5WBcQgsJsQWmizbLp0aWlnjg/TdtvuTFvj0A16fslk5vvm+875z9dz6QxoNBqNRqPRaDQajUaj+b8h8qwNGySHHpHUhyVgEIhLqpKSvmrb9qUkvpRECYOEX2KYEmlJACxpYRoW/oSFUCYpn0XKZzE8ZiEtk2SVRTxgASbheouHD1q8+ooCoSr+1DkMFODpHfdgGmcq3L8CEnmHEgmESgA3stdC2f6BuOtADLiWPSsRQyj7XOgzDdveteRGoQBf9irlWzgEP4YAAukj7cnRkLlW+QPVuSXlnu9L2eeV28ezY9'+
			'WF3DSZE7ygXNW3LKYxu9BlF6B1nx+YWWk9Q4BLAWqiU4FhlVZTcZSYXTif7AJIq2VIBFWeRpZ+NjnXkVkE7y6VufiBMWx9roXuSIzuSIzOrl6++TXED+cipMzyFk8h4LXFU1g0bTTtx7ppP9ZNVzj2j57gX+uQ1v3AH1lNACxr/xKhFrnl1Nf4ObV5HiOr/YPuhXrjbNxziq0HzpE0raJ9v7G8iZcX3pvn+/qXS6z//Hc6u6+W1O6JDiXWs3P5xoxpTwGhxhbruG1ls2OnAI11Ad5+dho7183CkO7b1bKZYwc9PMD85lH8/Ppc3l09nSpDOmR6qwOhxuSamR7r3OInNlSzYta4osIAHm8Zzdo5kxzvjaz2s2XN9KL5Lzw6kS9eehDhot0LHWkcCzDcLXpd6yRXUYXMmdrg6F/10F3U3lZVMn9+8yham0bdNB1pHAsQ'+
			'cAgEYO7UO8vrFei5Nuifpt1GU2PZbbjFeqEjTV51MgWIO0UO80kmNNxedsenL0Yd/eXuEm5teKUjjZlrZArguBdZSpFIFl/ZMyRNi+1HLjje29Nxsaw2zob6+PDw+ZumIxOSa2QK0OsUmTIVbfvKe0H8+GgXoV7HgcQn33fx4/meovn9CZPV751wfFCvdKTJmx8GAPc91YpgslP0wdNXCAyTTB8/Ap/LNhXpS/BE21H6E6bj/ZSp2N8ZZG5TI/U1g5eb/oTJgs2HOHIm7KraCx1pwpzc/VbGsAsw5ckZwAy3jG9PXmbrgfNc7OnnSjSOlAKl7KFpSMma90/QUeIXjl5P8tHhLhrrAjSPuyPr/+tyHwvePMzxs5Gi+V7pAIKc3L0lY9gby/JP1wLvlFTgES0TRrBpaROXrl7nxW0/0RdPlk7yjr20r3gsY9jvApbsQJ'+
			'a3yHhBx7ke5mz6rmL9FZC3mNiTKVrzGwWLw38Wof7MNe0C7J+XAI4PhZ6KI5TDCABQ4quKixkKLJk3AgY+ivpSezGNzRUX5A0KCAMhIJg9KxFEqBBKBJFWiGRVkF1LruUm5r9ePLMtQMJfiyVrMcw6lKhFiVqEqgPcr6EaJSRCSexR5XSIPFsoiRKSgU/cMYSK5XzWjiFUP5DvUyKGtGIIFUGJIJYMUhMN88HzFd1KNBqNRqPRaDQajUaj0Wg0Go1Go7kF+RuDnPYnlSqdiwAAAABJRU5ErkJggg==';
		me._menu_button__img.ggOverSrc=hs;
		el.ggId="menu_button";
		el.ggDx=2;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 12px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._menu_button.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._menu_button.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('vis_website') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._menu_button.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._menu_button.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._menu_button.style[domTransition]='left 0s, bottom 0s';
				if (me._menu_button.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._menu_button.style.bottom='-100px';
					me._menu_button.ggUpdatePosition(true);
				}
				else {
					me._menu_button.ggDx=2;
					me._menu_button.style.bottom='12px';
					me._menu_button.ggUpdatePosition(true);
				}
			}
		}
		me._menu_button.onclick=function (e) {
			me._hide_timer.ggTimeout=Number("5") * 1000.0;
			me._hide_timer.ggTimestamp=skin.ggCurrentTime;
		}
		me._menu_button.onmouseover=function (e) {
			me._menu_button__img.src=me._menu_button__img.ggOverSrc;
		}
		me._menu_button.onmouseout=function (e) {
			me._menu_button__img.src=me._menu_button__img.ggNormalSrc;
		}
		me._menu_button.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._hide_timer=document.createElement('div');
		el.ggTimestamp=0;
		el.ggLastIsActive=false;
		el.ggTimeout=0;
		el.ggId="hide_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hide_timer.ggIsActive=function() {
			return (me._hide_timer.ggTimestamp + me._hide_timer.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._hide_timer.ggActivate=function () {
			if (player.transitionsDisabled) {
				me._controller.style[domTransition]='none';
			} else {
				me._controller.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._controller.style.opacity='1';
			me._controller.style.visibility=me._controller.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._menu_button.style[domTransition]='none';
			} else {
				me._menu_button.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._menu_button.style.opacity='0';
			me._menu_button.style.visibility='hidden';
			player.setVariableValue('vis_thumbnail_menu_auto_hide', true);
		}
		me._hide_timer.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._menu_button.style[domTransition]='none';
			} else {
				me._menu_button.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._menu_button.style.opacity='1';
			me._menu_button.style.visibility=me._menu_button.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._controller.style[domTransition]='none';
			} else {
				me._controller.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._controller.style.opacity='0';
			me._controller.style.visibility='hidden';
			player.setVariableValue('vis_thumbnail_menu_auto_hide', false);
		}
		me._hide_timer.ggUpdatePosition=function (useTransition) {
		}
		me._menu_button.appendChild(me._hide_timer);
		me.divSkin.appendChild(me._menu_button);
		el=me._loading_multires=document.createElement('div');
		els=me._loading_multires__img=document.createElement('img');
		els.className='ggskin ggskin_loading_multires';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAOCAYAAABth09nAAABWUlEQVRIie2RvyvEcRzGX8/ne1whN1jULYp0WQw2k1Ey0eWIdAt/gslgsjArpS6Fc6O/wshm8SMGSqRwOfe9z9twyLmTm/m+pndPPa96ekNERMS/QJ9XuhAQCycxDQKvyErAM7J7THfITul4umBzsdzQlC4kiIULmLo+M+fLmIrIipiucf6SlvIRuezLD45Wgso80Pslrbz3i8hugSvipWNy2Yf6IZm9YWRbQOqX4Y/ABnszSzXpzM4Epk2gq2GrlhdMy+Sn1745hvAuj6yvCYfHtE1+OvsRxACQbfD7CIA2TDc1ydx2O6F2gXgTfQCH7LwuNeWaHFF1OH/2Nah+ZPygjc7HEbwbwPkeTAkggSwOBJgcphNM6+xnTuu0U/l+ZKNAClkSSGCKv/c9EG'+
			'IKcf6MSrDS0JEudBNUxnB+EFOS6nc/HGAKMZWR3eH8Kjuzh02OjoiI+Eu8AfPMfPKVL21CAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_multires";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 7px;';
		hs+='position : absolute;';
		hs+='right : 6px;';
		hs+='top : 6px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_multires.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading_multires.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsTileLoading() == true)) && 
				((player.getVariableValue('opt_loader_mulires') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._loading_multires.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._loading_multires.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._loading_multires.style[domTransition]='';
				if (me._loading_multires.ggCurrentLogicStateVisible == 0) {
					me._loading_multires.style.visibility=(Number(me._loading_multires.style.opacity)>0||!me._loading_multires.style.opacity)?'inherit':'hidden';
					me._loading_multires.ggVisible=true;
				}
				else {
					me._loading_multires.style.visibility="hidden";
					me._loading_multires.ggVisible=false;
				}
			}
		}
		me._loading_multires.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._loading_multires);
		el=me._screentint=document.createElement('div');
		el.ggId="screentint";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._screentint.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._screentint.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_website') == true)) || 
				((player.getVariableValue('vis_thumbnail_menu_mobile') == true)) && 
				((player.getVariableValue('vis_thumbnail_menu_auto_hide') == true)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._screentint.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._screentint.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._screentint.style[domTransition]='opacity 500ms ease 0ms';
				if (me._screentint.ggCurrentLogicStateAlpha == 0) {
					me._screentint.style.visibility=me._screentint.ggVisible?'inherit':'hidden';
					me._screentint.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._screentint.style.opacity == 0.0) { me._screentint.style.visibility="hidden"; } }, 505);
					me._screentint.style.opacity=0;
				}
			}
		}
		me._screentint.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
			player.setVariableValue('vis_info_popup', false);
			player.setVariableValue('vis_video_popup_file', false);
			player.setVariableValue('vis_video_popup_url', false);
			player.setVariableValue('vis_video_popup_vimeo', false);
			player.setVariableValue('vis_video_popup_youtube', false);
			player.setVariableValue('vis_website', false);
			player.setVariableValue('vis_userdata', false);
		}
		me._screentint.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._screentint);
		el=me._controller=document.createElement('div');
		el.ggId="controller";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 23px;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 288px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._controller.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._controller.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('vis_website') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._controller.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._controller.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._controller.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._controller.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._controller.style.bottom='-100px';
					me._controller.ggUpdatePosition(true);
				}
				else {
					me._controller.ggDx=0;
					me._controller.style.bottom='23px';
					me._controller.ggUpdatePosition(true);
				}
			}
		}
		me._controller.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._controller.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._controller.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._controller.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._controller.ggCurrentLogicStateAlpha == 0) {
					me._controller.style.visibility=me._controller.ggVisible?'inherit':'hidden';
					me._controller.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._controller.style.opacity == 0.0) { me._controller.style.visibility="hidden"; } }, 505);
					me._controller.style.opacity=0;
				}
			}
		}
		me._controller.onmouseover=function (e) {
			me.elementMouseOver['controller']=true;
		}
		me._controller.onmouseout=function (e) {
			me.elementMouseOver['controller']=false;
		}
		me._controller.ontouchend=function (e) {
			me.elementMouseOver['controller']=false;
		}
		me._controller.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._controller_bg=document.createElement('div');
		el.ggId="controller_bg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 3px;';
		hs+='border-radius : 3px;';
		hs+='background : rgba(63,63,63,0.498039);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 50px;';
		hs+='left : -9px;';
		hs+='position : absolute;';
		hs+='top : -9px;';
		hs+='visibility : inherit;';
		hs+='width : 306px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._controller_bg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._controller_bg.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_controller') == 1))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_controller') == 2))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_controller') == 3))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_controller') == 4))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_controller') == 5))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_controller') == 6))
			)
			{
				newLogicStatePosition = 5;
			}
			else if (
				((player.getVariableValue('pos_controller') == 7))
			)
			{
				newLogicStatePosition = 6;
			}
			else if (
				((player.getVariableValue('pos_controller') == 8))
			)
			{
				newLogicStatePosition = 7;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._controller_bg.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._controller_bg.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._controller_bg.style[domTransition]='left 0s, top 0s, width 0s, height 0s';
				if (me._controller_bg.ggCurrentLogicStatePosition == 0) {
					me._controller_bg.style.left='103px';
					me._controller_bg.style.top='-9px';
				}
				else if (me._controller_bg.ggCurrentLogicStatePosition == 1) {
					me._controller_bg.style.left='87px';
					me._controller_bg.style.top='-9px';
				}
				else if (me._controller_bg.ggCurrentLogicStatePosition == 2) {
					me._controller_bg.style.left='71px';
					me._controller_bg.style.top='-9px';
				}
				else if (me._controller_bg.ggCurrentLogicStatePosition == 3) {
					me._controller_bg.style.left='55px';
					me._controller_bg.style.top='-9px';
				}
				else if (me._controller_bg.ggCurrentLogicStatePosition == 4) {
					me._controller_bg.style.left='39px';
					me._controller_bg.style.top='-9px';
				}
				else if (me._controller_bg.ggCurrentLogicStatePosition == 5) {
					me._controller_bg.style.left='23px';
					me._controller_bg.style.top='-9px';
				}
				else if (me._controller_bg.ggCurrentLogicStatePosition == 6) {
					me._controller_bg.style.left='7px';
					me._controller_bg.style.top='-9px';
				}
				else if (me._controller_bg.ggCurrentLogicStatePosition == 7) {
					me._controller_bg.style.left='-9px';
					me._controller_bg.style.top='-9px';
				}
				else {
					me._controller_bg.style.left='-9px';
					me._controller_bg.style.top='-9px';
				}
			}
		}
		me._controller_bg.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getVariableValue('pos_controller') == 1))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getVariableValue('pos_controller') == 2))
			)
			{
				newLogicStateSize = 1;
			}
			else if (
				((player.getVariableValue('pos_controller') == 3))
			)
			{
				newLogicStateSize = 2;
			}
			else if (
				((player.getVariableValue('pos_controller') == 4))
			)
			{
				newLogicStateSize = 3;
			}
			else if (
				((player.getVariableValue('pos_controller') == 5))
			)
			{
				newLogicStateSize = 4;
			}
			else if (
				((player.getVariableValue('pos_controller') == 6))
			)
			{
				newLogicStateSize = 5;
			}
			else if (
				((player.getVariableValue('pos_controller') == 7))
			)
			{
				newLogicStateSize = 6;
			}
			else if (
				((player.getVariableValue('pos_controller') == 8))
			)
			{
				newLogicStateSize = 7;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._controller_bg.ggCurrentLogicStateSize != newLogicStateSize) {
				me._controller_bg.ggCurrentLogicStateSize = newLogicStateSize;
				me._controller_bg.style[domTransition]='left 0s, top 0s, width 0s, height 0s';
				if (me._controller_bg.ggCurrentLogicStateSize == 0) {
					me._controller_bg.style.width='82px';
					me._controller_bg.style.height='50px';
					skin.updateSize(me._controller_bg);
				}
				else if (me._controller_bg.ggCurrentLogicStateSize == 1) {
					me._controller_bg.style.width='114px';
					me._controller_bg.style.height='50px';
					skin.updateSize(me._controller_bg);
				}
				else if (me._controller_bg.ggCurrentLogicStateSize == 2) {
					me._controller_bg.style.width='146px';
					me._controller_bg.style.height='50px';
					skin.updateSize(me._controller_bg);
				}
				else if (me._controller_bg.ggCurrentLogicStateSize == 3) {
					me._controller_bg.style.width='178px';
					me._controller_bg.style.height='50px';
					skin.updateSize(me._controller_bg);
				}
				else if (me._controller_bg.ggCurrentLogicStateSize == 4) {
					me._controller_bg.style.width='210px';
					me._controller_bg.style.height='50px';
					skin.updateSize(me._controller_bg);
				}
				else if (me._controller_bg.ggCurrentLogicStateSize == 5) {
					me._controller_bg.style.width='242px';
					me._controller_bg.style.height='50px';
					skin.updateSize(me._controller_bg);
				}
				else if (me._controller_bg.ggCurrentLogicStateSize == 6) {
					me._controller_bg.style.width='274px';
					me._controller_bg.style.height='50px';
					skin.updateSize(me._controller_bg);
				}
				else if (me._controller_bg.ggCurrentLogicStateSize == 7) {
					me._controller_bg.style.width='306px';
					me._controller_bg.style.height='50px';
					skin.updateSize(me._controller_bg);
				}
				else {
					me._controller_bg.style.width='306px';
					me._controller_bg.style.height='50px';
					skin.updateSize(me._controller_bg);
				}
			}
		}
		me._controller_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('pos_controller') == 0))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._controller_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._controller_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._controller_bg.style[domTransition]='left 0s, top 0s, width 0s, height 0s';
				if (me._controller_bg.ggCurrentLogicStateVisible == 0) {
					me._controller_bg.style.visibility="hidden";
					me._controller_bg.ggVisible=false;
				}
				else {
					me._controller_bg.style.visibility=(Number(me._controller_bg.style.opacity)>0||!me._controller_bg.style.opacity)?'inherit':'hidden';
					me._controller_bg.ggVisible=true;
				}
			}
		}
		me._controller_bg.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._controller_bg);
		el=me._controller_slider=document.createElement('div');
		el.ggId="controller_slider";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._controller_slider.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._controller_slider.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_controller') == 1))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_controller') == 2))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_controller') == 3))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_controller') == 4))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_controller') == 5))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_controller') == 6))
			)
			{
				newLogicStatePosition = 5;
			}
			else if (
				((player.getVariableValue('pos_controller') == 7))
			)
			{
				newLogicStatePosition = 6;
			}
			else if (
				((player.getVariableValue('pos_controller') == 8))
			)
			{
				newLogicStatePosition = 7;
			}
			else if (
				((player.getVariableValue('pos_controller') == 9))
			)
			{
				newLogicStatePosition = 8;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._controller_slider.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._controller_slider.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._controller_slider.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._controller_slider.ggCurrentLogicStatePosition == 0) {
					me._controller_slider.style.left='128px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 1) {
					me._controller_slider.style.left='112px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 2) {
					me._controller_slider.style.left='96px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 3) {
					me._controller_slider.style.left='80px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 4) {
					me._controller_slider.style.left='64px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 5) {
					me._controller_slider.style.left='48px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 6) {
					me._controller_slider.style.left='32px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 7) {
					me._controller_slider.style.left='16px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 8) {
					me._controller_slider.style.left='0px';
					me._controller_slider.style.top='0px';
				}
				else {
					me._controller_slider.style.left='0px';
					me._controller_slider.style.top='0px';
				}
			}
		}
		me._controller_slider.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._controller_slider.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._controller_slider.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._controller_slider.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._controller_slider.ggCurrentLogicStateAlpha == 0) {
					me._controller_slider.style.visibility=me._controller_slider.ggVisible?'inherit':'hidden';
					me._controller_slider.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._controller_slider.style.opacity == 0.0) { me._controller_slider.style.visibility="hidden"; } }, 505);
					me._controller_slider.style.opacity=0;
				}
			}
		}
		me._controller_slider.ggUpdatePosition=function (useTransition) {
		}
		el=me._enter_vr=document.createElement('div');
		els=me._enter_vr__img=document.createElement('img');
		els.className='ggskin ggskin_enter_vr';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._enter_vr__img.ggOverSrc=hs;
		el.ggId="enter_vr";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 256px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._enter_vr.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._enter_vr.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_enter_vr') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 5))
			)
			{
				newLogicStatePosition = 5;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 6))
			)
			{
				newLogicStatePosition = 6;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 7))
			)
			{
				newLogicStatePosition = 7;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._enter_vr.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._enter_vr.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._enter_vr.style[domTransition]='left 0s, top 0s';
				if (me._enter_vr.ggCurrentLogicStatePosition == 0) {
					me._enter_vr.style.left='0px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 1) {
					me._enter_vr.style.left='32px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 2) {
					me._enter_vr.style.left='64px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 3) {
					me._enter_vr.style.left='96px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 4) {
					me._enter_vr.style.left='128px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 5) {
					me._enter_vr.style.left='160px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 6) {
					me._enter_vr.style.left='192px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 7) {
					me._enter_vr.style.left='224px';
					me._enter_vr.style.top='0px';
				}
				else {
					me._enter_vr.style.left='256px';
					me._enter_vr.style.top='0px';
				}
			}
		}
		me._enter_vr.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.hasVR() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._enter_vr.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._enter_vr.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._enter_vr.style[domTransition]='left 0s, top 0s';
				if (me._enter_vr.ggCurrentLogicStateVisible == 0) {
					me._enter_vr.style.visibility=(Number(me._enter_vr.style.opacity)>0||!me._enter_vr.style.opacity)?'inherit':'hidden';
					me._enter_vr.ggVisible=true;
				}
				else {
					me._enter_vr.style.visibility="hidden";
					me._enter_vr.ggVisible=false;
				}
			}
		}
		me._enter_vr.onclick=function (e) {
			player.enterVR();
		}
		me._enter_vr.onmouseover=function (e) {
			me._enter_vr__img.src=me._enter_vr__img.ggOverSrc;
		}
		me._enter_vr.onmouseout=function (e) {
			me._enter_vr__img.src=me._enter_vr__img.ggNormalSrc;
		}
		me._enter_vr.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._enter_vr);
		el=me._fullscreen_buttons=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="fullscreen_buttons";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 224px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen_buttons.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen_buttons.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_fullscreen') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 5))
			)
			{
				newLogicStatePosition = 5;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 6))
			)
			{
				newLogicStatePosition = 6;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 7))
			)
			{
				newLogicStatePosition = 7;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._fullscreen_buttons.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._fullscreen_buttons.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._fullscreen_buttons.style[domTransition]='left 0s, top 0s';
				if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 0) {
					me._fullscreen_buttons.style.left='0px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 1) {
					me._fullscreen_buttons.style.left='32px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 2) {
					me._fullscreen_buttons.style.left='64px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 3) {
					me._fullscreen_buttons.style.left='96px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 4) {
					me._fullscreen_buttons.style.left='128px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 5) {
					me._fullscreen_buttons.style.left='160px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 6) {
					me._fullscreen_buttons.style.left='192px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 7) {
					me._fullscreen_buttons.style.left='224px';
					me._fullscreen_buttons.style.top='0px';
				}
				else {
					me._fullscreen_buttons.style.left='224px';
					me._fullscreen_buttons.style.top='0px';
				}
			}
		}
		me._fullscreen_buttons.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_fullscreen') == true)) && 
				((player.getOS() != 4))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._fullscreen_buttons.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._fullscreen_buttons.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._fullscreen_buttons.style[domTransition]='left 0s, top 0s';
				if (me._fullscreen_buttons.ggCurrentLogicStateVisible == 0) {
					me._fullscreen_buttons.style.visibility=(Number(me._fullscreen_buttons.style.opacity)>0||!me._fullscreen_buttons.style.opacity)?'inherit':'hidden';
					me._fullscreen_buttons.ggVisible=true;
				}
				else {
					me._fullscreen_buttons.style.visibility="hidden";
					me._fullscreen_buttons.ggVisible=false;
				}
			}
		}
		me._fullscreen_buttons.onclick=function (e) {
			player.toggleFullscreen();
		}
		me._fullscreen_buttons.ggUpdatePosition=function (useTransition) {
		}
		el=me._fullscreen=document.createElement('div');
		els=me._fullscreen__img=document.createElement('img');
		els.className='ggskin ggskin_fullscreen';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._fullscreen__img.ggOverSrc=hs;
		el.ggId="fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsFullscreen() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._fullscreen.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._fullscreen.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._fullscreen.style[domTransition]='opacity 500ms ease 0ms';
				if (me._fullscreen.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._fullscreen.style.opacity == 0.0) { me._fullscreen.style.visibility="hidden"; } }, 505);
					me._fullscreen.style.opacity=0;
				}
				else {
					me._fullscreen.style.visibility=me._fullscreen.ggVisible?'inherit':'hidden';
					me._fullscreen.style.opacity=1;
				}
			}
		}
		me._fullscreen.onmouseover=function (e) {
			me._fullscreen__img.src=me._fullscreen__img.ggOverSrc;
		}
		me._fullscreen.onmouseout=function (e) {
			me._fullscreen__img.src=me._fullscreen__img.ggNormalSrc;
		}
		me._fullscreen.ggUpdatePosition=function (useTransition) {
		}
		me._fullscreen_buttons.appendChild(me._fullscreen);
		el=me._fullscreen_off=document.createElement('div');
		els=me._fullscreen_off__img=document.createElement('img');
		els.className='ggskin ggskin_fullscreen_off';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._fullscreen_off__img.ggOverSrc=hs;
		el.ggId="fullscreen_off";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen_off.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsFullscreen() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._fullscreen_off.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._fullscreen_off.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._fullscreen_off.style[domTransition]='opacity 500ms ease 0ms';
				if (me._fullscreen_off.ggCurrentLogicStateAlpha == 0) {
					me._fullscreen_off.style.visibility=me._fullscreen_off.ggVisible?'inherit':'hidden';
					me._fullscreen_off.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._fullscreen_off.style.opacity == 0.0) { me._fullscreen_off.style.visibility="hidden"; } }, 505);
					me._fullscreen_off.style.opacity=0;
				}
			}
		}
		me._fullscreen_off.onmouseover=function (e) {
			me._fullscreen_off__img.src=me._fullscreen_off__img.ggOverSrc;
		}
		me._fullscreen_off.onmouseout=function (e) {
			me._fullscreen_off__img.src=me._fullscreen_off__img.ggNormalSrc;
		}
		me._fullscreen_off.ggUpdatePosition=function (useTransition) {
		}
		me._fullscreen_buttons.appendChild(me._fullscreen_off);
		me._controller_slider.appendChild(me._fullscreen_buttons);
		el=me._gyro=document.createElement('div');
		el.ggId="gyro";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 192px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gyro.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gyro.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_gyro') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 5))
			)
			{
				newLogicStatePosition = 5;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 6))
			)
			{
				newLogicStatePosition = 6;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._gyro.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._gyro.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._gyro.style[domTransition]='left 0s, top 0s';
				if (me._gyro.ggCurrentLogicStatePosition == 0) {
					me._gyro.style.left='0px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 1) {
					me._gyro.style.left='32px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 2) {
					me._gyro.style.left='64px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 3) {
					me._gyro.style.left='96px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 4) {
					me._gyro.style.left='128px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 5) {
					me._gyro.style.left='160px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 6) {
					me._gyro.style.left='192px';
					me._gyro.style.top='0px';
				}
				else {
					me._gyro.style.left='192px';
					me._gyro.style.top='0px';
				}
			}
		}
		me._gyro.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_gyro') == true)) && 
				((player.getGyroAvailable() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._gyro.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._gyro.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._gyro.style[domTransition]='left 0s, top 0s';
				if (me._gyro.ggCurrentLogicStateVisible == 0) {
					me._gyro.style.visibility=(Number(me._gyro.style.opacity)>0||!me._gyro.style.opacity)?'inherit':'hidden';
					me._gyro.ggVisible=true;
				}
				else {
					me._gyro.style.visibility="hidden";
					me._gyro.ggVisible=false;
				}
			}
		}
		me._gyro.onclick=function (e) {
			player.stopAutorotate();
			player.setUseGyro(!(player.getUseGyro()));
		}
		me._gyro.ggUpdatePosition=function (useTransition) {
		}
		el=me._gyro_on=document.createElement('div');
		els=me._gyro_on__img=document.createElement('img');
		els.className='ggskin ggskin_gyro_on';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._gyro_on__img.ggOverSrc=hs;
		el.ggId="gyro_on";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gyro_on.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gyro_on.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getUseGyro() == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._gyro_on.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._gyro_on.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._gyro_on.style[domTransition]='opacity 500ms ease 0ms';
				if (me._gyro_on.ggCurrentLogicStateAlpha == 0) {
					me._gyro_on.style.visibility=me._gyro_on.ggVisible?'inherit':'hidden';
					me._gyro_on.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._gyro_on.style.opacity == 0.0) { me._gyro_on.style.visibility="hidden"; } }, 505);
					me._gyro_on.style.opacity=0;
				}
			}
		}
		me._gyro_on.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._gyro_on.style[domTransition]='none';
			} else {
				me._gyro_on.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._gyro_on.style.opacity='0';
			me._gyro_on.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._gyro_off.style[domTransition]='none';
			} else {
				me._gyro_off.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._gyro_off.style.opacity='1';
			me._gyro_off.style.visibility=me._gyro_off.ggVisible?'inherit':'hidden';
			me.__360image_gyro.ggTimeout=Number("4") * 1000.0;
			me.__360image_gyro.ggTimestamp=skin.ggCurrentTime;
			me.__360image_timer.ggTimeout=Number("0.4") * 1000.0;
			me.__360image_timer.ggTimestamp=skin.ggCurrentTime;
		}
		me._gyro_on.onmouseover=function (e) {
			me._gyro_on__img.src=me._gyro_on__img.ggOverSrc;
		}
		me._gyro_on.onmouseout=function (e) {
			me._gyro_on__img.src=me._gyro_on__img.ggNormalSrc;
		}
		me._gyro_on.ggUpdatePosition=function (useTransition) {
		}
		me._gyro.appendChild(me._gyro_on);
		el=me._gyro_off=document.createElement('div');
		els=me._gyro_off__img=document.createElement('img');
		els.className='ggskin ggskin_gyro_off';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._gyro_off__img.ggOverSrc=hs;
		el.ggId="gyro_off";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gyro_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gyro_off.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getUseGyro() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._gyro_off.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._gyro_off.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._gyro_off.style[domTransition]='opacity 500ms ease 0ms';
				if (me._gyro_off.ggCurrentLogicStateAlpha == 0) {
					me._gyro_off.style.visibility=me._gyro_off.ggVisible?'inherit':'hidden';
					me._gyro_off.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._gyro_off.style.opacity == 0.0) { me._gyro_off.style.visibility="hidden"; } }, 505);
					me._gyro_off.style.opacity=0;
				}
			}
		}
		me._gyro_off.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._gyro_off.style[domTransition]='none';
			} else {
				me._gyro_off.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._gyro_off.style.opacity='0';
			me._gyro_off.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._gyro_on.style[domTransition]='none';
			} else {
				me._gyro_on.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._gyro_on.style.opacity='1';
			me._gyro_on.style.visibility=me._gyro_on.ggVisible?'inherit':'hidden';
		}
		me._gyro_off.onmouseover=function (e) {
			me._gyro_off__img.src=me._gyro_off__img.ggOverSrc;
		}
		me._gyro_off.onmouseout=function (e) {
			me._gyro_off__img.src=me._gyro_off__img.ggNormalSrc;
		}
		me._gyro_off.ggUpdatePosition=function (useTransition) {
		}
		me._gyro.appendChild(me._gyro_off);
		me._controller_slider.appendChild(me._gyro);
		el=me._projection_buttons=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="projection_buttons";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 160px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._projection_buttons.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._projection_buttons.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_projection') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_projection') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_projection') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_projection') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_projection') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_projection') == 5))
			)
			{
				newLogicStatePosition = 5;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._projection_buttons.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._projection_buttons.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._projection_buttons.style[domTransition]='left 0s, top 0s';
				if (me._projection_buttons.ggCurrentLogicStatePosition == 0) {
					me._projection_buttons.style.left='0px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 1) {
					me._projection_buttons.style.left='32px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 2) {
					me._projection_buttons.style.left='64px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 3) {
					me._projection_buttons.style.left='96px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 4) {
					me._projection_buttons.style.left='128px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 5) {
					me._projection_buttons.style.left='160px';
					me._projection_buttons.style.top='0px';
				}
				else {
					me._projection_buttons.style.left='160px';
					me._projection_buttons.style.top='0px';
				}
			}
		}
		me._projection_buttons.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_projection') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._projection_buttons.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._projection_buttons.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._projection_buttons.style[domTransition]='left 0s, top 0s';
				if (me._projection_buttons.ggCurrentLogicStateVisible == 0) {
					me._projection_buttons.style.visibility=(Number(me._projection_buttons.style.opacity)>0||!me._projection_buttons.style.opacity)?'inherit':'hidden';
					me._projection_buttons.ggVisible=true;
				}
				else {
					me._projection_buttons.style.visibility="hidden";
					me._projection_buttons.ggVisible=false;
				}
			}
		}
		me._projection_buttons.onclick=function (e) {
			if (
				(
					((player.getProjection() == 4))
				)
			) {
				player.changeProjectionEx(9,1);
			}
			if (
				(
					((player.getProjection() == 9))
				)
			) {
				player.changeProjectionEx(12,1);
			}
			if (
				(
					((player.getProjection() == 12))
				)
			) {
				player.changeProjectionEx(4,1);
			}
		}
		me._projection_buttons.ggUpdatePosition=function (useTransition) {
		}
		el=me._rectilinear=document.createElement('div');
		els=me._rectilinear__img=document.createElement('img');
		els.className='ggskin ggskin_rectilinear';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._rectilinear__img.ggOverSrc=hs;
		el.ggId="rectilinear";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rectilinear.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rectilinear.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getProjection() == 12))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rectilinear.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rectilinear.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rectilinear.style[domTransition]='opacity 500ms ease 0ms';
				if (me._rectilinear.ggCurrentLogicStateAlpha == 0) {
					me._rectilinear.style.visibility=me._rectilinear.ggVisible?'inherit':'hidden';
					me._rectilinear.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._rectilinear.style.opacity == 0.0) { me._rectilinear.style.visibility="hidden"; } }, 505);
					me._rectilinear.style.opacity=0;
				}
			}
		}
		me._rectilinear.onmouseover=function (e) {
			me._rectilinear__img.src=me._rectilinear__img.ggOverSrc;
		}
		me._rectilinear.onmouseout=function (e) {
			me._rectilinear__img.src=me._rectilinear__img.ggNormalSrc;
		}
		me._rectilinear.ggUpdatePosition=function (useTransition) {
		}
		me._projection_buttons.appendChild(me._rectilinear);
		el=me._fisheye=document.createElement('div');
		els=me._fisheye__img=document.createElement('img');
		els.className='ggskin ggskin_fisheye';
		hs='data:image/png;base64,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'+
			'SUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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'+
			'SUVORK5CYII=';
		me._fisheye__img.ggOverSrc=hs;
		el.ggId="fisheye";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fisheye.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fisheye.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getProjection() == 9))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._fisheye.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._fisheye.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._fisheye.style[domTransition]='opacity 500ms ease 0ms';
				if (me._fisheye.ggCurrentLogicStateAlpha == 0) {
					me._fisheye.style.visibility=me._fisheye.ggVisible?'inherit':'hidden';
					me._fisheye.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._fisheye.style.opacity == 0.0) { me._fisheye.style.visibility="hidden"; } }, 505);
					me._fisheye.style.opacity=0;
				}
			}
		}
		me._fisheye.onmouseover=function (e) {
			me._fisheye__img.src=me._fisheye__img.ggOverSrc;
		}
		me._fisheye.onmouseout=function (e) {
			me._fisheye__img.src=me._fisheye__img.ggNormalSrc;
		}
		me._fisheye.ggUpdatePosition=function (useTransition) {
		}
		me._projection_buttons.appendChild(me._fisheye);
		el=me._stereographic=document.createElement('div');
		els=me._stereographic__img=document.createElement('img');
		els.className='ggskin ggskin_stereographic';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._stereographic__img.ggOverSrc=hs;
		el.ggId="stereographic";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._stereographic.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._stereographic.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getProjection() == 4))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._stereographic.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._stereographic.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._stereographic.style[domTransition]='opacity 500ms ease 0ms';
				if (me._stereographic.ggCurrentLogicStateAlpha == 0) {
					me._stereographic.style.visibility=me._stereographic.ggVisible?'inherit':'hidden';
					me._stereographic.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._stereographic.style.opacity == 0.0) { me._stereographic.style.visibility="hidden"; } }, 505);
					me._stereographic.style.opacity=0;
				}
			}
		}
		me._stereographic.onmouseover=function (e) {
			me._stereographic__img.src=me._stereographic__img.ggOverSrc;
		}
		me._stereographic.onmouseout=function (e) {
			me._stereographic__img.src=me._stereographic__img.ggNormalSrc;
		}
		me._stereographic.ggUpdatePosition=function (useTransition) {
		}
		me._projection_buttons.appendChild(me._stereographic);
		me._controller_slider.appendChild(me._projection_buttons);
		el=me._thumbnail=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="thumbnail";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 128px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_thumbnail') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_thumbnail') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_thumbnail') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_thumbnail') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_thumbnail') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._thumbnail.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._thumbnail.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._thumbnail.style[domTransition]='left 0s, top 0s';
				if (me._thumbnail.ggCurrentLogicStatePosition == 0) {
					me._thumbnail.style.left='0px';
					me._thumbnail.style.top='0px';
				}
				else if (me._thumbnail.ggCurrentLogicStatePosition == 1) {
					me._thumbnail.style.left='32px';
					me._thumbnail.style.top='0px';
				}
				else if (me._thumbnail.ggCurrentLogicStatePosition == 2) {
					me._thumbnail.style.left='64px';
					me._thumbnail.style.top='0px';
				}
				else if (me._thumbnail.ggCurrentLogicStatePosition == 3) {
					me._thumbnail.style.left='96px';
					me._thumbnail.style.top='0px';
				}
				else if (me._thumbnail.ggCurrentLogicStatePosition == 4) {
					me._thumbnail.style.left='128px';
					me._thumbnail.style.top='0px';
				}
				else {
					me._thumbnail.style.left='128px';
					me._thumbnail.style.top='0px';
				}
			}
		}
		me._thumbnail.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_thumbnail') == true)) && 
				((player.getIsTour() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnail.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnail.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._thumbnail.style[domTransition]='left 0s, top 0s';
				if (me._thumbnail.ggCurrentLogicStateVisible == 0) {
					me._thumbnail.style.visibility=(Number(me._thumbnail.style.opacity)>0||!me._thumbnail.style.opacity)?'inherit':'hidden';
					me._thumbnail.ggVisible=true;
				}
				else {
					me._thumbnail.style.visibility="hidden";
					me._thumbnail.ggVisible=false;
				}
			}
		}
		me._thumbnail.onclick=function (e) {
			if (
				(
					((player.getViewerSize().width <= 450))
				)
			) {
				player.setVariableValue('vis_thumbnail_menu_mobile', !player.getVariableValue('vis_thumbnail_menu_mobile'));
			}
			if (
				(
					((player.getViewerSize().width > 450))
				)
			) {
				player.setVariableValue('vis_thumbnail_menu_show', !player.getVariableValue('vis_thumbnail_menu_show'));
			}
		}
		me._thumbnail.ggUpdatePosition=function (useTransition) {
		}
		el=me._thumbnail_hide_button_show=document.createElement('div');
		els=me._thumbnail_hide_button_show__img=document.createElement('img');
		els.className='ggskin ggskin_thumbnail_hide_button_show';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._thumbnail_hide_button_show__img.ggOverSrc=hs;
		el.ggId="thumbnail_hide_button_show";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_hide_button_show.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_hide_button_show.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnail_menu_show') == true)) && 
				((player.getViewerSize().width > 450))
			)
			{
				newLogicStateAlpha = 0;
			}
			else if (
				((player.getVariableValue('vis_thumbnail_menu_mobile') == true)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateAlpha = 1;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_hide_button_show.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_hide_button_show.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_hide_button_show.style[domTransition]='opacity 500ms ease 0ms';
				if (me._thumbnail_hide_button_show.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_hide_button_show.style.visibility=me._thumbnail_hide_button_show.ggVisible?'inherit':'hidden';
					me._thumbnail_hide_button_show.style.opacity=1;
				}
				else if (me._thumbnail_hide_button_show.ggCurrentLogicStateAlpha == 1) {
					me._thumbnail_hide_button_show.style.visibility=me._thumbnail_hide_button_show.ggVisible?'inherit':'hidden';
					me._thumbnail_hide_button_show.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_hide_button_show.style.opacity == 0.0) { me._thumbnail_hide_button_show.style.visibility="hidden"; } }, 505);
					me._thumbnail_hide_button_show.style.opacity=0;
				}
			}
		}
		me._thumbnail_hide_button_show.onmouseover=function (e) {
			me._thumbnail_hide_button_show__img.src=me._thumbnail_hide_button_show__img.ggOverSrc;
		}
		me._thumbnail_hide_button_show.onmouseout=function (e) {
			me._thumbnail_hide_button_show__img.src=me._thumbnail_hide_button_show__img.ggNormalSrc;
		}
		me._thumbnail_hide_button_show.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail.appendChild(me._thumbnail_hide_button_show);
		el=me._thumbnail_show_button_show=document.createElement('div');
		els=me._thumbnail_show_button_show__img=document.createElement('img');
		els.className='ggskin ggskin_thumbnail_show_button_show';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._thumbnail_show_button_show__img.ggOverSrc=hs;
		el.ggId="thumbnail_show_button_show";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_show_button_show.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_show_button_show.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnail_menu_show') == false)) && 
				((player.getViewerSize().width > 450))
			)
			{
				newLogicStateAlpha = 0;
			}
			else if (
				((player.getVariableValue('vis_thumbnail_menu_mobile') == false)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateAlpha = 1;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_show_button_show.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_show_button_show.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_show_button_show.style[domTransition]='opacity 500ms ease 0ms';
				if (me._thumbnail_show_button_show.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_show_button_show.style.visibility=me._thumbnail_show_button_show.ggVisible?'inherit':'hidden';
					me._thumbnail_show_button_show.style.opacity=1;
				}
				else if (me._thumbnail_show_button_show.ggCurrentLogicStateAlpha == 1) {
					me._thumbnail_show_button_show.style.visibility=me._thumbnail_show_button_show.ggVisible?'inherit':'hidden';
					me._thumbnail_show_button_show.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_show_button_show.style.opacity == 0.0) { me._thumbnail_show_button_show.style.visibility="hidden"; } }, 505);
					me._thumbnail_show_button_show.style.opacity=0;
				}
			}
		}
		me._thumbnail_show_button_show.onmouseover=function (e) {
			me._thumbnail_show_button_show__img.src=me._thumbnail_show_button_show__img.ggOverSrc;
		}
		me._thumbnail_show_button_show.onmouseout=function (e) {
			me._thumbnail_show_button_show__img.src=me._thumbnail_show_button_show__img.ggNormalSrc;
		}
		me._thumbnail_show_button_show.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail.appendChild(me._thumbnail_show_button_show);
		me._controller_slider.appendChild(me._thumbnail);
		el=me._info=document.createElement('div');
		els=me._info__img=document.createElement('img');
		els.className='ggskin ggskin_info';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._info__img.ggOverSrc=hs;
		el.ggId="info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 96px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_information') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_information') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_information') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_information') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._info.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._info.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._info.style[domTransition]='left 0s, top 0s';
				if (me._info.ggCurrentLogicStatePosition == 0) {
					me._info.style.left='0px';
					me._info.style.top='0px';
				}
				else if (me._info.ggCurrentLogicStatePosition == 1) {
					me._info.style.left='32px';
					me._info.style.top='0px';
				}
				else if (me._info.ggCurrentLogicStatePosition == 2) {
					me._info.style.left='64px';
					me._info.style.top='0px';
				}
				else if (me._info.ggCurrentLogicStatePosition == 3) {
					me._info.style.left='96px';
					me._info.style.top='0px';
				}
				else {
					me._info.style.left='96px';
					me._info.style.top='0px';
				}
			}
		}
		me._info.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_info') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._info.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._info.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._info.style[domTransition]='left 0s, top 0s';
				if (me._info.ggCurrentLogicStateVisible == 0) {
					me._info.style.visibility=(Number(me._info.style.opacity)>0||!me._info.style.opacity)?'inherit':'hidden';
					me._info.ggVisible=true;
				}
				else {
					me._info.style.visibility="hidden";
					me._info.ggVisible=false;
				}
			}
		}
		me._info.onclick=function (e) {
			player.setVariableValue('vis_userdata', true);
		}
		me._info.onmouseover=function (e) {
			me._info__img.src=me._info__img.ggOverSrc;
		}
		me._info.onmouseout=function (e) {
			me._info__img.src=me._info__img.ggNormalSrc;
		}
		me._info.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._info);
		el=me._autorotate_buttons=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="autorotate_buttons";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 64px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._autorotate_buttons.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._autorotate_buttons.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_autorotate') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_autorotate') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_autorotate') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._autorotate_buttons.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._autorotate_buttons.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._autorotate_buttons.style[domTransition]='left 0s, top 0s';
				if (me._autorotate_buttons.ggCurrentLogicStatePosition == 0) {
					me._autorotate_buttons.style.left='0px';
					me._autorotate_buttons.style.top='0px';
				}
				else if (me._autorotate_buttons.ggCurrentLogicStatePosition == 1) {
					me._autorotate_buttons.style.left='32px';
					me._autorotate_buttons.style.top='0px';
				}
				else if (me._autorotate_buttons.ggCurrentLogicStatePosition == 2) {
					me._autorotate_buttons.style.left='64px';
					me._autorotate_buttons.style.top='0px';
				}
				else {
					me._autorotate_buttons.style.left='64px';
					me._autorotate_buttons.style.top='0px';
				}
			}
		}
		me._autorotate_buttons.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_autorotate') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._autorotate_buttons.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._autorotate_buttons.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._autorotate_buttons.style[domTransition]='left 0s, top 0s';
				if (me._autorotate_buttons.ggCurrentLogicStateVisible == 0) {
					me._autorotate_buttons.style.visibility=(Number(me._autorotate_buttons.style.opacity)>0||!me._autorotate_buttons.style.opacity)?'inherit':'hidden';
					me._autorotate_buttons.ggVisible=true;
				}
				else {
					me._autorotate_buttons.style.visibility="hidden";
					me._autorotate_buttons.ggVisible=false;
				}
			}
		}
		me._autorotate_buttons.onclick=function (e) {
			player.setUseGyro(false);
			player.toggleAutorotate();
		}
		me._autorotate_buttons.ggUpdatePosition=function (useTransition) {
		}
		el=me._autorotate_start=document.createElement('div');
		els=me._autorotate_start__img=document.createElement('img');
		els.className='ggskin ggskin_autorotate_start';
		hs='data:image/png;base64,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'+
			'YII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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'+
			'YII=';
		me._autorotate_start__img.ggOverSrc=hs;
		el.ggId="autorotate_start";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._autorotate_start.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._autorotate_start.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsAutorotating() == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._autorotate_start.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._autorotate_start.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._autorotate_start.style[domTransition]='opacity 500ms ease 0ms';
				if (me._autorotate_start.ggCurrentLogicStateAlpha == 0) {
					me._autorotate_start.style.visibility=me._autorotate_start.ggVisible?'inherit':'hidden';
					me._autorotate_start.style.opacity=1;
				}
				else {
					me._autorotate_start.style.visibility=me._autorotate_start.ggVisible?'inherit':'hidden';
					me._autorotate_start.style.opacity=1;
				}
			}
		}
		me._autorotate_start.onmouseover=function (e) {
			me._autorotate_start__img.src=me._autorotate_start__img.ggOverSrc;
		}
		me._autorotate_start.onmouseout=function (e) {
			me._autorotate_start__img.src=me._autorotate_start__img.ggNormalSrc;
		}
		me._autorotate_start.ggUpdatePosition=function (useTransition) {
		}
		me._autorotate_buttons.appendChild(me._autorotate_start);
		el=me._autorotate_stop=document.createElement('div');
		els=me._autorotate_stop__img=document.createElement('img');
		els.className='ggskin ggskin_autorotate_stop';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._autorotate_stop__img.ggOverSrc=hs;
		el.ggId="autorotate_stop";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._autorotate_stop.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._autorotate_stop.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsAutorotating() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._autorotate_stop.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._autorotate_stop.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._autorotate_stop.style[domTransition]='opacity 500ms ease 0ms';
				if (me._autorotate_stop.ggCurrentLogicStateAlpha == 0) {
					me._autorotate_stop.style.visibility=me._autorotate_stop.ggVisible?'inherit':'hidden';
					me._autorotate_stop.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._autorotate_stop.style.opacity == 0.0) { me._autorotate_stop.style.visibility="hidden"; } }, 505);
					me._autorotate_stop.style.opacity=0;
				}
			}
		}
		me._autorotate_stop.onmouseover=function (e) {
			me._autorotate_stop__img.src=me._autorotate_stop__img.ggOverSrc;
		}
		me._autorotate_stop.onmouseout=function (e) {
			me._autorotate_stop__img.src=me._autorotate_stop__img.ggNormalSrc;
		}
		me._autorotate_stop.ggUpdatePosition=function (useTransition) {
		}
		me._autorotate_buttons.appendChild(me._autorotate_stop);
		me._controller_slider.appendChild(me._autorotate_buttons);
		el=me._zoomout=document.createElement('div');
		els=me._zoomout__img=document.createElement('img');
		els.className='ggskin ggskin_zoomout';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACfElEQVRYhe2Xz2sTQRiGn29nd5u2eFBKmjQF8S6CraAXvXkWevLQqyCiQhtKPXgUKkhF1Evp1UP/jgp6qNQK3kXQVhQRJLG7m9l8HpJskiYmsUnTg76XHWZm5332+2bnh6gqxynnWN0Bt1ZYWXmIqqKqGNeAVZBKm+f5iCj5nVzXcK3OfBLXMagxlMIIo2XEwIgaLJXxHcfh9mK+GcBai+u6KIpY0Kp5KpViYTvTc57y29MKcP/Me5nKZAjDEKsQY0mpQYyLajnpn6RAROqjCPi+j+/7qb8xb9SDD2f11usJxXE4MeLjIMQIARZL3cttfEmrFWPj46fubk18P4zxQS28ySrA+pUfsv/zFwKYhk9KImCMQbWM548yKPNG3dg8qZ7v4anBmjYpqEsvD9'+
			'q8JqtxJcwNSgAUGPNHyO9MbR4VwJ2trHqjlfnQAuB7Hos9/Gb96uarCR3zR1sBhrkiWrWtAHGpNDwAGydlqX25zG8MdVPQF9cFDqwDf+jYl5HMb3Rs77gZ9WveyxjHvhv+B+gI0G0C9aJuY3T9CwYB0UlJBJayb6VTx0Hq2cznxCsBSE+mh+WP73lJ+XgmobTZDaMoYnVm78jTsHbpm0RR1AoAUC6XuTf97sgg1i5+lSAImuqaAKJSRDaTZTk3eIjns7sSVXdcaZcCBCSGQqHIdC47sEicfrkkz2d3xVrbtr3tJCwWC0xlcyzndvqCuLq3LsuLeeI4rh56FRGhEaYJQAFjoFyGICgymU7zZPbLYSFkbu4aNgibKlUV162vf/WLSQKliBishSCICMOAx+d35emF3kAenfsoVC91hf2I0DU4teNe9dl4/JN//nb8G7Uu'+
			'7AfjTxQnAAAAAElFTkSuQmCC';
		me._zoomout__img.ggOverSrc=hs;
		el.ggId="zoomout";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 32px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoomout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomout.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_zoom') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._zoomout.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._zoomout.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._zoomout.style[domTransition]='';
				if (me._zoomout.ggCurrentLogicStateVisible == 0) {
					me._zoomout.style.visibility=(Number(me._zoomout.style.opacity)>0||!me._zoomout.style.opacity)?'inherit':'hidden';
					me._zoomout.ggVisible=true;
				}
				else {
					me._zoomout.style.visibility="hidden";
					me._zoomout.ggVisible=false;
				}
			}
		}
		me._zoomout.onmouseover=function (e) {
			me._zoomout__img.src=me._zoomout__img.ggOverSrc;
		}
		me._zoomout.onmouseout=function (e) {
			me._zoomout__img.src=me._zoomout__img.ggNormalSrc;
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.onmousedown=function (e) {
			me.elementMouseDown['zoomout']=true;
		}
		me._zoomout.onmouseup=function (e) {
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.ontouchend=function (e) {
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._zoomout);
		el=me._zoomin=document.createElement('div');
		els=me._zoomin__img=document.createElement('img');
		els.className='ggskin ggskin_zoomin';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="zoomin";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoomin.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomin.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_zoom') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._zoomin.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._zoomin.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._zoomin.style[domTransition]='';
				if (me._zoomin.ggCurrentLogicStateVisible == 0) {
					me._zoomin.style.visibility=(Number(me._zoomin.style.opacity)>0||!me._zoomin.style.opacity)?'inherit':'hidden';
					me._zoomin.ggVisible=true;
				}
				else {
					me._zoomin.style.visibility="hidden";
					me._zoomin.ggVisible=false;
				}
			}
		}
		me._zoomin.onmouseout=function (e) {
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.onmousedown=function (e) {
			me.elementMouseDown['zoomin']=true;
		}
		me._zoomin.onmouseup=function (e) {
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.ontouchend=function (e) {
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._zoomin);
		el=me._key_up=document.createElement('div');
		el.ggId="key_up";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._key_up.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._key_up.onmouseout=function (e) {
			me.elementMouseDown['key_up']=false;
		}
		me._key_up.onmousedown=function (e) {
			me.elementMouseDown['key_up']=true;
		}
		me._key_up.onmouseup=function (e) {
			me.elementMouseDown['key_up']=false;
		}
		me._key_up.ontouchend=function (e) {
			me.elementMouseDown['key_up']=false;
		}
		me._key_up.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._key_up);
		el=me._key_down=document.createElement('div');
		el.ggId="key_down";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._key_down.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._key_down.onmouseout=function (e) {
			me.elementMouseDown['key_down']=false;
		}
		me._key_down.onmousedown=function (e) {
			me.elementMouseDown['key_down']=true;
		}
		me._key_down.onmouseup=function (e) {
			me.elementMouseDown['key_down']=false;
		}
		me._key_down.ontouchend=function (e) {
			me.elementMouseDown['key_down']=false;
		}
		me._key_down.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._key_down);
		el=me._key_left=document.createElement('div');
		el.ggId="key_left";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._key_left.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._key_left.onmouseout=function (e) {
			me.elementMouseDown['key_left']=false;
		}
		me._key_left.onmousedown=function (e) {
			me.elementMouseDown['key_left']=true;
		}
		me._key_left.onmouseup=function (e) {
			me.elementMouseDown['key_left']=false;
		}
		me._key_left.ontouchend=function (e) {
			me.elementMouseDown['key_left']=false;
		}
		me._key_left.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._key_left);
		el=me._key_right=document.createElement('div');
		el.ggId="key_right";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._key_right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._key_right.onmouseout=function (e) {
			me.elementMouseDown['key_right']=false;
		}
		me._key_right.onmousedown=function (e) {
			me.elementMouseDown['key_right']=true;
		}
		me._key_right.onmouseup=function (e) {
			me.elementMouseDown['key_right']=false;
		}
		me._key_right.ontouchend=function (e) {
			me.elementMouseDown['key_right']=false;
		}
		me._key_right.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._key_right);
		me._controller.appendChild(me._controller_slider);
		el=me._element_alpha_timer=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=1000;
		el.ggId="element_alpha_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._element_alpha_timer.ggIsActive=function() {
			return (me._element_alpha_timer.ggTimestamp + me._element_alpha_timer.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._element_alpha_timer.ggDeactivate=function () {
			player.setVariableValue('vis_timer', true);
		}
		me._element_alpha_timer.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._element_alpha_timer);
		me.divSkin.appendChild(me._controller);
		el=me._thumbnail_menu=document.createElement('div');
		els=me._thumbnail_menu__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 89px;';
		hs+='left : 50%;';
		hs+='margin-left : -69.5px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 139px;';
		hs+="";
		els.setAttribute('style',hs);
		me._thumbnail_menu.ggScrollByX = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0) return;
			me._thumbnail_menu.ggScrollPosX = (me._thumbnail_menu__horScrollFg.offsetLeft + diffX);
			me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
			me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
		}
		me._thumbnail_menu.ggScrollByXSmooth = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_menu.ggScrollPosX >= me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth)) {
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_menu.ggScrollPosX <= 0)) {
					me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
			}, 10);
		}
		me._thumbnail_menu.ggScrollByY = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0) return;
			me._thumbnail_menu.ggScrollPosY = (me._thumbnail_menu__vertScrollFg.offsetTop + diffY);
			me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
			me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			me._thumbnail_menu__content.style.top = -(Math.round(me._thumbnail_menu.ggScrollPosY / me._thumbnail_menu.ggVPercentVisible)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
		}
		me._thumbnail_menu.ggScrollByYSmooth = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_menu.ggScrollPosY >= me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight)) {
					me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_menu.ggScrollPosY <= 0)) {
					me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			me._thumbnail_menu__content.style.top = -(Math.round(me._thumbnail_menu.ggScrollPosY / me._thumbnail_menu.ggVPercentVisible)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._thumbnail_menu.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._thumbnail_menu.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._thumbnail_menu.offsetWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._thumbnail_menu.offsetWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				}
			}
			if (me._thumbnail_menu.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._thumbnail_menu.offsetHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._thumbnail_menu.offsetHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = t[0].clientX;
			me._thumbnail_menu.ggDragLastY = t[0].clientY;
			me._thumbnail_menu__content.ontouchend = function() {
				me._thumbnail_menu__content.ontouchend = null;
				me._thumbnail_menu__content.ontouchmove = null;
			}
			me._thumbnail_menu__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffX = t[0].clientX - me._thumbnail_menu.ggDragLastX;
				var diffY = t[0].clientY - me._thumbnail_menu.ggDragLastY;
				me._thumbnail_menu.ggDragLastX = t[0].clientX;
				me._thumbnail_menu.ggDragLastY = t[0].clientY;
				me._thumbnail_menu.ggScrollByX(-diffX);
				me._thumbnail_menu.ggScrollByY(-diffY);
			}
		}
		elHorScrollBg = me._thumbnail_menu__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 400px; height: 15px; background-color: rgba(0,0,0,0.392157); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._thumbnail_menu__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 400px; height: 15px; background-color: rgba(0,0,0,1); pointer-events: auto;');
		me._thumbnail_menu.ggScrollPosX = 0;
		me._thumbnail_menu.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._thumbnail_menu.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragLastX = e.clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = t[0].clientX;
			document.ontouchend = function() {
				document.ontouchend = null;
				document.ontouchmove = null;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffX = t[0].clientX - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragLastX = t[0].clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			}
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if (e.offsetX < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._thumbnail_menu__horScrollBg.getBoundingClientRect();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._thumbnail_menu.ggScrollByXSmooth(20 * wheelDelta);
		});
		elCornerBg = me._thumbnail_menu__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="thumbnail_menu";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='bottom : 65px;';
		hs+='height : 85px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_menu.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_menu.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('vis_website') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._thumbnail_menu.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._thumbnail_menu.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._thumbnail_menu.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._thumbnail_menu.style.bottom='-100px';
					me._thumbnail_menu.ggUpdatePosition(true);
				}
				else {
					me._thumbnail_menu.ggDx=0;
					me._thumbnail_menu.style.bottom='65px';
					me._thumbnail_menu.ggUpdatePosition(true);
				}
			}
		}
		me._thumbnail_menu.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_thumbnail') == true)) && 
				((player.getIsTour() == true)) && 
				((player.getViewerSize().width > 450))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnail_menu.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnail_menu.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._thumbnail_menu.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu.ggCurrentLogicStateVisible == 0) {
					me._thumbnail_menu.style.visibility=(Number(me._thumbnail_menu.style.opacity)>0||!me._thumbnail_menu.style.opacity)?'inherit':'hidden';
					me._thumbnail_menu.ggVisible=true;
				}
				else {
					me._thumbnail_menu.style.visibility="hidden";
					me._thumbnail_menu.ggVisible=false;
				}
			}
		}
		me._thumbnail_menu.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnail_menu_show') == true)) && 
				((player.getVariableValue('vis_thumbnail_menu_auto_hide') == true)) && 
				((player.getVariableValue('vis_timer') == true)) && 
				((player.getViewerSize().width > 450))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_menu.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_menu.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_menu.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_menu.style.visibility=me._thumbnail_menu.ggVisible?'inherit':'hidden';
					me._thumbnail_menu.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_menu.style.opacity == 0.0) { me._thumbnail_menu.style.visibility="hidden"; } }, 505);
					me._thumbnail_menu.style.opacity=0;
				}
			}
		}
		me._thumbnail_menu.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
			}
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.left = '50%';
					this.ggContent.style.marginLeft = ((contentWidth/-2) - (this.ggVertScrollVisible ? (15/2) : 0)) + 'px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				var containerHeight = this.offsetHeight;
				if (this.ggHorScrollVisible) containerHeight -= 15;
				if (contentHeight < containerHeight) {
					this.ggContent.style.top = '50%';
					this.ggContent.style.marginTop = ((contentHeight/-2) - (this.ggHorScrollVisible ? (15/2) : 0))  + 'px';
				}
				else {
					this.ggContent.style.top = this.ggContentTopOffset + 'px';
					this.ggContent.style.marginTop = '0px';
				}
				if (contentWidth > offsetWidthWithScale) {
					me._thumbnail_menu__horScrollBg.style.visibility = 'inherit';
					me._thumbnail_menu__horScrollFg.style.visibility = 'inherit';
					me._thumbnail_menu.ggHorScrollVisible = true;
				} else {
					me._thumbnail_menu__horScrollBg.style.visibility = 'hidden';
					me._thumbnail_menu__horScrollFg.style.visibility = 'hidden';
					me._thumbnail_menu.ggHorScrollVisible = false;
				}
				if(me._thumbnail_menu.ggHorScrollVisible) {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.offsetHeight - 15;
					if (me._thumbnail_menu.ggVertScrollVisible) {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.offsetWidth - 15;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width - me._thumbnail_menu__horScrollBg.getBoundingClientRect().height;
					} else {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.offsetWidth;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width;
					}
					me._thumbnail_menu__horScrollBg.style.width = me._thumbnail_menu.ggAvailableWidth + 'px';
					me._thumbnail_menu.ggHPercentVisible = me._thumbnail_menu.ggAvailableWidthWithScale / contentWidth;
					if (me._thumbnail_menu.ggHPercentVisible > 1.0) me._thumbnail_menu.ggHPercentVisible = 1.0;
					me._thumbnail_menu.ggScrollWidth = Math.round(me._thumbnail_menu__horScrollBg.offsetWidth * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu__horScrollFg.style.width = me._thumbnail_menu.ggScrollWidth + 'px';
					me._thumbnail_menu.ggScrollPosX = me._thumbnail_menu.ggScrollPosXPercent * me._thumbnail_menu.ggAvailableWidth;
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
					me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
				} else {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.offsetHeight;
					me._thumbnail_menu.ggScrollPosX = 0;
					me._thumbnail_menu.ggScrollPosXPercent = 0.0;
				}
				if(horScrollWasVisible != me._thumbnail_menu.ggHorScrollVisible || vertScrollWasVisible != me._thumbnail_menu.ggVertScrollVisible) {
					me.updateSize(me._thumbnail_menu);
					me._thumbnail_menu.ggUpdatePosition();
				}
			}
		}
		el=me._thumbnail_cloner=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 96;
		el.ggHeight = 62;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._thumbnail_cloner.callChildLogicBlocks_changenode = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_active = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._thumbnail_cloner.ggUpdating == true) return;
			me._thumbnail_cloner.ggUpdating = true;
			var el=me._thumbnail_cloner;
			var curNumRows = 0;
			curNumRows = el.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumRows == curNumRows) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._thumbnail_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumCols = 1;
				el.ggNumRows = curNumRows;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._thumbnail_cloner.ggHeight) + 'px';
				parameter.left=(column * me._thumbnail_cloner.ggWidth) + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_thumbnail_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				row++;
				if (row >= el.ggNumRows) {
					row = 0;
					column++;
					el.ggNumCols++;
				}
				}
			}
			me._thumbnail_cloner.callChildLogicBlocks_changenode();
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_active();
			me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes();
			me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();
			me._thumbnail_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._thumbnail_cloner.parentNode.classList.contains('ggskin_subelement') && me._thumbnail_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._thumbnail_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "_nop_";
		el.ggId="thumbnail_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 62px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 96px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_cloner.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_cloner']=true;
		}
		me._thumbnail_cloner.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_cloner']=false;
		}
		me._thumbnail_cloner.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_cloner']=false;
		}
		me._thumbnail_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._thumbnail_cloner.childNodes.length; i++) {
				var child=me._thumbnail_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._thumbnail_cloner.ggUpdatePosition=function (useTransition) {
				me._thumbnail_cloner.ggUpdate();
		}
		me._thumbnail_cloner.ggNodeChange=function () {
			me._thumbnail_cloner.ggUpdateConditionNodeChange();
		}
		me._thumbnail_menu__content.appendChild(me._thumbnail_cloner);
		me.divSkin.appendChild(me._thumbnail_menu);
		el=me._thumbnail_menu_mobile=document.createElement('div');
		els=me._thumbnail_menu_mobile__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 76.764px;';
		hs+='left : 50%;';
		hs+='margin-left : -59.49px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 118.98px;';
		hs+="";
		els.setAttribute('style',hs);
		me._thumbnail_menu_mobile.ggScrollByX = function(diffX) {
			if(!me._thumbnail_menu_mobile.ggHorScrollVisible || diffX == 0) return;
			me._thumbnail_menu_mobile.ggScrollPosX = (me._thumbnail_menu_mobile__horScrollFg.offsetLeft + diffX);
			me._thumbnail_menu_mobile.ggScrollPosX = Math.max(me._thumbnail_menu_mobile.ggScrollPosX, 0);
			me._thumbnail_menu_mobile.ggScrollPosX = Math.min(me._thumbnail_menu_mobile.ggScrollPosX, me._thumbnail_menu_mobile__horScrollBg.offsetWidth - me._thumbnail_menu_mobile__horScrollFg.offsetWidth);
			me._thumbnail_menu_mobile__horScrollFg.style.left = me._thumbnail_menu_mobile.ggScrollPosX + 'px';
			me._thumbnail_menu_mobile__content.style.left = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosX / me._thumbnail_menu_mobile.ggHPercentVisible)) + me._thumbnail_menu_mobile.ggContentLeftOffset + 'px';
			me._thumbnail_menu_mobile.ggScrollPosXPercent = (me._thumbnail_menu_mobile__horScrollFg.offsetLeft / me._thumbnail_menu_mobile__horScrollBg.offsetWidth);
		}
		me._thumbnail_menu_mobile.ggScrollByXSmooth = function(diffX) {
			if(!me._thumbnail_menu_mobile.ggHorScrollVisible || diffX == 0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._thumbnail_menu_mobile.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_menu_mobile.ggScrollPosX >= me._thumbnail_menu_mobile__horScrollBg.offsetWidth - me._thumbnail_menu_mobile__horScrollFg.offsetWidth)) {
					me._thumbnail_menu_mobile.ggScrollPosX = Math.min(me._thumbnail_menu_mobile.ggScrollPosX, me._thumbnail_menu_mobile__horScrollBg.offsetWidth - me._thumbnail_menu_mobile__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_menu_mobile.ggScrollPosX <= 0)) {
					me._thumbnail_menu_mobile.ggScrollPosX = Math.max(me._thumbnail_menu_mobile.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._thumbnail_menu_mobile__horScrollFg.style.left = me._thumbnail_menu_mobile.ggScrollPosX + 'px';
			me._thumbnail_menu_mobile__content.style.left = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosX / me._thumbnail_menu_mobile.ggHPercentVisible)) + me._thumbnail_menu_mobile.ggContentLeftOffset + 'px';
			me._thumbnail_menu_mobile.ggScrollPosXPercent = (me._thumbnail_menu_mobile__horScrollFg.offsetLeft / me._thumbnail_menu_mobile__horScrollBg.offsetWidth);
			}, 10);
		}
		me._thumbnail_menu_mobile.ggScrollByY = function(diffY) {
			if(!me._thumbnail_menu_mobile.ggVertScrollVisible || diffY == 0) return;
			me._thumbnail_menu_mobile.ggScrollPosY = (me._thumbnail_menu_mobile__vertScrollFg.offsetTop + diffY);
			me._thumbnail_menu_mobile.ggScrollPosY = Math.max(me._thumbnail_menu_mobile.ggScrollPosY, 0);
			me._thumbnail_menu_mobile.ggScrollPosY = Math.min(me._thumbnail_menu_mobile.ggScrollPosY, me._thumbnail_menu_mobile__vertScrollBg.offsetHeight - me._thumbnail_menu_mobile__vertScrollFg.offsetHeight);
			me._thumbnail_menu_mobile__vertScrollFg.style.top = me._thumbnail_menu_mobile.ggScrollPosY + 'px';
			me._thumbnail_menu_mobile__content.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + me._thumbnail_menu_mobile.ggContentTopOffset + 'px';
			me._thumbnail_menu_mobile.ggScrollPosYPercent = (me._thumbnail_menu_mobile__vertScrollFg.offsetTop / me._thumbnail_menu_mobile__vertScrollBg.offsetHeight);
		}
		me._thumbnail_menu_mobile.ggScrollByYSmooth = function(diffY) {
			if(!me._thumbnail_menu_mobile.ggVertScrollVisible || diffY == 0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._thumbnail_menu_mobile.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_menu_mobile.ggScrollPosY >= me._thumbnail_menu_mobile__vertScrollBg.offsetHeight - me._thumbnail_menu_mobile__vertScrollFg.offsetHeight)) {
					me._thumbnail_menu_mobile.ggScrollPosY = Math.min(me._thumbnail_menu_mobile.ggScrollPosY, me._thumbnail_menu_mobile__vertScrollBg.offsetHeight - me._thumbnail_menu_mobile__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_menu_mobile.ggScrollPosY <= 0)) {
					me._thumbnail_menu_mobile.ggScrollPosY = Math.max(me._thumbnail_menu_mobile.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._thumbnail_menu_mobile__vertScrollFg.style.top = me._thumbnail_menu_mobile.ggScrollPosY + 'px';
			me._thumbnail_menu_mobile__content.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + me._thumbnail_menu_mobile.ggContentTopOffset + 'px';
			me._thumbnail_menu_mobile.ggScrollPosYPercent = (me._thumbnail_menu_mobile__vertScrollFg.offsetTop / me._thumbnail_menu_mobile__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._thumbnail_menu_mobile.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._thumbnail_menu_mobile.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._thumbnail_menu_mobile.ggHPercentVisible);
					me._thumbnail_menu_mobile.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._thumbnail_menu_mobile.offsetWidth - (me._thumbnail_menu_mobile.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._thumbnail_menu_mobile.offsetWidth - (me._thumbnail_menu_mobile.ggVertScrollVisible ? 15 : 0))) * me._thumbnail_menu_mobile.ggHPercentVisible);
					me._thumbnail_menu_mobile.ggScrollByXSmooth(diffX);
				}
			}
			if (me._thumbnail_menu_mobile.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._thumbnail_menu_mobile.ggVPercentVisible);
					me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._thumbnail_menu_mobile.offsetHeight - (me._thumbnail_menu_mobile.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._thumbnail_menu_mobile.offsetHeight - (me._thumbnail_menu_mobile.ggHorScrollVisible ? 15 : 0))) * me._thumbnail_menu_mobile.ggVPercentVisible);
					me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._thumbnail_menu_mobile.ggDragLastX = t[0].clientX;
			me._thumbnail_menu_mobile.ggDragLastY = t[0].clientY;
			me._thumbnail_menu_mobile__content.ontouchend = function() {
				me._thumbnail_menu_mobile__content.ontouchend = null;
				me._thumbnail_menu_mobile__content.ontouchmove = null;
			}
			me._thumbnail_menu_mobile__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffX = t[0].clientX - me._thumbnail_menu_mobile.ggDragLastX;
				var diffY = t[0].clientY - me._thumbnail_menu_mobile.ggDragLastY;
				me._thumbnail_menu_mobile.ggDragLastX = t[0].clientX;
				me._thumbnail_menu_mobile.ggDragLastY = t[0].clientY;
				me._thumbnail_menu_mobile.ggScrollByX(-diffX);
				me._thumbnail_menu_mobile.ggScrollByY(-diffY);
			}
		}
		elVertScrollBg = me._thumbnail_menu_mobile__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 280px; background-color: rgba(0,0,0,0.392157); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._thumbnail_menu_mobile__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 280px; background-color: rgba(0,0,0,1); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._thumbnail_menu_mobile.ggScrollPosY = 0;
		me._thumbnail_menu_mobile.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._thumbnail_menu_mobile.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._thumbnail_menu_mobile.ggDragLastY;
				me._thumbnail_menu_mobile.ggDragLastY = e.clientY;
				me._thumbnail_menu_mobile.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._thumbnail_menu_mobile.ggDragLastY = t[0].clientY;
			document.ontouchend = function() {
				document.ontouchend = null;
				document.ontouchmove = null;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffY = t[0].clientY - me._thumbnail_menu_mobile.ggDragLastY;
				me._thumbnail_menu_mobile.ggDragLastY = t[0].clientY;
				me._thumbnail_menu_mobile.ggScrollByY(diffY);
			}
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._thumbnail_menu_mobile.ggScrollHeight;
			if (e.offsetY < me._thumbnail_menu_mobile.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._thumbnail_menu_mobile__vertScrollBg.getBoundingClientRect();
			var diffY = me._thumbnail_menu_mobile.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._thumbnail_menu_mobile.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._thumbnail_menu_mobile.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._thumbnail_menu_mobile__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="thumbnail_menu_mobile";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : hidden;';
		hs+='width : 90%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_menu_mobile.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_menu_mobile.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._thumbnail_menu_mobile.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._thumbnail_menu_mobile.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._thumbnail_menu_mobile.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu_mobile.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._thumbnail_menu_mobile.style.top='1000px';
					me._thumbnail_menu_mobile.ggUpdatePosition(true);
				}
				else {
					me._thumbnail_menu_mobile.ggDx=0;
					me._thumbnail_menu_mobile.style.top='10px';
					me._thumbnail_menu_mobile.ggUpdatePosition(true);
				}
			}
		}
		me._thumbnail_menu_mobile.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_thumbnail') == true)) && 
				((player.getIsTour() == true)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnail_menu_mobile.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnail_menu_mobile.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._thumbnail_menu_mobile.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu_mobile.ggCurrentLogicStateVisible == 0) {
					me._thumbnail_menu_mobile.style.visibility=(Number(me._thumbnail_menu_mobile.style.opacity)>0||!me._thumbnail_menu_mobile.style.opacity)?'inherit':'hidden';
					me._thumbnail_menu_mobile.ggVisible=true;
				}
				else {
					me._thumbnail_menu_mobile.style.visibility="hidden";
					me._thumbnail_menu_mobile.ggVisible=false;
				}
			}
		}
		me._thumbnail_menu_mobile.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnail_menu_mobile') == true)) && 
				((player.getVariableValue('vis_thumbnail_menu_auto_hide') == true)) && 
				((player.getVariableValue('vis_timer') == true)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_menu_mobile.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_menu_mobile.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_menu_mobile.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu_mobile.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_menu_mobile.style.visibility=me._thumbnail_menu_mobile.ggVisible?'inherit':'hidden';
					me._thumbnail_menu_mobile.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_menu_mobile.style.opacity == 0.0) { me._thumbnail_menu_mobile.style.visibility="hidden"; } }, 505);
					me._thumbnail_menu_mobile.style.opacity=0;
				}
			}
		}
		me._thumbnail_menu_mobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.left = '50%';
					this.ggContent.style.marginLeft = ((contentWidth/-2) - (this.ggVertScrollVisible ? (15/2) : 0)) + 'px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				this.ggContent.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if ((me._thumbnail_menu_mobile.ggHorScrollVisible && contentHeight > this.offsetHeight - 15) || (!me._thumbnail_menu_mobile.ggHorScrollVisible && contentHeight > this.offsetHeight)) {
					me._thumbnail_menu_mobile__vertScrollBg.style.visibility = 'inherit';
					me._thumbnail_menu_mobile__vertScrollFg.style.visibility = 'inherit';
					me._thumbnail_menu_mobile.ggVertScrollVisible = true;
				} else {
					me._thumbnail_menu_mobile__vertScrollBg.style.visibility = 'hidden';
					me._thumbnail_menu_mobile__vertScrollFg.style.visibility = 'hidden';
					me._thumbnail_menu_mobile.ggVertScrollVisible = false;
				}
				if(me._thumbnail_menu_mobile.ggVertScrollVisible) {
					me._thumbnail_menu_mobile.ggAvailableWidth = me._thumbnail_menu_mobile.offsetWidth - 15;
					if (me._thumbnail_menu_mobile.ggHorScrollVisible) {
						me._thumbnail_menu_mobile.ggAvailableHeight = me._thumbnail_menu_mobile.offsetHeight - 15;
						me._thumbnail_menu_mobile.ggAvailableHeightWithScale = me._thumbnail_menu_mobile.getBoundingClientRect().height - me._thumbnail_menu_mobile__vertScrollBg.getBoundingClientRect().width;
						me._thumbnail_menu_mobile__cornerBg.style.visibility = 'inherit';
					} else {
						me._thumbnail_menu_mobile.ggAvailableHeight = me._thumbnail_menu_mobile.offsetHeight;
						me._thumbnail_menu_mobile.ggAvailableHeightWithScale = me._thumbnail_menu_mobile.getBoundingClientRect().height;
						me._thumbnail_menu_mobile__cornerBg.style.visibility = 'hidden';
					}
					me._thumbnail_menu_mobile__vertScrollBg.style.height = me._thumbnail_menu_mobile.ggAvailableHeight + 'px';
					me._thumbnail_menu_mobile.ggVPercentVisible = me._thumbnail_menu_mobile.ggAvailableHeightWithScale / contentHeight;
					if (me._thumbnail_menu_mobile.ggVPercentVisible > 1.0) me._thumbnail_menu_mobile.ggVPercentVisible = 1.0;
					me._thumbnail_menu_mobile.ggScrollHeight =  Math.round(me._thumbnail_menu_mobile__vertScrollBg.offsetHeight * me._thumbnail_menu_mobile.ggVPercentVisible);
					me._thumbnail_menu_mobile__vertScrollFg.style.height = me._thumbnail_menu_mobile.ggScrollHeight + 'px';
					me._thumbnail_menu_mobile.ggScrollPosY = me._thumbnail_menu_mobile.ggScrollPosYPercent * me._thumbnail_menu_mobile.ggAvailableHeight;
					me._thumbnail_menu_mobile.ggScrollPosY = Math.min(me._thumbnail_menu_mobile.ggScrollPosY, me._thumbnail_menu_mobile__vertScrollBg.offsetHeight - me._thumbnail_menu_mobile__vertScrollFg.offsetHeight);
					me._thumbnail_menu_mobile__vertScrollFg.style.top = me._thumbnail_menu_mobile.ggScrollPosY + 'px';
					me._thumbnail_menu_mobile__content.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				} else {
					me._thumbnail_menu_mobile.ggAvailableWidth = me._thumbnail_menu_mobile.offsetWidth;
					me._thumbnail_menu_mobile.ggScrollPosY = 0;
					me._thumbnail_menu_mobile.ggScrollPosYPercent = 0.0;
					me._thumbnail_menu_mobile__content.style.top = this.ggContentTopOffset + 'px';
					me._thumbnail_menu_mobile__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._thumbnail_menu_mobile.ggHorScrollVisible || vertScrollWasVisible != me._thumbnail_menu_mobile.ggVertScrollVisible) {
					me.updateSize(me._thumbnail_menu_mobile);
					me._thumbnail_menu_mobile.ggUpdatePosition();
				}
			}
		}
		el=me._thumbnail_cloner_mobile=document.createElement('div');
		el.ggNumRepeat = 100;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 96;
		el.ggHeight = 62;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._thumbnail_cloner_mobile.callChildLogicBlocks_changenode = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha();
					}
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha();
					}
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_active = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor();
					}
					if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible) {
						me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_changevisitednodes = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible) {
						me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._thumbnail_cloner_mobile.ggUpdating == true) return;
			me._thumbnail_cloner_mobile.ggUpdating = true;
			var el=me._thumbnail_cloner_mobile;
			var curNumCols = 0;
			var parentWidth = me._thumbnail_cloner_mobile.parentNode.classList.contains('ggskin_subelement') ? (me._thumbnail_cloner_mobile.parentNode.parentNode.classList.contains('ggskin_scrollarea') ? me._thumbnail_cloner_mobile.parentNode.parentNode.ggAvailableWidth : me._thumbnail_cloner_mobile.parentNode.parentNode.clientWidth) : me._thumbnail_cloner_mobile.parentNode.clientWidth;
			if (parentWidth == 0) parentWidth = me._thumbnail_cloner_mobile.parentNode.parentNode.clientWidth;
			curNumCols = Math.floor((parentWidth * me._thumbnail_cloner_mobile.ggNumRepeat / 100.0) / me._thumbnail_cloner_mobile.offsetWidth);
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._thumbnail_cloner_mobile.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._thumbnail_cloner_mobile.ggHeight) + 'px';
				parameter.left=(column * me._thumbnail_cloner_mobile.ggWidth) + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_thumbnail_cloner_mobile_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._thumbnail_cloner_mobile.callChildLogicBlocks_changenode();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_active();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_changevisitednodes();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();
			me._thumbnail_cloner_mobile.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._thumbnail_cloner_mobile.parentNode.classList.contains('ggskin_subelement') && me._thumbnail_cloner_mobile.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._thumbnail_cloner_mobile.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "_nop_";
		el.ggId="thumbnail_cloner_mobile";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 62px;';
		hs+='left : 1.98px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 1.764px;';
		hs+='visibility : inherit;';
		hs+='width : 96px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_cloner_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_cloner_mobile.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_cloner_mobile']=true;
		}
		me._thumbnail_cloner_mobile.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_cloner_mobile']=false;
		}
		me._thumbnail_cloner_mobile.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_cloner_mobile']=false;
		}
		me._thumbnail_cloner_mobile.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._thumbnail_cloner_mobile.childNodes.length; i++) {
				var child=me._thumbnail_cloner_mobile.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.ggUpdatePosition=function (useTransition) {
				me._thumbnail_cloner_mobile.ggUpdate();
		}
		me._thumbnail_cloner_mobile.ggNodeChange=function () {
			me._thumbnail_cloner_mobile.ggUpdateConditionNodeChange();
		}
		me._thumbnail_menu_mobile__content.appendChild(me._thumbnail_cloner_mobile);
		me.divSkin.appendChild(me._thumbnail_menu_mobile);
		el=me._loading=document.createElement('div');
		el.ggId="loading";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 60px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 210px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_loader') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._loading.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._loading.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._loading.style[domTransition]='';
				if (me._loading.ggCurrentLogicStateVisible == 0) {
					me._loading.style.visibility=(Number(me._loading.style.opacity)>0||!me._loading.style.opacity)?'inherit':'hidden';
					me._loading.ggVisible=true;
				}
				else {
					me._loading.style.visibility="hidden";
					me._loading.ggVisible=false;
				}
			}
		}
		me._loading.onclick=function (e) {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		me._loading.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._loadingbg=document.createElement('div');
		el.ggId="loadingbg";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 60px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 210px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loadingbg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingbg.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._loading.appendChild(me._loadingbg);
		el=me._loadingtext=document.createElement('div');
		els=me._loadingtext__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="loadingtext";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 25px;';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 178px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._loadingtext.ggUpdateText=function() {
			var hs="Loading... "+(player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loadingtext.ggUpdateText();
		player.addListener('downloadprogress', function() {
			me._loadingtext.ggUpdateText();
		});
		el.appendChild(els);
		me._loadingtext.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingtext.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._loading.appendChild(me._loadingtext);
		el=me._loadingbar=document.createElement('div');
		el.ggId="loadingbar";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #808080;';
		hs+='bottom : 12px;';
		hs+='cursor : default;';
		hs+='height : 13px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 182px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		me._loadingbar.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingbar.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._loading.appendChild(me._loadingbar);
		me.divSkin.appendChild(me._loading);
		el=me._web_page=document.createElement('div');
		els=me._web_page__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="web_page";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 90%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 90%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._web_page.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._web_page.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._web_page.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._web_page.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._web_page.style[domTransition]='';
				if (me._web_page.ggCurrentLogicStateVisible == 0) {
					me._web_page.style.visibility=(Number(me._web_page.style.opacity)>0||!me._web_page.style.opacity)?'inherit':'hidden';
					me._web_page.ggVisible=true;
				}
				else {
					me._web_page.style.visibility="hidden";
					me._web_page.ggVisible=false;
				}
			}
		}
		me._web_page.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._web_page);
		el=me._userdata=document.createElement('div');
		el.ggId="userdata";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 140px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 240px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdata.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._userdata.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._userdata.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._userdata.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._userdata.style[domTransition]='';
				if (me._userdata.ggCurrentLogicStateVisible == 0) {
					me._userdata.style.visibility=(Number(me._userdata.style.opacity)>0||!me._userdata.style.opacity)?'inherit':'hidden';
					me._userdata.ggVisible=true;
				}
				else {
					me._userdata.style.visibility="hidden";
					me._userdata.ggVisible=false;
				}
			}
		}
		me._userdata.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._userdatabg=document.createElement('div');
		el.ggId="userdatabg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.784314);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 140px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 240px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdatabg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdatabg.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdatabg);
		el=me._userdata_title=document.createElement('div');
		els=me._userdata_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		hs+='font-weight: bold;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_title.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_title.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_title.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_title.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_title);
		el=me._userdata_description=document.createElement('div');
		els=me._userdata_description__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_description";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 30px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_description.ggUpdateText=function() {
			var hs=me.ggUserdata.description;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_description.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_description.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_description.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_description.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_description);
		el=me._userdata_author=document.createElement('div');
		els=me._userdata_author__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_author";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_author.ggUpdateText=function() {
			var hs=me.ggUserdata.author;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_author.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_author.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_author.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_author.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_author);
		el=me._userdata_datetime=document.createElement('div');
		els=me._userdata_datetime__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_datetime";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 70px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 23px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_datetime.ggUpdateText=function() {
			var hs=me.ggUserdata.datetime;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_datetime.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_datetime.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_datetime.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_datetime.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_datetime);
		el=me._userdata_copyright=document.createElement('div');
		els=me._userdata_copyright__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_copyright";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 110px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 23px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_copyright.ggUpdateText=function() {
			var hs="&#169; "+me.ggUserdata.copyright;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_copyright.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_copyright.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_copyright.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_copyright.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_copyright);
		el=me._userdata_close=document.createElement('div');
		els=me._userdata_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyBoZWlnaHQ9IjMycHgiIHdpZHRoPSIzMnB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgdGV4dC1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyBpbWFnZS1yZW5kZXJpbmc6b3B0aW1pemVRdWFsaXR5Oy'+
			'BmaWxsLXJ1bGU6ZXZlbm9kZDsgY2xpcC1ydWxlOmV2ZW5vZGQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjAxMiIgZD0iTSAwLjUsLTAuNSBDIDAuODMzMzMzLC0wLjUgMS4xNjY2NywtMC41IDEuNSwtMC41QyAxLjMxNDY4LDAuMTcwMTQzIDAuOTgxMzQ2LDAuMTcwMTQzIDAuNSwtMC41IFoiIGZpbGw9IiNiZmMwYmYiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDA0IiBkPSJNIDIxLjUsLTAuNSBDIDIxLjgzMzMsLTAuNSAyMi4xNjY3LC0wLjUgMjIuNSwtMC41QyAyMi41LC0wLjE2NjY2NyAy'+
			'Mi41LDAuMTY2NjY3IDIyLjUsMC41QyAyMi4xNjY3LDAuMTY2NjY3IDIxLjgzMzMsLTAuMTY2NjY3IDIxLjUsLTAuNSBaIiBmaWxsPSIjYmZjMGJmIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eToxIiBkPSJNIDIxLjUsMS41IEMgMjQuNTUyNiw0LjM5MDQzIDI3LjA1MjYsNy43MjM3NiAyOSwxMS41QyAyOS40OTY2LDEzLjgwOTggMjkuNjYzMywxNi4xNDMyIDI5LjUsMTguNUMgMjkuNSwxOC44MzMzIDI5LjUsMTkuMTY2NyAyOS41LDE5LjVDIDI3LjM3NTUsMjQuNjI4NyAyMy43MDg4LDI3Ljk2MiAxOC41LDI5LjVDIDE2LjE2NjcsMjkuNSAxMy44MzMzLDI5LjUgMTEuNSwyOS'+
			'41QyA5LjM4MDUzLDI3LjYwMDIgNy4wNDcyLDI1LjkzMzYgNC41LDI0LjVDIDQuNSwyMy44MzMzIDQuMTY2NjcsMjMuNSAzLjUsMjMuNUMgLTAuMDcwODg3NCwxNS44MTk0IDEuMjYyNDUsOS4xNTI3NSA3LjUsMy41QyA4LjI0OTQ3LDEuNzUzODQgOS41ODI4LDAuNzUzODM5IDExLjUsMC41QyAxNC44OTk0LDEuMTE3NTggMTguMjMyNywxLjQ1MDkxIDIxLjUsMS41IFoiIGZpbGw9IiMxODVhOWUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDI0IiBkPSJNIDIuNSw0LjUgQyAxLjgzMzMzLDQuNSAxLjUsNC44MzMzMyAxLjUsNS41QyAxLjE2NjY3LDUuNSAwLjgzMzMzMyw1'+
			'LjUgMC41LDUuNUMgMC42MDk0NTIsMi40NjU4NyAxLjk0Mjc5LDEuNDY1ODcgNC41LDIuNUMgMy43NTczMSwzLjE4MTg1IDMuMDkwNjUsMy44NDg1MSAyLjUsNC41IFoiIGZpbGw9IiNkZmRmZGYiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDM4IiBkPSJNIDcuNSwzLjUgQyAxLjI2MjQ1LDkuMTUyNzUgLTAuMDcwODg3NCwxNS44MTk0IDMuNSwyMy41QyA0LjE2NjY3LDIzLjUgNC41LDIzLjgzMzMgNC41LDI0LjVDIDcuMDQ3MiwyNS45MzM2IDkuMzgwNTMsMjcuNjAwMiAxMS41LDI5LjVDIDEyLjE2NjcsMzAuMTY2NyAxMi44MzMzLDMwLjgzMzMgMTMuNSwzMS41QyAxMi'+
			'41LDMxLjUgMTEuNSwzMS41IDEwLjUsMzEuNUMgMTAuNjMwOSwzMC42MjM2IDEwLjI5NzUsMjkuOTU2OSA5LjUsMjkuNUMgNy42NjM4OCwzMC4wMjc2IDUuOTk3MjEsMzAuNjk0MiA0LjUsMzEuNUMgMi44MzMzMywzMS41IDEuMTY2NjcsMzEuNSAtMC41LDMxLjVDIC0wLjUsMjcuNSAtMC41LDIzLjUgLTAuNSwxOS41QyAwLjgzMzMzMywxOC41IDAuODMzMzMzLDE3LjUgLTAuNSwxNi41QyAtMC41LDE1LjUgLTAuNSwxNC41IC0wLjUsMTMuNUMgMC44MzMzMzMsMTIuODMzMyAwLjgzMzMzMywxMi4xNjY3IC0wLjUsMTEuNUMgLTAuNSw5LjUgLTAuNSw3LjUgLTAuNSw1LjVDIC0wLjE2NjY2Nyw1LjUg'+
			'MC4xNjY2NjcsNS41IDAuNSw1LjVDIDAuODMzMzMzLDYuODMzMzMgMS4xNjY2Nyw2LjgzMzMzIDEuNSw1LjVDIDIuMTY2NjcsNS41IDIuNSw1LjE2NjY3IDIuNSw0LjVDIDQuMjE2MSw0LjM3MTMzIDUuODgyNzcsNC4wMzggNy41LDMuNSBaIE0gNC41LDI4LjUgQyA0LjIxNzE5LDI5LjI4OTEgMy43MTcxOSwyOS45NTU4IDMsMzAuNUMgMi40NzE4OSwyOS4xODQgMi45NzE4OSwyOC41MTczIDQuNSwyOC41IFoiIGZpbGw9IiNlMGUwZTAiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDE5IiBkPSJNIDIyLjUsMC41IEMgMjQuODgwOSwxLjQxOTU2IDI3LjIxNDMsMS40MTk1Ni'+
			'AyOS41LDAuNUMgMzAuMTY5OCwyLjI5MTQxIDMwLjgzNjUsMy45NTgwOCAzMS41LDUuNUMgMzEuNSw2LjUgMzEuNSw3LjUgMzEuNSw4LjVDIDMwLjE2NjcsOC44MzMzMyAzMC4xNjY3LDkuMTY2NjcgMzEuNSw5LjVDIDMxLjUsOS44MzMzMyAzMS41LDEwLjE2NjcgMzEuNSwxMC41QyAzMC44MzMzLDEzLjE2NjcgMzAuMTY2NywxNS44MzMzIDI5LjUsMTguNUMgMjkuNjYzMywxNi4xNDMyIDI5LjQ5NjYsMTMuODA5OCAyOSwxMS41QyAyNy4wNTI2LDcuNzIzNzYgMjQuNTUyNiw0LjM5MDQzIDIxLjUsMS41QyAyMi4xNjY3LDEuNSAyMi41LDEuMTY2NjcgMjIuNSwwLjUgWiBNIDI3LjUsNC41IEMgMjku'+
			'MzM3LDQuNjM5NDUgMjkuNjcwNCw1LjMwNjEyIDI4LjUsNi41QyAyNy43MDI1LDYuMDQzMTEgMjcuMzY5MSw1LjM3NjQ0IDI3LjUsNC41IFoiIGZpbGw9IiNlZWVlZWUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjEiIGQ9Ik0gMTAuNSw3LjUgQyAxMi4xNDc3LDguODA5NzggMTMuODE0NCwxMC4xNDMxIDE1LjUsMTEuNUMgMTcuMTQ4NywxMC4zNTIzIDE4LjY0ODcsOS4wMTg5OSAyMCw3LjVDIDIxLjE2NjcsOC42NjY2NyAyMi4zMzMzLDkuODMzMzMgMjMuNSwxMUMgMjEuOTgxLDEyLjM1MTMgMjAuNjQ3NywxMy44NTEzIDE5LjUsMTUuNUMgMjAuNjQ3NywxNy4xNDg3IDIxLj'+
			'k4MSwxOC42NDg3IDIzLjUsMjBDIDIyLjMzMzMsMjEuMTY2NyAyMS4xNjY3LDIyLjMzMzMgMjAsMjMuNUMgMTguNjQ4NywyMS45ODEgMTcuMTQ4NywyMC42NDc3IDE1LjUsMTkuNUMgMTMuODUxMywyMC42NDc3IDEyLjM1MTMsMjEuOTgxIDExLDIzLjVDIDkuODMzMzMsMjIuMzMzMyA4LjY2NjY3LDIxLjE2NjcgNy41LDIwQyA5LjAxODk5LDE4LjY0ODcgMTAuMzUyMywxNy4xNDg3IDExLjUsMTUuNUMgMTAuMzUyMywxMy44NTEzIDkuMDE4OTksMTIuMzUxMyA3LjUsMTFDIDguNzEwMSw5Ljk2MDkgOS43MTAxLDguNzk0MjMgMTAuNSw3LjUgWiIgZmlsbD0iI2ZlZmVmZSIvPgogPC9nPgogPGc+CiAg'+
			'PHBhdGggc3R5bGU9Im9wYWNpdHk6MC4wMTYiIGQ9Ik0gMzAuNSwyMC41IEMgMzAuODMzMywyMC41IDMxLjE2NjcsMjAuNSAzMS41LDIwLjVDIDMxLjUsMjAuODMzMyAzMS41LDIxLjE2NjcgMzEuNSwyMS41QyAzMS4xNjY3LDIxLjE2NjcgMzAuODMzMywyMC44MzMzIDMwLjUsMjAuNSBaIiBmaWxsPSIjZmVmZmZlIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjA3OCIgZD0iTSAyOS41LDE5LjUgQyAzMC4xNjY3LDE5LjUgMzAuNSwxOS44MzMzIDMwLjUsMjAuNUMgMjkuNDAxNywyMS42MDA5IDI5LjIzNSwyMi45MzQzIDMwLDI0LjVDIDMwLjI3ODQsMjMuNTg0MiAzMC43Nz'+
			'g0LDIyLjkxNzUgMzEuNSwyMi41QyAzMS41LDIzLjgzMzMgMzEuNSwyNS4xNjY3IDMxLjUsMjYuNUMgMjcuNDYzMSwyNy42MTY0IDIzLjEyOTgsMjguNjE2NCAxOC41LDI5LjVDIDIzLjcwODgsMjcuOTYyIDI3LjM3NTUsMjQuNjI4NyAyOS41LDE5LjUgWiIgZmlsbD0iI2UxZTFlMSIvPgogPC9nPgogPGc+CiAgPHBhdGggc3R5bGU9Im9wYWNpdHk6MC4wMTQiIGQ9Ik0gMjguNSwyOS41IEMgMjQuMTYzMywzMC43NDU0IDIzLjgzLDMwLjQxMjEgMjcuNSwyOC41QyAyOC4xMDY3LDI4LjYyMzYgMjguNDQsMjguOTU2OSAyOC41LDI5LjUgWiIgZmlsbD0iI2NhY2FjYSIvPgogPC9nPgogPGc+CiAgPHBh'+
			'dGggc3R5bGU9Im9wYWNpdHk6MC4wMDQiIGQ9Ik0gMzEuNSwyOC41IEMgMzEuNSwyOC44MzMzIDMxLjUsMjkuMTY2NyAzMS41LDI5LjVDIDMwLjgyOTksMjkuMDE4NyAzMC44Mjk5LDI4LjY4NTMgMzEuNSwyOC41IFoiIGZpbGw9IiNmZWZmZmUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDA0IiBkPSJNIDI4LjUsMjkuNSBDIDI5LjgzMzMsMzAuMTY2NyAyOS44MzMzLDMwLjE2NjcgMjguNSwyOS41IFoiIGZpbGw9IiNiZmMwYmYiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDA0IiBkPSJNIDE1LjUsMzEuNSBDIDE2LjUsMzAuMTY2NyAxNy41LD'+
			'MwLjE2NjcgMTguNSwzMS41QyAxNy41LDMxLjUgMTYuNSwzMS41IDE1LjUsMzEuNSBaIiBmaWxsPSIjZGZkZmRmIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjAwNCIgZD0iTSAyMS41LDMxLjUgQyAyMC44MzMzLDMwLjE2NjcgMjAuODMzMywzMC4xNjY3IDIxLjUsMzEuNSBaIiBmaWxsPSIjZmVmZmZlIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjAwNCIgZD0iTSAzMS41LDMwLjUgQyAzMS41LDMwLjgzMzMgMzEuNSwzMS4xNjY3IDMxLjUsMzEuNUMgMzAuODI5OSwzMS4wMTg3IDMwLjgyOTksMzAuNjg1MyAzMS41LDMwLjUgWiIgZmlsbD0iI2Zl'+
			'ZmZmZSIvPgogPC9nPgo8L3N2Zz4K';
		me._userdata_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._userdata_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyBoZWlnaHQ9IjMycHgiIHdpZHRoPSIzMnB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgdGV4dC1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyBpbWFnZS1yZW5kZXJpbmc6b3B0aW1pemVRdWFsaXR5Oy'+
			'BmaWxsLXJ1bGU6ZXZlbm9kZDsgY2xpcC1ydWxlOmV2ZW5vZGQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjAxMiIgZD0iTSAwLjUsLTAuNSBDIDAuODMzMzMzLC0wLjUgMS4xNjY2NywtMC41IDEuNSwtMC41QyAxLjMxNDY4LDAuMTcwMTQzIDAuOTgxMzQ2LDAuMTcwMTQzIDAuNSwtMC41IFoiIGZpbGw9IiNiZmMwYmYiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDA0IiBkPSJNIDIxLjUsLTAuNSBDIDIxLjgzMzMsLTAuNSAyMi4xNjY3LC0wLjUgMjIuNSwtMC41QyAyMi41LC0wLjE2NjY2NyAy'+
			'Mi41LDAuMTY2NjY3IDIyLjUsMC41QyAyMi4xNjY3LDAuMTY2NjY3IDIxLjgzMzMsLTAuMTY2NjY3IDIxLjUsLTAuNSBaIiBmaWxsPSIjYmZjMGJmIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eToxIiBkPSJNIDIxLjUsMS41IEMgMjQuNTUyNiw0LjM5MDQzIDI3LjA1MjYsNy43MjM3NiAyOSwxMS41QyAyOS40OTY2LDEzLjgwOTggMjkuNjYzMywxNi4xNDMyIDI5LjUsMTguNUMgMjkuNSwxOC44MzMzIDI5LjUsMTkuMTY2NyAyOS41LDE5LjVDIDI3LjM3NTUsMjQuNjI4NyAyMy43MDg4LDI3Ljk2MiAxOC41LDI5LjVDIDE2LjE2NjcsMjkuNSAxMy44MzMzLDI5LjUgMTEuNSwyOS'+
			'41QyA5LjM4MDUzLDI3LjYwMDIgNy4wNDcyLDI1LjkzMzYgNC41LDI0LjVDIDQuNSwyMy44MzMzIDQuMTY2NjcsMjMuNSAzLjUsMjMuNUMgLTAuMDcwODg3NCwxNS44MTk0IDEuMjYyNDUsOS4xNTI3NSA3LjUsMy41QyA4LjI0OTQ3LDEuNzUzODQgOS41ODI4LDAuNzUzODM5IDExLjUsMC41QyAxNC44OTk0LDEuMTE3NTggMTguMjMyNywxLjQ1MDkxIDIxLjUsMS41IFoiIGZpbGw9IiMxODVhOWUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDI0IiBkPSJNIDIuNSw0LjUgQyAxLjgzMzMzLDQuNSAxLjUsNC44MzMzMyAxLjUsNS41QyAxLjE2NjY3LDUuNSAwLjgzMzMzMyw1'+
			'LjUgMC41LDUuNUMgMC42MDk0NTIsMi40NjU4NyAxLjk0Mjc5LDEuNDY1ODcgNC41LDIuNUMgMy43NTczMSwzLjE4MTg1IDMuMDkwNjUsMy44NDg1MSAyLjUsNC41IFoiIGZpbGw9IiNkZmRmZGYiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDM4IiBkPSJNIDcuNSwzLjUgQyAxLjI2MjQ1LDkuMTUyNzUgLTAuMDcwODg3NCwxNS44MTk0IDMuNSwyMy41QyA0LjE2NjY3LDIzLjUgNC41LDIzLjgzMzMgNC41LDI0LjVDIDcuMDQ3MiwyNS45MzM2IDkuMzgwNTMsMjcuNjAwMiAxMS41LDI5LjVDIDEyLjE2NjcsMzAuMTY2NyAxMi44MzMzLDMwLjgzMzMgMTMuNSwzMS41QyAxMi'+
			'41LDMxLjUgMTEuNSwzMS41IDEwLjUsMzEuNUMgMTAuNjMwOSwzMC42MjM2IDEwLjI5NzUsMjkuOTU2OSA5LjUsMjkuNUMgNy42NjM4OCwzMC4wMjc2IDUuOTk3MjEsMzAuNjk0MiA0LjUsMzEuNUMgMi44MzMzMywzMS41IDEuMTY2NjcsMzEuNSAtMC41LDMxLjVDIC0wLjUsMjcuNSAtMC41LDIzLjUgLTAuNSwxOS41QyAwLjgzMzMzMywxOC41IDAuODMzMzMzLDE3LjUgLTAuNSwxNi41QyAtMC41LDE1LjUgLTAuNSwxNC41IC0wLjUsMTMuNUMgMC44MzMzMzMsMTIuODMzMyAwLjgzMzMzMywxMi4xNjY3IC0wLjUsMTEuNUMgLTAuNSw5LjUgLTAuNSw3LjUgLTAuNSw1LjVDIC0wLjE2NjY2Nyw1LjUg'+
			'MC4xNjY2NjcsNS41IDAuNSw1LjVDIDAuODMzMzMzLDYuODMzMzMgMS4xNjY2Nyw2LjgzMzMzIDEuNSw1LjVDIDIuMTY2NjcsNS41IDIuNSw1LjE2NjY3IDIuNSw0LjVDIDQuMjE2MSw0LjM3MTMzIDUuODgyNzcsNC4wMzggNy41LDMuNSBaIE0gNC41LDI4LjUgQyA0LjIxNzE5LDI5LjI4OTEgMy43MTcxOSwyOS45NTU4IDMsMzAuNUMgMi40NzE4OSwyOS4xODQgMi45NzE4OSwyOC41MTczIDQuNSwyOC41IFoiIGZpbGw9IiNlMGUwZTAiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDE5IiBkPSJNIDIyLjUsMC41IEMgMjQuODgwOSwxLjQxOTU2IDI3LjIxNDMsMS40MTk1Ni'+
			'AyOS41LDAuNUMgMzAuMTY5OCwyLjI5MTQxIDMwLjgzNjUsMy45NTgwOCAzMS41LDUuNUMgMzEuNSw2LjUgMzEuNSw3LjUgMzEuNSw4LjVDIDMwLjE2NjcsOC44MzMzMyAzMC4xNjY3LDkuMTY2NjcgMzEuNSw5LjVDIDMxLjUsOS44MzMzMyAzMS41LDEwLjE2NjcgMzEuNSwxMC41QyAzMC44MzMzLDEzLjE2NjcgMzAuMTY2NywxNS44MzMzIDI5LjUsMTguNUMgMjkuNjYzMywxNi4xNDMyIDI5LjQ5NjYsMTMuODA5OCAyOSwxMS41QyAyNy4wNTI2LDcuNzIzNzYgMjQuNTUyNiw0LjM5MDQzIDIxLjUsMS41QyAyMi4xNjY3LDEuNSAyMi41LDEuMTY2NjcgMjIuNSwwLjUgWiBNIDI3LjUsNC41IEMgMjku'+
			'MzM3LDQuNjM5NDUgMjkuNjcwNCw1LjMwNjEyIDI4LjUsNi41QyAyNy43MDI1LDYuMDQzMTEgMjcuMzY5MSw1LjM3NjQ0IDI3LjUsNC41IFoiIGZpbGw9IiNlZWVlZWUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjEiIGQ9Ik0gMTAuNSw3LjUgQyAxMi4xNDc3LDguODA5NzggMTMuODE0NCwxMC4xNDMxIDE1LjUsMTEuNUMgMTcuMTQ4NywxMC4zNTIzIDE4LjY0ODcsOS4wMTg5OSAyMCw3LjVDIDIxLjE2NjcsOC42NjY2NyAyMi4zMzMzLDkuODMzMzMgMjMuNSwxMUMgMjEuOTgxLDEyLjM1MTMgMjAuNjQ3NywxMy44NTEzIDE5LjUsMTUuNUMgMjAuNjQ3NywxNy4xNDg3IDIxLj'+
			'k4MSwxOC42NDg3IDIzLjUsMjBDIDIyLjMzMzMsMjEuMTY2NyAyMS4xNjY3LDIyLjMzMzMgMjAsMjMuNUMgMTguNjQ4NywyMS45ODEgMTcuMTQ4NywyMC42NDc3IDE1LjUsMTkuNUMgMTMuODUxMywyMC42NDc3IDEyLjM1MTMsMjEuOTgxIDExLDIzLjVDIDkuODMzMzMsMjIuMzMzMyA4LjY2NjY3LDIxLjE2NjcgNy41LDIwQyA5LjAxODk5LDE4LjY0ODcgMTAuMzUyMywxNy4xNDg3IDExLjUsMTUuNUMgMTAuMzUyMywxMy44NTEzIDkuMDE4OTksMTIuMzUxMyA3LjUsMTFDIDguNzEwMSw5Ljk2MDkgOS43MTAxLDguNzk0MjMgMTAuNSw3LjUgWiIgZmlsbD0iI2ZlZmVmZSIvPgogPC9nPgogPGc+CiAg'+
			'PHBhdGggc3R5bGU9Im9wYWNpdHk6MC4wMTYiIGQ9Ik0gMzAuNSwyMC41IEMgMzAuODMzMywyMC41IDMxLjE2NjcsMjAuNSAzMS41LDIwLjVDIDMxLjUsMjAuODMzMyAzMS41LDIxLjE2NjcgMzEuNSwyMS41QyAzMS4xNjY3LDIxLjE2NjcgMzAuODMzMywyMC44MzMzIDMwLjUsMjAuNSBaIiBmaWxsPSIjZmVmZmZlIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjA3OCIgZD0iTSAyOS41LDE5LjUgQyAzMC4xNjY3LDE5LjUgMzAuNSwxOS44MzMzIDMwLjUsMjAuNUMgMjkuNDAxNywyMS42MDA5IDI5LjIzNSwyMi45MzQzIDMwLDI0LjVDIDMwLjI3ODQsMjMuNTg0MiAzMC43Nz'+
			'g0LDIyLjkxNzUgMzEuNSwyMi41QyAzMS41LDIzLjgzMzMgMzEuNSwyNS4xNjY3IDMxLjUsMjYuNUMgMjcuNDYzMSwyNy42MTY0IDIzLjEyOTgsMjguNjE2NCAxOC41LDI5LjVDIDIzLjcwODgsMjcuOTYyIDI3LjM3NTUsMjQuNjI4NyAyOS41LDE5LjUgWiIgZmlsbD0iI2UxZTFlMSIvPgogPC9nPgogPGc+CiAgPHBhdGggc3R5bGU9Im9wYWNpdHk6MC4wMTQiIGQ9Ik0gMjguNSwyOS41IEMgMjQuMTYzMywzMC43NDU0IDIzLjgzLDMwLjQxMjEgMjcuNSwyOC41QyAyOC4xMDY3LDI4LjYyMzYgMjguNDQsMjguOTU2OSAyOC41LDI5LjUgWiIgZmlsbD0iI2NhY2FjYSIvPgogPC9nPgogPGc+CiAgPHBh'+
			'dGggc3R5bGU9Im9wYWNpdHk6MC4wMDQiIGQ9Ik0gMzEuNSwyOC41IEMgMzEuNSwyOC44MzMzIDMxLjUsMjkuMTY2NyAzMS41LDI5LjVDIDMwLjgyOTksMjkuMDE4NyAzMC44Mjk5LDI4LjY4NTMgMzEuNSwyOC41IFoiIGZpbGw9IiNmZWZmZmUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDA0IiBkPSJNIDI4LjUsMjkuNSBDIDI5LjgzMzMsMzAuMTY2NyAyOS44MzMzLDMwLjE2NjcgMjguNSwyOS41IFoiIGZpbGw9IiNiZmMwYmYiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMDA0IiBkPSJNIDE1LjUsMzEuNSBDIDE2LjUsMzAuMTY2NyAxNy41LD'+
			'MwLjE2NjcgMTguNSwzMS41QyAxNy41LDMxLjUgMTYuNSwzMS41IDE1LjUsMzEuNSBaIiBmaWxsPSIjZGZkZmRmIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjAwNCIgZD0iTSAyMS41LDMxLjUgQyAyMC44MzMzLDMwLjE2NjcgMjAuODMzMywzMC4xNjY3IDIxLjUsMzEuNSBaIiBmaWxsPSIjZmVmZmZlIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjAwNCIgZD0iTSAzMS41LDMwLjUgQyAzMS41LDMwLjgzMzMgMzEuNSwzMS4xNjY3IDMxLjUsMzEuNUMgMzAuODI5OSwzMS4wMTg3IDMwLjgyOTksMzAuNjg1MyAzMS41LDMwLjUgWiIgZmlsbD0iI2Zl'+
			'ZmZmZSIvPgogPC9nPgo8L3N2Zz4K';
		me._userdata_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="userdata_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 204px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdata_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_close.onclick=function (e) {
			player.setVariableValue('vis_userdata', false);
		}
		me._userdata_close.onmouseover=function (e) {
			me._userdata_close__img.style.visibility='hidden';
			me._userdata_close__imgo.style.visibility='inherit';
		}
		me._userdata_close.onmouseout=function (e) {
			me._userdata_close__img.style.visibility='inherit';
			me._userdata_close__imgo.style.visibility='hidden';
		}
		me._userdata_close.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_close);
		me.divSkin.appendChild(me._userdata);
		el=me._information=document.createElement('div');
		el.ggId="information";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 250px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 300px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._information.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._information.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_info_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._information.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._information.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._information.style[domTransition]='';
				if (me._information.ggCurrentLogicStateVisible == 0) {
					me._information.style.visibility=(Number(me._information.style.opacity)>0||!me._information.style.opacity)?'inherit':'hidden';
					me._information.ggVisible=true;
				}
				else {
					me._information.style.visibility="hidden";
					me._information.ggVisible=false;
				}
			}
		}
		me._information.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._informationbg=document.createElement('div');
		el.ggId="informationbg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.784314);';
		hs+='border : 0px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 250px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._informationbg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._informationbg.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._informationbg);
		el=me._info_text_body=document.createElement('div');
		els=me._info_text_body__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_text_body";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 193px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 45px;';
		hs+='visibility : inherit;';
		hs+='width : 276px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 276px;';
		hs+='height: 193px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		me._info_text_body.ggUpdateText=function() {
			var hs=player.hotspot.description;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._info_text_body.ggUpdateText();
		player.addListener('activehotspotchanged', function() {
			me._info_text_body.ggUpdateText();
		});
		el.appendChild(els);
		me._info_text_body.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_text_body.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_text_body);
		el=me._info_title=document.createElement('div');
		els=me._info_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_title";
		el.ggDx=-15;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 15px;';
		hs+='visibility : inherit;';
		hs+='width : 245px;';
		hs+='pointer-events:auto;';
		hs+='font-weight: bold;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 245px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._info_title.ggUpdateText=function() {
			var hs=player.hotspot.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._info_title.ggUpdateText();
		player.addListener('activehotspotchanged', function() {
			me._info_title.ggUpdateText();
		});
		el.appendChild(els);
		me._info_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_title.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._information.appendChild(me._info_title);
		el=me._ht_info_close=document.createElement('div');
		els=me._ht_info_close__img=document.createElement('img');
		els.className='ggskin ggskin_ht_info_close';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAKmElEQVR4nO1be3BU1Rn/nXt3s5sEwqMsG2VxErsoEByRRUSmbRJllDLaduiACCgRgtiqxcLoaIJkFREVgzJYxRQlohZKqG0FqyM6i48kMgSl1cUprFLd1bAQxCRs2N37+PpHdrf7uPu4926izvQ3szN7zznf857H951zD/ADAxGxfPLLK7OJc3cVfGPsnQ9gJsAqAQwF4GEMHiLmAWSPLDMPMxo8/hdvOgUw0iKHiHgABIAYy8wj4rDoT05unzcHlC7YNhegRwBcmCNJLwAPQB4AXiKcAlgXB9YFyF0yx3WTyPpkY6hPCqHvzAj0oWm5QEQcAE6Bn5Ijku2TGWNypgaaULrgOSfAGvLBKxOMBrbmyxdq1uvhwRgT458TPNnQ0MC5XC5DR0eHkYgMu3'+
			'bt4rONOeuCbXWDYTwACCI9OPbmbSv18Ij0oBhYfIXb7TYkE1RUVEiMMUmJWenC5yeC8C8AvB6l1ILn2e9922ue0khO8fZwQP9Eodb4CK9GDLLxACBJ9MQFNduWaSRn8b2aA4CWlpaUSUXJeCJiRMQTkfGCRdsaQGyWRiV0QxDwdPmS7Qs1krOEPy6Xy2CxWGJOqKiokAHIkXrmdrs5k8nEzGYzBwA/qXt7ZUiSH9Kuft4QLi4suMqzdeEBtYTRyZABQEdHh9FsNrPoW/d6vYXpCKvW7L89EBI2aNc57/CXjS6c3v7EfF9yBWNMjIsDknu5zBiTOQAwm80sQiB1dHQY00mqWuNa9j0zHgCsX5wK7l76WKviS2OMUWTtT44T+m32er2FNpstCAA+n8+cTkp1w/45Z4PCS/nSOt/gOG7Hq3ctXuxwJBgaC3wi0WPCks4Y'+
			'E5nX6y30+/0iAFit1pSVAAAWbm4tO+oLHADY0IEyIB8wGrHyy+ZbNicVS+jv/inxDGNM5IB+w9MZ/9ePvzJ+9lWw+ftuPAAIAtZPWP7yhKTilDcfD6WYOgEb/3y0XiJ5ml7lBgmm7oDQvLKlPe08loyMDrj2ofcqg4J4txoN5v7Ujg1LZ6DAqD8+WjVnMlbNmayKhoim7Nr77/tyba/Y7QGg3dPNn+kNNkJFwnTheSVYXzMdRSYDxo8dgWWbXDhxpi9X8gQkG9/4yuGcaSWR6i5avvO1o8/OP5StbdoeULf98K8ImJir0AIjjy23V6LI1O9Th92CN9Zej8svGp0rixiSjdfQE/izgXPNzqZDBWnqZfRPjsoOaPd084FwuF6NxNXzHZhU9qOEstHDC7G7fhZuuvrinPmkM1atE4gw/vnWj2/L1k7RAfe9+NEcIozPVd'+
			'iqOZNRe61yZzHyHB695cqs84KB5/DAosszGqnWCYJIa6rvaRmlUMUhksSlOMDv51hfSMh5EslVqYXVF+Ev9bNQOqIopW5UiRk7770Gy2ZV5E1eBMOOdQbuz9QgxQFLm96ZkuvbV/tGlOaFKXYL3lz3C8yYUJozHzVyJZmWK8QGMaSsAt8GhXk5a6IB0Xlh9fYDIALW3XwFjIas4Yge8N19wmMArk8qJwBgx48fNxsMhthSN+3efZ8Q5byxqWmt1ovGVw6rWhYBoNw6xNa2ca4/rqg/G2xubg5HS5Y8e8CmxnityuiBVnmd3wYnJRURkDQHfP71uSsHU6nBlCPJ4iXxz9HzAa6mpiYWLIiinPuCraDcH99wayXPiqbX3bqcLEssvgfEUmYufvxLROM0SwCwdschtH16Qg8LRbQe6cRDO7NGtRlBBFv8Y/RPwhCQZTpf'+
			'jxBRknHb5v2a438ldH4TwG+eegeiJGdvnAEEyu4AIhquSwqArp4gaje5IIj6FAYAQZRRu2k/unqCunkRYUz0f/z5YOICzFCiWxKADz2nUPfCB7r51L3wAT767FQeNAIADInsEyTsDSZHIBkOQX74OOLuKURGBzAKIw+YYrfg4cXTdfN5ePF0XPZjSx406kdPTxYHMPA9eoVYhhVi64rqvIS3RgOHrSuqMKok7Wa1KgQEFCR/H8BFd4QBgAO8egQYeA7P3FGpmPFpxXkji7HlzioYeP0OFcKhlNmUczgc/3MA43Q54P4bHaqyulwxY0IpVs936OYTgillfU5wawFP/9TKfNWcyTnl81px688rdCddnyM1QOEOHToUS4lt5xnbtDAerIxQt5ym5UJyERd/IPL4ryu/5Bi+HlSlVCLf8hKGgNUqE8+49wdaGUGUcfdzbb'+
			'j7uTZNEaMWuQaetXm93pFElLCkpOwIFRi5ViEkD9iuUOc3AdRu2h+L8D71nsHWFdV5XTmUMHZkwZOMMebz+YoAxFaDlLVlzHCzK1emavPz1iOduHb1noTw9kPPKVxT/6qqLFKtXAOHj5t/W+UCAJPJFCYijogMgIIDXl55pYfjch8GuSrT9LobNz66TzGx6eoJYv4jb+a0n6BlU2R0iWljcTFRcXGxZLFYApEjcxlIcy5QVMA1qxGQTanGVw7D+fLBjCmtKMloeOlgVj5qjTfy3Ps7VlTtBYCzZ8+GopFg9LsBRQf88oqxf2cMqsLidMqpVTpffCKQpo4ruae4mAgAbDZbSq6j6IC7ZtsDPON2qpWWrKTWPbx88RlqMj61ecm0o9HnlpaWWN2JEyeKgQynw5ZhBc2dZ4K3qhWarLhW6OVjYMy9etElCd8zWSwWBgAn'+
			'T54cEg6HTQACLNMXYev2Hhn6jzZ/fVgSf6dag+8QjKF35gTrVetrLj0eX05EfX6/XywtLS0BAJvNdjpjilV/3cTe2TOs6wZS2YHAmGGmO5KNBwBRFE3l5eUJLzxrjll/3cTeYWbjDRxjnflUcqAwYkjB6r/VVb6mVGc0Gvlz584lfD6TU5L91gNVe2ZfPvYyA8c15UPJgcLwIpNz35qqLWpoMs4BSrhu7bvTTwZCfyBC2hPX7wIjioxr9zmrN6mhyToHKGHv/T/74J6Z5TNMBrYWQF72EPWAMQTPH2Zeotb4GL3aHhCPGxrfvfiLrvAWSaYrtPLQA44x79RxIxc9XevI6UxOkiS5sLBQ6O7uFux2u8AYk3U5AAB2v+UxNb79xQZRlmv18FGLISZ+2+JK27pbZl78bbo2UYMtFovQ0tIizps3L2XbX7cDoqhes7/mbE'+
			'jYBCDnjxS1wMDhyPgxJSub75zekVwXNTgQCIgHDx4UlAxORt4cAACzH3xvWte54E6SkfedUZ7nPrUONT2xtuaSPZeeP1wAgFAoJBYXF4u9vb2i3W4XM99uUUZaB9hsNhH9J0XM5/Ol+94uBUufbS91Hw/8SSLSfzICwGjgWseMND+zsXbS6/bRo8OBQEAsKyuLGpv2zmBDQwPndDqj54Ap7YiIMcZI0QHBYFAeN25cCACOHTtmit4UyRX988J/HhdlWqqGLgrG8EkBz+8YO8q0+8kF9uMOh0PMdkEyioaGBq6ioiLh61aloZDRAd3d3dKkSZPCRGTw+XwZx7QoinT69Glpz549ktPpTOgtfr9fnDp1aspO7ECAiFj83Se3201OpzPrzVJFB4iiSGVlZWI646NGOxwOKfkmpsvlMtjt9hjdYDkhehMs154ShapJMOIY'+
			'Idtkk8wzmxO0Kq8H0SGQ09gOBoNye3t7uLy8PKhlprVarQalu0iRa3gs3fP/MQj4L/yIrhG0Ak9MAAAAAElFTkSuQmCC';
		me._ht_info_close__img.ggOverSrc=hs;
		el.ggId="ht_info_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 263px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_info_close.onclick=function (e) {
			player.setVariableValue('vis_info_popup', false);
		}
		me._ht_info_close.onmouseover=function (e) {
			me._ht_info_close__img.src=me._ht_info_close__img.ggOverSrc;
		}
		me._ht_info_close.onmouseout=function (e) {
			me._ht_info_close__img.src=me._ht_info_close__img.ggNormalSrc;
		}
		me._ht_info_close.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._ht_info_close);
		me.divSkin.appendChild(me._information);
		el=me._image_popup=document.createElement('div');
		el.ggId="image_popup";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_popup.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_popup.style[domTransition]='';
				if (me._image_popup.ggCurrentLogicStateVisible == 0) {
					me._image_popup.style.visibility=(Number(me._image_popup.style.opacity)>0||!me._image_popup.style.opacity)?'inherit':'hidden';
					me._image_popup.ggVisible=true;
				}
				else {
					me._image_popup.style.visibility="hidden";
					me._image_popup.ggVisible=false;
				}
			}
		}
		me._image_popup.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._loading_image=document.createElement('div');
		els=me._loading_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSI2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ3aGl0ZSI+CiA8Y2lyY2xlIGN5PSIzIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09In'+
			'JvdGF0ZSg0NSAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuMTI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAu'+
			'MiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiByPSIwIj4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMC4zNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIi'+
			'ByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgMTYgMTYpIiBjeD0iMTYi'+
			'IHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjYyNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC'+
			'40IDAuOCIgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgzMTUgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjg3NXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRl'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_popup.appendChild(me._loading_image);
		el=me._popup_image=document.createElement('div');
		els=me._popup_image__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._popup_image.ggUpdatePosition();}
		el.ggText=basePath + "";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="popup_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_image.style[domTransition]='';
				if (me._popup_image.ggCurrentLogicStateVisible == 0) {
					me._popup_image.style.visibility=(Number(me._popup_image.style.opacity)>0||!me._popup_image.style.opacity)?'inherit':'hidden';
					me._popup_image.ggSubElement.src=me._popup_image.ggText;
					me._popup_image.ggVisible=true;
				}
				else {
					me._popup_image.style.visibility="hidden";
					me._popup_image__img.src = '';
					me._popup_image.ggVisible=false;
				}
			}
		}
		me._popup_image.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._popup_image.clientWidth;
			var parentHeight = me._popup_image.clientHeight;
			var img = me._popup_image__img;
			var aspectRatioDiv = me._popup_image.clientWidth / me._popup_image.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._image_popup.appendChild(me._popup_image);
		me.divSkin.appendChild(me._image_popup);
		el=me._video_popup_file=document.createElement('div');
		el.ggId="video_popup_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_file.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_file.style[domTransition]='';
				if (me._video_popup_file.ggCurrentLogicStateVisible == 0) {
					me._video_popup_file.style.visibility=(Number(me._video_popup_file.style.opacity)>0||!me._video_popup_file.style.opacity)?'inherit':'hidden';
					me._video_popup_file.ggVisible=true;
				}
				else {
					me._video_popup_file.style.visibility="hidden";
					me._video_popup_file.ggVisible=false;
				}
			}
		}
		me._video_popup_file.ggUpdatePosition=function (useTransition) {
		}
		el=me._loading_video_file=document.createElement('div');
		els=me._loading_video_file__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSI2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ3aGl0ZSI+CiA8Y2lyY2xlIGN5PSIzIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09In'+
			'JvdGF0ZSg0NSAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuMTI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAu'+
			'MiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiByPSIwIj4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMC4zNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIi'+
			'ByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgMTYgMTYpIiBjeD0iMTYi'+
			'IHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjYyNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC'+
			'40IDAuOCIgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgzMTUgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjg3NXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRl'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_video_file__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_file";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_file.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_file.appendChild(me._loading_video_file);
		el=me._popup_video_file=document.createElement('div');
		me._popup_video_file.seekbars = [];
		me._popup_video_file.seekbars.push('seekbar_file');
		me._popup_video_file.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_file.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_file.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_file.hasChildNodes()) {
				me._popup_video_file.removeChild(me._popup_video_file.lastChild);
			}
			if (me._popup_video_file__vid) {
				me._popup_video_file__vid.pause();
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_file.ggVideoNotLoaded ==false && me._popup_video_file.ggDeactivate) { me._popup_video_file.ggDeactivate(); }
				me._popup_video_file.ggVideoNotLoaded = true;
			var mediaObj = player.getMediaObject('popup_video_file');
			if (mediaObj) {
				mediaObj.autoplay = false;
			}
				return;
			}
			me._popup_video_file.ggVideoNotLoaded = false;
			me._popup_video_file__vid=document.createElement('video');
			me._popup_video_file__vid.className='ggskin ggskin_video';
			me._popup_video_file__vid.setAttribute('width', '100%');
			me._popup_video_file__vid.setAttribute('height', '100%');
			me._popup_video_file__source=document.createElement('source');
			me._popup_video_file__source.setAttribute('src', media);
			me._popup_video_file__vid.setAttribute('playsinline', 'playsinline');
			me._popup_video_file__vid.setAttribute('style', ';');
			me._popup_video_file__vid.appendChild(me._popup_video_file__source);
			me._popup_video_file.appendChild(me._popup_video_file__vid);
			var videoEl = player.registerVideoElement('popup_video_file', me._popup_video_file__vid);
			videoEl.autoplay = false;
			notifySeekbars();
			me._popup_video_file.ggVideoSource = media;
		}
		el.ggId="popup_video_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_file.ggIsActive=function() {
			if (me._popup_video_file__vid != null) {
				return (me._popup_video_file__vid.paused == false && me._popup_video_file__vid.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_video_file.style[domTransition]='';
				if (me._popup_video_file.ggCurrentLogicStateVisible == 0) {
					me._popup_video_file.style.visibility=(Number(me._popup_video_file.style.opacity)>0||!me._popup_video_file.style.opacity)?'inherit':'hidden';
					if (me._popup_video_file.ggVideoNotLoaded) {
						me._popup_video_file.ggInitMedia(me._popup_video_file.ggVideoSource);
					}
					me._popup_video_file.ggVisible=true;
				}
				else {
					me._popup_video_file.style.visibility="hidden";
					me._popup_video_file.ggInitMedia('');
					me._popup_video_file.ggVisible=false;
				}
			}
		}
		me._popup_video_file.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_file.appendChild(me._popup_video_file);
		me.divSkin.appendChild(me._video_popup_file);
		el=me._video_popup_controls_file=document.createElement('div');
		el.ggId="video_popup_controls_file";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 10px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 284px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_controls_file.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_controls_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_controls_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_controls_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_controls_file.style[domTransition]='';
				if (me._video_popup_controls_file.ggCurrentLogicStateVisible == 0) {
					me._video_popup_controls_file.style.visibility=(Number(me._video_popup_controls_file.style.opacity)>0||!me._video_popup_controls_file.style.opacity)?'inherit':'hidden';
					me._video_popup_controls_file.ggVisible=true;
				}
				else {
					me._video_popup_controls_file.style.visibility="hidden";
					me._video_popup_controls_file.ggVisible=false;
				}
			}
		}
		me._video_popup_controls_file.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._seekbar_file=document.createElement('div');
		me._seekbar_file__playhead=document.createElement('div');
		me._seekbar_file.mediaEl = null;
		el.ggId="seekbar_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_seekbar ";
		el.ggType='seekbar';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 11px;';
		hs+='left : -2px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 246px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._seekbar_file.connectToMediaEl = function() {
			var disableSeekbar = function() {
				me._seekbar_file__playhead.style.visibility = 'hidden';
				me._seekbar_file.style.background = '#000000';
				me._seekbar_file.ggConnected = false;
			}
			if (me._seekbar_file.mediaEl != null) {
				me._seekbar_file.mediaEl.removeEventListener('progress', me._seekbar_file.updatePlayback);
				me._seekbar_file.mediaEl.removeEventListener('canplay', me._seekbar_file.updatePlayback);
				me._seekbar_file.mediaEl.removeEventListener('timeupdate', me._seekbar_file.updatePlayback);
				if (me._seekbar_file.ggActivate) {
					me._seekbar_file.mediaEl.removeEventListener('play', me._seekbar_file.ggActivate);
				}
				if (me._seekbar_file.ggDeactivate) {
					me._seekbar_file.mediaEl.removeEventListener('ended', me._seekbar_file.ggDeactivate);
					me._seekbar_file.mediaEl.removeEventListener('pause', me._seekbar_file.ggDeactivate);
				}
				if (me._seekbar_file.ggMediaEnded) {
					me._seekbar_file.mediaEl.removeEventListener('ended', me._seekbar_file.ggMediaEnded);
				}
			}
			me._seekbar_file.mediaEl = player.getMediaObject('popup_video_file');
			if (me._seekbar_file.mediaEl != null) {
				me._seekbar_file__playhead.style.visibility = 'inherit';
				me._seekbar_file__playhead.style.left = '2px';
				me._seekbar_file.mediaEl.addEventListener('progress', me._seekbar_file.updatePlayback);
				me._seekbar_file.mediaEl.addEventListener('canplay', me._seekbar_file.updatePlayback);
				me._seekbar_file.mediaEl.addEventListener('timeupdate', me._seekbar_file.updatePlayback);
				if (me._seekbar_file.ggActivate) {
					me._seekbar_file.mediaEl.addEventListener('play', me._seekbar_file.ggActivate);
				}
				if (me._seekbar_file.ggDeactivate) {
					me._seekbar_file.mediaEl.addEventListener('ended', me._seekbar_file.ggDeactivate);
					me._seekbar_file.mediaEl.addEventListener('pause', me._seekbar_file.ggDeactivate);
				}
				if (me._seekbar_file.ggMediaEnded) {
					me._seekbar_file.mediaEl.addEventListener('ended', me._seekbar_file.ggMediaEnded);
				}
			me._seekbar_file.ggConnected = true;
			} else {
				disableSeekbar();
			}
			var videoEl = me.findElements('popup_video_file');
			if (videoEl.length > 0 && !videoEl[0].hasChildNodes()) {
				disableSeekbar();
			}
		}
		me._seekbar_file.updatePlayback = function() {
			if (!me._seekbar_file.ggConnected) return;
			if (me._seekbar_file.mediaEl != null) {
				if (me._seekbar_file.mediaEl.readyState) {
					var percent = me._seekbar_file.mediaEl.currentTime / me._seekbar_file.mediaEl.duration;
					var playheadpos = Math.round((me._seekbar_file.clientWidth - 2 * 8 + 2) * percent);
					playheadpos += 2;
					me._seekbar_file__playhead.style.left = playheadpos.toString() + 'px';
					var offsetPercent = Math.round(100.0 * (8 / me._seekbar_file.clientWidth));
					var currPos = offsetPercent + Math.round(percent * (100 - 2 * offsetPercent));
					var gradientString ='linear-gradient(90deg, #808080 0%, #808080 ' + currPos + '%';
					for (var i = 0; i < me._seekbar_file.mediaEl.buffered.length; i++) {
						var rangeStart = Math.round((me._seekbar_file.mediaEl.buffered.start(i) / me._seekbar_file.mediaEl.duration) * 100.0);
						var rangeEnd = Math.ceil((me._seekbar_file.mediaEl.buffered.end(i) / me._seekbar_file.mediaEl.duration) * 100.0);
						if (rangeEnd > currPos) {
							if (rangeStart < currPos) {
								gradientString += ', #c0c0c0 ' + currPos + '%';
							} else {
								gradientString += ', #000000 ' + currPos + '%, #000000 ' + rangeStart + '%';
								gradientString += ', #c0c0c0 ' + rangeStart + '%';
							}
								gradientString += ', #c0c0c0 ' + rangeEnd + '%';
							currPos = rangeEnd;
						}
					}
					if (currPos < 100) {
						gradientString += ', #000000 ' + currPos + '%';
					}
					gradientString += ')';
					me._seekbar_file.style.background = gradientString;
				}
			}
		}
		me._seekbar_file.appendChild(me._seekbar_file__playhead);
		hs+='background: #000000;';
		hs+='border: 2px solid #000000;';
		hs+='border-radius: 8px;';
		hs+=cssPrefix + 'border-radius: 8px;';
		var hs_playhead = 'height: 11px;';
		hs_playhead += 'width: 11px;';
		hs_playhead += 'border: 0px;';
		hs_playhead += 'position: absolute;';
		hs_playhead += 'left: 2px;';
		hs_playhead += 'top: 0px;';
		hs_playhead += 'border-radius: 6;';
		hs_playhead += cssPrefix + 'border-radius: 6px;';
		hs_playhead += 'background-color: rgba(0,0,0,1);';
		hs_playhead += 'pointer-events: none;';
		me._seekbar_file.setAttribute('style', hs);
		me._seekbar_file__playhead.setAttribute('style', hs_playhead);
		me._seekbar_file.ggIsActive=function() {
			if (me._seekbar_file.mediaEl != null) {
				return (me._seekbar_file.mediaEl.paused == false && me._seekbar_file.mediaEl.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._seekbar_file.onmousedown=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
					me._seekbar_file.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_file.onmousemove=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
					me._seekbar_file.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_file.ontouchend=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
					me._seekbar_file.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_file.ggActivate=function () {
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility=(Number(me._ht_video_pause_file.style.opacity)>0||!me._ht_video_pause_file.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_file.ggVisible=true;
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility='hidden';
			me._ht_video_play_file.ggVisible=false;
		}
		me._seekbar_file.ggDeactivate=function () {
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility=(Number(me._ht_video_play_file.style.opacity)>0||!me._ht_video_play_file.style.opacity)?'inherit':'hidden';
			me._ht_video_play_file.ggVisible=true;
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility='hidden';
			me._ht_video_pause_file.ggVisible=false;
		}
		me._seekbar_file.ggUpdatePosition=function (useTransition) {
		}
		me._seekbar_file.ggNodeChange=function () {
			me._seekbar_file.connectToMediaEl();
		}
		me._video_popup_controls_file.appendChild(me._seekbar_file);
		el=me._ht_video_play_file=document.createElement('div');
		els=me._ht_video_play_file__img=document.createElement('img');
		els.className='ggskin ggskin_ht_video_play_file';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEpklEQVRoge2ZW2wUZRiGn2/2NNuyQANNMBCJohciEAjEA1rRCzldYCsCoaTlcFG48JAYNGqiCBovGkRTLwgkIofWCo2peMAIJgYJYsCACEIa0MYjEWot7ba77ezO5wVCKunu/DOLFyb7XG123//9/nfm32/+mYEiRYoU+T8hhVuoULc1XtI9fGRGnRFECZFxFddywxHp6ivp62DraqfwOvkpKEi0escjFvI2MMpD2glyFvQUyJGw43yabFl1qZDa1xMsyLyGWLxsZL3CkwHrKspBEd5KOfZeWhZnA/pcw3+Qmp2ldpZW4OFCi/9DG8rqdHPtwUJM/AVZtGeEHUl/DNxfSNGhUGRTvxN7NujZMQ9StyViJ+MHgFlBCpmgKq39ib4lQZqDZSqM98Zf5z'+
			'8MASCiVfGkvSnQWBORXb1rGWhjkAJBENFHU03LW32N8RIMW7StPBMJtwFluTSWCJGwRb9TcPO5Sns6mp3I9pVp0wGeSysTCW8kTwiARDzCuYYqNiyZyvjyYaa183GL7VhL/AzIG6S0+p2pQK2XSWkszOjhNmsXTOLMG5W8v/Yhpt/qdY30QK1VfuR5g7iE55iYlNrha59FYN60sRx6ZR67nqjgtjEJP/MZhD6QqN1hfDTyBlHRB01MSmLhIb9feM94jtcvoL5mOiXRoTX5GHCt+0y1uYPUbYmgZhe+sJW7Z4RDwuNz7+DIa/OZMWG06bwAEJcZptqcQaI90QmA0T+3tz/jqbn9puF88fIcXnxsCqE8wf+NO85QmDuIZUXGmpok095BAEKW8HzVFHY/PYuEHTGZnvEcci8tVR9B/O0o5k8bx+frZjNuVGl+oWrc1DNn'+
			'EBEtNzVJph1UTdVXmHxzGQ2r7kLyrTKLkKlfziAu9JqaZLLKb53GcgA272+j+s0vfR+AXOTsiZYrnSrmVdovJr2XCnC5z2HN1iPsPfazp1aUP03r5zwjinaYmgD8eLHHU/PNDx3c+8InRiEAVDG+Hc55RuxY9nh6IORiuNVv/yOZ9/eGfWd4afe3DGRc07mBxQVzaQ66tq/sQjhmanSivXPI789d6Gbuqwd4rum4vxAASpup1Gvf8Blwt4nR0fOXUOVaF8pklY0fnab+g9OkA27vBTUOknfZhAaym4GUidHlPofvf+0C4Oj5K/+FDS0nA4cAvZyyM2dN1Xn7tHNmbzI0uXKkIDNNzMaXl7Lnq594attRLnYb3xPlwFqd2bnCeGl7bnoSS98d7ViZUyhjPM2EG3JdENUPU821lWDe/z07Uk9zdQciiwHPNXJjLm76u4'+
			'SsNX5CgGFrTTfWHBJhbbCJ+aLTVZ3d11hj3HavYryXyZxq/ToyqbIHEaO7xgD0isuc/veWnwgy2Pcj0/jSXUtVdAdgsg835byrunCgefl3QQ2MH9BdJdVc02y5zBQIXHQwCi1px55RSAgo5LVC3ZaInSx5BnQdEA1Qer9IdkOqacXhwHMY7FaowbBF28qzkXCFq1QgVAjcCdhDSAeAwwgHsiL7nMaak4XWHswNeGN1PSosa0rEMtkxlkiZq/pXzHU6uif+0sX69T43W0WKFClSpEgRX/wN5cKGTxXWN3wAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEpklEQVRoge2ZW2wUZRiGn2/2NNuyQANNMBCJohciEAjEA1rRCzldYCsCoaTlcFG48JAYNGqiCBovGkRTLwgkIofWCo2peMAIJgYJYsCACEIa0MYjEWot7ba77ezO5wVCKunu/DOLFyb7XG123//9/nfm32/+mYEiRYoU+T8hhVuoULc1XtI9fGRGnRFECZFxFddywxHp6ivp62DraqfwOvkpKEi0escjFvI2MMpD2glyFvQUyJGw43yabFl1qZDa1xMsyLyGWLxsZL3CkwHrKspBEd5KOfZeWhZnA/pcw3+Qmp2ldpZW4OFCi/9DG8rqdHPtwUJM/AVZtGeEHUl/DNxfSNGhUGRTvxN7NujZMQ9StyViJ+MHgFlBCpmgKq39ib4lQZqDZSqM98Zf5z'+
			'8MASCiVfGkvSnQWBORXb1rGWhjkAJBENFHU03LW32N8RIMW7StPBMJtwFluTSWCJGwRb9TcPO5Sns6mp3I9pVp0wGeSysTCW8kTwiARDzCuYYqNiyZyvjyYaa183GL7VhL/AzIG6S0+p2pQK2XSWkszOjhNmsXTOLMG5W8v/Yhpt/qdY30QK1VfuR5g7iE55iYlNrha59FYN60sRx6ZR67nqjgtjEJP/MZhD6QqN1hfDTyBlHRB01MSmLhIb9feM94jtcvoL5mOiXRoTX5GHCt+0y1uYPUbYmgZhe+sJW7Z4RDwuNz7+DIa/OZMWG06bwAEJcZptqcQaI90QmA0T+3tz/jqbn9puF88fIcXnxsCqE8wf+NO85QmDuIZUXGmpok095BAEKW8HzVFHY/PYuEHTGZnvEcci8tVR9B/O0o5k8bx+frZjNuVGl+oWrc1DNn'+
			'EBEtNzVJph1UTdVXmHxzGQ2r7kLyrTKLkKlfziAu9JqaZLLKb53GcgA272+j+s0vfR+AXOTsiZYrnSrmVdovJr2XCnC5z2HN1iPsPfazp1aUP03r5zwjinaYmgD8eLHHU/PNDx3c+8InRiEAVDG+Hc55RuxY9nh6IORiuNVv/yOZ9/eGfWd4afe3DGRc07mBxQVzaQ66tq/sQjhmanSivXPI789d6Gbuqwd4rum4vxAASpup1Gvf8Blwt4nR0fOXUOVaF8pklY0fnab+g9OkA27vBTUOknfZhAaym4GUidHlPofvf+0C4Oj5K/+FDS0nA4cAvZyyM2dN1Xn7tHNmbzI0uXKkIDNNzMaXl7Lnq594attRLnYb3xPlwFqd2bnCeGl7bnoSS98d7ViZUyhjPM2EG3JdENUPU821lWDe/z07Uk9zdQciiwHPNXJjLm76u4'+
			'SsNX5CgGFrTTfWHBJhbbCJ+aLTVZ3d11hj3HavYryXyZxq/ToyqbIHEaO7xgD0isuc/veWnwgy2Pcj0/jSXUtVdAdgsg835byrunCgefl3QQ2MH9BdJdVc02y5zBQIXHQwCi1px55RSAgo5LVC3ZaInSx5BnQdEA1Qer9IdkOqacXhwHMY7FaowbBF28qzkXCFq1QgVAjcCdhDSAeAwwgHsiL7nMaak4XWHswNeGN1PSosa0rEMtkxlkiZq/pXzHU6uif+0sX69T43W0WKFClSpEgRX/wN5cKGTxXWN3wAAAAASUVORK5CYII=';
		me._ht_video_play_file__img.ggOverSrc=hs;
		el.ggId="ht_video_play_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_play_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_play_file.onclick=function (e) {
			if (me._popup_video_file.ggApiPlayer) {
				if (me._popup_video_file.ggApiPlayerType == 'youtube') {
					me._popup_video_file.ggApiPlayer.playVideo();
				} else if (me._popup_video_file.ggApiPlayerType == 'vimeo') {
					me._popup_video_file.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_file","1");
			}
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility='hidden';
			me._ht_video_play_file.ggVisible=false;
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility=(Number(me._ht_video_pause_file.style.opacity)>0||!me._ht_video_pause_file.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_file.ggVisible=true;
		}
		me._ht_video_play_file.onmouseover=function (e) {
			me._ht_video_play_file__img.src=me._ht_video_play_file__img.ggOverSrc;
		}
		me._ht_video_play_file.onmouseout=function (e) {
			me._ht_video_play_file__img.src=me._ht_video_play_file__img.ggNormalSrc;
		}
		me._ht_video_play_file.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_file.appendChild(me._ht_video_play_file);
		el=me._ht_video_pause_file=document.createElement('div');
		els=me._ht_video_pause_file__img=document.createElement('img');
		els.className='ggskin ggskin_ht_video_pause_file';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADSUlEQVRoge2ZTWhUVxiGn+/OTCcJVlI0mgql1oZ2Ed2JLvzZlC4EF4IVMzFmElqxYqWLgkihREVBQbqJFAQxM/5wR1ModFFB6EKsuAlYaKW0i5pihcaf2ETjzDjjfC7sIjidO+eec5VK77O85/2+877ce879g5iYmP8F4lS9/lgbc1s+Q6ULWAB0AC1AEiWBcB+4B9wCfgG5RrV6mdHBv1yNP4t9kEyuG7yzQLdF9RgwSvXRcUY/mrT2MAu7ID35DxA5CbQ6zl8EOUpS93Gqf8alUfggmXwW5ATguUz8DOMomyj0j9k2CGem9+SHILnQdc1ZjMdFNufX2TYwPyO9ubWo9z2QtJ3MgCKqqyhkr4YtNAvSc+INJDnG053pefMHSbrDrhmDS0QFLzHCiw'+
			'kB8CZVdoctan5GMvk+kFNWluwpkn68iNzg36YFwdf7wEg7ZfkySNLZ3kp72yt1x++XKtycfMjijjm0pBJ147enS9x9UG7UtpWy1wt8FehvFsFBysl1oB1BkqGNy9j+3jt1x89eGScz/AP+rtWs7JpfN/554UcOfftzQGfJECJIszWy2rTRc2Al64+1mYqbBKmtcXXjQIq56eWm4sZBNp2bA7I0EkvWeEuMlQ1HUpXXcX06dkV5y1TaOIhWF0ZixgVhnqk0IAidkZhxQTVtKm0cRLxqJGZcEIkgCLU7UXhxQuWhqfS/HQSmTYWNg6QZB4oRmHFAp0yVjYPkBkuIXIrEjy0iN0ylwXd21QvOZlyocd1UGvzQqCkfqRwEGu4e08UKE1OluuNTxQoAkw/K/zo+UzbZFCvjBiLA5M7dkx9G5BPThtGh5/Czm03Vzd8QE4nD'+
			'vPhFfwtSO8MUNA9ypu9P0B3WlmxQ/Ri/N9T2b/ZZx8/mQY9bmQqLyl4K2W/Clpl/n0rXdgHfhZ0gFKpHKfTttyk1D5IbLPFqcQNwxmYiA4Z59/dPQdSmOPz7xtCQx29vHwD2WNXXMwOyDX+r79LE3siW3CoeezmELssOivI1SfmC01t/tfbxD1H9H3kfWEHAjXMWEyjnkdoR/IFrTvPPIrpX2YGRFsrecqAbZCFKJ8JrKPdA7oBOIHoJv/8n23UQExMTExMTE/OS8QQ32tkPnCvTVwAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADSUlEQVRoge2ZTWhUVxiGn+/OTCcJVlI0mgql1oZ2Ed2JLvzZlC4EF4IVMzFmElqxYqWLgkihREVBQbqJFAQxM/5wR1ModFFB6EKsuAlYaKW0i5pihcaf2ETjzDjjfC7sIjidO+eec5VK77O85/2+877ce879g5iYmP8F4lS9/lgbc1s+Q6ULWAB0AC1AEiWBcB+4B9wCfgG5RrV6mdHBv1yNP4t9kEyuG7yzQLdF9RgwSvXRcUY/mrT2MAu7ID35DxA5CbQ6zl8EOUpS93Gqf8alUfggmXwW5ATguUz8DOMomyj0j9k2CGem9+SHILnQdc1ZjMdFNufX2TYwPyO9ubWo9z2QtJ3MgCKqqyhkr4YtNAvSc+INJDnG053pefMHSbrDrhmDS0QFLzHCiw'+
			'kB8CZVdoctan5GMvk+kFNWluwpkn68iNzg36YFwdf7wEg7ZfkySNLZ3kp72yt1x++XKtycfMjijjm0pBJ147enS9x9UG7UtpWy1wt8FehvFsFBysl1oB1BkqGNy9j+3jt1x89eGScz/AP+rtWs7JpfN/554UcOfftzQGfJECJIszWy2rTRc2Al64+1mYqbBKmtcXXjQIq56eWm4sZBNp2bA7I0EkvWeEuMlQ1HUpXXcX06dkV5y1TaOIhWF0ZixgVhnqk0IAidkZhxQTVtKm0cRLxqJGZcEIkgCLU7UXhxQuWhqfS/HQSmTYWNg6QZB4oRmHFAp0yVjYPkBkuIXIrEjy0iN0ylwXd21QvOZlyocd1UGvzQqCkfqRwEGu4e08UKE1OluuNTxQoAkw/K/zo+UzbZFCvjBiLA5M7dkx9G5BPThtGh5/Czm03Vzd8QE4nD'+
			'vPhFfwtSO8MUNA9ypu9P0B3WlmxQ/Ri/N9T2b/ZZx8/mQY9bmQqLyl4K2W/Clpl/n0rXdgHfhZ0gFKpHKfTttyk1D5IbLPFqcQNwxmYiA4Z59/dPQdSmOPz7xtCQx29vHwD2WNXXMwOyDX+r79LE3siW3CoeezmELssOivI1SfmC01t/tfbxD1H9H3kfWEHAjXMWEyjnkdoR/IFrTvPPIrpX2YGRFsrecqAbZCFKJ8JrKPdA7oBOIHoJv/8n23UQExMTExMTE/OS8QQ32tkPnCvTVwAAAABJRU5ErkJggg==';
		me._ht_video_pause_file__img.ggOverSrc=hs;
		el.ggId="ht_video_pause_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_pause_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_pause_file.onclick=function (e) {
			if (me._popup_video_file.ggApiPlayer) {
				if (me._popup_video_file.ggApiPlayerType == 'youtube') {
					me._popup_video_file.ggApiPlayer.pauseVideo();
				} else if (me._popup_video_file.ggApiPlayerType == 'vimeo') {
					me._popup_video_file.ggApiPlayer.pause();
				}
			} else {
				player.pauseSound("popup_video_file");
			}
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility='hidden';
			me._ht_video_pause_file.ggVisible=false;
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility=(Number(me._ht_video_play_file.style.opacity)>0||!me._ht_video_play_file.style.opacity)?'inherit':'hidden';
			me._ht_video_play_file.ggVisible=true;
		}
		me._ht_video_pause_file.onmouseover=function (e) {
			me._ht_video_pause_file__img.src=me._ht_video_pause_file__img.ggOverSrc;
		}
		me._ht_video_pause_file.onmouseout=function (e) {
			me._ht_video_pause_file__img.src=me._ht_video_pause_file__img.ggNormalSrc;
		}
		me._ht_video_pause_file.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_file.appendChild(me._ht_video_pause_file);
		me.divSkin.appendChild(me._video_popup_controls_file);
		el=me._video_popup_url=document.createElement('div');
		el.ggId="video_popup_url";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_url.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_url') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_url.style[domTransition]='';
				if (me._video_popup_url.ggCurrentLogicStateVisible == 0) {
					me._video_popup_url.style.visibility=(Number(me._video_popup_url.style.opacity)>0||!me._video_popup_url.style.opacity)?'inherit':'hidden';
					me._video_popup_url.ggVisible=true;
				}
				else {
					me._video_popup_url.style.visibility="hidden";
					me._video_popup_url.ggVisible=false;
				}
			}
		}
		me._video_popup_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._loading_video_url=document.createElement('div');
		els=me._loading_video_url__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSI2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ3aGl0ZSI+CiA8Y2lyY2xlIGN5PSIzIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09In'+
			'JvdGF0ZSg0NSAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuMTI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAu'+
			'MiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiByPSIwIj4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMC4zNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIi'+
			'ByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgMTYgMTYpIiBjeD0iMTYi'+
			'IHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjYyNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC'+
			'40IDAuOCIgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgzMTUgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjg3NXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRl'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_video_url__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_url";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_url.appendChild(me._loading_video_url);
		el=me._popup_video_url=document.createElement('div');
		me._popup_video_url.seekbars = [];
		me._popup_video_url.seekbars.push('seekbar_url');
		me._popup_video_url.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_url.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_url.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_url.hasChildNodes()) {
				me._popup_video_url.removeChild(me._popup_video_url.lastChild);
			}
			if (me._popup_video_url__vid) {
				me._popup_video_url__vid.pause();
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_url.ggVideoNotLoaded ==false && me._popup_video_url.ggDeactivate) { me._popup_video_url.ggDeactivate(); }
				me._popup_video_url.ggVideoNotLoaded = true;
			var mediaObj = player.getMediaObject('popup_video_url');
			if (mediaObj) {
				mediaObj.autoplay = false;
			}
				return;
			}
			me._popup_video_url.ggVideoNotLoaded = false;
			me._popup_video_url__vid=document.createElement('video');
			me._popup_video_url__vid.className='ggskin ggskin_video';
			me._popup_video_url__vid.setAttribute('width', '100%');
			me._popup_video_url__vid.setAttribute('height', '100%');
			me._popup_video_url__source=document.createElement('source');
			me._popup_video_url__source.setAttribute('src', media);
			me._popup_video_url__vid.setAttribute('playsinline', 'playsinline');
			me._popup_video_url__vid.setAttribute('style', ';');
			me._popup_video_url__vid.appendChild(me._popup_video_url__source);
			me._popup_video_url.appendChild(me._popup_video_url__vid);
			var videoEl = player.registerVideoElement('popup_video_url', me._popup_video_url__vid);
			videoEl.autoplay = false;
			notifySeekbars();
			me._popup_video_url.ggVideoSource = media;
		}
		el.ggId="popup_video_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_url.ggIsActive=function() {
			if (me._popup_video_url__vid != null) {
				return (me._popup_video_url__vid.paused == false && me._popup_video_url__vid.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_url') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_video_url.style[domTransition]='';
				if (me._popup_video_url.ggCurrentLogicStateVisible == 0) {
					me._popup_video_url.style.visibility=(Number(me._popup_video_url.style.opacity)>0||!me._popup_video_url.style.opacity)?'inherit':'hidden';
					if (me._popup_video_url.ggVideoNotLoaded) {
						me._popup_video_url.ggInitMedia(me._popup_video_url.ggVideoSource);
					}
					me._popup_video_url.ggVisible=true;
				}
				else {
					me._popup_video_url.style.visibility="hidden";
					me._popup_video_url.ggInitMedia('');
					me._popup_video_url.ggVisible=false;
				}
			}
		}
		me._popup_video_url.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_url.appendChild(me._popup_video_url);
		me.divSkin.appendChild(me._video_popup_url);
		el=me._video_popup_controls_url=document.createElement('div');
		el.ggId="video_popup_controls_url";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 10px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 284px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_controls_url.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_controls_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_url') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_controls_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_controls_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_controls_url.style[domTransition]='';
				if (me._video_popup_controls_url.ggCurrentLogicStateVisible == 0) {
					me._video_popup_controls_url.style.visibility=(Number(me._video_popup_controls_url.style.opacity)>0||!me._video_popup_controls_url.style.opacity)?'inherit':'hidden';
					me._video_popup_controls_url.ggVisible=true;
				}
				else {
					me._video_popup_controls_url.style.visibility="hidden";
					me._video_popup_controls_url.ggVisible=false;
				}
			}
		}
		me._video_popup_controls_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._seekbar_url=document.createElement('div');
		me._seekbar_url__playhead=document.createElement('div');
		me._seekbar_url.mediaEl = null;
		el.ggId="seekbar_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_seekbar ";
		el.ggType='seekbar';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 11px;';
		hs+='left : -2px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 246px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._seekbar_url.connectToMediaEl = function() {
			var disableSeekbar = function() {
				me._seekbar_url__playhead.style.visibility = 'hidden';
				me._seekbar_url.style.background = '#000000';
				me._seekbar_url.ggConnected = false;
			}
			if (me._seekbar_url.mediaEl != null) {
				me._seekbar_url.mediaEl.removeEventListener('progress', me._seekbar_url.updatePlayback);
				me._seekbar_url.mediaEl.removeEventListener('canplay', me._seekbar_url.updatePlayback);
				me._seekbar_url.mediaEl.removeEventListener('timeupdate', me._seekbar_url.updatePlayback);
				if (me._seekbar_url.ggActivate) {
					me._seekbar_url.mediaEl.removeEventListener('play', me._seekbar_url.ggActivate);
				}
				if (me._seekbar_url.ggDeactivate) {
					me._seekbar_url.mediaEl.removeEventListener('ended', me._seekbar_url.ggDeactivate);
					me._seekbar_url.mediaEl.removeEventListener('pause', me._seekbar_url.ggDeactivate);
				}
				if (me._seekbar_url.ggMediaEnded) {
					me._seekbar_url.mediaEl.removeEventListener('ended', me._seekbar_url.ggMediaEnded);
				}
			}
			me._seekbar_url.mediaEl = player.getMediaObject('popup_video_url');
			if (me._seekbar_url.mediaEl != null) {
				me._seekbar_url__playhead.style.visibility = 'inherit';
				me._seekbar_url__playhead.style.left = '2px';
				me._seekbar_url.mediaEl.addEventListener('progress', me._seekbar_url.updatePlayback);
				me._seekbar_url.mediaEl.addEventListener('canplay', me._seekbar_url.updatePlayback);
				me._seekbar_url.mediaEl.addEventListener('timeupdate', me._seekbar_url.updatePlayback);
				if (me._seekbar_url.ggActivate) {
					me._seekbar_url.mediaEl.addEventListener('play', me._seekbar_url.ggActivate);
				}
				if (me._seekbar_url.ggDeactivate) {
					me._seekbar_url.mediaEl.addEventListener('ended', me._seekbar_url.ggDeactivate);
					me._seekbar_url.mediaEl.addEventListener('pause', me._seekbar_url.ggDeactivate);
				}
				if (me._seekbar_url.ggMediaEnded) {
					me._seekbar_url.mediaEl.addEventListener('ended', me._seekbar_url.ggMediaEnded);
				}
			me._seekbar_url.ggConnected = true;
			} else {
				disableSeekbar();
			}
			var videoEl = me.findElements('popup_video_url');
			if (videoEl.length > 0 && !videoEl[0].hasChildNodes()) {
				disableSeekbar();
			}
		}
		me._seekbar_url.updatePlayback = function() {
			if (!me._seekbar_url.ggConnected) return;
			if (me._seekbar_url.mediaEl != null) {
				if (me._seekbar_url.mediaEl.readyState) {
					var percent = me._seekbar_url.mediaEl.currentTime / me._seekbar_url.mediaEl.duration;
					var playheadpos = Math.round((me._seekbar_url.clientWidth - 2 * 8 + 2) * percent);
					playheadpos += 2;
					me._seekbar_url__playhead.style.left = playheadpos.toString() + 'px';
					var offsetPercent = Math.round(100.0 * (8 / me._seekbar_url.clientWidth));
					var currPos = offsetPercent + Math.round(percent * (100 - 2 * offsetPercent));
					var gradientString ='linear-gradient(90deg, #808080 0%, #808080 ' + currPos + '%';
					for (var i = 0; i < me._seekbar_url.mediaEl.buffered.length; i++) {
						var rangeStart = Math.round((me._seekbar_url.mediaEl.buffered.start(i) / me._seekbar_url.mediaEl.duration) * 100.0);
						var rangeEnd = Math.ceil((me._seekbar_url.mediaEl.buffered.end(i) / me._seekbar_url.mediaEl.duration) * 100.0);
						if (rangeEnd > currPos) {
							if (rangeStart < currPos) {
								gradientString += ', #c0c0c0 ' + currPos + '%';
							} else {
								gradientString += ', #000000 ' + currPos + '%, #000000 ' + rangeStart + '%';
								gradientString += ', #c0c0c0 ' + rangeStart + '%';
							}
								gradientString += ', #c0c0c0 ' + rangeEnd + '%';
							currPos = rangeEnd;
						}
					}
					if (currPos < 100) {
						gradientString += ', #000000 ' + currPos + '%';
					}
					gradientString += ')';
					me._seekbar_url.style.background = gradientString;
				}
			}
		}
		me._seekbar_url.appendChild(me._seekbar_url__playhead);
		hs+='background: #000000;';
		hs+='border: 2px solid #000000;';
		hs+='border-radius: 8px;';
		hs+=cssPrefix + 'border-radius: 8px;';
		var hs_playhead = 'height: 11px;';
		hs_playhead += 'width: 11px;';
		hs_playhead += 'border: 0px;';
		hs_playhead += 'position: absolute;';
		hs_playhead += 'left: 2px;';
		hs_playhead += 'top: 0px;';
		hs_playhead += 'border-radius: 6;';
		hs_playhead += cssPrefix + 'border-radius: 6px;';
		hs_playhead += 'background-color: rgba(0,0,0,1);';
		hs_playhead += 'pointer-events: none;';
		me._seekbar_url.setAttribute('style', hs);
		me._seekbar_url__playhead.setAttribute('style', hs_playhead);
		me._seekbar_url.ggIsActive=function() {
			if (me._seekbar_url.mediaEl != null) {
				return (me._seekbar_url.mediaEl.paused == false && me._seekbar_url.mediaEl.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._seekbar_url.onmousedown=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
					me._seekbar_url.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_url.onmousemove=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
					me._seekbar_url.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_url.ontouchend=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
					me._seekbar_url.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_url.ggActivate=function () {
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility=(Number(me._ht_video_pause_url.style.opacity)>0||!me._ht_video_pause_url.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_url.ggVisible=true;
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility='hidden';
			me._ht_video_play_url.ggVisible=false;
		}
		me._seekbar_url.ggDeactivate=function () {
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility=(Number(me._ht_video_play_url.style.opacity)>0||!me._ht_video_play_url.style.opacity)?'inherit':'hidden';
			me._ht_video_play_url.ggVisible=true;
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility='hidden';
			me._ht_video_pause_url.ggVisible=false;
		}
		me._seekbar_url.ggUpdatePosition=function (useTransition) {
		}
		me._seekbar_url.ggNodeChange=function () {
			me._seekbar_url.connectToMediaEl();
		}
		me._video_popup_controls_url.appendChild(me._seekbar_url);
		el=me._ht_video_play_url=document.createElement('div');
		els=me._ht_video_play_url__img=document.createElement('img');
		els.className='ggskin ggskin_ht_video_play_url';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEpklEQVRoge2ZW2wUZRiGn2/2NNuyQANNMBCJohciEAjEA1rRCzldYCsCoaTlcFG48JAYNGqiCBovGkRTLwgkIofWCo2peMAIJgYJYsCACEIa0MYjEWot7ba77ezO5wVCKunu/DOLFyb7XG123//9/nfm32/+mYEiRYoU+T8hhVuoULc1XtI9fGRGnRFECZFxFddywxHp6ivp62DraqfwOvkpKEi0escjFvI2MMpD2glyFvQUyJGw43yabFl1qZDa1xMsyLyGWLxsZL3CkwHrKspBEd5KOfZeWhZnA/pcw3+Qmp2ldpZW4OFCi/9DG8rqdHPtwUJM/AVZtGeEHUl/DNxfSNGhUGRTvxN7NujZMQ9StyViJ+MHgFlBCpmgKq39ib4lQZqDZSqM98Zf5z'+
			'8MASCiVfGkvSnQWBORXb1rGWhjkAJBENFHU03LW32N8RIMW7StPBMJtwFluTSWCJGwRb9TcPO5Sns6mp3I9pVp0wGeSysTCW8kTwiARDzCuYYqNiyZyvjyYaa183GL7VhL/AzIG6S0+p2pQK2XSWkszOjhNmsXTOLMG5W8v/Yhpt/qdY30QK1VfuR5g7iE55iYlNrha59FYN60sRx6ZR67nqjgtjEJP/MZhD6QqN1hfDTyBlHRB01MSmLhIb9feM94jtcvoL5mOiXRoTX5GHCt+0y1uYPUbYmgZhe+sJW7Z4RDwuNz7+DIa/OZMWG06bwAEJcZptqcQaI90QmA0T+3tz/jqbn9puF88fIcXnxsCqE8wf+NO85QmDuIZUXGmpok095BAEKW8HzVFHY/PYuEHTGZnvEcci8tVR9B/O0o5k8bx+frZjNuVGl+oWrc1DNn'+
			'EBEtNzVJph1UTdVXmHxzGQ2r7kLyrTKLkKlfziAu9JqaZLLKb53GcgA272+j+s0vfR+AXOTsiZYrnSrmVdovJr2XCnC5z2HN1iPsPfazp1aUP03r5zwjinaYmgD8eLHHU/PNDx3c+8InRiEAVDG+Hc55RuxY9nh6IORiuNVv/yOZ9/eGfWd4afe3DGRc07mBxQVzaQ66tq/sQjhmanSivXPI789d6Gbuqwd4rum4vxAASpup1Gvf8Blwt4nR0fOXUOVaF8pklY0fnab+g9OkA27vBTUOknfZhAaym4GUidHlPofvf+0C4Oj5K/+FDS0nA4cAvZyyM2dN1Xn7tHNmbzI0uXKkIDNNzMaXl7Lnq594attRLnYb3xPlwFqd2bnCeGl7bnoSS98d7ViZUyhjPM2EG3JdENUPU821lWDe/z07Uk9zdQciiwHPNXJjLm76u4'+
			'SsNX5CgGFrTTfWHBJhbbCJ+aLTVZ3d11hj3HavYryXyZxq/ToyqbIHEaO7xgD0isuc/veWnwgy2Pcj0/jSXUtVdAdgsg835byrunCgefl3QQ2MH9BdJdVc02y5zBQIXHQwCi1px55RSAgo5LVC3ZaInSx5BnQdEA1Qer9IdkOqacXhwHMY7FaowbBF28qzkXCFq1QgVAjcCdhDSAeAwwgHsiL7nMaak4XWHswNeGN1PSosa0rEMtkxlkiZq/pXzHU6uif+0sX69T43W0WKFClSpEgRX/wN5cKGTxXWN3wAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEpklEQVRoge2ZW2wUZRiGn2/2NNuyQANNMBCJohciEAjEA1rRCzldYCsCoaTlcFG48JAYNGqiCBovGkRTLwgkIofWCo2peMAIJgYJYsCACEIa0MYjEWot7ba77ezO5wVCKunu/DOLFyb7XG123//9/nfm32/+mYEiRYoU+T8hhVuoULc1XtI9fGRGnRFECZFxFddywxHp6ivp62DraqfwOvkpKEi0escjFvI2MMpD2glyFvQUyJGw43yabFl1qZDa1xMsyLyGWLxsZL3CkwHrKspBEd5KOfZeWhZnA/pcw3+Qmp2ldpZW4OFCi/9DG8rqdHPtwUJM/AVZtGeEHUl/DNxfSNGhUGRTvxN7NujZMQ9StyViJ+MHgFlBCpmgKq39ib4lQZqDZSqM98Zf5z'+
			'8MASCiVfGkvSnQWBORXb1rGWhjkAJBENFHU03LW32N8RIMW7StPBMJtwFluTSWCJGwRb9TcPO5Sns6mp3I9pVp0wGeSysTCW8kTwiARDzCuYYqNiyZyvjyYaa183GL7VhL/AzIG6S0+p2pQK2XSWkszOjhNmsXTOLMG5W8v/Yhpt/qdY30QK1VfuR5g7iE55iYlNrha59FYN60sRx6ZR67nqjgtjEJP/MZhD6QqN1hfDTyBlHRB01MSmLhIb9feM94jtcvoL5mOiXRoTX5GHCt+0y1uYPUbYmgZhe+sJW7Z4RDwuNz7+DIa/OZMWG06bwAEJcZptqcQaI90QmA0T+3tz/jqbn9puF88fIcXnxsCqE8wf+NO85QmDuIZUXGmpok095BAEKW8HzVFHY/PYuEHTGZnvEcci8tVR9B/O0o5k8bx+frZjNuVGl+oWrc1DNn'+
			'EBEtNzVJph1UTdVXmHxzGQ2r7kLyrTKLkKlfziAu9JqaZLLKb53GcgA272+j+s0vfR+AXOTsiZYrnSrmVdovJr2XCnC5z2HN1iPsPfazp1aUP03r5zwjinaYmgD8eLHHU/PNDx3c+8InRiEAVDG+Hc55RuxY9nh6IORiuNVv/yOZ9/eGfWd4afe3DGRc07mBxQVzaQ66tq/sQjhmanSivXPI789d6Gbuqwd4rum4vxAASpup1Gvf8Blwt4nR0fOXUOVaF8pklY0fnab+g9OkA27vBTUOknfZhAaym4GUidHlPofvf+0C4Oj5K/+FDS0nA4cAvZyyM2dN1Xn7tHNmbzI0uXKkIDNNzMaXl7Lnq594attRLnYb3xPlwFqd2bnCeGl7bnoSS98d7ViZUyhjPM2EG3JdENUPU821lWDe/z07Uk9zdQciiwHPNXJjLm76u4'+
			'SsNX5CgGFrTTfWHBJhbbCJ+aLTVZ3d11hj3HavYryXyZxq/ToyqbIHEaO7xgD0isuc/veWnwgy2Pcj0/jSXUtVdAdgsg835byrunCgefl3QQ2MH9BdJdVc02y5zBQIXHQwCi1px55RSAgo5LVC3ZaInSx5BnQdEA1Qer9IdkOqacXhwHMY7FaowbBF28qzkXCFq1QgVAjcCdhDSAeAwwgHsiL7nMaak4XWHswNeGN1PSosa0rEMtkxlkiZq/pXzHU6uif+0sX69T43W0WKFClSpEgRX/wN5cKGTxXWN3wAAAAASUVORK5CYII=';
		me._ht_video_play_url__img.ggOverSrc=hs;
		el.ggId="ht_video_play_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_play_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_play_url.onclick=function (e) {
			if (me._popup_video_url.ggApiPlayer) {
				if (me._popup_video_url.ggApiPlayerType == 'youtube') {
					me._popup_video_url.ggApiPlayer.playVideo();
				} else if (me._popup_video_url.ggApiPlayerType == 'vimeo') {
					me._popup_video_url.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_url","1");
			}
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility='hidden';
			me._ht_video_play_url.ggVisible=false;
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility=(Number(me._ht_video_pause_url.style.opacity)>0||!me._ht_video_pause_url.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_url.ggVisible=true;
		}
		me._ht_video_play_url.onmouseover=function (e) {
			me._ht_video_play_url__img.src=me._ht_video_play_url__img.ggOverSrc;
		}
		me._ht_video_play_url.onmouseout=function (e) {
			me._ht_video_play_url__img.src=me._ht_video_play_url__img.ggNormalSrc;
		}
		me._ht_video_play_url.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_url.appendChild(me._ht_video_play_url);
		el=me._ht_video_pause_url=document.createElement('div');
		els=me._ht_video_pause_url__img=document.createElement('img');
		els.className='ggskin ggskin_ht_video_pause_url';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADSUlEQVRoge2ZTWhUVxiGn+/OTCcJVlI0mgql1oZ2Ed2JLvzZlC4EF4IVMzFmElqxYqWLgkihREVBQbqJFAQxM/5wR1ModFFB6EKsuAlYaKW0i5pihcaf2ETjzDjjfC7sIjidO+eec5VK77O85/2+877ce879g5iYmP8F4lS9/lgbc1s+Q6ULWAB0AC1AEiWBcB+4B9wCfgG5RrV6mdHBv1yNP4t9kEyuG7yzQLdF9RgwSvXRcUY/mrT2MAu7ID35DxA5CbQ6zl8EOUpS93Gqf8alUfggmXwW5ATguUz8DOMomyj0j9k2CGem9+SHILnQdc1ZjMdFNufX2TYwPyO9ubWo9z2QtJ3MgCKqqyhkr4YtNAvSc+INJDnG053pefMHSbrDrhmDS0QFLzHCiw'+
			'kB8CZVdoctan5GMvk+kFNWluwpkn68iNzg36YFwdf7wEg7ZfkySNLZ3kp72yt1x++XKtycfMjijjm0pBJ147enS9x9UG7UtpWy1wt8FehvFsFBysl1oB1BkqGNy9j+3jt1x89eGScz/AP+rtWs7JpfN/554UcOfftzQGfJECJIszWy2rTRc2Al64+1mYqbBKmtcXXjQIq56eWm4sZBNp2bA7I0EkvWeEuMlQ1HUpXXcX06dkV5y1TaOIhWF0ZixgVhnqk0IAidkZhxQTVtKm0cRLxqJGZcEIkgCLU7UXhxQuWhqfS/HQSmTYWNg6QZB4oRmHFAp0yVjYPkBkuIXIrEjy0iN0ylwXd21QvOZlyocd1UGvzQqCkfqRwEGu4e08UKE1OluuNTxQoAkw/K/zo+UzbZFCvjBiLA5M7dkx9G5BPThtGh5/Czm03Vzd8QE4nD'+
			'vPhFfwtSO8MUNA9ypu9P0B3WlmxQ/Ri/N9T2b/ZZx8/mQY9bmQqLyl4K2W/Clpl/n0rXdgHfhZ0gFKpHKfTttyk1D5IbLPFqcQNwxmYiA4Z59/dPQdSmOPz7xtCQx29vHwD2WNXXMwOyDX+r79LE3siW3CoeezmELssOivI1SfmC01t/tfbxD1H9H3kfWEHAjXMWEyjnkdoR/IFrTvPPIrpX2YGRFsrecqAbZCFKJ8JrKPdA7oBOIHoJv/8n23UQExMTExMTE/OS8QQ32tkPnCvTVwAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADSUlEQVRoge2ZTWhUVxiGn+/OTCcJVlI0mgql1oZ2Ed2JLvzZlC4EF4IVMzFmElqxYqWLgkihREVBQbqJFAQxM/5wR1ModFFB6EKsuAlYaKW0i5pihcaf2ETjzDjjfC7sIjidO+eec5VK77O85/2+877ce879g5iYmP8F4lS9/lgbc1s+Q6ULWAB0AC1AEiWBcB+4B9wCfgG5RrV6mdHBv1yNP4t9kEyuG7yzQLdF9RgwSvXRcUY/mrT2MAu7ID35DxA5CbQ6zl8EOUpS93Gqf8alUfggmXwW5ATguUz8DOMomyj0j9k2CGem9+SHILnQdc1ZjMdFNufX2TYwPyO9ubWo9z2QtJ3MgCKqqyhkr4YtNAvSc+INJDnG053pefMHSbrDrhmDS0QFLzHCiw'+
			'kB8CZVdoctan5GMvk+kFNWluwpkn68iNzg36YFwdf7wEg7ZfkySNLZ3kp72yt1x++XKtycfMjijjm0pBJ147enS9x9UG7UtpWy1wt8FehvFsFBysl1oB1BkqGNy9j+3jt1x89eGScz/AP+rtWs7JpfN/554UcOfftzQGfJECJIszWy2rTRc2Al64+1mYqbBKmtcXXjQIq56eWm4sZBNp2bA7I0EkvWeEuMlQ1HUpXXcX06dkV5y1TaOIhWF0ZixgVhnqk0IAidkZhxQTVtKm0cRLxqJGZcEIkgCLU7UXhxQuWhqfS/HQSmTYWNg6QZB4oRmHFAp0yVjYPkBkuIXIrEjy0iN0ylwXd21QvOZlyocd1UGvzQqCkfqRwEGu4e08UKE1OluuNTxQoAkw/K/zo+UzbZFCvjBiLA5M7dkx9G5BPThtGh5/Czm03Vzd8QE4nD'+
			'vPhFfwtSO8MUNA9ypu9P0B3WlmxQ/Ri/N9T2b/ZZx8/mQY9bmQqLyl4K2W/Clpl/n0rXdgHfhZ0gFKpHKfTttyk1D5IbLPFqcQNwxmYiA4Z59/dPQdSmOPz7xtCQx29vHwD2WNXXMwOyDX+r79LE3siW3CoeezmELssOivI1SfmC01t/tfbxD1H9H3kfWEHAjXMWEyjnkdoR/IFrTvPPIrpX2YGRFsrecqAbZCFKJ8JrKPdA7oBOIHoJv/8n23UQExMTExMTE/OS8QQ32tkPnCvTVwAAAABJRU5ErkJggg==';
		me._ht_video_pause_url__img.ggOverSrc=hs;
		el.ggId="ht_video_pause_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_pause_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_pause_url.onclick=function (e) {
			if (me._popup_video_url.ggApiPlayer) {
				if (me._popup_video_url.ggApiPlayerType == 'youtube') {
					me._popup_video_url.ggApiPlayer.pauseVideo();
				} else if (me._popup_video_url.ggApiPlayerType == 'vimeo') {
					me._popup_video_url.ggApiPlayer.pause();
				}
			} else {
				player.pauseSound("popup_video_url");
			}
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility='hidden';
			me._ht_video_pause_url.ggVisible=false;
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility=(Number(me._ht_video_play_url.style.opacity)>0||!me._ht_video_play_url.style.opacity)?'inherit':'hidden';
			me._ht_video_play_url.ggVisible=true;
		}
		me._ht_video_pause_url.onmouseover=function (e) {
			me._ht_video_pause_url__img.src=me._ht_video_pause_url__img.ggOverSrc;
		}
		me._ht_video_pause_url.onmouseout=function (e) {
			me._ht_video_pause_url__img.src=me._ht_video_pause_url__img.ggNormalSrc;
		}
		me._ht_video_pause_url.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_url.appendChild(me._ht_video_pause_url);
		me.divSkin.appendChild(me._video_popup_controls_url);
		el=me._video_popup_vimeo=document.createElement('div');
		el.ggId="video_popup_vimeo";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_vimeo.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_vimeo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_vimeo') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_vimeo.style[domTransition]='';
				if (me._video_popup_vimeo.ggCurrentLogicStateVisible == 0) {
					me._video_popup_vimeo.style.visibility=(Number(me._video_popup_vimeo.style.opacity)>0||!me._video_popup_vimeo.style.opacity)?'inherit':'hidden';
					me._video_popup_vimeo.ggVisible=true;
				}
				else {
					me._video_popup_vimeo.style.visibility="hidden";
					me._video_popup_vimeo.ggVisible=false;
				}
			}
		}
		me._video_popup_vimeo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._loading_video_vimeo=document.createElement('div');
		els=me._loading_video_vimeo__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSI2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ3aGl0ZSI+CiA8Y2lyY2xlIGN5PSIzIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09In'+
			'JvdGF0ZSg0NSAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuMTI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAu'+
			'MiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiByPSIwIj4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMC4zNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIi'+
			'ByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgMTYgMTYpIiBjeD0iMTYi'+
			'IHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjYyNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC'+
			'40IDAuOCIgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgzMTUgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjg3NXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRl'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_video_vimeo__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_vimeo";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_vimeo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_vimeo.appendChild(me._loading_video_vimeo);
		el=me._popup_video_vimeo=document.createElement('div');
		me._popup_video_vimeo.seekbars = [];
		me._popup_video_vimeo.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_vimeo.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_vimeo.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_vimeo.hasChildNodes()) {
				me._popup_video_vimeo.removeChild(me._popup_video_vimeo.lastChild);
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_vimeo.ggVideoNotLoaded ==false && me._popup_video_vimeo.ggDeactivate) { me._popup_video_vimeo.ggDeactivate(); }
				me._popup_video_vimeo.ggVideoNotLoaded = true;
				return;
			}
			me._popup_video_vimeo.ggVideoNotLoaded = false;
			me._popup_video_vimeo__vid=document.createElement('iframe');
			me._popup_video_vimeo__vid.className='ggskin ggskin_video';
			var ggVideoParams = '?autoplay=1&amp;loop=0&amp;rel=0';
			var ggVideoUrl = 'https://player.vimeo.com/video/' + media + ggVideoParams;
			me._popup_video_vimeo__vid.setAttribute('src', ggVideoUrl);
			me._popup_video_vimeo__vid.setAttribute('width', '100%');
			me._popup_video_vimeo__vid.setAttribute('height', '100%');
			me._popup_video_vimeo__vid.setAttribute('allow', 'autoplay');
			me._popup_video_vimeo__vid.setAttribute('allowfullscreen', 'true');
			me._popup_video_vimeo__vid.setAttribute('style', 'border:none; ; ;');
			me._popup_video_vimeo.appendChild(me._popup_video_vimeo__vid);
			me._popup_video_vimeo.ggVideoSource = media;
		}
		el.ggId="popup_video_vimeo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_vimeo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_vimeo') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_video_vimeo.style[domTransition]='';
				if (me._popup_video_vimeo.ggCurrentLogicStateVisible == 0) {
					me._popup_video_vimeo.style.visibility=(Number(me._popup_video_vimeo.style.opacity)>0||!me._popup_video_vimeo.style.opacity)?'inherit':'hidden';
					if (me._popup_video_vimeo.ggVideoNotLoaded) {
						me._popup_video_vimeo.ggInitMedia(me._popup_video_vimeo.ggVideoSource);
					}
					me._popup_video_vimeo.ggVisible=true;
				}
				else {
					me._popup_video_vimeo.style.visibility="hidden";
					me._popup_video_vimeo.ggInitMedia('');
					me._popup_video_vimeo.ggVisible=false;
				}
			}
		}
		me._popup_video_vimeo.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_vimeo.appendChild(me._popup_video_vimeo);
		me.divSkin.appendChild(me._video_popup_vimeo);
		el=me._video_popup_youtube=document.createElement('div');
		el.ggId="video_popup_youtube";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_youtube.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_youtube') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_youtube.style[domTransition]='';
				if (me._video_popup_youtube.ggCurrentLogicStateVisible == 0) {
					me._video_popup_youtube.style.visibility=(Number(me._video_popup_youtube.style.opacity)>0||!me._video_popup_youtube.style.opacity)?'inherit':'hidden';
					me._video_popup_youtube.ggVisible=true;
				}
				else {
					me._video_popup_youtube.style.visibility="hidden";
					me._video_popup_youtube.ggVisible=false;
				}
			}
		}
		me._video_popup_youtube.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._loading_video_youtube=document.createElement('div');
		els=me._loading_video_youtube__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSI2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ3aGl0ZSI+CiA8Y2lyY2xlIGN5PSIzIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09In'+
			'JvdGF0ZSg0NSAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuMTI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAu'+
			'MiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjI1cyIgZHVyPSIxcyIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiByPSIwIj4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMC4zNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIi'+
			'ByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgMTYgMTYpIiBjeD0iMTYi'+
			'IHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjYyNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC'+
			'40IDAuOCIgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiB0cmFuc2Zvcm09InJvdGF0ZSgzMTUgMTYgMTYpIiBjeD0iMTYiIHI9IjAiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjg3NXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRl'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgcj0iMCI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49IjAuNXMiIGR1cj0iMXMiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_video_youtube__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_youtube";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_youtube.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_youtube.appendChild(me._loading_video_youtube);
		el=me._popup_video_youtube=document.createElement('div');
		me._popup_video_youtube.seekbars = [];
		me._popup_video_youtube.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_youtube.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_youtube.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_youtube.hasChildNodes()) {
				me._popup_video_youtube.removeChild(me._popup_video_youtube.lastChild);
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_youtube.ggVideoNotLoaded ==false && me._popup_video_youtube.ggDeactivate) { me._popup_video_youtube.ggDeactivate(); }
				me._popup_video_youtube.ggVideoNotLoaded = true;
			me._popup_video_youtube.ggYoutubeApiReady = function() { me._popup_video_youtube.ggYoutubeApiLoaded = true;}
				return;
			}
			me._popup_video_youtube.ggVideoNotLoaded = false;
			me._popup_video_youtube__vid=document.createElement('iframe');
			me._popup_video_youtube__vid.className='ggskin ggskin_video';
			var ggVideoParams = '?autoplay=1&amp;controls=1&amp;loop=0&amp;enablejsapi=0&amp;rel=0';
			var ggVideoUrl = 'https://www.youtube.com/embed/' + media + ggVideoParams;
			me._popup_video_youtube__vid.setAttribute('src', ggVideoUrl);
			me._popup_video_youtube__vid.setAttribute('width', '100%');
			me._popup_video_youtube__vid.setAttribute('height', '100%');
			me._popup_video_youtube__vid.setAttribute('allow', 'autoplay');
			me._popup_video_youtube__vid.setAttribute('allowfullscreen', 'true');
			me._popup_video_youtube__vid.setAttribute('style', 'border:none; ; ;');
			me._popup_video_youtube.appendChild(me._popup_video_youtube__vid);
			me._popup_video_youtube.ggVideoSource = media;
			if (me._popup_video_youtube.ggYoutubeApiLoaded && me._popup_video_youtube.ggYoutubeApiLoaded == true) {me._popup_video_youtube.ggYoutubeApiReady();}
		}
		el.ggId="popup_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_youtube') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_video_youtube.style[domTransition]='';
				if (me._popup_video_youtube.ggCurrentLogicStateVisible == 0) {
					me._popup_video_youtube.style.visibility=(Number(me._popup_video_youtube.style.opacity)>0||!me._popup_video_youtube.style.opacity)?'inherit':'hidden';
					if (me._popup_video_youtube.ggVideoNotLoaded) {
						me._popup_video_youtube.ggInitMedia(me._popup_video_youtube.ggVideoSource);
					}
					me._popup_video_youtube.ggVisible=true;
				}
				else {
					me._popup_video_youtube.style.visibility="hidden";
					me._popup_video_youtube.ggInitMedia('');
					me._popup_video_youtube.ggVisible=false;
				}
			}
		}
		me._popup_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_youtube.appendChild(me._popup_video_youtube);
		me.divSkin.appendChild(me._video_popup_youtube);
		el=me.__360image_gyro=document.createElement('div');
		el.ggTimestamp=0;
		el.ggLastIsActive=false;
		el.ggTimeout=4000;
		el.ggId="360image_gyro";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 86px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 116px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__360image_gyro.ggIsActive=function() {
			return (me.__360image_gyro.ggTimestamp + me.__360image_gyro.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__360image_gyro.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getHasTouch() == true)) && 
				((player.getVariableValue('opt_gyro') == true)) && 
				((player.getVariableValue('vis_360image_once') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me.__360image_gyro.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me.__360image_gyro.ggCurrentLogicStateVisible = newLogicStateVisible;
				me.__360image_gyro.style[domTransition]='opacity 500ms ease 0ms';
				if (me.__360image_gyro.ggCurrentLogicStateVisible == 0) {
					me.__360image_gyro.style.visibility=(Number(me.__360image_gyro.style.opacity)>0||!me.__360image_gyro.style.opacity)?'inherit':'hidden';
					me.__360image_gyro.ggVisible=true;
				}
				else {
					me.__360image_gyro.style.visibility="hidden";
					me.__360image_gyro.ggVisible=false;
				}
			}
		}
		me.__360image_gyro.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.__360image_gyro.ggIsActive() == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me.__360image_gyro.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me.__360image_gyro.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me.__360image_gyro.style[domTransition]='opacity 500ms ease 0ms';
				if (me.__360image_gyro.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me.__360image_gyro.style.opacity == 0.0) { me.__360image_gyro.style.visibility="hidden"; } }, 505);
					me.__360image_gyro.style.opacity=0;
				}
				else {
					me.__360image_gyro.style.visibility=me.__360image_gyro.ggVisible?'inherit':'hidden';
					me.__360image_gyro.style.opacity=1;
				}
			}
		}
		me.__360image_gyro.ggDeactivate=function () {
			player.setVariableValue('vis_360image_once', false);
		}
		me.__360image_gyro.ggCurrentLogicStateVisible = -1;
		me.__360image_gyro.ggCurrentLogicStateAlpha = -1;
		me.__360image_gyro.ggUpdateConditionTimer=function () {
			me.__360image_gyro.logicBlock_alpha();
		}
		me.__360image_gyro.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me.__360image_timer=document.createElement('div');
		el.ggTimestamp=0;
		el.ggLastIsActive=false;
		el.ggTimeout=400;
		el.ggId="360image_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 38px;';
		hs+='left : 32px;';
		hs+='position : absolute;';
		hs+='top : 25px;';
		hs+='visibility : inherit;';
		hs+='width : 52px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__360image_timer.ggIsActive=function() {
			return (me.__360image_timer.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me.__360image_timer.ggTimestamp) / me.__360image_timer.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__360image_timer.ggActivate=function () {
			player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') + Number("1"));
			player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') % Number("5"));
		}
		me.__360image_timer.ggUpdatePosition=function (useTransition) {
		}
		me.__360image_gyro.appendChild(me.__360image_timer);
		el=me.__360image_background=document.createElement('div');
		el.ggId="360image_background";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.705882);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 86px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 116px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__360image_background.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__360image_background.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__360image_gyro.appendChild(me.__360image_background);
		el=me.__360image_text=document.createElement('div');
		els=me.__360image_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="360image_text";
		el.ggDx=0;
		el.ggDy=32;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 19px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 89px;';
		hs+='pointer-events:auto;';
		hs+='font-weight: bold;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 89px;';
		hs+='height: 19px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Gyroscope";
		el.appendChild(els);
		me.__360image_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__360image_text.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__360image_gyro.appendChild(me.__360image_text);
		el=me.__360image=document.createElement('div');
		el.ggId="360image";
		el.ggDx=0;
		el.ggDy=-8;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 9px;';
		hs+='border-radius : 9px;';
		hs+='background : rgba(255,255,255,0.00392157);';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 58px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 33px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__360image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__360image.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_360image') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_360image') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_360image') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_360image') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_360image') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me.__360image.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me.__360image.ggCurrentLogicStatePosition = newLogicStatePosition;
				me.__360image.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, ' + cssPrefix + 'transform 1000ms ease 0ms';
				if (me.__360image.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else if (me.__360image.ggCurrentLogicStatePosition == 1) {
					this.ggDx = 0;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else if (me.__360image.ggCurrentLogicStatePosition == 2) {
					this.ggDx = -32;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else if (me.__360image.ggCurrentLogicStatePosition == 3) {
					this.ggDx = 0;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else if (me.__360image.ggCurrentLogicStatePosition == 4) {
					this.ggDx = 32;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else {
					me.__360image.ggDx=0;
					me.__360image.ggDy=-8;
					me.__360image.ggUpdatePosition(true);
				}
			}
		}
		me.__360image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('pos_360image') == 2))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((player.getVariableValue('pos_360image') == 3))
			)
			{
				newLogicStateScaling = 1;
			}
			else if (
				((player.getVariableValue('pos_360image') == 4))
			)
			{
				newLogicStateScaling = 2;
			}
			else if (
				((player.getVariableValue('pos_360image') == 5))
			)
			{
				newLogicStateScaling = 3;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me.__360image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me.__360image.ggCurrentLogicStateScaling = newLogicStateScaling;
				me.__360image.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, ' + cssPrefix + 'transform 1000ms ease 0ms';
				if (me.__360image.ggCurrentLogicStateScaling == 0) {
					me.__360image.ggParameter.sx = 0.7;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
				else if (me.__360image.ggCurrentLogicStateScaling == 1) {
					me.__360image.ggParameter.sx = 1;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
				else if (me.__360image.ggCurrentLogicStateScaling == 2) {
					me.__360image.ggParameter.sx = 0.7;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
				else if (me.__360image.ggCurrentLogicStateScaling == 3) {
					me.__360image.ggParameter.sx = 1;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
				else {
					me.__360image.ggParameter.sx = 1;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
			}
		}
		me.__360image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._phone1=document.createElement('div');
		el.ggId="phone1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 1px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 37px;';
		hs+='left : 3px;';
		hs+='position : absolute;';
		hs+='top : 9px;';
		hs+='visibility : inherit;';
		hs+='width : 26px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._phone1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._phone1.ggUpdatePosition=function (useTransition) {
		}
		me.__360image.appendChild(me._phone1);
		el=me._phone2=document.createElement('div');
		el.ggId="phone2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 6px;';
		hs+='left : 14px;';
		hs+='position : absolute;';
		hs+='top : 49px;';
		hs+='visibility : inherit;';
		hs+='width : 6px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._phone2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._phone2.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('pos_360image') == 1))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((player.getVariableValue('pos_360image') == 2))
			)
			{
				newLogicStateScaling = 1;
			}
			else if (
				((player.getVariableValue('pos_360image') == 3))
			)
			{
				newLogicStateScaling = 2;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._phone2.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._phone2.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._phone2.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms';
				if (me._phone2.ggCurrentLogicStateScaling == 0) {
					me._phone2.ggParameter.sx = 0.8;
					me._phone2.ggParameter.sy = 1;
					me._phone2.style[domTransform]=parameterToTransform(me._phone2.ggParameter);
				}
				else if (me._phone2.ggCurrentLogicStateScaling == 1) {
					me._phone2.ggParameter.sx = 1;
					me._phone2.ggParameter.sy = 1;
					me._phone2.style[domTransform]=parameterToTransform(me._phone2.ggParameter);
				}
				else if (me._phone2.ggCurrentLogicStateScaling == 2) {
					me._phone2.ggParameter.sx = 0.8;
					me._phone2.ggParameter.sy = 1;
					me._phone2.style[domTransform]=parameterToTransform(me._phone2.ggParameter);
				}
				else {
					me._phone2.ggParameter.sx = 1;
					me._phone2.ggParameter.sy = 1;
					me._phone2.style[domTransform]=parameterToTransform(me._phone2.ggParameter);
				}
			}
		}
		me._phone2.ggUpdatePosition=function (useTransition) {
		}
		me.__360image.appendChild(me._phone2);
		el=me._phone3=document.createElement('div');
		el.ggId="phone3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 1px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 8px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._phone3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._phone3.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('pos_360image') == 1))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((player.getVariableValue('pos_360image') == 0))
			)
			{
				newLogicStateScaling = 1;
			}
			else if (
				((player.getVariableValue('pos_360image') == 0))
			)
			{
				newLogicStateScaling = 2;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._phone3.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._phone3.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._phone3.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms';
				if (me._phone3.ggCurrentLogicStateScaling == 0) {
					me._phone3.ggParameter.sx = 0.8;
					me._phone3.ggParameter.sy = 1;
					me._phone3.style[domTransform]=parameterToTransform(me._phone3.ggParameter);
				}
				else if (me._phone3.ggCurrentLogicStateScaling == 1) {
					me._phone3.ggParameter.sx = 1;
					me._phone3.ggParameter.sy = 1;
					me._phone3.style[domTransform]=parameterToTransform(me._phone3.ggParameter);
				}
				else if (me._phone3.ggCurrentLogicStateScaling == 2) {
					me._phone3.ggParameter.sx = 0.8;
					me._phone3.ggParameter.sy = 1;
					me._phone3.style[domTransform]=parameterToTransform(me._phone3.ggParameter);
				}
				else {
					me._phone3.ggParameter.sx = 1;
					me._phone3.ggParameter.sy = 1;
					me._phone3.style[domTransform]=parameterToTransform(me._phone3.ggParameter);
				}
			}
		}
		me._phone3.ggUpdatePosition=function (useTransition) {
		}
		me.__360image.appendChild(me._phone3);
		me.__360image_gyro.appendChild(me.__360image);
		me.divSkin.appendChild(me.__360image_gyro);
		el=me._close=document.createElement('div');
		els=me._close__img=document.createElement('img');
		els.className='ggskin ggskin_close';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAKmElEQVR4nO1be3BU1Rn/nXt3s5sEwqMsG2VxErsoEByRRUSmbRJllDLaduiACCgRgtiqxcLoaIJkFREVgzJYxRQlohZKqG0FqyM6i48kMgSl1cUprFLd1bAQxCRs2N37+PpHdrf7uPu4926izvQ3szN7zznf857H951zD/ADAxGxfPLLK7OJc3cVfGPsnQ9gJsAqAQwF4GEMHiLmAWSPLDMPMxo8/hdvOgUw0iKHiHgABIAYy8wj4rDoT05unzcHlC7YNhegRwBcmCNJLwAPQB4AXiKcAlgXB9YFyF0yx3WTyPpkY6hPCqHvzAj0oWm5QEQcAE6Bn5Ijku2TGWNypgaaULrgOSfAGvLBKxOMBrbmyxdq1uvhwRgT458TPNnQ0MC5XC5DR0eHkYgMu3'+
			'bt4rONOeuCbXWDYTwACCI9OPbmbSv18Ij0oBhYfIXb7TYkE1RUVEiMMUmJWenC5yeC8C8AvB6l1ILn2e9922ue0khO8fZwQP9Eodb4CK9GDLLxACBJ9MQFNduWaSRn8b2aA4CWlpaUSUXJeCJiRMQTkfGCRdsaQGyWRiV0QxDwdPmS7Qs1krOEPy6Xy2CxWGJOqKiokAHIkXrmdrs5k8nEzGYzBwA/qXt7ZUiSH9Kuft4QLi4suMqzdeEBtYTRyZABQEdHh9FsNrPoW/d6vYXpCKvW7L89EBI2aNc57/CXjS6c3v7EfF9yBWNMjIsDknu5zBiTOQAwm80sQiB1dHQY00mqWuNa9j0zHgCsX5wK7l76WKviS2OMUWTtT44T+m32er2FNpstCAA+n8+cTkp1w/45Z4PCS/nSOt/gOG7Hq3ctXuxwJBgaC3wi0WPCks4Y'+
			'E5nX6y30+/0iAFit1pSVAAAWbm4tO+oLHADY0IEyIB8wGrHyy+ZbNicVS+jv/inxDGNM5IB+w9MZ/9ePvzJ+9lWw+ftuPAAIAtZPWP7yhKTilDcfD6WYOgEb/3y0XiJ5ml7lBgmm7oDQvLKlPe08loyMDrj2ofcqg4J4txoN5v7Ujg1LZ6DAqD8+WjVnMlbNmayKhoim7Nr77/tyba/Y7QGg3dPNn+kNNkJFwnTheSVYXzMdRSYDxo8dgWWbXDhxpi9X8gQkG9/4yuGcaSWR6i5avvO1o8/OP5StbdoeULf98K8ImJir0AIjjy23V6LI1O9Th92CN9Zej8svGp0rixiSjdfQE/izgXPNzqZDBWnqZfRPjsoOaPd084FwuF6NxNXzHZhU9qOEstHDC7G7fhZuuvrinPmkM1atE4gw/vnWj2/L1k7RAfe9+NEcIozPVd'+
			'iqOZNRe61yZzHyHB695cqs84KB5/DAosszGqnWCYJIa6rvaRmlUMUhksSlOMDv51hfSMh5EslVqYXVF+Ev9bNQOqIopW5UiRk7770Gy2ZV5E1eBMOOdQbuz9QgxQFLm96ZkuvbV/tGlOaFKXYL3lz3C8yYUJozHzVyJZmWK8QGMaSsAt8GhXk5a6IB0Xlh9fYDIALW3XwFjIas4Yge8N19wmMArk8qJwBgx48fNxsMhthSN+3efZ8Q5byxqWmt1ovGVw6rWhYBoNw6xNa2ca4/rqg/G2xubg5HS5Y8e8CmxnityuiBVnmd3wYnJRURkDQHfP71uSsHU6nBlCPJ4iXxz9HzAa6mpiYWLIiinPuCraDcH99wayXPiqbX3bqcLEssvgfEUmYufvxLROM0SwCwdschtH16Qg8LRbQe6cRDO7NGtRlBBFv8Y/RPwhCQZTpf'+
			'jxBRknHb5v2a438ldH4TwG+eegeiJGdvnAEEyu4AIhquSwqArp4gaje5IIj6FAYAQZRRu2k/unqCunkRYUz0f/z5YOICzFCiWxKADz2nUPfCB7r51L3wAT767FQeNAIADInsEyTsDSZHIBkOQX74OOLuKURGBzAKIw+YYrfg4cXTdfN5ePF0XPZjSx406kdPTxYHMPA9eoVYhhVi64rqvIS3RgOHrSuqMKok7Wa1KgQEFCR/H8BFd4QBgAO8egQYeA7P3FGpmPFpxXkji7HlzioYeP0OFcKhlNmUczgc/3MA43Q54P4bHaqyulwxY0IpVs936OYTgillfU5wawFP/9TKfNWcyTnl81px688rdCddnyM1QOEOHToUS4lt5xnbtDAerIxQt5ym5UJyERd/IPL4ryu/5Bi+HlSlVCLf8hKGgNUqE8+49wdaGUGUcfdzbb'+
			'j7uTZNEaMWuQaetXm93pFElLCkpOwIFRi5ViEkD9iuUOc3AdRu2h+L8D71nsHWFdV5XTmUMHZkwZOMMebz+YoAxFaDlLVlzHCzK1emavPz1iOduHb1noTw9kPPKVxT/6qqLFKtXAOHj5t/W+UCAJPJFCYijogMgIIDXl55pYfjch8GuSrT9LobNz66TzGx6eoJYv4jb+a0n6BlU2R0iWljcTFRcXGxZLFYApEjcxlIcy5QVMA1qxGQTanGVw7D+fLBjCmtKMloeOlgVj5qjTfy3Ps7VlTtBYCzZ8+GopFg9LsBRQf88oqxf2cMqsLidMqpVTpffCKQpo4ruae4mAgAbDZbSq6j6IC7ZtsDPON2qpWWrKTWPbx88RlqMj61ecm0o9HnlpaWWN2JEyeKgQynw5ZhBc2dZ4K3qhWarLhW6OVjYMy9etElCd8zWSwWBgAn'+
			'T54cEg6HTQACLNMXYev2Hhn6jzZ/fVgSf6dag+8QjKF35gTrVetrLj0eX05EfX6/XywtLS0BAJvNdjpjilV/3cTe2TOs6wZS2YHAmGGmO5KNBwBRFE3l5eUJLzxrjll/3cTeYWbjDRxjnflUcqAwYkjB6r/VVb6mVGc0Gvlz584lfD6TU5L91gNVe2ZfPvYyA8c15UPJgcLwIpNz35qqLWpoMs4BSrhu7bvTTwZCfyBC2hPX7wIjioxr9zmrN6mhyToHKGHv/T/74J6Z5TNMBrYWQF72EPWAMQTPH2Zeotb4GL3aHhCPGxrfvfiLrvAWSaYrtPLQA44x79RxIxc9XevI6UxOkiS5sLBQ6O7uFux2u8AYk3U5AAB2v+UxNb79xQZRlmv18FGLISZ+2+JK27pbZl78bbo2UYMtFovQ0tIizps3L2XbX7cDoqhes7/mbE'+
			'jYBCDnjxS1wMDhyPgxJSub75zekVwXNTgQCIgHDx4UlAxORt4cAACzH3xvWte54E6SkfedUZ7nPrUONT2xtuaSPZeeP1wAgFAoJBYXF4u9vb2i3W4XM99uUUZaB9hsNhH9J0XM5/Ol+94uBUufbS91Hw/8SSLSfzICwGjgWseMND+zsXbS6/bRo8OBQEAsKyuLGpv2zmBDQwPndDqj54Ap7YiIMcZI0QHBYFAeN25cCACOHTtmit4UyRX988J/HhdlWqqGLgrG8EkBz+8YO8q0+8kF9uMOh0PMdkEyioaGBq6ioiLh61aloZDRAd3d3dKkSZPCRGTw+XwZx7QoinT69Glpz549ktPpTOgtfr9fnDp1aspO7ECAiFj83Se3201OpzPrzVJFB4iiSGVlZWI646NGOxwOKfkmpsvlMtjt9hjdYDkhehMs154ShapJMOIY'+
			'Idtkk8wzmxO0Kq8H0SGQ09gOBoNye3t7uLy8PKhlprVarQalu0iRa3gs3fP/MQj4L/yIrhG0Ak9MAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._close__img.ggOverSrc=hs;
		el.ggId="close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._close.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._close.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._close.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._close.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._close.style[domTransition]='';
				if (me._close.ggCurrentLogicStateVisible == 0) {
					me._close.style.visibility=(Number(me._close.style.opacity)>0||!me._close.style.opacity)?'inherit':'hidden';
					me._close.ggVisible=true;
				}
				else {
					me._close.style.visibility="hidden";
					me._close.ggVisible=false;
				}
			}
		}
		me._close.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
			player.setVariableValue('vis_info_popup', false);
			player.setVariableValue('vis_video_popup_file', false);
			player.setVariableValue('vis_video_popup_url', false);
			player.setVariableValue('vis_video_popup_vimeo', false);
			player.setVariableValue('vis_video_popup_youtube', false);
			if (
				(
					((player.getVariableValue('vis_website') == true)) && 
					((player.getVariableValue('opt_url') == true))
				)
			) {
				me._web_page.ggText="";
				me._web_page.ggTextDiv.innerHTML=me._web_page.ggText;
				if (me._web_page.ggUpdateText) {
					me._web_page.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._web_page.ggUpdatePosition) {
					me._web_page.ggUpdatePosition();
				}
				me._web_page.ggTextDiv.scrollTop = 0;
			}
			player.setVariableValue('vis_website', false);
		}
		me._close.onmouseover=function (e) {
			me._close__img.src=me._close__img.ggOverSrc;
		}
		me._close.onmouseout=function (e) {
			me._close__img.src=me._close__img.ggNormalSrc;
		}
		me._close.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._close);
		el=me._do_not_modify_skin=document.createElement('div');
		el.ggId="do_not_modify_skin";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #404549;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._do_not_modify_skin.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._do_not_modify_skin.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._do_not_modify_skin_text=document.createElement('div');
		els=me._do_not_modify_skin_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="do_not_modify_skin_text";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 60px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 205px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 205px;';
		hs+='height: 60px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: normal;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=" Please use the skin <br\/> configuration button<br\/> to modify the skin.";
		el.appendChild(els);
		me._do_not_modify_skin_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._do_not_modify_skin_text.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._do_not_modify_skin.appendChild(me._do_not_modify_skin_text);
		el=me._config_button=document.createElement('div');
		els=me._config_button__img=document.createElement('img');
		els.className='ggskin ggskin_config_button';
		hs='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QHSaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjYuMCI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMj'+
			'MtMDYtMjdUMTk6Mjk6NTIrMDM6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA2LTI3VDE5OjI5OjUyKzAzOjAwIgogICB4bXA6Q3JlYXRvclRvb2w9IlBhbm8yVlIgNi4xLjIiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz7/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAAdACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcI'+
			'CQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiI'+
			'mKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBKKBR60AGPeijtSUAKKKSigBe1JRRQB//Z';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="config_button";
		el.ggDx=80;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 39px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 42px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._config_button.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._config_button.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._do_not_modify_skin.appendChild(me._config_button);
		me.divSkin.appendChild(me._do_not_modify_skin);
		el=me._menu_background=document.createElement('div');
		el.ggId="menu_background";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.501961);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 178px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._menu_background.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._menu_background.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._menu_background.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._menu_background.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._menu_background.style[domTransition]='opacity 500ms ease 0ms';
				if (me._menu_background.ggCurrentLogicStateAlpha == 0) {
					me._menu_background.style.visibility=me._menu_background.ggVisible?'inherit':'hidden';
					me._menu_background.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._menu_background.style.opacity == 0.0) { me._menu_background.style.visibility="hidden"; } }, 505);
					me._menu_background.style.opacity=0;
				}
			}
		}
		me._menu_background.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_scroller=document.createElement('div');
		els=me._node_scroller__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 99px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 149.5px;';
		hs+="";
		els.setAttribute('style',hs);
		me._node_scroller.ggScrollByX = function(diffX) {
			if(!me._node_scroller.ggHorScrollVisible || diffX == 0) return;
			me._node_scroller.ggScrollPosX = (me._node_scroller__horScrollFg.offsetLeft + diffX);
			me._node_scroller.ggScrollPosX = Math.max(me._node_scroller.ggScrollPosX, 0);
			me._node_scroller.ggScrollPosX = Math.min(me._node_scroller.ggScrollPosX, me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
			me._node_scroller__horScrollFg.style.left = me._node_scroller.ggScrollPosX + 'px';
			me._node_scroller__content.style.left = -(Math.round(me._node_scroller.ggScrollPosX / me._node_scroller.ggHPercentVisible)) + me._node_scroller.ggContentLeftOffset + 'px';
			me._node_scroller.ggScrollPosXPercent = (me._node_scroller__horScrollFg.offsetLeft / me._node_scroller__horScrollBg.offsetWidth);
		}
		me._node_scroller.ggScrollByXSmooth = function(diffX) {
			if(!me._node_scroller.ggHorScrollVisible || diffX == 0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._node_scroller.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._node_scroller.ggScrollPosX >= me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth)) {
					me._node_scroller.ggScrollPosX = Math.min(me._node_scroller.ggScrollPosX, me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._node_scroller.ggScrollPosX <= 0)) {
					me._node_scroller.ggScrollPosX = Math.max(me._node_scroller.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._node_scroller__horScrollFg.style.left = me._node_scroller.ggScrollPosX + 'px';
			me._node_scroller__content.style.left = -(Math.round(me._node_scroller.ggScrollPosX / me._node_scroller.ggHPercentVisible)) + me._node_scroller.ggContentLeftOffset + 'px';
			me._node_scroller.ggScrollPosXPercent = (me._node_scroller__horScrollFg.offsetLeft / me._node_scroller__horScrollBg.offsetWidth);
			}, 10);
		}
		me._node_scroller.ggScrollByY = function(diffY) {
			if(!me._node_scroller.ggVertScrollVisible || diffY == 0) return;
			me._node_scroller.ggScrollPosY = (me._node_scroller__vertScrollFg.offsetTop + diffY);
			me._node_scroller.ggScrollPosY = Math.max(me._node_scroller.ggScrollPosY, 0);
			me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
			me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
			me._node_scroller__content.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + me._node_scroller.ggContentTopOffset + 'px';
			me._node_scroller.ggScrollPosYPercent = (me._node_scroller__vertScrollFg.offsetTop / me._node_scroller__vertScrollBg.offsetHeight);
		}
		me._node_scroller.ggScrollByYSmooth = function(diffY) {
			if(!me._node_scroller.ggVertScrollVisible || diffY == 0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._node_scroller.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._node_scroller.ggScrollPosY >= me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight)) {
					me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._node_scroller.ggScrollPosY <= 0)) {
					me._node_scroller.ggScrollPosY = Math.max(me._node_scroller.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
			me._node_scroller__content.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + me._node_scroller.ggContentTopOffset + 'px';
			me._node_scroller.ggScrollPosYPercent = (me._node_scroller__vertScrollFg.offsetTop / me._node_scroller__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._node_scroller.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._node_scroller.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._node_scroller.ggHPercentVisible);
					me._node_scroller.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._node_scroller.offsetWidth - (me._node_scroller.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._node_scroller.offsetWidth - (me._node_scroller.ggVertScrollVisible ? 15 : 0))) * me._node_scroller.ggHPercentVisible);
					me._node_scroller.ggScrollByXSmooth(diffX);
				}
			}
			if (me._node_scroller.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._node_scroller.ggVPercentVisible);
					me._node_scroller.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._node_scroller.offsetHeight - (me._node_scroller.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._node_scroller.offsetHeight - (me._node_scroller.ggHorScrollVisible ? 15 : 0))) * me._node_scroller.ggVPercentVisible);
					me._node_scroller.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._node_scroller.ggDragLastX = t[0].clientX;
			me._node_scroller.ggDragLastY = t[0].clientY;
			me._node_scroller__content.ontouchend = function() {
				me._node_scroller__content.ontouchend = null;
				me._node_scroller__content.ontouchmove = null;
			}
			me._node_scroller__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffX = t[0].clientX - me._node_scroller.ggDragLastX;
				var diffY = t[0].clientY - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragLastX = t[0].clientX;
				me._node_scroller.ggDragLastY = t[0].clientY;
				me._node_scroller.ggScrollByX(-diffX);
				me._node_scroller.ggScrollByY(-diffY);
			}
		}
		elVertScrollBg = me._node_scroller__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 350px; background-color: rgba(0,0,0,0.12549); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._node_scroller__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 350px; background-color: rgba(255,255,255,0.25098); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._node_scroller.ggScrollPosY = 0;
		me._node_scroller.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._node_scroller.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragLastY = e.clientY;
				me._node_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._node_scroller.ggDragLastY = t[0].clientY;
			document.ontouchend = function() {
				document.ontouchend = null;
				document.ontouchmove = null;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffY = t[0].clientY - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragLastY = t[0].clientY;
				me._node_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._node_scroller.ggScrollHeight;
			if (e.offsetY < me._node_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._node_scroller__vertScrollBg.getBoundingClientRect();
			var diffY = me._node_scroller.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._node_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._node_scroller.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._node_scroller__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="node_scroller";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : calc(100%  -  50px);';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 178px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_scroller.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_scroller.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible') == true)) && 
				((player.getVariableValue('node_visible') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_scroller.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_scroller.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._node_scroller.style[domTransition]='opacity 500ms ease 0ms';
				if (me._node_scroller.ggCurrentLogicStateAlpha == 0) {
					me._node_scroller.style.visibility=me._node_scroller.ggVisible?'inherit':'hidden';
					me._node_scroller.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._node_scroller.style.opacity == 0.0) { me._node_scroller.style.visibility="hidden"; } }, 505);
					me._node_scroller.style.opacity=0;
				}
			}
		}
		me._node_scroller.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if ((me._node_scroller.ggHorScrollVisible && contentHeight > this.offsetHeight - 15) || (!me._node_scroller.ggHorScrollVisible && contentHeight > this.offsetHeight)) {
					me._node_scroller__vertScrollBg.style.visibility = 'inherit';
					me._node_scroller__vertScrollFg.style.visibility = 'inherit';
					me._node_scroller.ggVertScrollVisible = true;
				} else {
					me._node_scroller__vertScrollBg.style.visibility = 'hidden';
					me._node_scroller__vertScrollFg.style.visibility = 'hidden';
					me._node_scroller.ggVertScrollVisible = false;
				}
				if(me._node_scroller.ggVertScrollVisible) {
					me._node_scroller.ggAvailableWidth = me._node_scroller.offsetWidth - 15;
					if (me._node_scroller.ggHorScrollVisible) {
						me._node_scroller.ggAvailableHeight = me._node_scroller.offsetHeight - 15;
						me._node_scroller.ggAvailableHeightWithScale = me._node_scroller.getBoundingClientRect().height - me._node_scroller__vertScrollBg.getBoundingClientRect().width;
						me._node_scroller__cornerBg.style.visibility = 'inherit';
					} else {
						me._node_scroller.ggAvailableHeight = me._node_scroller.offsetHeight;
						me._node_scroller.ggAvailableHeightWithScale = me._node_scroller.getBoundingClientRect().height;
						me._node_scroller__cornerBg.style.visibility = 'hidden';
					}
					me._node_scroller__vertScrollBg.style.height = me._node_scroller.ggAvailableHeight + 'px';
					me._node_scroller.ggVPercentVisible = me._node_scroller.ggAvailableHeightWithScale / contentHeight;
					if (me._node_scroller.ggVPercentVisible > 1.0) me._node_scroller.ggVPercentVisible = 1.0;
					me._node_scroller.ggScrollHeight =  Math.round(me._node_scroller__vertScrollBg.offsetHeight * me._node_scroller.ggVPercentVisible);
					me._node_scroller__vertScrollFg.style.height = me._node_scroller.ggScrollHeight + 'px';
					me._node_scroller.ggScrollPosY = me._node_scroller.ggScrollPosYPercent * me._node_scroller.ggAvailableHeight;
					me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
					me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
					me._node_scroller__content.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				} else {
					me._node_scroller.ggAvailableWidth = me._node_scroller.offsetWidth;
					me._node_scroller.ggScrollPosY = 0;
					me._node_scroller.ggScrollPosYPercent = 0.0;
					me._node_scroller__content.style.top = this.ggContentTopOffset + 'px';
					me._node_scroller__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._node_scroller.ggHorScrollVisible || vertScrollWasVisible != me._node_scroller.ggVertScrollVisible) {
					me.updateSize(me._node_scroller);
					me._node_scroller.ggUpdatePosition();
				}
			}
		}
		el=me._node_cloner=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 140;
		el.ggHeight = 100;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._node_cloner.callChildLogicBlocks_changenode = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_title && me._node_cloner.ggInstances[i]._node_title.logicBlock_visible) {
						me._node_cloner.ggInstances[i]._node_title.logicBlock_visible();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_active = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_changevisitednodes = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._node_cloner.ggUpdating == true) return;
			me._node_cloner.ggUpdating = true;
			var el=me._node_cloner;
			var curNumCols = 0;
			curNumCols = me._node_cloner.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._node_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._node_cloner.ggHeight) + 'px';
				parameter.left=(column * me._node_cloner.ggWidth) + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._node_cloner.callChildLogicBlocks_changenode();
			me._node_cloner.callChildLogicBlocks_mouseover();
			me._node_cloner.callChildLogicBlocks_active();
			me._node_cloner.callChildLogicBlocks_changevisitednodes();
			me._node_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._node_cloner.parentNode.classList.contains('ggskin_subelement') && me._node_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._node_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "_nop_";
		el.ggId="node_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 100px;';
		hs+='left : 10px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._node_cloner.childNodes.length; i++) {
				var child=me._node_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._node_cloner.ggUpdatePosition=function (useTransition) {
				me._node_cloner.ggUpdate();
		}
		me._node_cloner.ggNodeChange=function () {
			me._node_cloner.ggUpdateConditionNodeChange();
		}
		me._node_scroller__content.appendChild(me._node_cloner);
		me._menu_background.appendChild(me._node_scroller);
		el=me._category_scroller=document.createElement('div');
		els=me._category_scroller__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 36px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 149px;';
		hs+="";
		els.setAttribute('style',hs);
		me._category_scroller.ggScrollByX = function(diffX) {
			if(!me._category_scroller.ggHorScrollVisible || diffX == 0) return;
			me._category_scroller.ggScrollPosX = (me._category_scroller__horScrollFg.offsetLeft + diffX);
			me._category_scroller.ggScrollPosX = Math.max(me._category_scroller.ggScrollPosX, 0);
			me._category_scroller.ggScrollPosX = Math.min(me._category_scroller.ggScrollPosX, me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
			me._category_scroller__horScrollFg.style.left = me._category_scroller.ggScrollPosX + 'px';
			me._category_scroller__content.style.left = -(Math.round(me._category_scroller.ggScrollPosX / me._category_scroller.ggHPercentVisible)) + me._category_scroller.ggContentLeftOffset + 'px';
			me._category_scroller.ggScrollPosXPercent = (me._category_scroller__horScrollFg.offsetLeft / me._category_scroller__horScrollBg.offsetWidth);
		}
		me._category_scroller.ggScrollByXSmooth = function(diffX) {
			if(!me._category_scroller.ggHorScrollVisible || diffX == 0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._category_scroller.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._category_scroller.ggScrollPosX >= me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth)) {
					me._category_scroller.ggScrollPosX = Math.min(me._category_scroller.ggScrollPosX, me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._category_scroller.ggScrollPosX <= 0)) {
					me._category_scroller.ggScrollPosX = Math.max(me._category_scroller.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._category_scroller__horScrollFg.style.left = me._category_scroller.ggScrollPosX + 'px';
			me._category_scroller__content.style.left = -(Math.round(me._category_scroller.ggScrollPosX / me._category_scroller.ggHPercentVisible)) + me._category_scroller.ggContentLeftOffset + 'px';
			me._category_scroller.ggScrollPosXPercent = (me._category_scroller__horScrollFg.offsetLeft / me._category_scroller__horScrollBg.offsetWidth);
			}, 10);
		}
		me._category_scroller.ggScrollByY = function(diffY) {
			if(!me._category_scroller.ggVertScrollVisible || diffY == 0) return;
			me._category_scroller.ggScrollPosY = (me._category_scroller__vertScrollFg.offsetTop + diffY);
			me._category_scroller.ggScrollPosY = Math.max(me._category_scroller.ggScrollPosY, 0);
			me._category_scroller.ggScrollPosY = Math.min(me._category_scroller.ggScrollPosY, me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
			me._category_scroller__vertScrollFg.style.top = me._category_scroller.ggScrollPosY + 'px';
			me._category_scroller__content.style.top = -(Math.round(me._category_scroller.ggScrollPosY / me._category_scroller.ggVPercentVisible)) + me._category_scroller.ggContentTopOffset + 'px';
			me._category_scroller.ggScrollPosYPercent = (me._category_scroller__vertScrollFg.offsetTop / me._category_scroller__vertScrollBg.offsetHeight);
		}
		me._category_scroller.ggScrollByYSmooth = function(diffY) {
			if(!me._category_scroller.ggVertScrollVisible || diffY == 0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._category_scroller.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._category_scroller.ggScrollPosY >= me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight)) {
					me._category_scroller.ggScrollPosY = Math.min(me._category_scroller.ggScrollPosY, me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._category_scroller.ggScrollPosY <= 0)) {
					me._category_scroller.ggScrollPosY = Math.max(me._category_scroller.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._category_scroller__vertScrollFg.style.top = me._category_scroller.ggScrollPosY + 'px';
			me._category_scroller__content.style.top = -(Math.round(me._category_scroller.ggScrollPosY / me._category_scroller.ggVPercentVisible)) + me._category_scroller.ggContentTopOffset + 'px';
			me._category_scroller.ggScrollPosYPercent = (me._category_scroller__vertScrollFg.offsetTop / me._category_scroller__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._category_scroller.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._category_scroller.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._category_scroller.ggHPercentVisible);
					me._category_scroller.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._category_scroller.offsetWidth - (me._category_scroller.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._category_scroller.offsetWidth - (me._category_scroller.ggVertScrollVisible ? 15 : 0))) * me._category_scroller.ggHPercentVisible);
					me._category_scroller.ggScrollByXSmooth(diffX);
				}
			}
			if (me._category_scroller.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._category_scroller.ggVPercentVisible);
					me._category_scroller.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._category_scroller.offsetHeight - (me._category_scroller.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._category_scroller.offsetHeight - (me._category_scroller.ggHorScrollVisible ? 15 : 0))) * me._category_scroller.ggVPercentVisible);
					me._category_scroller.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._category_scroller.ggDragLastX = t[0].clientX;
			me._category_scroller.ggDragLastY = t[0].clientY;
			me._category_scroller__content.ontouchend = function() {
				me._category_scroller__content.ontouchend = null;
				me._category_scroller__content.ontouchmove = null;
			}
			me._category_scroller__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffX = t[0].clientX - me._category_scroller.ggDragLastX;
				var diffY = t[0].clientY - me._category_scroller.ggDragLastY;
				me._category_scroller.ggDragLastX = t[0].clientX;
				me._category_scroller.ggDragLastY = t[0].clientY;
				me._category_scroller.ggScrollByX(-diffX);
				me._category_scroller.ggScrollByY(-diffY);
			}
		}
		elHorScrollBg = me._category_scroller__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 178px; height: 15px; background-color: rgba(128,128,128,0.752941); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._category_scroller__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 178px; height: 15px; background-color: rgba(192,192,192,0.752941); pointer-events: auto;');
		me._category_scroller.ggScrollPosX = 0;
		me._category_scroller.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._category_scroller.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._category_scroller.ggDragLastX;
				me._category_scroller.ggDragLastX = e.clientX;
				me._category_scroller.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._category_scroller.ggDragLastX = t[0].clientX;
			document.ontouchend = function() {
				document.ontouchend = null;
				document.ontouchmove = null;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffX = t[0].clientX - me._category_scroller.ggDragLastX;
				me._category_scroller.ggDragLastX = t[0].clientX;
				me._category_scroller.ggScrollByX(diffX);
			}
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._category_scroller.ggScrollWidth;
			if (e.offsetX < me._category_scroller.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._category_scroller.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._category_scroller__horScrollBg.getBoundingClientRect();
			var diffX = me._category_scroller.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._category_scroller.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._category_scroller.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._category_scroller.ggScrollByXSmooth(20 * wheelDelta);
		});
		elVertScrollBg = me._category_scroller__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 480px; background-color: rgba(128,128,128,0.752941); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._category_scroller__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 480px; background-color: rgba(192,192,192,0.752941); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._category_scroller.ggScrollPosY = 0;
		me._category_scroller.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._category_scroller.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._category_scroller.ggDragLastY;
				me._category_scroller.ggDragLastY = e.clientY;
				me._category_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._category_scroller.ggDragLastY = t[0].clientY;
			document.ontouchend = function() {
				document.ontouchend = null;
				document.ontouchmove = null;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffY = t[0].clientY - me._category_scroller.ggDragLastY;
				me._category_scroller.ggDragLastY = t[0].clientY;
				me._category_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._category_scroller.ggScrollHeight;
			if (e.offsetY < me._category_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._category_scroller.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._category_scroller__vertScrollBg.getBoundingClientRect();
			var diffY = me._category_scroller.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._category_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._category_scroller.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._category_scroller.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._category_scroller__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="category_scroller";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : calc(100%  -  50px);';
		hs+='left : 0px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 178px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._category_scroller.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._category_scroller.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('node_visible') == true)) || 
				((player.getVariableValue('category_visible') == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._category_scroller.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._category_scroller.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._category_scroller.style[domTransition]='opacity 500ms ease 0ms';
				if (me._category_scroller.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._category_scroller.style.opacity == 0.0) { me._category_scroller.style.visibility="hidden"; } }, 505);
					me._category_scroller.style.opacity=0;
				}
				else {
					me._category_scroller.style.visibility=me._category_scroller.ggVisible?'inherit':'hidden';
					me._category_scroller.style.opacity=1;
				}
			}
		}
		me._category_scroller.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.left = -(Math.round(me._category_scroller.ggScrollPosX / me._category_scroller.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._category_scroller.ggScrollPosY / me._category_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if (contentWidth > offsetWidthWithScale) {
					me._category_scroller__horScrollBg.style.visibility = 'inherit';
					me._category_scroller__horScrollFg.style.visibility = 'inherit';
					me._category_scroller.ggHorScrollVisible = true;
				} else {
					me._category_scroller__horScrollBg.style.visibility = 'hidden';
					me._category_scroller__horScrollFg.style.visibility = 'hidden';
					me._category_scroller.ggHorScrollVisible = false;
				}
				if ((me._category_scroller.ggHorScrollVisible && contentHeight > this.offsetHeight - 15) || (!me._category_scroller.ggHorScrollVisible && contentHeight > this.offsetHeight)) {
					me._category_scroller__vertScrollBg.style.visibility = 'inherit';
					me._category_scroller__vertScrollFg.style.visibility = 'inherit';
					me._category_scroller.ggVertScrollVisible = true;
					if (!me._category_scroller.ggHorScrollVisible && (contentWidth > offsetWidthWithScale - me._category_scroller__vertScrollBg.getBoundingClientRect().width)) {
						me._category_scroller__horScrollBg.style.visibility = 'inherit';
						me._category_scroller__horScrollFg.style.visibility = 'inherit';
						me._category_scroller.ggHorScrollVisible = true;
					}
				} else {
					me._category_scroller__vertScrollBg.style.visibility = 'hidden';
					me._category_scroller__vertScrollFg.style.visibility = 'hidden';
					me._category_scroller.ggVertScrollVisible = false;
				}
				if(me._category_scroller.ggHorScrollVisible) {
					me._category_scroller.ggAvailableHeight = me._category_scroller.offsetHeight - 15;
					if (me._category_scroller.ggVertScrollVisible) {
						me._category_scroller.ggAvailableWidth = me._category_scroller.offsetWidth - 15;
						me._category_scroller.ggAvailableWidthWithScale = me._category_scroller.getBoundingClientRect().width - me._category_scroller__horScrollBg.getBoundingClientRect().height;
					} else {
						me._category_scroller.ggAvailableWidth = me._category_scroller.offsetWidth;
						me._category_scroller.ggAvailableWidthWithScale = me._category_scroller.getBoundingClientRect().width;
					}
					me._category_scroller__horScrollBg.style.width = me._category_scroller.ggAvailableWidth + 'px';
					me._category_scroller.ggHPercentVisible = me._category_scroller.ggAvailableWidthWithScale / contentWidth;
					if (me._category_scroller.ggHPercentVisible > 1.0) me._category_scroller.ggHPercentVisible = 1.0;
					me._category_scroller.ggScrollWidth = Math.round(me._category_scroller__horScrollBg.offsetWidth * me._category_scroller.ggHPercentVisible);
					me._category_scroller__horScrollFg.style.width = me._category_scroller.ggScrollWidth + 'px';
					me._category_scroller.ggScrollPosX = me._category_scroller.ggScrollPosXPercent * me._category_scroller.ggAvailableWidth;
					me._category_scroller.ggScrollPosX = Math.min(me._category_scroller.ggScrollPosX, me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
					me._category_scroller__horScrollFg.style.left = me._category_scroller.ggScrollPosX + 'px';
					me._category_scroller__content.style.left = -(Math.round(me._category_scroller.ggScrollPosX / me._category_scroller.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
				} else {
					me._category_scroller.ggAvailableHeight = me._category_scroller.offsetHeight;
					me._category_scroller.ggScrollPosX = 0;
					me._category_scroller.ggScrollPosXPercent = 0.0;
					me._category_scroller__content.style.left = this.ggContentLeftOffset + 'px';
				}
				if(me._category_scroller.ggVertScrollVisible) {
					me._category_scroller.ggAvailableWidth = me._category_scroller.offsetWidth - 15;
					if (me._category_scroller.ggHorScrollVisible) {
						me._category_scroller.ggAvailableHeight = me._category_scroller.offsetHeight - 15;
						me._category_scroller.ggAvailableHeightWithScale = me._category_scroller.getBoundingClientRect().height - me._category_scroller__vertScrollBg.getBoundingClientRect().width;
						me._category_scroller__cornerBg.style.visibility = 'inherit';
					} else {
						me._category_scroller.ggAvailableHeight = me._category_scroller.offsetHeight;
						me._category_scroller.ggAvailableHeightWithScale = me._category_scroller.getBoundingClientRect().height;
						me._category_scroller__cornerBg.style.visibility = 'hidden';
					}
					me._category_scroller__vertScrollBg.style.height = me._category_scroller.ggAvailableHeight + 'px';
					me._category_scroller.ggVPercentVisible = me._category_scroller.ggAvailableHeightWithScale / contentHeight;
					if (me._category_scroller.ggVPercentVisible > 1.0) me._category_scroller.ggVPercentVisible = 1.0;
					me._category_scroller.ggScrollHeight =  Math.round(me._category_scroller__vertScrollBg.offsetHeight * me._category_scroller.ggVPercentVisible);
					me._category_scroller__vertScrollFg.style.height = me._category_scroller.ggScrollHeight + 'px';
					me._category_scroller.ggScrollPosY = me._category_scroller.ggScrollPosYPercent * me._category_scroller.ggAvailableHeight;
					me._category_scroller.ggScrollPosY = Math.min(me._category_scroller.ggScrollPosY, me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
					me._category_scroller__vertScrollFg.style.top = me._category_scroller.ggScrollPosY + 'px';
					me._category_scroller__content.style.top = -(Math.round(me._category_scroller.ggScrollPosY / me._category_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				} else {
					me._category_scroller.ggAvailableWidth = me._category_scroller.offsetWidth;
					me._category_scroller.ggScrollPosY = 0;
					me._category_scroller.ggScrollPosYPercent = 0.0;
					me._category_scroller__content.style.top = this.ggContentTopOffset + 'px';
					me._category_scroller__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._category_scroller.ggHorScrollVisible || vertScrollWasVisible != me._category_scroller.ggVertScrollVisible) {
					me.updateSize(me._category_scroller);
					me._category_scroller.ggUpdatePosition();
				}
			}
		}
		el=me._category_cloner=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 140;
		el.ggHeight = 37;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		el.ggUpdate = function(filter) {
			if(me._category_cloner.ggUpdating == true) return;
			me._category_cloner.ggUpdating = true;
			var el=me._category_cloner;
			var curNumCols = 0;
			curNumCols = me._category_cloner.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._category_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var firstNode;
			for (var i=0; i < el.ggTagTable.length; i++) {
				var cItem = el.ggTagTable[i];
				firstNode = '';
				cItem.nodecount = 0;
				for (var j=0; j < tourNodes.length; j++) {
					var nodeData = player.getNodeUserdata(tourNodes[j]);
					if ((nodeData['tags'].indexOf(cItem.tag) != -1) || (cItem.tag=='')) {
						var passed = true;
						if (filter.length > 0) {
							for (var k=0; k < filter.length; k++) {
								if (nodeData['tags'].indexOf(filter[k]) == -1) passed = false;
							}
						}
						if (passed) {
							cItem.nodecount++;
							if (firstNode == '') firstNode = tourNodes[j];
						}
					}
				}
				cItem.firstnode=firstNode;
				if (cItem.nodecount == 0) continue;
				var nodeId = {};
				nodeId['tag'] = cItem.tag;
				nodeId['title'] = cItem.title;
				nodeId['nodecount'] = cItem.nodecount;
				nodeId['firstnode'] = cItem.firstnode;
				var parameter={};
				parameter.top=(row * me._category_cloner.ggHeight) + 'px';
				parameter.left=(column * me._category_cloner.ggWidth) + 'px';
				parameter.index=currentIndex;
				var inst = new SkinCloner_category_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
			}
			me._category_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._category_cloner.parentNode.classList.contains('ggskin_subelement') && me._category_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._category_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggTagTable = [
			{tag:"cfa",title:"\u0423\u043b\u0438\u0446\u0430"},
			{tag:"und",title:"\u0417\u0430\u043b"},
			{tag:"mus",title:"\u041c\u0443\u0437\u0435\u0439"},
			{tag:"auf",title:"\u041a\u0440\u044b\u0448\u0430"},
			{tag:"mid",title:"2 \u044d\u0442\u0430\u0436"},
			];
		el.ggId="category_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 37px;';
		hs+='left : 10px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._category_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._category_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._category_cloner.childNodes.length; i++) {
				var child=me._category_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._category_cloner.ggUpdatePosition=function (useTransition) {
				me._category_cloner.ggUpdate();
		}
		me._category_cloner.ggNodeChange=function () {
			me._category_cloner.ggUpdateConditionNodeChange();
		}
		me._category_scroller__content.appendChild(me._category_cloner);
		me._menu_background.appendChild(me._category_scroller);
		me.divSkin.appendChild(me._menu_background);
		el=me._menu_open=document.createElement('div');
		els=me._menu_open__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJz8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICctLy9XM0MvL0RURCBTVkcgMS4xLy9FTicgJ2h0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCc+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgdmlld0JveD0iMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzJweCIgdmVyc2lvbj0iMS4xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMjsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1vcGFjaX'+
			'R5PSIxIiBpZD0iTGF5ZXJfMSIgZmlsbD0iI2ZmZmZmZiI+CiA8cGF0aCBkPSJNNCwxMGgyNGMxLjEwNCwwLDItMC44OTYsMi0ycy0wLjg5Ni0yLTItMkg0QzIuODk2LDYsMiw2Ljg5NiwyLDhTMi44OTYsMTAsNCwxMHogTTI4LDE0SDRjLTEuMTA0LDAtMiwwLjg5Ni0yLDIgIHMwLjg5NiwyLDIsMmgyNGMxLjEwNCwwLDItMC44OTYsMi0yUzI5LjEwNCwxNCwyOCwxNHogTTI4LDIySDRjLTEuMTA0LDAtMiwwLjg5Ni0yLDJzMC44OTYsMiwyLDJoMjRjMS4xMDQsMCwyLTAuODk2LDItMiAgUzI5LjEwNCwyMiwyOCwyMnoiLz4KPC9zdmc+Cg==';
		me._menu_open__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="menu_open";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._menu_open.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._menu_open.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('category_visible') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._menu_open.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._menu_open.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._menu_open.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._menu_open.ggCurrentLogicStatePosition == 0) {
					me._menu_open.style.left='130px';
					me._menu_open.style.top='5px';
				}
				else {
					me._menu_open.style.left='5px';
					me._menu_open.style.top='5px';
				}
			}
		}
		me._menu_open.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['menu_open'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else if (
				((player.getVariableValue('category_visible') == false))
			)
			{
				newLogicStateAlpha = 1;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._menu_open.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._menu_open.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._menu_open.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._menu_open.ggCurrentLogicStateAlpha == 0) {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=1;
				}
				else if (me._menu_open.ggCurrentLogicStateAlpha == 1) {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=0.6;
				}
				else {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=1;
				}
			}
		}
		me._menu_open.onclick=function (e) {
			if (
				(
					((player.getVariableValue('node_visible') == false))
				)
			) {
				player.setVariableValue('category_visible', !player.getVariableValue('category_visible'));
			}
			player.setVariableValue('node_visible', false);
		}
		me._menu_open.onmouseover=function (e) {
			me.elementMouseOver['menu_open']=true;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.onmouseout=function (e) {
			me.elementMouseOver['menu_open']=false;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.ontouchend=function (e) {
			me.elementMouseOver['menu_open']=false;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._menu_open);
		me._popup_video_file.ggVideoSource = 'media/';
		me._popup_video_file.ggVideoNotLoaded = true;
		me._popup_video_url.ggVideoSource = '';
		me._popup_video_url.ggVideoNotLoaded = true;
		me._popup_video_vimeo.ggVideoSource = '';
		me._popup_video_vimeo.ggVideoNotLoaded = true;
		me._popup_video_youtube.ggVideoSource = '';
		me._popup_video_youtube.ggVideoNotLoaded = true;
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			if (
				(
					((player.getVariableValue('opt_autohide') == true))
				)
			) {
				me._hide_timer.ggTimeout=Number("5") * 1000.0;
				me._hide_timer.ggTimestamp=skin.ggCurrentTime;
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true))
				)
			) {
				me._thumbnail_cloner.ggText="";
				me._thumbnail_cloner.ggUpdate([]);
				skin.updateSize(skin.divSkin);
			}
			me._thumbnail_cloner.ggUpdate();
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true))
				)
			) {
				me._thumbnail_cloner_mobile.ggText="";
				me._thumbnail_cloner_mobile.ggUpdate([]);
				skin.updateSize(skin.divSkin);
			}
			me._thumbnail_cloner_mobile.ggUpdate();
			me._node_cloner.ggUpdate();
			me._category_cloner.ggUpdate();
		});
		player.addListener('imagesready', function() {
			me._thumbnail_menu.ggUpdatePosition();
			me._thumbnail_menu_mobile.ggUpdatePosition();
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
			me._node_scroller.ggUpdatePosition();
			me._category_scroller.ggUpdatePosition();
		});
		player.addListener('beforechangenode', function() {
			if (
				(
					((player.getVariableValue('vis_loader') == true))
				)
			) {
				me._loading.style[domTransition]='none';
				me._loading.style.visibility=(Number(me._loading.style.opacity)>0||!me._loading.style.opacity)?'inherit':'hidden';
				me._loading.ggVisible=true;
			}
		});
		player.addListener('tilesrequested', function() {
			player.setVariableValue('vis_loader', false);
		});
		player.addListener('playerstatechanged', function() {
			player.setVariableValue('pos_controller', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_projection') == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_gyro') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_fullscreen') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			player.setVariableValue('pos_enter_vr', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_projection') == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_gyro') == true)) && 
					((player.getGyroAvailable() == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_fullscreen') == true)) && 
					((player.hasVR() == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			player.setVariableValue('pos_fullscreen', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_projection') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_gyro') == true)) && 
					((player.getGyroAvailable() == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			player.setVariableValue('pos_gyro', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_projection') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
			}
			player.setVariableValue('pos_projection', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true))
				)
			) {
				player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true))
				)
			) {
				player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true))
				)
			) {
				player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("1"));
			}
			player.setVariableValue('pos_thumbnail', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_thumbnail', player.getVariableValue('pos_thumbnail') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true))
				)
			) {
				player.setVariableValue('pos_thumbnail', player.getVariableValue('pos_thumbnail') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true))
				)
			) {
				player.setVariableValue('pos_thumbnail', player.getVariableValue('pos_thumbnail') + Number("1"));
			}
			player.setVariableValue('pos_information', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_information', player.getVariableValue('pos_information') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true))
				)
			) {
				player.setVariableValue('pos_information', player.getVariableValue('pos_information') + Number("1"));
			}
			player.setVariableValue('pos_autorotate', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_autorotate', player.getVariableValue('pos_autorotate') + Number("2"));
			}
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_changenode = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_image && hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_image.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_customimage && hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_configloaded = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_hastouch = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_changenode = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_image && hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_image.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_customimage && hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_configloaded = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_hastouch = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_changenode = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url_image && hotspotTemplates['ht_video_url'][i]._ht_video_url_image.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url_customimage && hotspotTemplates['ht_video_url'][i]._ht_video_url_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_configloaded = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_mouseover = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_hastouch = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_changenode = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file_image && hotspotTemplates['ht_video_file'][i]._ht_video_file_image.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file_customimage && hotspotTemplates['ht_video_file'][i]._ht_video_file_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_configloaded = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_mouseover = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_hastouch = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_changenode = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_image'][i]._ht_image_image && hotspotTemplates['ht_image'][i]._ht_image_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_image'][i]._ht_image_customimage && hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_configloaded = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_mouseover = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_hastouch = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_changenode = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_info'][i]._ht_info_image && hotspotTemplates['ht_info'][i]._ht_info_image.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._ht_info_customimage && hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_configloaded = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_mouseover = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_hastouch = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_changenode = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._ht_node_visited && hotspotTemplates['ht_node'][i]._ht_node_visited.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node_visited.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_node_image && hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_node_customimage && hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_tooltip && hotspotTemplates['ht_node'][i]._ht_tooltip.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_tooltip.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_configloaded = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_mouseover = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_active = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_checkmark_tick && hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_changevisitednodes = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node_visited && hotspotTemplates['ht_node'][i]._ht_node_visited.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node_visited.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_node_image && hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_checkmark_tick && hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_hastouch = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_hotspot_preview = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_changenode = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_url'][i]._ht_url_image && hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_url'][i]._ht_url_customimage && hotspotTemplates['ht_url'][i]._ht_url_customimage.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_configloaded = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_mouseover = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_hastouch = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		if (me._hide_timer.ggLastIsActive!=me._hide_timer.ggIsActive()) {
			me._hide_timer.ggLastIsActive=me._hide_timer.ggIsActive();
			if (me._hide_timer.ggLastIsActive) {
				if (player.transitionsDisabled) {
					me._controller.style[domTransition]='none';
				} else {
					me._controller.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._controller.style.opacity='1';
				me._controller.style.visibility=me._controller.ggVisible?'inherit':'hidden';
				if (player.transitionsDisabled) {
					me._menu_button.style[domTransition]='none';
				} else {
					me._menu_button.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._menu_button.style.opacity='0';
				me._menu_button.style.visibility='hidden';
				player.setVariableValue('vis_thumbnail_menu_auto_hide', true);
			} else {
				if (player.transitionsDisabled) {
					me._menu_button.style[domTransition]='none';
				} else {
					me._menu_button.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._menu_button.style.opacity='1';
				me._menu_button.style.visibility=me._menu_button.ggVisible?'inherit':'hidden';
				if (player.transitionsDisabled) {
					me._controller.style[domTransition]='none';
				} else {
					me._controller.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._controller.style.opacity='0';
				me._controller.style.visibility='hidden';
				player.setVariableValue('vis_thumbnail_menu_auto_hide', false);
			}
		}
		if (me.elementMouseOver['controller']) {
			if (
				(
					((player.getVariableValue('opt_autohide') == true))
				)
			) {
				me._hide_timer.ggTimeout=Number("5") * 1000.0;
				me._hide_timer.ggTimestamp=skin.ggCurrentTime;
			}
		}
		if (me.elementMouseDown['zoomout']) {
			player.changeFovLog(0.5,true);
		}
		if (me.elementMouseDown['zoomin']) {
			player.changeFovLog(-0.5,true);
		}
		if (me.elementMouseDown['key_up']) {
			player.changeTiltLog(0.5,true);
		}
		if (me.elementMouseDown['key_down']) {
			player.changeTiltLog(-0.5,true);
		}
		if (me.elementMouseDown['key_left']) {
			player.changePanLog(0.5,true);
		}
		if (me.elementMouseDown['key_right']) {
			player.changePanLog(-0.5,true);
		}
		if (me._element_alpha_timer.ggLastIsActive!=me._element_alpha_timer.ggIsActive()) {
			me._element_alpha_timer.ggLastIsActive=me._element_alpha_timer.ggIsActive();
			if (me._element_alpha_timer.ggLastIsActive) {
			} else {
				player.setVariableValue('vis_timer', true);
			}
		}
		if (me.elementMouseOver['thumbnail_cloner']) {
			if (
				(
					((player.getVariableValue('opt_autohide') == true))
				)
			) {
				me._hide_timer.ggTimeout=Number("5") * 1000.0;
				me._hide_timer.ggTimestamp=skin.ggCurrentTime;
			}
		}
		if (me.elementMouseOver['thumbnail_cloner_mobile']) {
			if (
				(
					((player.getVariableValue('opt_autohide') == true))
				)
			) {
				me._hide_timer.ggTimeout=Number("5") * 1000.0;
				me._hide_timer.ggTimestamp=skin.ggCurrentTime;
			}
		}
		var hs='';
		if (me._loadingbar.ggParameter) {
			hs+=parameterToTransform(me._loadingbar.ggParameter) + ' ';
		}
		hs+='scale(' + (1 * player.getPercentLoaded() + 0) + ',1.0) ';
		me._loadingbar.style[domTransform]=hs;
		if (me.__360image_gyro.ggLastIsActive!=me.__360image_gyro.ggIsActive()) {
			me.__360image_gyro.ggLastIsActive=me.__360image_gyro.ggIsActive();
			if (me.__360image_gyro.ggLastIsActive) {
			} else {
				player.setVariableValue('vis_360image_once', false);
			}
		}
		me.__360image_gyro.ggUpdateConditionTimer();
		if (me.__360image_timer.ggLastIsActive!=me.__360image_timer.ggIsActive()) {
			me.__360image_timer.ggLastIsActive=me.__360image_timer.ggIsActive();
			if (me.__360image_timer.ggLastIsActive) {
				player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') + Number("1"));
				player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') % Number("5"));
			} else {
			}
		}
		if (!player.getLockedKeyboard()) {
			switch(me.skinKeyPressed) {
				case 37:
					player.changePanLog(0.5,true);
					break;
				case 38:
					player.changeTiltLog(0.5,true);
					break;
				case 39:
					player.changePanLog(-0.5,true);
					break;
				case 40:
					player.changeTiltLog(-0.5,true);
					break;
			}
		}
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_ht_video_youtube(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_youtube=document.createElement('div');
		el.ggId="ht_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_youtube.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_youtube.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_youtube.ggCurrentLogicStateVisible == 0) {
					me._ht_video_youtube.style.visibility="hidden";
					me._ht_video_youtube.ggVisible=false;
				}
				else {
					me._ht_video_youtube.style.visibility=(Number(me._ht_video_youtube.style.opacity)>0||!me._ht_video_youtube.style.opacity)?'inherit':'hidden';
					me._ht_video_youtube.ggVisible=true;
				}
			}
		}
		me._ht_video_youtube.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_youtube.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_youtube.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_video_youtube.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_youtube.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_youtube.style.visibility=me._ht_video_youtube.ggVisible?'inherit':'hidden';
					me._ht_video_youtube.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_video_youtube.style.opacity == 0.0) { me._ht_video_youtube.style.visibility="hidden"; } }, 505);
					me._ht_video_youtube.style.opacity=0;
				}
			}
		}
		me._ht_video_youtube.onclick=function (e) {
			skin._popup_video_youtube.ggInitMedia(me.hotspot.url);
			player.setVariableValue('vis_video_popup_youtube', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_youtube']=true;
			me._tt_ht_video_youtube.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_youtube']=false;
			me._tt_ht_video_youtube.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.ontouchend=function (e) {
			me.elementMouseOver['ht_video_youtube']=false;
			me._tt_ht_video_youtube.logicBlock_visible();
		}
		me._ht_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_youtube_image=document.createElement('div');
		els=me._ht_video_youtube_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_video_youtube_image';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAH8UlEQVR4nO2ba2wU1xXHf2dmdwFje72YGHAxUNHySKBNE5pCgnhDlXwBpcLgR4AEJTQPBSUfUkVtQ5CaplEaVYUoTSktwrBeCzeoNFJSNUhuKQlJKA0KjzYltAaKI96FYB67M3P6YY3t9T68653ZQMXvi3fOPffe/xzfuXPvmRnBS5Zt6E/7wDJ8Vhkqxd1KbOAcRZfO8JuHLoKopzoyIJ60Whu+S+BFYFYW3peBT4FDIrrfUXkP0V2E6y94oq0H7gZgUdN4Me0fAffn2ZKD6PvqGG+gspWmmlYX1KXEnQAsjlQZos+r6DLAcKXNLhSVN9S0X2TzA39zue18A6BCTWS5iK4BBriiKBOif1DHeIFI7U7XmuxzzYVbgkYguk5Vqt0SkwPbVfRBwvX/yb'+
			'ehvgWgbvNkUYkAo/IVkAdnVWU5kdrf5dNI7gGoDa8U+Cngy6djtxB43Yn5n6a5+nIf6+dA3eZnROWlvnTkMQfUZ32bhqXHc62YfQBqGp8W0Vdy7aCAfKIq04nUnsilUna3rNrwk9f5yQOMFdF3WLhlUC6Veh8BteHlAuv7LKvw/FVj/jk0V5/PxjlzAOo3jRXH2Av0d0NZAdmhbZWz+dNMqzfH9JfAjBafqGzkxjt5gGlUtj2bjWP6AFS2PYPKt1yTVGAEnmNxZFIWfimo3/R1cYzdgN9tYQXmH1p88U7WrbiUziHFCFAR21zLjX/yAOOM9oE/yeSQPALqN80Qx2jJVOnirxbkqctdih/OvBpWx7iHppr3UpUljQBxjO+7pOu6QQxndbqyxAAsahoNzPFa0BfAHGoap6YqSNjQGD7rQdXsV8e27RCN2Vi2TSxmE43Z'+
			'xLr9VlUCfpOA34fPNAgEfAT8Jn5f3GYY3mTkUiGiqxVm97QnBEBVFuXS6PxHX89LVMDvIxQsIlQ6gFBpEWXBIkKlRQwKDiQULGJwqJgvDQnSv58r8/EsasPTaKzb0d3YFYBFTaPB/oobPWVLNGZx4vQFTpzOnP+sKC9h+NAyqoYNompoqON3iGBJbkkoUVmtMLO7rSsApj0vp9b6SEV5CfdNn8ikiSOpGFzKgH5+An4fpmmwcuMeXn3n0+RKp4BTDuw7DZzuNLevn59b56IzWLgl2H2f0BkAAyZ7mZyfN/VWVtRMp6y0KK3Pz5bcybGzl9i2p807IT5rJPDxtcPOu4Cq3OFFf6YpbHhpGd9bcW/GkwcwDaHhsSlUhjzdfozsfhAPwL1v9UP0Vi96+/kPaxhRWZ61f0l/P2uWePK/uEZl94N4AMrPVOF+Pp/ZU8Yxfv'+
			'SwBNvVmMPsF1r48PCZtPXuv2sEXxsRdFtOHNGS7ofxk3aMKi/6mn3P+CTbhcsxWg6e4O5V2/nxtgNomolnydRRXkjCSBmAHsPCLfxm+kHlqPKDLfvY+Jd/pSyfedsQLyRBjwc4cYWimWenPtJ2MjkrFSxKXNRs+PO/U9YddctALyQBRLsfxAOg0s+Lng61nkyyBXwGQ8u6ZvmS/oXddTuOkTIAAS86e3vHPizLTrLfPjLU+fuxuakXn62n2r2QBKIJyZFrl0A0pXOe2Lay9+/HkuzTxt0CwJqld3Df7amnn5YDOaX3s0c0YZUVXwmqXPHqJY11kR1MmjgqwbZg0nBU4Yl5Y9LWa9jZ6omengGIjwDDSZszy5fDx07x0YEjCbZxlaU8Oz/9umvrh0f5+GhWaf3csXyt3Q+vzQHJs5WLPL/2zZRzQSo+vxLjyQbX34O4'+
			'xnmaFif8N+IBsM2cHyrmwsX2qzS++UGvfrajLHltF23nrnglZW/PF7Lic4DPOk4OmaC+sHHrLg4e+owF877BmFEVBEuLMI3EhdJTDXs83QkKvNtzposHIFx/gdrwLmCKZ70Du/e1sntfa+dxwG9SUV6KqnL2v+1cvhpjZorF45DBpQwfUkZVZahbQiSnZ6AAOCpv97R15gNU9GVR2Zpzq3kgIliWTVmwiBGVgzrSY0UM6vhbHipm+NAg/QKuLJbO8dmw93sauzJC0cDv8ccOAV/NtsVtv/guMcvGshyilk00ZmFZDrGO346jBPw+AgETv2l2Jkj9fgO/r8BJUWjUFA9LuwLQXG1rTeMrIpp1ptM0DUzTAE8W0u7iOMavU9kTrzjL10A8A/f/xk6aaj5KVZAYgObqywprCyKpgCg8l64s+SKs21wqKgeA4V6KKiDbtb'+
			'FubrrC5JtOuP6CwgpPJRWO82payzM5pE7ZNNa9JaKbPZFUQFTlUTYtPZrJJ23OynGMp7iBJ0SBRiK1kd780iftIrWnVeUJV1UVjqNOIPp4No5mxtL9vz1oTNgfRJjsiqxCoHJcTWdutm+NZrEUUzFqIutV9KF8tRWAIwqzaKxLnWpOQRYPQ0Qdy/cI0JyHsEJwWGF6LicP2T4Naq62NeavB5J2U9cJB9VnTaex7kjvrolk/zisuTqqMf93rrfbo8CrWnzxm315U7yjfq6oUBdeKSov88V+M9DW8dXIH/NppO/70QcaJohtrsPjJEoqBJqcmP9xmqvPutBWHqxaZXBozBKJbza+nK+YXhH9QGE14XrX5iJ3MhKP/NLP5yX1Ivow3oyId1VlNZGa7W5/Zep+SqZ+01gcY6HAXOBu8psndnSceItXn9d6m5NauKWYQHQC'+
			'KrcZKuMRrVAYDJTFe1fFMWxEzwicBE46cBjH+CeB6Cc0LE3/FsVNbnITN/gfiQ19boLL7j0AAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._ht_video_youtube_image__img.ggOverSrc=hs;
		el.ggId="ht_video_youtube_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_youtube_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_youtube_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_youtube_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_youtube_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_youtube_image.style[domTransition]='';
				if (me._ht_video_youtube_image.ggCurrentLogicStateVisible == 0) {
					me._ht_video_youtube_image.style.visibility="hidden";
					me._ht_video_youtube_image.ggVisible=false;
				}
				else {
					me._ht_video_youtube_image.style.visibility=(Number(me._ht_video_youtube_image.style.opacity)>0||!me._ht_video_youtube_image.style.opacity)?'inherit':'hidden';
					me._ht_video_youtube_image.ggVisible=true;
				}
			}
		}
		me._ht_video_youtube_image.onmouseover=function (e) {
			me._ht_video_youtube_image__img.src=me._ht_video_youtube_image__img.ggOverSrc;
		}
		me._ht_video_youtube_image.onmouseout=function (e) {
			me._ht_video_youtube_image__img.src=me._ht_video_youtube_image__img.ggNormalSrc;
		}
		me._ht_video_youtube_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_video_youtube.appendChild(me._ht_video_youtube_image);
		el=me._tt_ht_video_youtube=document.createElement('div');
		els=me._tt_ht_video_youtube__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_youtube";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_youtube.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_video_youtube.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_video_youtube.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_video_youtube.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_youtube.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_video_youtube.style.top='-47px';
					me._tt_ht_video_youtube.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_video_youtube.ggDx=0;
					me._tt_ht_video_youtube.style.top='24px';
					me._tt_ht_video_youtube.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_video_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_youtube'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_youtube.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_youtube.style.visibility=(Number(me._tt_ht_video_youtube.style.opacity)>0||!me._tt_ht_video_youtube.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_youtube.ggVisible=true;
				}
				else {
					me._tt_ht_video_youtube.style.visibility="hidden";
					me._tt_ht_video_youtube.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_youtube.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_youtube.appendChild(me._tt_ht_video_youtube);
		el=me._ht_video_youtube_customimage=document.createElement('div');
		els=me._ht_video_youtube_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_video_youtube_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_video_youtube_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_youtube_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_youtube_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_youtube_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_youtube_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_youtube_customimage.style[domTransition]='';
				if (me._ht_video_youtube_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_video_youtube_customimage.style.visibility="hidden";
					me._ht_video_youtube_customimage__img.src = '';
					me._ht_video_youtube_customimage.ggVisible=false;
				}
				else {
					me._ht_video_youtube_customimage.style.visibility=(Number(me._ht_video_youtube_customimage.style.opacity)>0||!me._ht_video_youtube_customimage.style.opacity)?'inherit':'hidden';
					me._ht_video_youtube_customimage.ggSubElement.src=me._ht_video_youtube_customimage.ggText;
					me._ht_video_youtube_customimage.ggVisible=true;
				}
			}
		}
		me._ht_video_youtube_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_video_youtube_customimage.clientWidth;
			var parentHeight = me._ht_video_youtube_customimage.clientHeight;
			var img = me._ht_video_youtube_customimage__img;
			var aspectRatioDiv = me._ht_video_youtube_customimage.clientWidth / me._ht_video_youtube_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_video_youtube.appendChild(me._ht_video_youtube_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_video_youtube;
	};
	function SkinHotspotClass_ht_video_vimeo(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_vimeo=document.createElement('div');
		el.ggId="ht_video_vimeo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_vimeo.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_vimeo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_vimeo.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_vimeo.ggCurrentLogicStateVisible == 0) {
					me._ht_video_vimeo.style.visibility="hidden";
					me._ht_video_vimeo.ggVisible=false;
				}
				else {
					me._ht_video_vimeo.style.visibility=(Number(me._ht_video_vimeo.style.opacity)>0||!me._ht_video_vimeo.style.opacity)?'inherit':'hidden';
					me._ht_video_vimeo.ggVisible=true;
				}
			}
		}
		me._ht_video_vimeo.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_vimeo.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_vimeo.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_video_vimeo.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_vimeo.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_vimeo.style.visibility=me._ht_video_vimeo.ggVisible?'inherit':'hidden';
					me._ht_video_vimeo.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_video_vimeo.style.opacity == 0.0) { me._ht_video_vimeo.style.visibility="hidden"; } }, 505);
					me._ht_video_vimeo.style.opacity=0;
				}
			}
		}
		me._ht_video_vimeo.onclick=function (e) {
			skin._popup_video_vimeo.ggInitMedia(me.hotspot.url);
			player.setVariableValue('vis_video_popup_vimeo', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_vimeo']=true;
			me._tt_ht_video_vimeo.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_vimeo']=false;
			me._tt_ht_video_vimeo.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.ontouchend=function (e) {
			me.elementMouseOver['ht_video_vimeo']=false;
			me._tt_ht_video_vimeo.logicBlock_visible();
		}
		me._ht_video_vimeo.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_vimeo_image=document.createElement('div');
		els=me._ht_video_vimeo_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_video_vimeo_image';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._ht_video_vimeo_image__img.ggOverSrc=hs;
		el.ggId="ht_video_vimeo_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_vimeo_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_vimeo_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_vimeo_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_vimeo_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_vimeo_image.style[domTransition]='';
				if (me._ht_video_vimeo_image.ggCurrentLogicStateVisible == 0) {
					me._ht_video_vimeo_image.style.visibility="hidden";
					me._ht_video_vimeo_image.ggVisible=false;
				}
				else {
					me._ht_video_vimeo_image.style.visibility=(Number(me._ht_video_vimeo_image.style.opacity)>0||!me._ht_video_vimeo_image.style.opacity)?'inherit':'hidden';
					me._ht_video_vimeo_image.ggVisible=true;
				}
			}
		}
		me._ht_video_vimeo_image.onmouseover=function (e) {
			me._ht_video_vimeo_image__img.src=me._ht_video_vimeo_image__img.ggOverSrc;
		}
		me._ht_video_vimeo_image.onmouseout=function (e) {
			me._ht_video_vimeo_image__img.src=me._ht_video_vimeo_image__img.ggNormalSrc;
		}
		me._ht_video_vimeo_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_video_vimeo.appendChild(me._ht_video_vimeo_image);
		el=me._tt_ht_video_vimeo=document.createElement('div');
		els=me._tt_ht_video_vimeo__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_vimeo";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_vimeo.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_video_vimeo.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_video_vimeo.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_video_vimeo.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_vimeo.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_video_vimeo.style.top='-47px';
					me._tt_ht_video_vimeo.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_video_vimeo.ggDx=0;
					me._tt_ht_video_vimeo.style.top='24px';
					me._tt_ht_video_vimeo.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_video_vimeo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_vimeo'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_vimeo.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_vimeo.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_vimeo.style.visibility=(Number(me._tt_ht_video_vimeo.style.opacity)>0||!me._tt_ht_video_vimeo.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_vimeo.ggVisible=true;
				}
				else {
					me._tt_ht_video_vimeo.style.visibility="hidden";
					me._tt_ht_video_vimeo.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_vimeo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_vimeo.appendChild(me._tt_ht_video_vimeo);
		el=me._ht_video_vimeo_customimage=document.createElement('div');
		els=me._ht_video_vimeo_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_video_vimeo_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_video_vimeo_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_vimeo_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_vimeo_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_vimeo_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_vimeo_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_vimeo_customimage.style[domTransition]='';
				if (me._ht_video_vimeo_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_video_vimeo_customimage.style.visibility="hidden";
					me._ht_video_vimeo_customimage__img.src = '';
					me._ht_video_vimeo_customimage.ggVisible=false;
				}
				else {
					me._ht_video_vimeo_customimage.style.visibility=(Number(me._ht_video_vimeo_customimage.style.opacity)>0||!me._ht_video_vimeo_customimage.style.opacity)?'inherit':'hidden';
					me._ht_video_vimeo_customimage.ggSubElement.src=me._ht_video_vimeo_customimage.ggText;
					me._ht_video_vimeo_customimage.ggVisible=true;
				}
			}
		}
		me._ht_video_vimeo_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_video_vimeo_customimage.clientWidth;
			var parentHeight = me._ht_video_vimeo_customimage.clientHeight;
			var img = me._ht_video_vimeo_customimage__img;
			var aspectRatioDiv = me._ht_video_vimeo_customimage.clientWidth / me._ht_video_vimeo_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_video_vimeo.appendChild(me._ht_video_vimeo_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_video_vimeo;
	};
	function SkinHotspotClass_ht_video_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_url=document.createElement('div');
		el.ggId="ht_video_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_url.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_url.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_url.ggCurrentLogicStateVisible == 0) {
					me._ht_video_url.style.visibility="hidden";
					me._ht_video_url.ggVisible=false;
				}
				else {
					me._ht_video_url.style.visibility=(Number(me._ht_video_url.style.opacity)>0||!me._ht_video_url.style.opacity)?'inherit':'hidden';
					me._ht_video_url.ggVisible=true;
				}
			}
		}
		me._ht_video_url.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_video_url.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_url.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url.style.visibility=me._ht_video_url.ggVisible?'inherit':'hidden';
					me._ht_video_url.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_video_url.style.opacity == 0.0) { me._ht_video_url.style.visibility="hidden"; } }, 505);
					me._ht_video_url.style.opacity=0;
				}
			}
		}
		me._ht_video_url.onclick=function (e) {
			skin._popup_video_url.ggInitMedia(me.hotspot.url);
			player.setVariableValue('vis_video_popup_url', true);
			if (skin._popup_video_url.ggApiPlayer) {
				if (skin._popup_video_url.ggApiPlayerType == 'youtube') {
					skin._popup_video_url.ggApiPlayer.playVideo();
				} else if (skin._popup_video_url.ggApiPlayerType == 'vimeo') {
					skin._popup_video_url.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_url","1");
			}
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_url']=true;
			me._tt_ht_video_url.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_url']=false;
			me._tt_ht_video_url.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.ontouchend=function (e) {
			me.elementMouseOver['ht_video_url']=false;
			me._tt_ht_video_url.logicBlock_visible();
		}
		me._ht_video_url.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_url_image=document.createElement('div');
		els=me._ht_video_url_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_video_url_image';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._ht_video_url_image__img.ggOverSrc=hs;
		el.ggId="ht_video_url_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_url_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_url_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_url_image.style[domTransition]='';
				if (me._ht_video_url_image.ggCurrentLogicStateVisible == 0) {
					me._ht_video_url_image.style.visibility="hidden";
					me._ht_video_url_image.ggVisible=false;
				}
				else {
					me._ht_video_url_image.style.visibility=(Number(me._ht_video_url_image.style.opacity)>0||!me._ht_video_url_image.style.opacity)?'inherit':'hidden';
					me._ht_video_url_image.ggVisible=true;
				}
			}
		}
		me._ht_video_url_image.onmouseover=function (e) {
			me._ht_video_url_image__img.src=me._ht_video_url_image__img.ggOverSrc;
		}
		me._ht_video_url_image.onmouseout=function (e) {
			me._ht_video_url_image__img.src=me._ht_video_url_image__img.ggNormalSrc;
		}
		me._ht_video_url_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_video_url.appendChild(me._ht_video_url_image);
		el=me._tt_ht_video_url=document.createElement('div');
		els=me._tt_ht_video_url__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_url";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_url.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_video_url.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_video_url.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_video_url.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_url.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_video_url.style.top='-47px';
					me._tt_ht_video_url.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_video_url.ggDx=0;
					me._tt_ht_video_url.style.top='24px';
					me._tt_ht_video_url.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_video_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_url'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_url.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_url.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_url.style.visibility=(Number(me._tt_ht_video_url.style.opacity)>0||!me._tt_ht_video_url.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_url.ggVisible=true;
				}
				else {
					me._tt_ht_video_url.style.visibility="hidden";
					me._tt_ht_video_url.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_url.appendChild(me._tt_ht_video_url);
		el=me._ht_video_url_customimage=document.createElement('div');
		els=me._ht_video_url_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_video_url_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_video_url_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_url_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_url_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_url_customimage.style[domTransition]='';
				if (me._ht_video_url_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_video_url_customimage.style.visibility="hidden";
					me._ht_video_url_customimage__img.src = '';
					me._ht_video_url_customimage.ggVisible=false;
				}
				else {
					me._ht_video_url_customimage.style.visibility=(Number(me._ht_video_url_customimage.style.opacity)>0||!me._ht_video_url_customimage.style.opacity)?'inherit':'hidden';
					me._ht_video_url_customimage.ggSubElement.src=me._ht_video_url_customimage.ggText;
					me._ht_video_url_customimage.ggVisible=true;
				}
			}
		}
		me._ht_video_url_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_video_url_customimage.clientWidth;
			var parentHeight = me._ht_video_url_customimage.clientHeight;
			var img = me._ht_video_url_customimage__img;
			var aspectRatioDiv = me._ht_video_url_customimage.clientWidth / me._ht_video_url_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_video_url.appendChild(me._ht_video_url_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_video_url;
	};
	function SkinHotspotClass_ht_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_file=document.createElement('div');
		el.ggId="ht_video_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_file.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_file.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_file.ggCurrentLogicStateVisible == 0) {
					me._ht_video_file.style.visibility="hidden";
					me._ht_video_file.ggVisible=false;
				}
				else {
					me._ht_video_file.style.visibility=(Number(me._ht_video_file.style.opacity)>0||!me._ht_video_file.style.opacity)?'inherit':'hidden';
					me._ht_video_file.ggVisible=true;
				}
			}
		}
		me._ht_video_file.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_video_file.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_file.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file.style.visibility=me._ht_video_file.ggVisible?'inherit':'hidden';
					me._ht_video_file.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_video_file.style.opacity == 0.0) { me._ht_video_file.style.visibility="hidden"; } }, 505);
					me._ht_video_file.style.opacity=0;
				}
			}
		}
		me._ht_video_file.onclick=function (e) {
			skin._popup_video_file.ggInitMedia(player.getBasePath()+""+me.hotspot.url);
			player.setVariableValue('vis_video_popup_file', true);
			if (skin._popup_video_file.ggApiPlayer) {
				if (skin._popup_video_file.ggApiPlayerType == 'youtube') {
					skin._popup_video_file.ggApiPlayer.playVideo();
				} else if (skin._popup_video_file.ggApiPlayerType == 'vimeo') {
					skin._popup_video_file.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_file","1");
			}
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_file']=true;
			me._tt_ht_video_file.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_file']=false;
			me._tt_ht_video_file.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.ontouchend=function (e) {
			me.elementMouseOver['ht_video_file']=false;
			me._tt_ht_video_file.logicBlock_visible();
		}
		me._ht_video_file.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_file_image=document.createElement('div');
		els=me._ht_video_file_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_video_file_image';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAH8UlEQVR4nO2ba2wU1xXHf2dmdwFje72YGHAxUNHySKBNE5pCgnhDlXwBpcLgR4AEJTQPBSUfUkVtQ5CaplEaVYUoTSktwrBeCzeoNFJSNUhuKQlJKA0KjzYltAaKI96FYB67M3P6YY3t9T68653ZQMXvi3fOPffe/xzfuXPvmRnBS5Zt6E/7wDJ8Vhkqxd1KbOAcRZfO8JuHLoKopzoyIJ60Whu+S+BFYFYW3peBT4FDIrrfUXkP0V2E6y94oq0H7gZgUdN4Me0fAffn2ZKD6PvqGG+gspWmmlYX1KXEnQAsjlQZos+r6DLAcKXNLhSVN9S0X2TzA39zue18A6BCTWS5iK4BBriiKBOif1DHeIFI7U7XmuxzzYVbgkYguk5Vqt0SkwPbVfRBwvX/yb'+
			'ehvgWgbvNkUYkAo/IVkAdnVWU5kdrf5dNI7gGoDa8U+Cngy6djtxB43Yn5n6a5+nIf6+dA3eZnROWlvnTkMQfUZ32bhqXHc62YfQBqGp8W0Vdy7aCAfKIq04nUnsilUna3rNrwk9f5yQOMFdF3WLhlUC6Veh8BteHlAuv7LKvw/FVj/jk0V5/PxjlzAOo3jRXH2Av0d0NZAdmhbZWz+dNMqzfH9JfAjBafqGzkxjt5gGlUtj2bjWP6AFS2PYPKt1yTVGAEnmNxZFIWfimo3/R1cYzdgN9tYQXmH1p88U7WrbiUziHFCFAR21zLjX/yAOOM9oE/yeSQPALqN80Qx2jJVOnirxbkqctdih/OvBpWx7iHppr3UpUljQBxjO+7pOu6QQxndbqyxAAsahoNzPFa0BfAHGoap6YqSNjQGD7rQdXsV8e27RCN2Vi2TSxmE43Z'+
			'xLr9VlUCfpOA34fPNAgEfAT8Jn5f3GYY3mTkUiGiqxVm97QnBEBVFuXS6PxHX89LVMDvIxQsIlQ6gFBpEWXBIkKlRQwKDiQULGJwqJgvDQnSv58r8/EsasPTaKzb0d3YFYBFTaPB/oobPWVLNGZx4vQFTpzOnP+sKC9h+NAyqoYNompoqON3iGBJbkkoUVmtMLO7rSsApj0vp9b6SEV5CfdNn8ikiSOpGFzKgH5+An4fpmmwcuMeXn3n0+RKp4BTDuw7DZzuNLevn59b56IzWLgl2H2f0BkAAyZ7mZyfN/VWVtRMp6y0KK3Pz5bcybGzl9i2p807IT5rJPDxtcPOu4Cq3OFFf6YpbHhpGd9bcW/GkwcwDaHhsSlUhjzdfozsfhAPwL1v9UP0Vi96+/kPaxhRWZ61f0l/P2uWePK/uEZl94N4AMrPVOF+Pp/ZU8Yxfv'+
			'SwBNvVmMPsF1r48PCZtPXuv2sEXxsRdFtOHNGS7ofxk3aMKi/6mn3P+CTbhcsxWg6e4O5V2/nxtgNomolnydRRXkjCSBmAHsPCLfxm+kHlqPKDLfvY+Jd/pSyfedsQLyRBjwc4cYWimWenPtJ2MjkrFSxKXNRs+PO/U9YddctALyQBRLsfxAOg0s+Lng61nkyyBXwGQ8u6ZvmS/oXddTuOkTIAAS86e3vHPizLTrLfPjLU+fuxuakXn62n2r2QBKIJyZFrl0A0pXOe2Lay9+/HkuzTxt0CwJqld3Df7amnn5YDOaX3s0c0YZUVXwmqXPHqJY11kR1MmjgqwbZg0nBU4Yl5Y9LWa9jZ6omengGIjwDDSZszy5fDx07x0YEjCbZxlaU8Oz/9umvrh0f5+GhWaf3csXyt3Q+vzQHJs5WLPL/2zZRzQSo+vxLjyQbX34O4'+
			'xnmaFif8N+IBsM2cHyrmwsX2qzS++UGvfrajLHltF23nrnglZW/PF7Lic4DPOk4OmaC+sHHrLg4e+owF877BmFEVBEuLMI3EhdJTDXs83QkKvNtzposHIFx/gdrwLmCKZ70Du/e1sntfa+dxwG9SUV6KqnL2v+1cvhpjZorF45DBpQwfUkZVZahbQiSnZ6AAOCpv97R15gNU9GVR2Zpzq3kgIliWTVmwiBGVgzrSY0UM6vhbHipm+NAg/QKuLJbO8dmw93sauzJC0cDv8ccOAV/NtsVtv/guMcvGshyilk00ZmFZDrGO346jBPw+AgETv2l2Jkj9fgO/r8BJUWjUFA9LuwLQXG1rTeMrIpp1ptM0DUzTAE8W0u7iOMavU9kTrzjL10A8A/f/xk6aaj5KVZAYgObqywprCyKpgCg8l64s+SKs21wqKgeA4V6KKiDbtb'+
			'FubrrC5JtOuP6CwgpPJRWO82payzM5pE7ZNNa9JaKbPZFUQFTlUTYtPZrJJ23OynGMp7iBJ0SBRiK1kd780iftIrWnVeUJV1UVjqNOIPp4No5mxtL9vz1oTNgfRJjsiqxCoHJcTWdutm+NZrEUUzFqIutV9KF8tRWAIwqzaKxLnWpOQRYPQ0Qdy/cI0JyHsEJwWGF6LicP2T4Naq62NeavB5J2U9cJB9VnTaex7kjvrolk/zisuTqqMf93rrfbo8CrWnzxm315U7yjfq6oUBdeKSov88V+M9DW8dXIH/NppO/70QcaJohtrsPjJEoqBJqcmP9xmqvPutBWHqxaZXBozBKJbza+nK+YXhH9QGE14XrX5iJ3MhKP/NLP5yX1Ivow3oyId1VlNZGa7W5/Zep+SqZ+01gcY6HAXOBu8psndnSceItXn9d6m5NauKWYQHQC'+
			'KrcZKuMRrVAYDJTFe1fFMWxEzwicBE46cBjH+CeB6Cc0LE3/FsVNbnITN/gfiQ19boLL7j0AAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAH8UlEQVR4nO2ba2wU1xXHf2dmdwFje72YGHAxUNHySKBNE5pCgnhDlXwBpcLgR4AEJTQPBSUfUkVtQ5CaplEaVYUoTSktwrBeCzeoNFJSNUhuKQlJKA0KjzYltAaKI96FYB67M3P6YY3t9T68653ZQMXvi3fOPffe/xzfuXPvmRnBS5Zt6E/7wDJ8Vhkqxd1KbOAcRZfO8JuHLoKopzoyIJ60Whu+S+BFYFYW3peBT4FDIrrfUXkP0V2E6y94oq0H7gZgUdN4Me0fAffn2ZKD6PvqGG+gspWmmlYX1KXEnQAsjlQZos+r6DLAcKXNLhSVN9S0X2TzA39zue18A6BCTWS5iK4BBriiKBOif1DHeIFI7U7XmuxzzYVbgkYguk5Vqt0SkwPbVfRBwvX/yb'+
			'ehvgWgbvNkUYkAo/IVkAdnVWU5kdrf5dNI7gGoDa8U+Cngy6djtxB43Yn5n6a5+nIf6+dA3eZnROWlvnTkMQfUZ32bhqXHc62YfQBqGp8W0Vdy7aCAfKIq04nUnsilUna3rNrwk9f5yQOMFdF3WLhlUC6Veh8BteHlAuv7LKvw/FVj/jk0V5/PxjlzAOo3jRXH2Av0d0NZAdmhbZWz+dNMqzfH9JfAjBafqGzkxjt5gGlUtj2bjWP6AFS2PYPKt1yTVGAEnmNxZFIWfimo3/R1cYzdgN9tYQXmH1p88U7WrbiUziHFCFAR21zLjX/yAOOM9oE/yeSQPALqN80Qx2jJVOnirxbkqctdih/OvBpWx7iHppr3UpUljQBxjO+7pOu6QQxndbqyxAAsahoNzPFa0BfAHGoap6YqSNjQGD7rQdXsV8e27RCN2Vi2TSxmE43Z'+
			'xLr9VlUCfpOA34fPNAgEfAT8Jn5f3GYY3mTkUiGiqxVm97QnBEBVFuXS6PxHX89LVMDvIxQsIlQ6gFBpEWXBIkKlRQwKDiQULGJwqJgvDQnSv58r8/EsasPTaKzb0d3YFYBFTaPB/oobPWVLNGZx4vQFTpzOnP+sKC9h+NAyqoYNompoqON3iGBJbkkoUVmtMLO7rSsApj0vp9b6SEV5CfdNn8ikiSOpGFzKgH5+An4fpmmwcuMeXn3n0+RKp4BTDuw7DZzuNLevn59b56IzWLgl2H2f0BkAAyZ7mZyfN/VWVtRMp6y0KK3Pz5bcybGzl9i2p807IT5rJPDxtcPOu4Cq3OFFf6YpbHhpGd9bcW/GkwcwDaHhsSlUhjzdfozsfhAPwL1v9UP0Vi96+/kPaxhRWZ61f0l/P2uWePK/uEZl94N4AMrPVOF+Pp/ZU8Yxfv'+
			'SwBNvVmMPsF1r48PCZtPXuv2sEXxsRdFtOHNGS7ofxk3aMKi/6mn3P+CTbhcsxWg6e4O5V2/nxtgNomolnydRRXkjCSBmAHsPCLfxm+kHlqPKDLfvY+Jd/pSyfedsQLyRBjwc4cYWimWenPtJ2MjkrFSxKXNRs+PO/U9YddctALyQBRLsfxAOg0s+Lng61nkyyBXwGQ8u6ZvmS/oXddTuOkTIAAS86e3vHPizLTrLfPjLU+fuxuakXn62n2r2QBKIJyZFrl0A0pXOe2Lay9+/HkuzTxt0CwJqld3Df7amnn5YDOaX3s0c0YZUVXwmqXPHqJY11kR1MmjgqwbZg0nBU4Yl5Y9LWa9jZ6omengGIjwDDSZszy5fDx07x0YEjCbZxlaU8Oz/9umvrh0f5+GhWaf3csXyt3Q+vzQHJs5WLPL/2zZRzQSo+vxLjyQbX34O4'+
			'xnmaFif8N+IBsM2cHyrmwsX2qzS++UGvfrajLHltF23nrnglZW/PF7Lic4DPOk4OmaC+sHHrLg4e+owF877BmFEVBEuLMI3EhdJTDXs83QkKvNtzposHIFx/gdrwLmCKZ70Du/e1sntfa+dxwG9SUV6KqnL2v+1cvhpjZorF45DBpQwfUkZVZahbQiSnZ6AAOCpv97R15gNU9GVR2Zpzq3kgIliWTVmwiBGVgzrSY0UM6vhbHipm+NAg/QKuLJbO8dmw93sauzJC0cDv8ccOAV/NtsVtv/guMcvGshyilk00ZmFZDrGO346jBPw+AgETv2l2Jkj9fgO/r8BJUWjUFA9LuwLQXG1rTeMrIpp1ptM0DUzTAE8W0u7iOMavU9kTrzjL10A8A/f/xk6aaj5KVZAYgObqywprCyKpgCg8l64s+SKs21wqKgeA4V6KKiDbtb'+
			'FubrrC5JtOuP6CwgpPJRWO82payzM5pE7ZNNa9JaKbPZFUQFTlUTYtPZrJJ23OynGMp7iBJ0SBRiK1kd780iftIrWnVeUJV1UVjqNOIPp4No5mxtL9vz1oTNgfRJjsiqxCoHJcTWdutm+NZrEUUzFqIutV9KF8tRWAIwqzaKxLnWpOQRYPQ0Qdy/cI0JyHsEJwWGF6LicP2T4Naq62NeavB5J2U9cJB9VnTaex7kjvrolk/zisuTqqMf93rrfbo8CrWnzxm315U7yjfq6oUBdeKSov88V+M9DW8dXIH/NppO/70QcaJohtrsPjJEoqBJqcmP9xmqvPutBWHqxaZXBozBKJbza+nK+YXhH9QGE14XrX5iJ3MhKP/NLP5yX1Ivow3oyId1VlNZGa7W5/Zep+SqZ+01gcY6HAXOBu8psndnSceItXn9d6m5NauKWYQHQC'+
			'KrcZKuMRrVAYDJTFe1fFMWxEzwicBE46cBjH+CeB6Cc0LE3/FsVNbnITN/gfiQ19boLL7j0AAAAASUVORK5CYII=';
		me._ht_video_file_image__img.ggOverSrc=hs;
		el.ggId="ht_video_file_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_file_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_file_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_file_image.style[domTransition]='';
				if (me._ht_video_file_image.ggCurrentLogicStateVisible == 0) {
					me._ht_video_file_image.style.visibility="hidden";
					me._ht_video_file_image.ggVisible=false;
				}
				else {
					me._ht_video_file_image.style.visibility=(Number(me._ht_video_file_image.style.opacity)>0||!me._ht_video_file_image.style.opacity)?'inherit':'hidden';
					me._ht_video_file_image.ggVisible=true;
				}
			}
		}
		me._ht_video_file_image.onmouseover=function (e) {
			me._ht_video_file_image__img.src=me._ht_video_file_image__img.ggOverSrc;
		}
		me._ht_video_file_image.onmouseout=function (e) {
			me._ht_video_file_image__img.src=me._ht_video_file_image__img.ggNormalSrc;
		}
		me._ht_video_file_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_video_file.appendChild(me._ht_video_file_image);
		el=me._tt_ht_video_file=document.createElement('div');
		els=me._tt_ht_video_file__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_file";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_file.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_video_file.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_video_file.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_video_file.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_file.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_video_file.style.top='-47px';
					me._tt_ht_video_file.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_video_file.ggDx=0;
					me._tt_ht_video_file.style.top='24px';
					me._tt_ht_video_file.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_file'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_file.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_file.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_file.style.visibility=(Number(me._tt_ht_video_file.style.opacity)>0||!me._tt_ht_video_file.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_file.ggVisible=true;
				}
				else {
					me._tt_ht_video_file.style.visibility="hidden";
					me._tt_ht_video_file.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_file.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_file.appendChild(me._tt_ht_video_file);
		el=me._ht_video_file_customimage=document.createElement('div');
		els=me._ht_video_file_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_video_file_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_video_file_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_file_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_file_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_file_customimage.style[domTransition]='';
				if (me._ht_video_file_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_video_file_customimage.style.visibility="hidden";
					me._ht_video_file_customimage__img.src = '';
					me._ht_video_file_customimage.ggVisible=false;
				}
				else {
					me._ht_video_file_customimage.style.visibility=(Number(me._ht_video_file_customimage.style.opacity)>0||!me._ht_video_file_customimage.style.opacity)?'inherit':'hidden';
					me._ht_video_file_customimage.ggSubElement.src=me._ht_video_file_customimage.ggText;
					me._ht_video_file_customimage.ggVisible=true;
				}
			}
		}
		me._ht_video_file_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_video_file_customimage.clientWidth;
			var parentHeight = me._ht_video_file_customimage.clientHeight;
			var img = me._ht_video_file_customimage__img;
			var aspectRatioDiv = me._ht_video_file_customimage.clientWidth / me._ht_video_file_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_video_file.appendChild(me._ht_video_file_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_video_file;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_image=document.createElement('div');
		el.ggId="ht_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_image.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_image.ggCurrentLogicStateVisible == 0) {
					me._ht_image.style.visibility="hidden";
					me._ht_image.ggVisible=false;
				}
				else {
					me._ht_image.style.visibility=(Number(me._ht_image.style.opacity)>0||!me._ht_image.style.opacity)?'inherit':'hidden';
					me._ht_image.ggVisible=true;
				}
			}
		}
		me._ht_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_image.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_image.ggCurrentLogicStateAlpha == 0) {
					me._ht_image.style.visibility=me._ht_image.ggVisible?'inherit':'hidden';
					me._ht_image.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_image.style.opacity == 0.0) { me._ht_image.style.visibility="hidden"; } }, 505);
					me._ht_image.style.opacity=0;
				}
			}
		}
		me._ht_image.onclick=function (e) {
			skin._popup_image.ggText=player.getBasePath()+""+me.hotspot.url;
			skin._popup_image.ggSubElement.style.width = '0px';
			skin._popup_image.ggSubElement.style.height = '0px';
			skin._popup_image.ggSubElement.src='';
			skin._popup_image.ggSubElement.src=skin._popup_image.ggText;
			player.setVariableValue('vis_image_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ontouchend=function (e) {
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image.logicBlock_visible();
		}
		me._ht_image.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_image_image=document.createElement('div');
		els=me._ht_image_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_image_image';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAIpklEQVR4nO2bf4xcVRXHP+e++bGznW27W2j6Cxa1lmrKz0QhqdXlR8CKILFu2Z3dagkYElCDiSIaf6QqxMRIDIHyK4jI7mxpA8aALZIKWmyjQkKFBJW0hLa0BdrudrvbnZ2d9+7xj213Z2Zndue9NzPBhO8/k3vvud973nnnnnvvuW+EWqB9c5J4dgGes8CBM4AEonFViYuxo8BJsWbYFX0X2Ec6dRxEa6LLDJCqsnWmzxDRjQLtPnsOiejrqvKKwD89le30pd6rqm5lUDUDOJ3p61X0IWB+NfgEXlaVP1hjH6e3+51qcJYZJyTWPzbXjMXuBdaFV6ckrIpuc1R+7aZTf672VAlngFTvxw08A5xbHXWmh6i85In+kHTXjqpxBu0Y6X6izVrzNNBcLW'+
			'V84H6bHL6Dh28ZCUsUyABOZ/pmFX0AiIRVIATetKLd9Ha/HIbEtwFMV8/3Ubk7zKBVhAf83CaH7+LhW3JBCHwZwKR6vw3cE2SgWkLhGR1obmfbF7J++1ZsANOZvhXR+/0OUC8oPKsDzV/xa4SKDOB0pm9U0d8EU61+UNE/an/LGj9GmNEAp6L9dsAJpV2d4NcIZtrWjr6zrDWb+T95eABRucY0DzxYqXx5A6x/rMEx9ingzGooVmesd7p6bqhEsOwUMKneR4Cb/YzqCEQNRB0laiAiSswZt3JOYcwTxixkXSFnocbHv0ELF5Du2jedUEkDRDrTn7ei2/yMNjum/HJlxk8Xxiwczwr9o8KxUaE/aziWMRwbFQ6PCENj4XbqAju9Q4va+MtlbjmZqTu5thcjVg79yu9gi5PWbxdiBuYnlPmJ077gFbT3jwoHhg37hw37'+
			'ThgODBuOZys3isJKs/DwDyz8tJzMFDbTmb4F0YqDyGlceVaO9qWBNmO+cPtLCTKuL8/wrOd8kic73izVWBgE2zc7iN4ZRLElATwgCFrivrs4xvE2lGssmAJObOw6VTnH9xDA4uRkSPv6C7OCUJTFxraTRE+9qrlxy8GTvlflDrqf+AU96/5V3FDgAdaabwVR0IiysLF2HpDv8vMSwdYOseZnpeonDdDVs0RE24KQz0/oxBsKisa4w7sPXs9zd7Zx++pzMTL50CN5Mbw5FtAAcC1dPZcW10+obVTWBGIGFjSGX9GzOUsyHuWq8xdwz7qLuPbixRNtrp00RktDcE8TlbuK6yYMIPDloMSzA76VfHhWeeyvbwEwkvV4/cDxibam6CR/S0PwsQQup33znPy68SC4emtcGZjiHpWiqQoGAPhu727OnB1n2+7DvPX+cB7/pM'+
			'zsWImOfhBxW4HXJooAtPRfhEpg6qZoSKVOYTTn0XHvroK6uXGLyUsEOyHz2A60enkGMABG5dNhSJPR2u3ql80tnPMmZFZcYVEB36nfj4YhnWkKPNLZyt1fXBiIe3lzoQGckKsNok35xQiAwllhPGtWtHxkfrijlesuWYqqcmgwx30vHa2Y1wismFd4jgn7/CUNYEQXqwY3QakYMK8xwkOd57DqvNbxcUX40ZoLuHDJHm5/ej/D2UmviUeEL62YzaUfSXJkKMfvXxvkP+9nufhMl+Z4oXeZ8HdZifzCuAeo+N9h56E4MN26ch7fueZcZjUmpshee8lSrjh/Cc++sp+eV46yYmED37tmGXOakhMy31zt8cDz/8Y99vaU/mFjADCWXzh9FgiV8rJFOv2k/cJp5RsTDaxdtYy1q5aVbHcch2+sXsGuXSc4erRwyoT2AGsK'+
			'DDA+pVRC0dbqFLB8+fIpdSP+jsJTIVpwnWYARHQwDKcNET+mQ0tLC8lksqDuhI+ESCmI6KH8sgGwUHloLgFPa7cPWLSoYNnmZEgPKGkAgSNhSItjQDXR0tJSUD4xVkawQrhu5O388ukYUDJdVClqNQUAmpoKlm2GxkLtBAbZ1FGQJR7fChs7JVPiB7kaZsPi8cIVeihE2lFgd/EXJhEAdyz2mokGZz5RlL52XZdMJsPIyAiZTIZMJkMul8PzPKy1uK6L53kYYzDG4DgOjuMQiUSIxWI0NDSQSCRIJBJTDRDCAxR2FteN7wO2rH1XUr07FD4bhHigKDJv3bo1CE1FeG8k+HSzKlPuOiYTIqJlc+czYWC0djEgH6pw8GRgDxjg8MK/F1dOsLm9XS+I6K5igUpwPOQNTqV4LyNkvZnlyiBd6oYoz5yiohLIC4qnQK3wzn'+
			'Dw+W+tebRUfQGjm049L6L/8Es+mA19SK0IBwIaQOBvbOp8tVRbEaMoUPYWpRzq5QEhDPDjcm1TToH6+tN75Lw1nwBWVDqAa2Hn4Qh7Bg39owZPx7NEYfN3xXhqb4ys549UYbtNd5Wd2iW/87O56K0mmltFUf5sOgxkhYEjEV49AhDFiLJ4lrI4qcyJKXPiljkxZXZMmRsfzyNaBU/Bs+O/VgVXlcGs4UhGODoqHMkIxzKGo6MS5CQ4qI5703QCZRkjqd6rLTznd8QPEkQl5fWl+qaTKTup3HTXnxDdWH216ob0TA8PM+QYrbF3AG9UTaX6Yb+Njd1WieD0YfWJr560Efcq4K1qaFUXqBy0xl7Fb288PrNwpV+KpnpbDewAzg6jWx2wz8LlpLsqfmGVh9UbNn3MON4OfKwMdcZeC1fM9FVYMSrfWTzZsdcaezlwwK9m'+
			'dcAbNuJ+zu/Dg9+Llp51/7WxsfMRnTG61hH32eTwp/jd1w4G6Rx4r+Z09aRUZSMwZ0bh2uCQEb3R7e1+PgxJuM3qusfPFi/yqMCVoXj8Y5PNRW9jy9r+sERV2K2rRDr7LlPRDQqfCc9XHqdOqhu83m5fX7FOy1ktIgA6+i4yxt4EpKjin6kEdorKBrevc/sH629z5dD2YoSFhy81oqsFVipcSIBYIbDj1IO/WKu/1tbnII8KHZtaIxH3HFVZpCqLUGnE2BgQAzKoDKEyJHDIg324kX1sWRvqyu5DfIgPMSP+B6H5820XK5bsAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._ht_image_image__img.ggOverSrc=hs;
		el.ggId="ht_image_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_image_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_image_image.style[domTransition]='';
				if (me._ht_image_image.ggCurrentLogicStateVisible == 0) {
					me._ht_image_image.style.visibility="hidden";
					me._ht_image_image.ggVisible=false;
				}
				else {
					me._ht_image_image.style.visibility=(Number(me._ht_image_image.style.opacity)>0||!me._ht_image_image.style.opacity)?'inherit':'hidden';
					me._ht_image_image.ggVisible=true;
				}
			}
		}
		me._ht_image_image.onmouseover=function (e) {
			me._ht_image_image__img.src=me._ht_image_image__img.ggOverSrc;
		}
		me._ht_image_image.onmouseout=function (e) {
			me._ht_image_image__img.src=me._ht_image_image__img.ggNormalSrc;
		}
		me._ht_image_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_image.appendChild(me._ht_image_image);
		el=me._tt_ht_image=document.createElement('div');
		els=me._tt_ht_image__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_image";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_image.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_image.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_image.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_image.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_image.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_image.style.top='-47px';
					me._tt_ht_image.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_image.ggDx=0;
					me._tt_ht_image.style.top='24px';
					me._tt_ht_image.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_image'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_image.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_image.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_image.style.visibility=(Number(me._tt_ht_image.style.opacity)>0||!me._tt_ht_image.style.opacity)?'inherit':'hidden';
					me._tt_ht_image.ggVisible=true;
				}
				else {
					me._tt_ht_image.style.visibility="hidden";
					me._tt_ht_image.ggVisible=false;
				}
			}
		}
		me._tt_ht_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_image.appendChild(me._tt_ht_image);
		el=me._ht_image_customimage=document.createElement('div');
		els=me._ht_image_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_image_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_image_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_image_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_image_customimage.style[domTransition]='';
				if (me._ht_image_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_image_customimage.style.visibility="hidden";
					me._ht_image_customimage__img.src = '';
					me._ht_image_customimage.ggVisible=false;
				}
				else {
					me._ht_image_customimage.style.visibility=(Number(me._ht_image_customimage.style.opacity)>0||!me._ht_image_customimage.style.opacity)?'inherit':'hidden';
					me._ht_image_customimage.ggSubElement.src=me._ht_image_customimage.ggText;
					me._ht_image_customimage.ggVisible=true;
				}
			}
		}
		me._ht_image_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_image_customimage.clientWidth;
			var parentHeight = me._ht_image_customimage.clientHeight;
			var img = me._ht_image_customimage__img;
			var aspectRatioDiv = me._ht_image_customimage.clientWidth / me._ht_image_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_image.appendChild(me._ht_image_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_image;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info=document.createElement('div');
		el.ggId="ht_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_info.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_info.ggCurrentLogicStateVisible == 0) {
					me._ht_info.style.visibility="hidden";
					me._ht_info.ggVisible=false;
				}
				else {
					me._ht_info.style.visibility=(Number(me._ht_info.style.opacity)>0||!me._ht_info.style.opacity)?'inherit':'hidden';
					me._ht_info.ggVisible=true;
				}
			}
		}
		me._ht_info.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_info.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_info.ggCurrentLogicStateAlpha == 0) {
					me._ht_info.style.visibility=me._ht_info.ggVisible?'inherit':'hidden';
					me._ht_info.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_info.style.opacity == 0.0) { me._ht_info.style.visibility="hidden"; } }, 505);
					me._ht_info.style.opacity=0;
				}
			}
		}
		me._ht_info.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ontouchend=function (e) {
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
		}
		me._ht_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_info_image=document.createElement('div');
		els=me._ht_info_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_info_image';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAG+ElEQVR4nO2bf2xV5RnHP88591KFVjvaqrU4YIOWjQ3U6DIzycrYdLjNZKsl3HsL/8yQsKhLXIxB2RqWBbOJY/jHDDNmQ9p7m+IfZj9CNiK4mOgSmAEVpiCyWldbWlqgFejOPe+zPyrIbe+Pc88PtmT9JPePe9/nfZ7nfu97nvO+73kvTDPN/zUSiddEerGIPiVwF5C97OUAwwIDBgYEBlA5IaKHXTv7FjvX9oJoJDkVIFwBWrvrrLizCVgH2D48nFXYL6J/Ma69h6a3D7Fpkwk1x0mEI0Br9wwrln0A0Z8A14bic4JBRLuM6HN0rDkUot9LBBcgkV5kib4ALA6eTlH+LrDVXXg0E+aoCCSAnUi3qOjvgMpw0vHEGwIb3HRydxj1wp8AzftiVsO/Nq'+
			'PySNAE/KIqv1f4PpnkUBA/5QuwdkeNOPEXRLQ5SOBQEO23jLU2m0nu8e2iLOvW7ko77ryk8CU/wWoqK2isr2L+dZXELAvHNRzqGeEffWdQ/4NZUVlvMsntfjp7F6C1e4bEnT98fG8vm8b6Ko5s+XbetqMfjvLAbw+w93C/H9cTiD5qOtt+UW43y5NVe7tlxZ0dfr88wMqlDQXbGuur+NOjX+WOhbV+3YPKz61k5w/L7eZJAOtY41ZgddlJXcbKm+uLtsdtiyfbbgkSAuCpWLJzeTkdSgpgpzpWAg/5TgkQgTsaS/+6X15QS3311UFC2Qa6SXXM8dqhuADrts9UlV8HyQgmit+sipgn2zmzZwYNVysq27waFxXAGq1qB+YFzaicL1V1dTxoOAS+F0t1eKpXhQVIpJcg+qPA2QBDo+OebQfPXggjJEblaVq7Sy7ICgog'+
			'or/C34puCn0j5zk15k2E9099FEZIgCY7lv1OKaP8AqzO3CJQVjUthlHl4Z2vF2z/YPgcT/7xCLdu2M2Zc05YYTFQ8raYdyJkJTt3AGtDy+Rjbp77KdqWzaN65gyyxvD6iREOHB/mYM8IJsBUsBhGdAmdbW8Wap9amtdtn8kY90WRzMGeEQ72jEThuiCWSouBggJMuQTs0aqVQOB70f8KAt8q1j5FABW9N7p0rjwKt9HafUOh9nxFcFmE+fxXsONOc6G2XAFWZ24E5keczxVH4YuF2nKKoG27S1Wj2SkHmBGzqLwqRsyyGBodj6zyT0ZhSaG2HAFUpTGqJObWzuL4tk/Ky7hjeO/kGHve/JAX93/AK++cDLIpUhSBpYVcT64BC6JJAe5cVJfzviJu8bmGa3jom03s/fEKXvvp3az4QsFaFZQ5NO/LuxrLEUDh+qgyuL'+
			'Oprmj7bZ+ZzZ83LKe2qiKK8ELdYN71+OQRUB1FdICvlBDgIk3110STQMV43h/XmvQmzKc6l6iprODzDd5cN90YjQAxldICRMXtn63xbNtYXxVJDmqsvLPbXAFEs1EEn1s7y7PtoohGAJbJv/DLeacS3lr0MubUeN/nm3edd7HKQqW0AEZlOIrY5WyJVcRC2YOZihcBxDIno4h9U413AeJ2ZGXJzffh5EsgEgEayhgBM2LRCOCK5h3duSNA5UQUwa+Kex/WkY0A2y0tgKvyThSxHdf7eQbbimgx5sRLC4Do0UhilyHAwJlwtsWn4Np59+JyBcgkh1B5NuzY5QjQG962+CeoPMuuVefzNU254Mzp6gcF/hZmfCfrfZ0b4nMBAAReM6erHyzUPrXi7L5n3DVWC6IBHtbn8tG49wlm71DeH8ofov2use5j9z0Fn8rkL7ld'+
			'iT7j2i1MHGwMzD8Hxzzb9p46F0ZIAMe4dgtdib5iRoXvOV2JVwXuDyOT4wPeBdj/XqAzT5cQuJ+uxKul7IredN106nlUAj8gfbffmwD9py/wdt/ZoOEAHnbTqee9GJacdZhM8peoPBEkm+MDo57s9h3pD2NfcLNJp7Z6NfY07TKZxOOI+jqFBfCuVwEOB5yJi2436eTGcrp4nHeKmgXHfgA87SMthsf+zb1b/lpSiH2HB/y4v8i2iRzLOz1a5rxTxUpkHkP0Z+X1m6AibvHd22/ia4uv59b5s3Fcw+h5h71vneTFA71Brv/HTTr5hJ+js74m3laycx3wDFdoS60IBlhv0qnf+HXge+URS3WsMCqdRLiVXoIBSzSV7Wx7KYiTYEuv1u4bJO6kwzxN4gWFverEU+xaFXi2GmwI71rVr078G6hsBCJaxuVwAZWN6sTvCu'+
			'PLQ5h/mUl2zhWVLSIayekShV0Kj5BO9YTpN/Tdh1iyc7kLjwl8PQx/Cntsy2zOdqx5OQx/k4nuWXjbzibLWOuBNcDsMnsPAzuNZZ6hY00ku1QXiU6Ai7S3WxxrXGKJNqvKMgs+rVDHxAtgUGDQwPsi+opReZmFR9+I+t9i00wzzTTTAP8BcrIsQTXfTZwAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._ht_info_image__img.ggOverSrc=hs;
		el.ggId="ht_info_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_info_image.style[domTransition]='';
				if (me._ht_info_image.ggCurrentLogicStateVisible == 0) {
					me._ht_info_image.style.visibility="hidden";
					me._ht_info_image.ggVisible=false;
				}
				else {
					me._ht_info_image.style.visibility=(Number(me._ht_info_image.style.opacity)>0||!me._ht_info_image.style.opacity)?'inherit':'hidden';
					me._ht_info_image.ggVisible=true;
				}
			}
		}
		me._ht_info_image.onmouseover=function (e) {
			me._ht_info_image__img.src=me._ht_info_image__img.ggOverSrc;
		}
		me._ht_info_image.onmouseout=function (e) {
			me._ht_info_image__img.src=me._ht_info_image__img.ggNormalSrc;
		}
		me._ht_info_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_info.appendChild(me._ht_info_image);
		el=me._tt_information=document.createElement('div');
		els=me._tt_information__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_information.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_information.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_information.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_information.style[domTransition]='left 0s, top 0s';
				if (me._tt_information.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_information.style.top='-47px';
					me._tt_information.ggUpdatePosition(true);
				}
				else {
					me._tt_information.ggDx=0;
					me._tt_information.style.top='24px';
					me._tt_information.ggUpdatePosition(true);
				}
			}
		}
		me._tt_information.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_information.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_information.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_information.style[domTransition]='left 0s, top 0s';
				if (me._tt_information.ggCurrentLogicStateVisible == 0) {
					me._tt_information.style.visibility=(Number(me._tt_information.style.opacity)>0||!me._tt_information.style.opacity)?'inherit':'hidden';
					me._tt_information.ggVisible=true;
				}
				else {
					me._tt_information.style.visibility="hidden";
					me._tt_information.ggVisible=false;
				}
			}
		}
		me._tt_information.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info.appendChild(me._tt_information);
		el=me._ht_info_customimage=document.createElement('div');
		els=me._ht_info_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_info_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_info_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_info_customimage.style[domTransition]='';
				if (me._ht_info_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_info_customimage.style.visibility="hidden";
					me._ht_info_customimage__img.src = '';
					me._ht_info_customimage.ggVisible=false;
				}
				else {
					me._ht_info_customimage.style.visibility=(Number(me._ht_info_customimage.style.opacity)>0||!me._ht_info_customimage.style.opacity)?'inherit':'hidden';
					me._ht_info_customimage.ggSubElement.src=me._ht_info_customimage.ggText;
					me._ht_info_customimage.ggVisible=true;
				}
			}
		}
		me._ht_info_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_info_customimage.clientWidth;
			var parentHeight = me._ht_info_customimage.clientHeight;
			var img = me._ht_info_customimage__img;
			var aspectRatioDiv = me._ht_info_customimage.clientWidth / me._ht_info_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_info.appendChild(me._ht_info_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_info;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 100px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 140px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_node.ggCurrentLogicStateVisible == 0) {
					me._ht_node.style.visibility="hidden";
					me._ht_node.ggVisible=false;
				}
				else {
					me._ht_node.style.visibility=(Number(me._ht_node.style.opacity)>0||!me._ht_node.style.opacity)?'inherit':'hidden';
					me._ht_node.ggVisible=true;
				}
			}
		}
		me._ht_node.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_node.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_node.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_node.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_node.ggCurrentLogicStateAlpha == 0) {
					me._ht_node.style.visibility=me._ht_node.ggVisible?'inherit':'hidden';
					me._ht_node.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_node.style.opacity == 0.0) { me._ht_node.style.visibility="hidden"; } }, 505);
					me._ht_node.style.opacity=0;
				}
			}
		}
		me._ht_node.onclick=function (e) {
			player.openNext(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			me._hotspot_preview.logicBlock_visible();
			me._tt_ht_node.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			me._hotspot_preview.logicBlock_visible();
			me._tt_ht_node.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ontouchend=function (e) {
			me.elementMouseOver['ht_node']=false;
			me._hotspot_preview.logicBlock_visible();
			me._tt_ht_node.logicBlock_visible();
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_visited=document.createElement('div');
		els=me._ht_node_visited__img=document.createElement('img');
		els.className='ggskin ggskin_ht_node_visited';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._ht_node_visited__img.ggOverSrc=hs;
		el.ggId="ht_node_visited";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._ht_node_visited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_visited.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._ht_node_visited.ggElementNodeId()) == true)) && 
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_visited.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_visited.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node_visited.style[domTransition]='';
				if (me._ht_node_visited.ggCurrentLogicStateVisible == 0) {
					me._ht_node_visited.style.visibility=(Number(me._ht_node_visited.style.opacity)>0||!me._ht_node_visited.style.opacity)?'inherit':'hidden';
					me._ht_node_visited.ggVisible=true;
				}
				else {
					me._ht_node_visited.style.visibility="hidden";
					me._ht_node_visited.ggVisible=false;
				}
			}
		}
		me._ht_node_visited.onmouseover=function (e) {
			me._ht_node_visited__img.src=me._ht_node_visited__img.ggOverSrc;
		}
		me._ht_node_visited.onmouseout=function (e) {
			me._ht_node_visited__img.src=me._ht_node_visited__img.ggNormalSrc;
		}
		me._ht_node_visited.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._ht_node_visited);
		el=me._ht_node_image=document.createElement('div');
		els=me._ht_node_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_node_image';
		hs=basePath + 'images/ht_node_image.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs=basePath + 'images/ht_node_image__o.png';
		me._ht_node_image__img.ggOverSrc=hs;
		el.ggId="ht_node_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._ht_node_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._ht_node_image.ggElementNodeId()) == true)) || 
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node_image.style[domTransition]='';
				if (me._ht_node_image.ggCurrentLogicStateVisible == 0) {
					me._ht_node_image.style.visibility="hidden";
					me._ht_node_image.ggVisible=false;
				}
				else {
					me._ht_node_image.style.visibility=(Number(me._ht_node_image.style.opacity)>0||!me._ht_node_image.style.opacity)?'inherit':'hidden';
					me._ht_node_image.ggVisible=true;
				}
			}
		}
		me._ht_node_image.onmouseover=function (e) {
			me._ht_node_image__img.src=me._ht_node_image__img.ggOverSrc;
		}
		me._ht_node_image.onmouseout=function (e) {
			me._ht_node_image__img.src=me._ht_node_image__img.ggNormalSrc;
		}
		me._ht_node_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._ht_node_image);
		el=me._ht_node_customimage=document.createElement('div');
		els=me._ht_node_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_node_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_node_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node_customimage.style[domTransition]='';
				if (me._ht_node_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_node_customimage.style.visibility="hidden";
					me._ht_node_customimage__img.src = '';
					me._ht_node_customimage.ggVisible=false;
				}
				else {
					me._ht_node_customimage.style.visibility=(Number(me._ht_node_customimage.style.opacity)>0||!me._ht_node_customimage.style.opacity)?'inherit':'hidden';
					me._ht_node_customimage.ggSubElement.src=me._ht_node_customimage.ggText;
					me._ht_node_customimage.ggVisible=true;
				}
			}
		}
		me._ht_node_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_node_customimage.clientWidth;
			var parentHeight = me._ht_node_customimage.clientHeight;
			var img = me._ht_node_customimage__img;
			var aspectRatioDiv = me._ht_node_customimage.clientWidth / me._ht_node_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_node.appendChild(me._ht_node_customimage);
		el=me._hotspot_preview=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -130px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((player.getVariableValue('opt_hotspot_preview') == true)) && 
				((player.getIsTour() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview.style[domTransition]='';
				if (me._hotspot_preview.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview.style.visibility=(Number(me._hotspot_preview.style.opacity)>0||!me._hotspot_preview.style.opacity)?'inherit':'hidden';
					me._hotspot_preview.ggVisible=true;
				}
				else {
					me._hotspot_preview.style.visibility="hidden";
					me._hotspot_preview.ggVisible=false;
				}
			}
		}
		me._hotspot_preview.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._ht_preview_picture_frame_=document.createElement('div');
		el.ggId="ht_preview_picture_frame ";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_preview_picture_frame_.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_preview_picture_frame_.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._hotspot_preview.appendChild(me._ht_preview_picture_frame_);
		el=me._ht_preview_nodeimage=document.createElement('div');
		els=me._ht_preview_nodeimage__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/ht_preview_nodeimage_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_preview_nodeImage";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._ht_preview_nodeimage.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._ht_preview_nodeimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._hotspot_preview.appendChild(me._ht_preview_nodeimage);
		el=me._ht_tooltip=document.createElement('div');
		els=me._ht_tooltip__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="ht_tooltip";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 5px;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 140px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.470588);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._ht_tooltip.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_tooltip.style[domTransition]='';
				if (me._ht_tooltip.ggCurrentLogicStateVisible == 0) {
					me._ht_tooltip.style.visibility="hidden";
					me._ht_tooltip.ggVisible=false;
				}
				else {
					me._ht_tooltip.style.visibility=(Number(me._ht_tooltip.style.opacity)>0||!me._ht_tooltip.style.opacity)?'inherit':'hidden';
					me._ht_tooltip.ggVisible=true;
				}
			}
		}
		me._ht_tooltip.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._hotspot_preview.appendChild(me._ht_tooltip);
		el=me._ht_checkmark_tick=document.createElement('div');
		els=me._ht_checkmark_tick__img=document.createElement('img');
		els.className='ggskin ggskin_ht_checkmark_tick';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACEklEQVRYhe3YTUgUYRzH8e+zL7pbprAYSS4VG8lqvlFbVCJt0AaGhXTQVZRc0YsFYkhEdMzq0KEXOqSHTiGBEN2iDiJIlyAI0VPo0djLXvQitNNBfNndaXxmZ55ZiPnd9nn57weefZ5nZ8DNfx6R8yk5s4DQwiWyAMwy0zext8GX072FO+6kKC/V+Q2eUijMxAVajQu0GseA4dABjlQFTM9zBBiqKOPLwzi/XnRy59opU3OVA4NlXj5NtBM9WsnBch+vB88y0H5Cer5SoNcjeH/3Im11h3Pa79+ol66hDCgEvLx9hq5Y4c15OlwlXUcZ8MHNBkYT+r+3zMamdB0lwOErJ5nsadbty2xskngyJ13Lt/8QqA0F6b5wjNpQkLmlNJ9/rvEnq+mOHYpHeD'+
			't8zhD3YzVjD1AIGO+I8riniYDfC8C961G+Lv4m+epbwVINxSNMj5xHiMJaxeDAYIk9QvAmFeN5f+sObjuJpho+jF3C592VqMAZAgHK/f/uvtpYw3hHVCkODJY4q2mMTH0HIHU5ojvm0a0GhICnyRYlOEOgDPJQwM+z3hbduXbgQOKY2Ua+m1+RLmoXDiTPQTNIO3Fg4qCWQdqNA5M3iRFSBQ6KuOr0kKpwIHnV5Wfv7u6KhZXhoEgg7CInPy6zkl6305QTS/9mspqmFAfuU531uECryd/Fs+i8AnMwCyX8bjdudPMXDCvX57nR+Q8AAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_checkmark_tick";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 20px;';
		hs+='position : absolute;';
		hs+='right : 7px;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_checkmark_tick.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_checkmark_tick.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._ht_checkmark_tick.ggElementNodeId()) == true)) || 
				((me._ht_checkmark_tick.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_checkmark_tick.style[domTransition]='';
				if (me._ht_checkmark_tick.ggCurrentLogicStateVisible == 0) {
					me._ht_checkmark_tick.style.visibility=(Number(me._ht_checkmark_tick.style.opacity)>0||!me._ht_checkmark_tick.style.opacity)?'inherit':'hidden';
					me._ht_checkmark_tick.ggVisible=true;
				}
				else {
					me._ht_checkmark_tick.style.visibility="hidden";
					me._ht_checkmark_tick.ggVisible=false;
				}
			}
		}
		me._ht_checkmark_tick.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview.appendChild(me._ht_checkmark_tick);
		me._ht_node.appendChild(me._hotspot_preview);
		el=me._tt_ht_node=document.createElement('div');
		els=me._tt_ht_node__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_node";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_node.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_node.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_node.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_node.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_node.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_node.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_node.style.top='-47px';
					me._tt_ht_node.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_node.ggDx=0;
					me._tt_ht_node.style.top='24px';
					me._tt_ht_node.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_node.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((me.hotspot.title != "")) && 
				((player.getIsTour() == false)) && 
				((player.getVariableValue('opt_hotspot_preview') == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((me.hotspot.title != "")) && 
				((player.getIsTour() == true)) && 
				((player.getVariableValue('opt_hotspot_preview') == false))
			)
			{
				newLogicStateVisible = 1;
			}
			else if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((me.hotspot.title != "")) && 
				((player.getIsTour() == false)) && 
				((player.getVariableValue('opt_hotspot_preview') == true)) && 
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 2;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_node.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_node.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_node.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_node.style.visibility=(Number(me._tt_ht_node.style.opacity)>0||!me._tt_ht_node.style.opacity)?'inherit':'hidden';
					me._tt_ht_node.ggVisible=true;
				}
				else if (me._tt_ht_node.ggCurrentLogicStateVisible == 1) {
					me._tt_ht_node.style.visibility=(Number(me._tt_ht_node.style.opacity)>0||!me._tt_ht_node.style.opacity)?'inherit':'hidden';
					me._tt_ht_node.ggVisible=true;
				}
				else if (me._tt_ht_node.ggCurrentLogicStateVisible == 2) {
					me._tt_ht_node.style.visibility=(Number(me._tt_ht_node.style.opacity)>0||!me._tt_ht_node.style.opacity)?'inherit':'hidden';
					me._tt_ht_node.ggVisible=true;
				}
				else {
					me._tt_ht_node.style.visibility="hidden";
					me._tt_ht_node.ggVisible=false;
				}
			}
		}
		me._tt_ht_node.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_node.appendChild(me._tt_ht_node);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_node;
	};
	function SkinHotspotClass_ht_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_url=document.createElement('div');
		el.ggId="ht_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_url.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_url.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_url.ggCurrentLogicStateVisible == 0) {
					me._ht_url.style.visibility="hidden";
					me._ht_url.ggVisible=false;
				}
				else {
					me._ht_url.style.visibility=(Number(me._ht_url.style.opacity)>0||!me._ht_url.style.opacity)?'inherit':'hidden';
					me._ht_url.ggVisible=true;
				}
			}
		}
		me._ht_url.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_url.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_url.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_url.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_url.ggCurrentLogicStateAlpha == 0) {
					me._ht_url.style.visibility=me._ht_url.ggVisible?'inherit':'hidden';
					me._ht_url.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_url.style.opacity == 0.0) { me._ht_url.style.visibility="hidden"; } }, 505);
					me._ht_url.style.opacity=0;
				}
			}
		}
		me._ht_url.onclick=function (e) {
			if (
				(
					((player.getVariableValue('opt_url') == true)) && 
					((player.getHasTouch() == false))
				)
			) {
				skin._web_page.ggText="<iframe src=\""+me.hotspot.url+"\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder= \"0\" ><\/iframe>";
				skin._web_page.ggTextDiv.innerHTML=skin._web_page.ggText;
				if (skin._web_page.ggUpdateText) {
					skin._web_page.ggUpdateText=function() {
						var hs="<iframe src=\""+me.hotspot.url+"\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder= \"0\" ><\/iframe>";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (skin._web_page.ggUpdatePosition) {
					skin._web_page.ggUpdatePosition();
				}
				skin._web_page.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('opt_url') == true)) && 
					((player.getHasTouch() == false))
				)
			) {
				player.setVariableValue('vis_website', true);
			}
			if (
				(
					((player.getVariableValue('opt_url') == false)) || 
					((player.getHasTouch() == true))
				)
			) {
				player.openUrl(me.hotspot.url,me.hotspot.target);
			}
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_url']=true;
			me._tt_ht_url.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_url']=false;
			me._tt_ht_url.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.ontouchend=function (e) {
			me.elementMouseOver['ht_url']=false;
			me._tt_ht_url.logicBlock_visible();
		}
		me._ht_url.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_url_image=document.createElement('div');
		els=me._ht_url_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_url_image';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._ht_url_image__img.ggOverSrc=hs;
		el.ggId="ht_url_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_url_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_url_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_url_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_url_image.style[domTransition]='';
				if (me._ht_url_image.ggCurrentLogicStateVisible == 0) {
					me._ht_url_image.style.visibility="hidden";
					me._ht_url_image.ggVisible=false;
				}
				else {
					me._ht_url_image.style.visibility=(Number(me._ht_url_image.style.opacity)>0||!me._ht_url_image.style.opacity)?'inherit':'hidden';
					me._ht_url_image.ggVisible=true;
				}
			}
		}
		me._ht_url_image.onmouseover=function (e) {
			me._ht_url_image__img.src=me._ht_url_image__img.ggOverSrc;
		}
		me._ht_url_image.onmouseout=function (e) {
			me._ht_url_image__img.src=me._ht_url_image__img.ggNormalSrc;
		}
		me._ht_url_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_url.appendChild(me._ht_url_image);
		el=me._tt_ht_url=document.createElement('div');
		els=me._tt_ht_url__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_url";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_url.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_url.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_url.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_url.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_url.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_url.style.top='-47px';
					me._tt_ht_url.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_url.ggDx=0;
					me._tt_ht_url.style.top='24px';
					me._tt_ht_url.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_url'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_url.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_url.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_url.style.visibility=(Number(me._tt_ht_url.style.opacity)>0||!me._tt_ht_url.style.opacity)?'inherit':'hidden';
					me._tt_ht_url.ggVisible=true;
				}
				else {
					me._tt_ht_url.style.visibility="hidden";
					me._tt_ht_url.ggVisible=false;
				}
			}
		}
		me._tt_ht_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_url.appendChild(me._tt_ht_url);
		el=me._ht_url_customimage=document.createElement('div');
		els=me._ht_url_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_url_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_url_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_url_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_url_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_url_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_url_customimage.style[domTransition]='';
				if (me._ht_url_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_url_customimage.style.visibility="hidden";
					me._ht_url_customimage__img.src = '';
					me._ht_url_customimage.ggVisible=false;
				}
				else {
					me._ht_url_customimage.style.visibility=(Number(me._ht_url_customimage.style.opacity)>0||!me._ht_url_customimage.style.opacity)?'inherit':'hidden';
					me._ht_url_customimage.ggSubElement.src=me._ht_url_customimage.ggText;
					me._ht_url_customimage.ggVisible=true;
				}
			}
		}
		me._ht_url_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_url_customimage.clientWidth;
			var parentHeight = me._ht_url_customimage.clientHeight;
			var img = me._ht_url_customimage__img;
			var aspectRatioDiv = me._ht_url_customimage.clientWidth / me._ht_url_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_url.appendChild(me._ht_url_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_url;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_video_youtube') {
			hotspot.skinid = 'ht_video_youtube';
			hsinst = new SkinHotspotClass_ht_video_youtube(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_youtube_changenode();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_configloaded();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_hastouch();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_video_vimeo') {
			hotspot.skinid = 'ht_video_vimeo';
			hsinst = new SkinHotspotClass_ht_video_vimeo(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_vimeo_changenode();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_configloaded();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_hastouch();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_video_url') {
			hotspot.skinid = 'ht_video_url';
			hsinst = new SkinHotspotClass_ht_video_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_url_changenode();;
			me.callChildLogicBlocksHotspot_ht_video_url_configloaded();;
			me.callChildLogicBlocksHotspot_ht_video_url_mouseover();;
			me.callChildLogicBlocksHotspot_ht_video_url_hastouch();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_video_file') {
			hotspot.skinid = 'ht_video_file';
			hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_file_changenode();;
			me.callChildLogicBlocksHotspot_ht_video_file_configloaded();;
			me.callChildLogicBlocksHotspot_ht_video_file_mouseover();;
			me.callChildLogicBlocksHotspot_ht_video_file_hastouch();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_image_changenode();;
			me.callChildLogicBlocksHotspot_ht_image_configloaded();;
			me.callChildLogicBlocksHotspot_ht_image_mouseover();;
			me.callChildLogicBlocksHotspot_ht_image_hastouch();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_changenode();;
			me.callChildLogicBlocksHotspot_ht_info_configloaded();;
			me.callChildLogicBlocksHotspot_ht_info_mouseover();;
			me.callChildLogicBlocksHotspot_ht_info_hastouch();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_changenode();;
			me.callChildLogicBlocksHotspot_ht_node_configloaded();;
			me.callChildLogicBlocksHotspot_ht_node_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_active();;
			me.callChildLogicBlocksHotspot_ht_node_changevisitednodes();;
			me.callChildLogicBlocksHotspot_ht_node_hastouch();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_timer();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_hotspot_preview();;
		} else
		{
			hotspot.skinid = 'ht_url';
			hsinst = new SkinHotspotClass_ht_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_url_changenode();;
			me.callChildLogicBlocksHotspot_ht_url_configloaded();;
			me.callChildLogicBlocksHotspot_ht_url_mouseover();;
			me.callChildLogicBlocksHotspot_ht_url_hastouch();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_timer();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				hotspotTemplates['ht_video_youtube'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				hotspotTemplates['ht_video_vimeo'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				hotspotTemplates['ht_video_url'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				hotspotTemplates['ht_video_file'][i] = null;
			}
		}
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				hotspotTemplates['ht_image'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				hotspotTemplates['ht_info'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				hotspotTemplates['ht_node'][i] = null;
			}
		}
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				hotspotTemplates['ht_url'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinCloner_thumbnail_cloner_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 96px; height: 62px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._thumbnail_nodeimage=document.createElement('div');
		els=me._thumbnail_nodeimage__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/ht_preview_nodeimage_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_nodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.64,sy:0.6 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._thumbnail_nodeimage.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._thumbnail_nodeimage.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._thumbnail_nodeimage);
		el=me._thumbnail_active=document.createElement('div');
		el.ggId="thumbnail_active";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_active.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me._thumbnail_active.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me.elementMouseOver['thumbnail_active'] == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._thumbnail_active.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._thumbnail_active.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._thumbnail_active.style[domTransition]='border-color 0s';
				if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 0) {
					me._thumbnail_active.style.borderColor="rgba(192,192,192,1)";
				}
				else if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 1) {
					me._thumbnail_active.style.borderColor="rgba(192,192,192,1)";
				}
				else {
					me._thumbnail_active.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._thumbnail_active.onclick=function (e) {
			if (
				(
					((me._thumbnail_active.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._thumbnail_active.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_active']=true;
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_title.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_title.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_title.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ggUpdatePosition=function (useTransition) {
		}
		el=me._checkmark_tick=document.createElement('div');
		els=me._checkmark_tick__img=document.createElement('img');
		els.className='ggskin ggskin_checkmark_tick';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAB30lEQVRYhe3YTyiDYRwH8O+7P7YVGQ6zzZ+aP1GLaZOa1FDatPyLi5OGHBSKkxIHpRxcFsqJG05u4qBIrVYOLspqSQvt8BbRRPK6aLb29u55t/exw97v6en3/Hk/vc/z1tMLyBEX5q/JMRjb1eREETVwOO79SCyp4q2xXQ0+NO//jgIA/fMtgIbEkiInEILIMLGRYWKTv7BCrQpH8x2Y6KyBgmHST/iNKv2QzKNWKnAw0w6PzYg+uxnN1XrM7F2B49LPpfbGGAbYHnfAYzPGa9M9dXBYSonmU4OtDFvhc1lS6u4mE9F8KrCp7losDVqzWkNy2ICjAps+O29fMMzCfxIiWofo8Fsri+FqNCDCxnB8/YjPr2/ecf32ChzMOnm/vmCYhXvtHM+xz+xhZY'+
			'UabI3bMdJWFa+Fnl4xtHGJm4eXFNThnBNqZeomiEUBAltpLtXhYrk7CQUA9cYinC66UK7XUkMJwhQMgwIVf7epRIedyVZqKEFYhI2ha/UM4egbb7+3xYz1URsVlCCMBLfgbaCCSgsjwdFAEcHE4KRCEcNIcFKiRMGEcFKjRMP4cDRQGcEScfuBeyooIIuLYoSNYdQfkNKSlPy982caGSY2f4c/auB+/7rkInc5eq6cPM4PzyzYJBCRwQsAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 19px;';
		hs+='position : absolute;';
		hs+='right : 2px;';
		hs+='top : 2px;';
		hs+='visibility : hidden;';
		hs+='width : 19px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._checkmark_tick.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick.ggElementNodeId()) == true)) || 
				((me._checkmark_tick.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick.style.visibility=(Number(me._checkmark_tick.style.opacity)>0||!me._checkmark_tick.style.opacity)?'inherit':'hidden';
					me._checkmark_tick.ggVisible=true;
				}
				else {
					me._checkmark_tick.style.visibility="hidden";
					me._checkmark_tick.ggVisible=false;
				}
			}
		}
		me._checkmark_tick.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._checkmark_tick.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._checkmark_tick.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._checkmark_tick.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._checkmark_tick.style.opacity == 0.0) { me._checkmark_tick.style.visibility="hidden"; } }, 505);
					me._checkmark_tick.style.opacity=0;
				}
				else {
					me._checkmark_tick.style.visibility=me._checkmark_tick.ggVisible?'inherit':'hidden';
					me._checkmark_tick.style.opacity=1;
				}
			}
		}
		me._checkmark_tick.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_active.appendChild(me._checkmark_tick);
		el=me._thumbnail_title=document.createElement('div');
		els=me._thumbnail_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="thumbnail_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 85px;';
		hs+='height: 51px;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.470588);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._thumbnail_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active'] == true)) && 
				((me.ggUserdata.title != "")) && 
				((player.getVariableValue('opt_thumbnail_tooltip') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_title.style[domTransition]='opacity 500ms ease 0ms';
				if (me._thumbnail_title.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_title.style.visibility=me._thumbnail_title.ggVisible?'inherit':'hidden';
					me._thumbnail_title.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_title.style.opacity == 0.0) { me._thumbnail_title.style.visibility="hidden"; } }, 505);
					me._thumbnail_title.style.opacity=0;
				}
			}
		}
		me._thumbnail_title.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_active.appendChild(me._thumbnail_title);
		me.__div.appendChild(me._thumbnail_active);
	};
	function SkinCloner_thumbnail_cloner_mobile_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 96px; height: 62px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._thumbnail_nodeimage_mobile=document.createElement('div');
		els=me._thumbnail_nodeimage_mobile__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/ht_preview_nodeimage_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_nodeImage_mobile";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.64,sy:0.6 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._thumbnail_nodeimage_mobile.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._thumbnail_nodeimage_mobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__div.appendChild(me._thumbnail_nodeimage_mobile);
		el=me._thumbnail_active_mobile=document.createElement('div');
		el.ggId="thumbnail_active_mobile";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_active_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_active_mobile.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me._thumbnail_active_mobile.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me.elementMouseOver['thumbnail_active_mobile'] == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._thumbnail_active_mobile.style[domTransition]='border-color 0s';
				if (me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor == 0) {
					me._thumbnail_active_mobile.style.borderColor="rgba(192,192,192,1)";
				}
				else if (me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor == 1) {
					me._thumbnail_active_mobile.style.borderColor="rgba(192,192,192,1)";
				}
				else {
					me._thumbnail_active_mobile.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._thumbnail_active_mobile.onclick=function (e) {
			if (
				(
					((me._thumbnail_active_mobile.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
			player.setVariableValue('vis_thumbnail_menu_mobile', false);
		}
		me._thumbnail_active_mobile.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_active_mobile']=true;
			me._checkmark_tick_mobile.logicBlock_alpha();
			me._thumbnail_title_mobile.logicBlock_alpha();
			me._thumbnail_active_mobile.logicBlock_bordercolor();
		}
		me._thumbnail_active_mobile.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_active_mobile']=false;
			me._checkmark_tick_mobile.logicBlock_alpha();
			me._thumbnail_title_mobile.logicBlock_alpha();
			me._thumbnail_active_mobile.logicBlock_bordercolor();
		}
		me._thumbnail_active_mobile.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_active_mobile']=false;
			me._checkmark_tick_mobile.logicBlock_alpha();
			me._thumbnail_title_mobile.logicBlock_alpha();
			me._thumbnail_active_mobile.logicBlock_bordercolor();
		}
		me._thumbnail_active_mobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._checkmark_tick_mobile=document.createElement('div');
		els=me._checkmark_tick_mobile__img=document.createElement('img');
		els.className='ggskin ggskin_checkmark_tick_mobile';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAB30lEQVRYhe3YTyiDYRwH8O+7P7YVGQ6zzZ+aP1GLaZOa1FDatPyLi5OGHBSKkxIHpRxcFsqJG05u4qBIrVYOLspqSQvt8BbRRPK6aLb29u55t/exw97v6en3/Hk/vc/z1tMLyBEX5q/JMRjb1eREETVwOO79SCyp4q2xXQ0+NO//jgIA/fMtgIbEkiInEILIMLGRYWKTv7BCrQpH8x2Y6KyBgmHST/iNKv2QzKNWKnAw0w6PzYg+uxnN1XrM7F2B49LPpfbGGAbYHnfAYzPGa9M9dXBYSonmU4OtDFvhc1lS6u4mE9F8KrCp7losDVqzWkNy2ICjAps+O29fMMzCfxIiWofo8Fsri+FqNCDCxnB8/YjPr2/ecf32ChzMOnm/vmCYhXvtHM+xz+xhZY'+
			'UabI3bMdJWFa+Fnl4xtHGJm4eXFNThnBNqZeomiEUBAltpLtXhYrk7CQUA9cYinC66UK7XUkMJwhQMgwIVf7epRIedyVZqKEFYhI2ha/UM4egbb7+3xYz1URsVlCCMBLfgbaCCSgsjwdFAEcHE4KRCEcNIcFKiRMGEcFKjRMP4cDRQGcEScfuBeyooIIuLYoSNYdQfkNKSlPy982caGSY2f4c/auB+/7rkInc5eq6cPM4PzyzYJBCRwQsAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_mobile";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 19px;';
		hs+='position : absolute;';
		hs+='right : 2px;';
		hs+='top : 2px;';
		hs+='visibility : hidden;';
		hs+='width : 19px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._checkmark_tick_mobile.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_mobile.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_mobile.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_mobile.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_mobile.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_mobile.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick_mobile.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_mobile.style.visibility=(Number(me._checkmark_tick_mobile.style.opacity)>0||!me._checkmark_tick_mobile.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_mobile.ggVisible=true;
				}
				else {
					me._checkmark_tick_mobile.style.visibility="hidden";
					me._checkmark_tick_mobile.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_mobile.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active_mobile'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._checkmark_tick_mobile.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._checkmark_tick_mobile.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._checkmark_tick_mobile.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick_mobile.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._checkmark_tick_mobile.style.opacity == 0.0) { me._checkmark_tick_mobile.style.visibility="hidden"; } }, 505);
					me._checkmark_tick_mobile.style.opacity=0;
				}
				else {
					me._checkmark_tick_mobile.style.visibility=me._checkmark_tick_mobile.ggVisible?'inherit':'hidden';
					me._checkmark_tick_mobile.style.opacity=1;
				}
			}
		}
		me._checkmark_tick_mobile.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_active_mobile.appendChild(me._checkmark_tick_mobile);
		el=me._thumbnail_title_mobile=document.createElement('div');
		els=me._thumbnail_title_mobile__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="thumbnail_title_mobile";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 85px;';
		hs+='height: 51px;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.470588);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._thumbnail_title_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_title_mobile.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active_mobile'] == true)) && 
				((me.ggUserdata.title != "")) && 
				((player.getVariableValue('opt_thumbnail_tooltip') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_title_mobile.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_title_mobile.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_title_mobile.style[domTransition]='opacity 500ms ease 0ms';
				if (me._thumbnail_title_mobile.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_title_mobile.style.visibility=me._thumbnail_title_mobile.ggVisible?'inherit':'hidden';
					me._thumbnail_title_mobile.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_title_mobile.style.opacity == 0.0) { me._thumbnail_title_mobile.style.visibility="hidden"; } }, 505);
					me._thumbnail_title_mobile.style.opacity=0;
				}
			}
		}
		me._thumbnail_title_mobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._thumbnail_active_mobile.appendChild(me._thumbnail_title_mobile);
		me.__div.appendChild(me._thumbnail_active_mobile);
	};
	function SkinCloner_node_cloner_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 140px; height: 100px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._node_image_cloner=document.createElement('div');
		els=me._node_image_cloner__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/node_image_cloner_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="node_Image_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_image_cloner.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._node_image_cloner.onclick=function (e) {
			if (
				(
					((me._node_image_cloner.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._node_image_cloner.onmouseover=function (e) {
			me.elementMouseOver['node_image_cloner']=true;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.onmouseout=function (e) {
			me.elementMouseOver['node_image_cloner']=false;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.ontouchend=function (e) {
			me.elementMouseOver['node_image_cloner']=false;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_title=document.createElement('div');
		els=me._node_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="node_title";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 1px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 136px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 136px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 1px 2px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._node_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_title.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._node_title.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._node_title.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._node_title.style[domTransition]='';
				if (me._node_title.ggCurrentLogicStateVisible == 0) {
					me._node_title.style.visibility="hidden";
					me._node_title.ggVisible=false;
				}
				else {
					me._node_title.style.visibility=(Number(me._node_title.style.opacity)>0||!me._node_title.style.opacity)?'inherit':'hidden';
					me._node_title.ggVisible=true;
				}
			}
		}
		me._node_title.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._node_image_cloner.appendChild(me._node_title);
		el=me._node_visited=document.createElement('div');
		el.ggId="node_visited";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 87px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 135px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_visited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_visited.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['node_image_cloner'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me._node_visited.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.nodeVisited(me._node_visited.ggElementNodeId()) == true))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._node_visited.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._node_visited.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._node_visited.style[domTransition]='border-color 0s';
				if (me._node_visited.ggCurrentLogicStateBorderColor == 0) {
					me._node_visited.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited.ggCurrentLogicStateBorderColor == 1) {
					me._node_visited.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited.ggCurrentLogicStateBorderColor == 2) {
					me._node_visited.style.borderColor="rgba(209,209,209,1)";
				}
				else {
					me._node_visited.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._node_visited.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._node_image_cloner.appendChild(me._node_visited);
		me.__div.appendChild(me._node_image_cloner);
	};
	function SkinCloner_category_cloner_Class(item, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggTag = item['tag'];
		me.ggTitle = item['title'];
		me.ggNodeCount = item['nodecount'];
		me.ggNodeId=item['firstnode'];
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 140px; height: 37px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.ggIsActive = function() {
			var tags = player.userdata.tags;
			if (tags.indexOf(me.ggTag) == -1) return false;
			for(var i=0;i<me.ggParent.ggCurrentFilter.length;i++) {
				if (tags.indexOf(me.ggParent.ggCurrentFilter[i])==-1) return false;
			}
			return true;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._category_text=document.createElement('div');
		els=me._category_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="category_text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 35px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 140px;';
		hs+='height: 35px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggTitle+" ("+me.ggNodeCount+")";
		el.appendChild(els);
		me._category_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._category_text.onclick=function (e) {
			skin._node_cloner.ggText=me.ggTag;
			if (skin._node_cloner.ggText=='') {
				skin._node_cloner.ggUpdate([]);
			} else {
				skin._node_cloner.ggUpdate(skin._node_cloner.ggText.split(','));
			}
			skin.updateSize(skin.divSkin);
			player.setVariableValue('node_visible', true);
		}
		me._category_text.ggActivate=function () {
			skin._node_cloner.ggText=me.ggTag;
			if (skin._node_cloner.ggText=='') {
				skin._node_cloner.ggUpdate([]);
			} else {
				skin._node_cloner.ggUpdate(skin._node_cloner.ggText.split(','));
			}
			skin.updateSize(skin.divSkin);
		}
		me._category_text.ggUpdatePosition=function (useTransition) {
		}
		me._category_text.ggNodeChange=function () {
			if (me._category_text.ggLastIsActive!=me._category_text.ggIsActive()) {
				me._category_text.ggLastIsActive=me._category_text.ggIsActive();
				if (me._category_text.ggIsActive()) {
					if (me._category_text.ggActivate) me._category_text.ggActivate();
				} else {
					if (me._category_text.ggDeactivate) me._category_text.ggDeactivate();
				}
			}
		}
		me.__div.appendChild(me._category_text);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._screentint.logicBlock_alpha();
	me._thumbnail_hide_button_show.logicBlock_alpha();
	me._thumbnail_show_button_show.logicBlock_alpha();
	me._thumbnail_menu.logicBlock_visible();
	me._thumbnail_menu.logicBlock_alpha();
	me._thumbnail_menu_mobile.logicBlock_visible();
	me._thumbnail_menu_mobile.logicBlock_alpha();
	me._loading_multires.logicBlock_visible();
	me._fullscreen.logicBlock_alpha();
	me._fullscreen_off.logicBlock_alpha();
	me._menu_button.logicBlock_position();
	me._controller.logicBlock_position();
	me._controller.logicBlock_alpha();
	me._controller_bg.logicBlock_position();
	me._controller_bg.logicBlock_size();
	me._controller_bg.logicBlock_visible();
	me._controller_slider.logicBlock_position();
	me._controller_slider.logicBlock_alpha();
	me._enter_vr.logicBlock_position();
	me._fullscreen_buttons.logicBlock_position();
	me._fullscreen_buttons.logicBlock_visible();
	me._gyro.logicBlock_position();
	me._gyro.logicBlock_visible();
	me._gyro_on.logicBlock_alpha();
	me._gyro_off.logicBlock_alpha();
	me._projection_buttons.logicBlock_position();
	me._projection_buttons.logicBlock_visible();
	me._thumbnail.logicBlock_position();
	me._thumbnail.logicBlock_visible();
	me._info.logicBlock_position();
	me._info.logicBlock_visible();
	me._autorotate_buttons.logicBlock_position();
	me._autorotate_buttons.logicBlock_visible();
	me._autorotate_start.logicBlock_alpha();
	me._autorotate_stop.logicBlock_alpha();
	me._zoomout.logicBlock_visible();
	me._zoomin.logicBlock_visible();
	me._thumbnail_menu.logicBlock_position();
	me._thumbnail_menu_mobile.logicBlock_position();
	me._loading.logicBlock_visible();
	me._web_page.logicBlock_visible();
	me._userdata.logicBlock_visible();
	me._information.logicBlock_visible();
	me._image_popup.logicBlock_visible();
	me._popup_image.logicBlock_visible();
	me._video_popup_file.logicBlock_visible();
	me._popup_video_file.logicBlock_visible();
	me._video_popup_controls_file.logicBlock_visible();
	me._video_popup_url.logicBlock_visible();
	me._popup_video_url.logicBlock_visible();
	me._video_popup_controls_url.logicBlock_visible();
	me._video_popup_vimeo.logicBlock_visible();
	me._popup_video_vimeo.logicBlock_visible();
	me._video_popup_youtube.logicBlock_visible();
	me._popup_video_youtube.logicBlock_visible();
	me.__360image_gyro.logicBlock_visible();
	me.__360image.logicBlock_position();
	me.__360image.logicBlock_scaling();
	me._phone2.logicBlock_scaling();
	me._phone3.logicBlock_scaling();
	me._close.logicBlock_visible();
	me._menu_background.logicBlock_alpha();
	me._node_scroller.logicBlock_alpha();
	me._category_scroller.logicBlock_alpha();
	me._menu_open.logicBlock_position();
	me._menu_open.logicBlock_alpha();
	me._rectilinear.logicBlock_alpha();
	me._fisheye.logicBlock_alpha();
	me._stereographic.logicBlock_alpha();
	me._enter_vr.logicBlock_visible();
	player.addListener('sizechanged', function(args) { me._screentint.logicBlock_alpha();me._thumbnail_hide_button_show.logicBlock_alpha();me._thumbnail_show_button_show.logicBlock_alpha();me._thumbnail_menu.logicBlock_visible();me._thumbnail_menu.logicBlock_alpha();me._thumbnail_menu_mobile.logicBlock_visible();me._thumbnail_menu_mobile.logicBlock_alpha(); });
	player.addListener('tilesready', function(args) { me._loading_multires.logicBlock_visible(); });
	player.addListener('tilesrequested', function(args) { me._loading_multires.logicBlock_visible(); });
	player.addListener('fullscreenenter', function(args) { me._fullscreen.logicBlock_alpha();me._fullscreen_off.logicBlock_alpha(); });
	player.addListener('fullscreenexit', function(args) { me._fullscreen.logicBlock_alpha();me._fullscreen_off.logicBlock_alpha(); });
	player.addListener('changenode', function(args) { me._menu_button.logicBlock_position();me._loading_multires.logicBlock_visible();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._controller.logicBlock_alpha();me._controller_bg.logicBlock_position();me._controller_bg.logicBlock_size();me._controller_bg.logicBlock_visible();me._controller_slider.logicBlock_position();me._controller_slider.logicBlock_alpha();me._enter_vr.logicBlock_position();me._fullscreen_buttons.logicBlock_position();me._fullscreen_buttons.logicBlock_visible();me._gyro.logicBlock_position();me._gyro.logicBlock_visible();me._gyro_on.logicBlock_alpha();me._gyro_off.logicBlock_alpha();me._projection_buttons.logicBlock_position();me._projection_buttons.logicBlock_visible();me._thumbnail.logicBlock_position();me._thumbnail.logicBlock_visible();me._thumbnail_hide_button_show.logicBlock_alpha();me._thumbnail_show_button_show.logicBlock_alpha();me._info.logicBlock_position();me._info.logicBlock_visible();me._autorotate_buttons.logicBlock_position();me._autorotate_buttons.logicBlock_visible();me._autorotate_start.logicBlock_alpha();me._autorotate_stop.logicBlock_alpha();me._zoomout.logicBlock_visible();me._zoomin.logicBlock_visible();me._thumbnail_menu.logicBlock_position();me._thumbnail_menu.logicBlock_visible();me._thumbnail_menu.logicBlock_alpha();me._thumbnail_menu_mobile.logicBlock_position();me._thumbnail_menu_mobile.logicBlock_visible();me._thumbnail_menu_mobile.logicBlock_alpha();me._loading.logicBlock_visible();me._web_page.logicBlock_visible();me._userdata.logicBlock_visible();me._information.logicBlock_visible();me._image_popup.logicBlock_visible();me._popup_image.logicBlock_visible();me._video_popup_file.logicBlock_visible();me._popup_video_file.logicBlock_visible();me._video_popup_controls_file.logicBlock_visible();me._video_popup_url.logicBlock_visible();me._popup_video_url.logicBlock_visible();me._video_popup_controls_url.logicBlock_visible();me._video_popup_vimeo.logicBlock_visible();me._popup_video_vimeo.logicBlock_visible();me._video_popup_youtube.logicBlock_visible();me._popup_video_youtube.logicBlock_visible();me.__360image_gyro.logicBlock_visible();me.__360image.logicBlock_position();me.__360image.logicBlock_scaling();me._phone2.logicBlock_scaling();me._phone3.logicBlock_scaling();me._close.logicBlock_visible();me._menu_background.logicBlock_alpha();me._node_scroller.logicBlock_alpha();me._category_scroller.logicBlock_alpha();me._menu_open.logicBlock_position();me._menu_open.logicBlock_alpha(); });
	player.addListener('configloaded', function(args) { me._fullscreen_buttons.logicBlock_visible();me._gyro.logicBlock_visible();me._thumbnail.logicBlock_visible();me._thumbnail_menu.logicBlock_visible();me._thumbnail_menu_mobile.logicBlock_visible();me.__360image_gyro.logicBlock_visible(); });
	player.addListener('projectionchanged', function(args) { me._rectilinear.logicBlock_alpha();me._fisheye.logicBlock_alpha();me._stereographic.logicBlock_alpha(); });
	player.addListener('autorotatechanged', function(args) { me._autorotate_start.logicBlock_alpha();me._autorotate_stop.logicBlock_alpha(); });
	player.addListener('gyroavailable', function(args) { me._gyro.logicBlock_visible(); });
	player.addListener('gyrochanged', function(args) { me._gyro_on.logicBlock_alpha();me._gyro_off.logicBlock_alpha(); });
	player.addListener('vrchanged', function(args) { me._enter_vr.logicBlock_visible(); });
	player.addListener('hastouch', function(args) { me.__360image_gyro.logicBlock_visible(); });
	player.addListener('varchanged_vis_userdata', function(args) { me._menu_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._thumbnail_menu_mobile.logicBlock_position();me._userdata.logicBlock_visible(); });
	player.addListener('varchanged_vis_image_popup', function(args) { me._menu_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._image_popup.logicBlock_visible();me._popup_image.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_info_popup', function(args) { me._menu_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._information.logicBlock_visible(); });
	player.addListener('varchanged_vis_video_popup_file', function(args) { me._menu_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._video_popup_file.logicBlock_visible();me._popup_video_file.logicBlock_visible();me._video_popup_controls_file.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_video_popup_url', function(args) { me._menu_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._video_popup_url.logicBlock_visible();me._popup_video_url.logicBlock_visible();me._video_popup_controls_url.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_video_popup_vimeo', function(args) { me._menu_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._video_popup_vimeo.logicBlock_visible();me._popup_video_vimeo.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_video_popup_youtube', function(args) { me._menu_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._video_popup_youtube.logicBlock_visible();me._popup_video_youtube.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_website', function(args) { me._menu_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._web_page.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_timer', function(args) { me._controller.logicBlock_alpha();me._controller_slider.logicBlock_alpha();me._thumbnail_menu.logicBlock_alpha();me._thumbnail_menu_mobile.logicBlock_alpha(); });
	player.addListener('varchanged_opt_loader_mulires', function(args) { me._loading_multires.logicBlock_visible(); });
	player.addListener('varchanged_vis_thumbnail_menu_mobile', function(args) { me._screentint.logicBlock_alpha();me._thumbnail_hide_button_show.logicBlock_alpha();me._thumbnail_show_button_show.logicBlock_alpha();me._thumbnail_menu_mobile.logicBlock_alpha(); });
	player.addListener('varchanged_vis_thumbnail_menu_auto_hide', function(args) { me._screentint.logicBlock_alpha();me._thumbnail_menu.logicBlock_alpha();me._thumbnail_menu_mobile.logicBlock_alpha(); });
	player.addListener('varchanged_opt_thumbnail', function(args) { me._thumbnail.logicBlock_visible();me._thumbnail_menu.logicBlock_visible();me._thumbnail_menu_mobile.logicBlock_visible(); });
	player.addListener('varchanged_vis_thumbnail_menu_show', function(args) { me._thumbnail_hide_button_show.logicBlock_alpha();me._thumbnail_show_button_show.logicBlock_alpha();me._thumbnail_menu.logicBlock_alpha(); });
	player.addListener('varchanged_opt_loader', function(args) { me._loading.logicBlock_visible(); });
	player.addListener('varchanged_opt_gyro', function(args) { me._gyro.logicBlock_visible();me.__360image_gyro.logicBlock_visible(); });
	player.addListener('varchanged_vis_360image_once', function(args) { me.__360image_gyro.logicBlock_visible(); });
	player.addListener('varchanged_category_visible', function(args) { me._menu_background.logicBlock_alpha();me._node_scroller.logicBlock_alpha();me._category_scroller.logicBlock_alpha();me._menu_open.logicBlock_position();me._menu_open.logicBlock_alpha(); });
	player.addListener('varchanged_pos_controller', function(args) { me._controller_bg.logicBlock_position();me._controller_bg.logicBlock_size();me._controller_bg.logicBlock_visible();me._controller_slider.logicBlock_position(); });
	player.addListener('varchanged_pos_360image', function(args) { me.__360image.logicBlock_position();me.__360image.logicBlock_scaling();me._phone2.logicBlock_scaling();me._phone3.logicBlock_scaling(); });
	player.addListener('varchanged_node_visible', function(args) { me._node_scroller.logicBlock_alpha();me._category_scroller.logicBlock_alpha(); });
	player.addListener('varchanged_pos_enter_vr', function(args) { me._enter_vr.logicBlock_position(); });
	player.addListener('varchanged_pos_fullscreen', function(args) { me._fullscreen_buttons.logicBlock_position(); });
	player.addListener('varchanged_opt_fullscreen', function(args) { me._fullscreen_buttons.logicBlock_visible(); });
	player.addListener('varchanged_pos_gyro', function(args) { me._gyro.logicBlock_position(); });
	player.addListener('varchanged_opt_projection', function(args) { me._projection_buttons.logicBlock_visible(); });
	player.addListener('varchanged_pos_projection', function(args) { me._projection_buttons.logicBlock_position(); });
	player.addListener('varchanged_pos_thumbnail', function(args) { me._thumbnail.logicBlock_position(); });
	player.addListener('varchanged_opt_info', function(args) { me._info.logicBlock_visible(); });
	player.addListener('varchanged_pos_information', function(args) { me._info.logicBlock_position(); });
	player.addListener('varchanged_opt_autorotate', function(args) { me._autorotate_buttons.logicBlock_visible(); });
	player.addListener('varchanged_pos_autorotate', function(args) { me._autorotate_buttons.logicBlock_position(); });
	player.addListener('varchanged_opt_zoom', function(args) { me._zoomout.logicBlock_visible();me._zoomin.logicBlock_visible(); });
	player.addListener('changenode', function(args) { me._thumbnail_cloner.callChildLogicBlocks_changenode();me._thumbnail_cloner_mobile.callChildLogicBlocks_changenode();me._node_cloner.callChildLogicBlocks_changenode(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover();me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover();me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover();me._node_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('changenode', function(args) { me._thumbnail_cloner.callChildLogicBlocks_active();me._thumbnail_cloner_mobile.callChildLogicBlocks_active();me._node_cloner.callChildLogicBlocks_active(); });
	player.addListener('changevisitednodes', function(args) { me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes();me._thumbnail_cloner_mobile.callChildLogicBlocks_changevisitednodes();me._node_cloner.callChildLogicBlocks_changevisitednodes(); });
	player.addListener('varchanged_opt_thumbnail_tooltip', function(args) { me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();me._thumbnail_cloner_mobile.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_changenode();me.callChildLogicBlocksHotspot_ht_video_vimeo_changenode();me.callChildLogicBlocksHotspot_ht_video_url_changenode();me.callChildLogicBlocksHotspot_ht_video_file_changenode();me.callChildLogicBlocksHotspot_ht_image_changenode();me.callChildLogicBlocksHotspot_ht_info_changenode();me.callChildLogicBlocksHotspot_ht_node_changenode();me.callChildLogicBlocksHotspot_ht_url_changenode(); });
	player.addListener('configloaded', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_configloaded();me.callChildLogicBlocksHotspot_ht_video_vimeo_configloaded();me.callChildLogicBlocksHotspot_ht_video_url_configloaded();me.callChildLogicBlocksHotspot_ht_video_file_configloaded();me.callChildLogicBlocksHotspot_ht_image_configloaded();me.callChildLogicBlocksHotspot_ht_info_configloaded();me.callChildLogicBlocksHotspot_ht_node_configloaded();me.callChildLogicBlocksHotspot_ht_url_configloaded(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover();me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover();me.callChildLogicBlocksHotspot_ht_video_url_mouseover();me.callChildLogicBlocksHotspot_ht_video_file_mouseover();me.callChildLogicBlocksHotspot_ht_image_mouseover();me.callChildLogicBlocksHotspot_ht_info_mouseover();me.callChildLogicBlocksHotspot_ht_node_mouseover();me.callChildLogicBlocksHotspot_ht_url_mouseover(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_active(); });
	player.addListener('changevisitednodes', function(args) { me.callChildLogicBlocksHotspot_ht_node_changevisitednodes(); });
	player.addListener('hastouch', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_hastouch();me.callChildLogicBlocksHotspot_ht_video_vimeo_hastouch();me.callChildLogicBlocksHotspot_ht_video_url_hastouch();me.callChildLogicBlocksHotspot_ht_video_file_hastouch();me.callChildLogicBlocksHotspot_ht_image_hastouch();me.callChildLogicBlocksHotspot_ht_info_hastouch();me.callChildLogicBlocksHotspot_ht_node_hastouch();me.callChildLogicBlocksHotspot_ht_url_hastouch(); });
	player.addListener('varchanged_vis_userdata', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_userdata(); });
	player.addListener('varchanged_vis_image_popup', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_image_popup(); });
	player.addListener('varchanged_vis_info_popup', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_info_popup(); });
	player.addListener('varchanged_vis_video_popup_file', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_file(); });
	player.addListener('varchanged_vis_video_popup_url', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_url(); });
	player.addListener('varchanged_vis_video_popup_vimeo', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_vimeo(); });
	player.addListener('varchanged_vis_video_popup_youtube', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_youtube(); });
	player.addListener('varchanged_vis_website', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_website(); });
	player.addListener('varchanged_vis_timer', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_timer(); });
	player.addListener('varchanged_opt_hotspot_preview', function(args) { me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_hotspot_preview(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	document.addEventListener('keydown', function(e) {
		var key = e.which || e.keyCode;
		me.skinKeyPressed = key;
	});
	document.addEventListener('keyup', function(e) {
		var key = e.which || e.keyCode;
		me.skinKeyPressed = 0;
	});
	me.skinTimerEvent();
};