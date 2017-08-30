/**
 * Created by 1 on 2017/7/1.
 */
var dataObj=function () {
    this.fruiNum=0;     //记录吃了的果实
    this.double=1;      //积分的倍数   吃了蓝色的果实，积分*2
    this.score=0;          //分数
    this.gameOver=false;        //是否游戏结束
    this.alpha=0;       //美观   透明度
};

dataObj.prototype.reset=function () {
    this.fruiNum=0;
    this.double=1;
};

dataObj.prototype.addScore=function () {
    this.score+=this.fruiNum*100*this.double;
};

//画到canvas里面去
dataObj.prototype.draw=function () {
    var w=can1.width;
    var h=can1.height;

    ctx1.save();
    ctx1.font="30px 宋体";
    ctx1.textAlign="center";
    //阴影
    ctx1.shadowBlur=10;
    ctx1.shadowColor="white";
    ctx1.fillStyle="white";
    ctx1.fillText("SCORE:"+this.score,w*0.5,h-20);
    if(this.score>localStorage.getItem("best")){
        localStorage.setItem("best",this.score);
    }
    ctx1.fillText("THE BEST:"+localStorage.getItem("best"),w*0.5,h-50);
    ctx1.restore();
};