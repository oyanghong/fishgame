/**
 * Created by 1 on 2017/6/12.
 */
var fruitObj=function () {
    this.alive=[];  //是否存活，boolean
    this.x=[];
    this.y=[];
    this.l=[];      //控制果实的生长大小
    this.speed=[];  //速度
    this.fruitType=[];  //果实的类型，蓝色和黄色
    this.orange=new Image();
    this.blue=new Image;
};
fruitObj.prototype.num=30;  //果实的总数量

fruitObj.prototype.init=function () {
    for(var i=0;i<this.num;i++){
        this.alive[i]=true;
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.speed[i]=Math.random()*0.02+0.005;     //速度随机
        this.fruitType[i]="";
        //this.born(i);   //已开始都出生出来
    }
    this.orange.src="images/fruit.png";
    this.blue.src="images/blue.png";
};
fruitObj.prototype.born=function (i) {
    //随机找一个海葵
    var aneId=Math.floor(Math.random()*ane.num);    //可能有重叠的
    //找到海葵之后确定坐标
    this.x[i]=ane.x[aneId];
    this.y[i]=canHeight-ane.len[aneId];
    this.l[i]=0;
    this.alive[i]=true;

    //随机产生黄色和蓝色
    var ran=Math.random();
    if(ran<0.15){
        this.fruitType[i]="blue";
    }else {
        this.fruitType[i]="orange";
    }
};

//监听一下果实的数量
function fruitNum() {
    var num=0;  //存活的数量
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]){
            num++;
        }
    }

    if(num<15){
        sendFruit();
        return;
    }
}
//画果实
fruitObj.prototype.draw=function () {
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            //是活着的，我们才画
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else {
                var pic=this.orange;
            }
            if(this.l[i]<=14){
                //长大
                this.l[i]+=this.speed[i]*daltaTime;
            }else {
                //开始长出来
                this.y[i]-=this.speed[i]*daltaTime*7;
            }
            ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            //如果超出屏幕，就死了
            if(this.y[i]<5){
                this.alive[i]=false;
            }
        }

    }
};

//加果实
function sendFruit() {
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            //哪个死了就哪个出生
            fruit.born(i);
            return;
        }
    }
}
fruitObj.prototype.dead=function (i) {
    fruit.alive[i]=false;       //果实死掉
};