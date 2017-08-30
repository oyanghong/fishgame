/**
 * Created by 1 on 2017/6/12.
 */
var aneObj=function () {
    this.x=[];      //起始点
    this.len=[];        //海葵的长度，也是终止点
};
aneObj.prototype.num=50;    //海葵的数量
aneObj.prototype.init=function () {
    for(var i=0;i<this.num;i++){
        //海葵的位置，随机产生
        //保证每一个海葵都应该有一个大小
        this.x[i]=16*i+Math.random()*20;
        this.len[i]=200+Math.random()*80;   //[200-280]
    }
};
aneObj.prototype.draw=function () {
    ctx2.save();
    //保证这一段代码对context的影响，只会在这一段，不会影响外面的
    ctx2.globalAlpha=0.5;
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";
    for(var i=0;i<this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.x[i],canHeight);
        ctx2.lineTo(this.x[i],canHeight-this.len[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};