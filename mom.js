/**
 * Created by 1 on 2017/6/14.
 */
var momobj=function () {
    this.x=0;
    this.y=0;         //鱼妈妈在canvas里面的位置
    this.angle;     //角度

    this.bigBody=new Image();
    this.momBodyCount=0;

    //鱼尾巴的定时器
    this.momTailTimer=0;
    this.momTailCount=0;
    //鱼眼睛
    this.momEyeTimer=0;
    this.momEyeCount=0;
    this.momEyet=1000;
};

momobj.prototype.init=function(){
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;   //出现在中间

    this.angle=0;
    // this.bigEye.src="images/bigEye0.png";
    // this.bigBody.src="images/bigSwim0.png";
    // this.bigTail.src="images/bigTail0.png";
};

momobj.prototype.draw=function () {
    //计算通过速率计算，得到的x，y的坐标
    this.x=lerpDistance(mx,this.x,0.95);
    this.y=lerpDistance(my,this.y,0.95);
    var lx=mx-this.x;
    var ly=my-this.y;
    var beta=Math.atan2(ly,lx)+Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.6);
    //鱼尾巴
    this.momTailTimer+=daltaTime;
    //不能无限制的累加
    if(this.momTailTimer>50){
        this.momTailCount=(this.momTailCount+1)%8;
        this.momTailTimer%=50;      //自循环，50为循环一次的时间
    }
    var momTailCount=this.momTailCount;
    //鱼眼睛
    this.momEyeTimer+=daltaTime;
    if(this.momEyeTimer>this.momEyet){
        //至少保证，1秒钟眼睛眨一下
        this.momEyeCount=(this.momEyeCount+1)%2;
        this.momEyeTimer%=this.momEyet;
        //鱼的眼睛发生变化之后，应该立即变换   为了营造和现实生活中一样的情况
        if(this.momEyeCount=0){
            //睁开眼睛
            this.momEyet=Math.random()*1000+2000;
        }else {
            //闭眼
            this.momEyet=200;
        }
    }
    var momEyeCount=this.momEyeCount;
    var momBodyCount=this.momBodyCount;
    //首先，我们看出来位置很乱  -》想办法所有的图片位置归一  -》移动到哪里
    ctx1.save();
    ctx1.translate(this.x,this.y);      //现在鱼的位置在左上角，鱼的初始位置多少移多少
    ctx1.rotate(this.angle);


    ctx1.drawImage(mombodyorange[momBodyCount],-mombodyorange[momBodyCount].width*0.5,-mombodyorange[momBodyCount].height*0.5);
    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
    ctx1.restore();
};
