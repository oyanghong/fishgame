/**
 * Created by 1 on 2017/6/14.
 */
var sonobj=function () {
    this.x;
    this.y;         //鱼妈妈在canvas里面的位置
    this.angle;     //角度
    // this.sonEye=new Image();
    // this.sonBody=new Image();
    // this.sonTail=new Image();
    //鱼尾巴的定时器
    this.babyTailTimer=0;
    this.babyTailCount=0;
    //鱼眼睛
    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    this.babyEyet=1000;
    //鱼身体
    this.babyBodyTimer=0;
    this.babyBodyCount=0;

    this.babyTail=[];
    this.babyBody=[];
    this.babyEye=[];
};

sonobj.prototype.init=function(){
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;   //出现在中间

    this.angle=0;
    // for(var i=0;i<2;i++){
    //     var img=new Image();
    //     img.src="images/babyEye"+i+".png";
    //     this.babyEye.push(img);
    // }
    // for(var i=0;i<8;i++){
    //     var img=new Image();
    //     img.src="images/babyTail"+i+".png";
    //     this.babyEye.push(img);
    // }
    // for(var i=0;i<20;i++){
    //     var img=new Image();
    //     img.src="images/babyFade"+i+".png";
    //     this.babyEye.push(img);
    // }
    // this.sonEye.src="images/babyEye0.png";
    // this.sonBody.src="images/babyFade0.png";
    // this.sonTail.src="images/babyTail0.png";
};

sonobj.prototype.draw=function () {
    //计算通过速率计算，得到的x，y的坐标
    this.x=lerpDistance(mom.x,this.x,0.95);
    this.y=lerpDistance(mom.y,this.y,0.95);
    var lx=mom.x-this.x;
    var ly=mom.y-this.y;
    var beta=Math.atan2(ly,lx)+Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.6);

    //添加代码
    this.babyTailTimer+=daltaTime;
    //不能无限制的累加
    if(this.babyTailTimer>50){
        this.babyTailCount=(this.babyTailCount+1)%8;
        this.babyTailTimer%=50
    }
    var babyTailCount=this.babyTailCount;
    //鱼眼睛
    this.babyEyeTimer+=daltaTime;
    if(this.babyEyeTimer>this.babyEyet){
        //至少保证，1秒钟眼睛眨一下
        this.babyEyeCount=(this.babyEyeCount+1)%2;
        this.babyTailTimer%=this.babyEyet;
        //鱼的眼睛发生变化之后应该立即变换
        if(this.babyEyeCount==0){
            //睁开眼睛
            this.babyEyet=Math.random()*1000+2000;
        }else {
            //闭眼
            this.babyEyet=200;
        }
    }
    var babyEyeCount=this.babyEyeCount;

    //鱼身体
    this.babyBodyTimer+=daltaTime;
    if(this.babyBodyTimer>300){
        //这个地方不需要循环，因此从出生到死亡就是一个过程
        this.babyBodyCount=this.babyBodyCount+1;
        this.babyBodyTimer%=300;
        if(this.babyBodyCount>19){
            //意味着死亡，游戏结束
            this.babyBodyCount=19;
        }
    }
    var babyBodyCount=this.babyBodyCount;

    //首先，我们看出来位置很乱  -》想办法所有的图片位置归一  -》移动到哪里
    ctx1.save();
    ctx1.translate(this.x,this.y);      //现在鱼的位置在左上角，鱼的初始位置多少移多少
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+20,-babyTail[babyTailCount].height*0.5);
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
    ctx1.restore();
};
