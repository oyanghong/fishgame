/**
 * Created by 1 on 2017/6/12.
 */
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;
var ane;
var fruit;
var mom;
var son;
var data;
var bgPic=new Image();
var mx=0;
var my=0;

var babyTail=[];
var babyBody=[];
var babyEye=[];

var momTail=[];
var momEye=[];
var mombodyorange=[];
var mombodyblue=[];
var best=0;
var dust;
localStorage.getItem("best");


document.body.onload=game;        //游戏初始化


function game() {
    //游戏初始化
    init();
    //计算时间
    lastTime=Date.now();
    gameLoop();     //这个里面专门放需要循环的东西
}
function init() {
    can1=document.getElementById("canvas1");
    can2=document.getElementById("canvas2");
    can1.onmousemove=function (e) {
        //兼容
        mx=e.offsetX==undefined?e.layerX:e.offsetX;
        my=e.offsetY==undefined?e.layerY:e.offsetY;
    };

    ctx1=can1.getContext("2d");
    ctx2=can2.getContext("2d");

    canWidth=can1.width;
    canHeight=can1.height;

    //创建img对象

    bgPic.src="images/background.jpg";
    //因为图片加载是需要时间的，因此我们一般在图片加载完成之后再画出来

    ane=new aneObj();
    ane.init();

    fruit=new fruitObj();
    fruit.init();
    dust=new dustObj();
    dust.init();
    mom=new momobj;
    mom.init();
    son=new sonobj;
    son.init();
    data=new dataObj();
    for(var i=0;i<2;i++){
        var img=new Image();
        img.src="images/babyEye"+i+".png";
        this.babyEye.push(img);

        //大鱼的
        momEye[i]=new Image();
        momEye[i].src="images/bigEye"+i+".png";
    }
    for(var i=0;i<8;i++){
        var img=new Image();
        img.src="images/babyTail"+i+".png";
        this.babyTail.push(img);

        //大鱼的
        momTail[i]=new Image();
        momTail[i].src="images/bigTail"+i+".png";
    }
    for(var i=0;i<20;i++){
        var img=new Image();
        img.src="images/babyFade"+i+".png";
        this.babyBody.push(img);
    }
    for(var i=0;i<8;i++){
        mombodyorange[i]=new Image();
        mombodyorange[i].src="images/bigSwim"+i+".png";
        mombodyblue[i]=new Image();
        mombodyblue[i].src="images/bigSwimBlue"+i+".png";
    }

}

function gameLoop() {
    //先智能计算游戏帧
    window.requestAnimationFrame(gameLoop);
    var now=Date.now();
    daltaTime=now-lastTime;     //时间差

    lastTime=now;
    // console.log(daltaTime);

    //你要画那个图片    从x，y开始画    画多大
    ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
    fruitNum();
    dustNum();
    ane.draw();
    fruit.draw();
    dust.draw();
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    son.draw();
    data.draw();
    momFruitCollison();
    momBabyCollision();
    gameover();
}