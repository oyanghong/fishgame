/**
 * Created by 1 on 2017/7/6.
 */
/**
 * Created by 1 on 2017/6/12.
 */
var dustObj=function () {
    this.alive=[];  //是否存活，boolean
    this.x=[];
    this.y=[];
    this.l=[];      //控制果实的生长大小
    this.speed=[];  //速度
    this.pic=[];
};
dustObj.prototype.num=30;  //果实的总数量

dustObj.prototype.init=function () {
    for(var i=0;i<this.num;i++){
        this.alive[i]=true;
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.speed[i]=Math.random()*0.002+0.005;     //速度随机
        this.pic[i]=new Image();
        this.pic[i].src="images/dust0.png";
        //this.born(i);   //已开始都出生出来
    }
};
dustObj.prototype.born=function (i) {
    //随机找一个海葵
    var aneId=Math.floor(Math.random()*ane.num);    //可能有重叠的
    //找到海葵之后确定坐标
    this.x[i]=ane.x[aneId];
    this.y[i]=canHeight-ane.len[aneId];
    this.l[i]=0;
    this.alive[i]=true;

};

//监听一下果实的数量
function dustNum() {
    var num=0;  //存活的数量
    for(var i=0;i<dust.num;i++){
        if(dust.alive[i]){
            num++;
        }
    }

    if(num<15){
        senddust();
        return;
    }
}
//画果实
dustObj.prototype.draw=function () {
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            //是活着的，我们才画
            // if(this.dustType[i]=="blue"){
            //     var pic=this.blue;
            // }else {
            //     var pic=this.orange;
            // }
            var img=this.pic[i];
            if(this.l[i]<=14){
                //长大
                this.l[i]+=this.speed[i]*daltaTime;
            }else {
                //开始长出来
                this.y[i]-=this.speed[i]*daltaTime*7;
            }
            ctx2.drawImage(img,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            //如果超出屏幕，就死了
            if(this.y[i]<5){
                this.alive[i]=false;
            }
        }

    }
};

//加果实
function senddust() {
    for(var i=0;i<dust.num;i++){
        if(!dust.alive[i]){
            //哪个死了就哪个出生
            dust.born(i);
            return;
        }
    }
}
dustObj.prototype.dead=function (i) {
    dust.alive[i]=false;       //果实死掉
};
