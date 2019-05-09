"use strict";for(var blockWidth=101,blockHeight=83,numEndBlocks=5,numStartBlocks=5,levelDesign=[[numEndBlocks,"water"],[3,"grass"],[3,"stone"],[1,"grass"],[2,"stone"],[1,"grass"],[1,"stone"],[numStartBlocks,"grass"]],rowImages=[],_i=0,_levelDesign=levelDesign;_i<_levelDesign.length;_i++){rows=_levelDesign[_i];for(var row=0;row<rows[0];row++)rowImages.push(rows[1])}var allGems,numRows=rowImages.length,numCols=5,areaWidth=blockWidth*numCols,areaHeight=blockHeight*numRows,allEnemies=[],allRocks=[new Rock(2,14),new Rock(1,11),new Rock(1,6),new Rock(1,7),new Rock(3,6),new Rock(3,7)],player=new Player,goal=new Goal(2,numEndBlocks);function makeEnemies(){allEnemies.length=0;for(var e=numEndBlocks;e<rowImages.length;e++)"stone"==rowImages[e]&&allEnemies.push(new Enemy(-1,e,300*Math.random()+50))}function makeGems(){allGems=[new Gem(4,14),new Gem(0,14),new Gem(0,11),new Gem(4,11),new Gem(1,5),new Gem(3,5)]}function makeBoundingRocks(){for(var e=0;e<numCols;e++)allRocks.push(new Rock(e,numRows-3))}makeEnemies(),makeBoundingRocks(),makeGems(),function(){var e,t=4*blockHeight+36;setCameraToPlayer=function(){e=getNewPosition(),ctx.translate(0,e)},cameraFollowPlayer=function(){newYTranslation=getNewPosition(),yDiff=newYTranslation-e,yDiffTranslation=yDiff/blockHeight,e+=yDiffTranslation,ctx.translate(0,yDiffTranslation)},getNewPosition=function(){return-player.y-t+canvasHeight/scale},getYTranslation=function(){return e}}();var Engine=function(e){var t,n=document,o=window,i=n.createElement("canvas"),r=i.getContext("2d");spaceAboveImage=50,spaceBelowImage=60,restOfBlock=171-blockHeight-spaceAboveImage-spaceBelowImage,e.ctx=r,imagesURLs={stone:"images/stone-block.png",water:"images/water-block.png",grass:"images/grass-block.png"};var a=blockWidth*numCols;n.body.appendChild(i);var s=document.querySelector("main");function l(){i.height=o.innerHeight,o.innerWidth>a?(o.innerHeight>o.innerWidth?s.style.display="none":s.style.display="flex",i.width=.625*i.height):(s.style.display="none",i.width=o.innerWidth),e.canvasHeight=i.height,scale=i.width/a,r.scale(scale,scale),setCameraToPlayer()}function c(){var e=Date.now();!function(e){!function(t){allEnemies.forEach(function(e){e.update(t)}),player.update(t)}(e)}((e-t)/1e3),cameraFollowPlayer(),function(){r.clearRect(-blockWidth,0,i.width+2*blockWidth,i.height);for(var e=0;e<numRows;e++)for(var t=0;t<numCols;t++)r.drawImage(Resources.get(imagesURLs[rowImages[e]]),t*blockWidth,e*blockHeight-spaceAboveImage);allEnemies.forEach(function(e){e.render()}),allRocks.forEach(function(e){e.render()}),allGems.forEach(function(e){e.render()}),goal.render(),player.render(),UIRender()}(),t=e,o.requestAnimationFrame(c)}(o.onresize=l)(),Resources.load(["images/stone-block.png","images/water-block.png","images/grass-block.png","images/enemy-bug.png","images/char-horn-girl.png","images/Gem Orange.png","images/Selector.png","images/Rock.png"]),Resources.onReady(function(){t=Date.now(),c()})}(void 0);function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var yImageRenderOffset=70,Entity=function e(t,n){_classCallCheck(this,e),this.x=t*blockWidth,this.y=n*blockHeight},Goal=function(e){function n(e,t){return _classCallCheck(this,n),_possibleConstructorReturn(this,_getPrototypeOf(n).call(this,e,t))}return _inherits(n,Entity),_createClass(n,[{key:"render",value:function(){ctx.drawImage(Resources.get(sprites.goal),this.x,this.y-yImageRenderOffset-20),ctx.font=blockWidth/3.4+"px Comic Sans MS",ctx.fillStyle="white",ctx.fillText("Use mouse arrows or swipe to move",5,areaHeight-blockHeight-25),ctx.fillText("Avoid bugs and water",blockWidth+3,areaHeight-25)}}]),n}(),Rock=function(e){function n(e,t){return _classCallCheck(this,n),_possibleConstructorReturn(this,_getPrototypeOf(n).call(this,e,t))}return _inherits(n,Entity),_createClass(n,[{key:"render",value:function(){ctx.drawImage(Resources.get(sprites.rock),this.x,this.y-yImageRenderOffset)}}]),n}(),Gem=function(e){function n(e,t){return _classCallCheck(this,n),_possibleConstructorReturn(this,_getPrototypeOf(n).call(this,e,t))}return _inherits(n,Entity),_createClass(n,[{key:"render",value:function(){ctx.drawImage(Resources.get(sprites.gem),this.x+22,this.y-22,101/1.75,171/1.75)}}]),n}(),Enemy=function(e){function i(e,t,n){var o;return _classCallCheck(this,i),(o=_possibleConstructorReturn(this,_getPrototypeOf(i).call(this,e,t))).speed=n,o}return _inherits(i,Entity),_createClass(i,[{key:"update",value:function(e){this.x+=this.speed*e,this.x>areaWidth&&(this.x=-blockWidth),this.checkCollision()}},{key:"checkCollision",value:function(){this.x<player.Collider.x+player.Collider.width&&this.x+blockWidth>player.Collider.x&&this.y<player.y+blockHeight&&this.y+blockHeight>player.y&&(lost(),player.moveToStart())}},{key:"render",value:function(){ctx.drawImage(Resources.get(sprites.enemy),this.x,this.y-yImageRenderOffset)}}]),i}(),Player=function(e){function t(){var e;return _classCallCheck(this,t),(e=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this,0,0))).moveToStart(),e.clearDirection(),e.setCollider(),e}return _inherits(t,Entity),_createClass(t,[{key:"setCollider",value:function(){this.Collider={x:this.x+25,width:blockWidth-48}}},{key:"update",value:function(){if(0!=this.direction.x||0!=this.direction.y){var e={x:this.x+this.direction.x*blockWidth,y:this.y+this.direction.y*blockHeight};t.hitsGem(e),t.reachesGoal(e)?this.moveToStart():t.hitsWater(e.y)?this.moveToStart():!t.hitsRock(e)&&t.withinGameArea(e)?this.move(e.x,e.y):this.clearDirection()}}},{key:"moveToStart",value:function(){this.move(2*blockWidth,(numRows-numStartBlocks+1)*blockHeight)}},{key:"move",value:function(e,t){this.x=e,this.y=t,this.setCollider(),this.clearDirection()}},{key:"clearDirection",value:function(){this.direction={x:0,y:0}}},{key:"render",value:function(){ctx.drawImage(Resources.get(sprites.player),this.x,this.y-yImageRenderOffset)}},{key:"handleInput",value:function(e){switch(e){case"left":this.direction.x=-1;break;case"right":this.direction.x=1;break;case"up":this.direction.y=-1;break;case"down":this.direction.y=1}}}]),t}(),sprites={player:"images/char-horn-girl.png",enemy:"images/enemy-bug.png",rock:"images/Rock.png",gem:"images/Gem Orange.png",goal:"images/Selector.png"};Player.initialPosition=4,Player.reachesGoal=function(e){var t=e.x,n=e.y;return t==goal.x&&n==goal.y},Player.hitsWater=function(e){return e<numEndBlocks*blockHeight&&(lost(),!0)},Player.withinGameArea=function(e){var t=e.x,n=e.y;return 0<=t&&t<areaWidth&&n<areaHeight},Player.hitsRock=function(e){var t=e.x,n=e.y,o=!0,i=!1,r=void 0;try{for(var a,s=allRocks[Symbol.iterator]();!(o=(a=s.next()).done);o=!0)if(rock=a.value,t==rock.x&&n==rock.y)return!0}catch(e){i=!0,r=e}finally{try{o||null==s.return||s.return()}finally{if(i)throw r}}return!1},Player.hitsGem=function(e){for(var t=e.x,n=e.y,o=0;o<allGems.length;o++)t==allGems[o].x&&n==allGems[o].y&&(allGems.splice(o,1),gemCollected())},function(){var i,r;document.addEventListener("keyup",function(e){e.preventDefault();player.handleInput({37:"left",38:"up",39:"right",40:"down"}[e.keyCode])});var a;document.addEventListener("touchstart",function(e){i=e.touches[0].clientX,r=e.touches[0].clientY,a=(new Date).getTime(),e.preventDefault()},{passive:!1}),document.addEventListener("touchmove",function(e){e.preventDefault()},{passive:!1}),document.addEventListener("touchend",function(e){var t=e.changedTouches[0].clientX-i,n=e.changedTouches[0].clientY-r,o="";(new Date).getTime()-a<=300&&(Math.abs(t)>Math.abs(n)?o=t<0?"left":"right":Math.abs(n)>=Math.abs(t)&&(o=n<0?"up":"down")),player.handleInput(o),e.preventDefault()},{passive:!1})}(),function(){var n={},o=[];function t(e){if(n[e])return n[e];var t=new Image;t.onload=function(){n[e]=t,i()&&o.forEach(function(e){e()})},n[e]=!1,t.src=e}function i(){var e=!0;for(var t in n)n.hasOwnProperty(t)&&!n[t]&&(e=!1);return e}window.Resources={load:function(e){e instanceof Array?e.forEach(function(e){t(e)}):t(e)},get:function(e){return n[e]},onReady:function(e){o.push(e)},isReady:i}}(),function(){var e=0,t=0;gemCollected=function(){e++},lost=function(){t++},UIRender=function(){ctx.font=blockWidth/3+"px Comic Sans MS",ctx.fillStyle="black",ctx.fillText("Gems  "+e,5,60-getYTranslation()),ctx.fillText("Loses  "+t,310,60-getYTranslation())}}();