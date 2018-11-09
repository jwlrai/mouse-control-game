
var mv = {
    length      : 440,
    status      : 'play',
    gameStart   : null,
    clickFlg    : false,
    score       : 0,
    levels      : {
                    normal:2000,
                    hard:1300,
                    superhard:500
                  },    
    parentElement : document.getElementById('playField'),

    getPosition:function () {
        return Math.floor(Math.random() * (this.length - 1)) ;
    },
    changeLevel:function(){
        if(this.gameStart!=null){
            var levelTime = this.levels[document.getElementById('level').selectedOptions[0].value.toLowerCase() ];
            clearInterval( this.gameStart);
            this.startDestoryingBox(levelTime);
        }
    },
    clicked:function(){
        this.clickFlg = true;
        this.score++;
        this.destoryBox();
        this.updateScore();         
        this.createBox();  
       
    },
    startDestoryingBox:function(interval){
        var ths = this;
        this.gameStart = setInterval(function(){
                ths.destoryBox();
                ths.createBox();
        }, interval);
    },
    destoryBox:function(){
        if(this.parentElement.children[0]!=null){
            this.parentElement.children[0].remove();
        }
    },
    createBox:function(){
        
        this.parentElement.innerHTML = `<div onClick="mv.clicked()" style="top:${this.getPosition()}px;left:${this.getPosition()}px;" class="bx" ></div>`;
    },
    updateScore:function(){
        document.getElementById('score').textContent = this.score;
    },
    missClicked:function(){
        if(this.gameStart !== null){
            if( this.clickFlg == false){
                if(this.score > 0){
                    this.score--;
                    this.updateScore();
                }               
            }else{
                this.clickFlg = false;
            }
        }
    },
    startStopPlay:function(e){
        if(e.target.textContent.toLowerCase()=='start'){
            var levelTime = this.levels[document.getElementById('level').selectedOptions[0].value.toLowerCase() ];           
            this.startDestoryingBox(levelTime);
            this.status = 'play';
            e.target.textContent = 'Stop';
        }
        else if(e.target.textContent.toLowerCase()=='stop'){
            this.score = 0;
            this.updateScore();
            this.status = 'stop';
            e.target.textContent = 'Start';
            clearInterval( this.gameStart);
            this.destoryBox();
            this.parentElement.innerHTML = '<p>Try to click on red box to score more</p>';
            
        }
    }
}

