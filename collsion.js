/**
 * Created by 1 on 2017/6/14.
 */
var myflag=true;
var a=document.getElementsByTagName("a")[0];
// console.log(a);
function momFruitCollison() {
    if(myflag==true){
        for(var i=0;i<fruit.num;i++){
            if(fruit.alive[i]){
                var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
                if(l<900){
                    //果实被吃掉
                    fruit.dead(i);
                    mom.momBodyCount++;
                    data.fruiNum++;
                    if(fruit.fruitType[i]=="blue"){
                        this.double=2;
                        //console.log(1);
                        // ctx1.drawImage(mombodyblue[mom.momBodyCount],-mombodyblue[mom.momBodyCount].width*0.5,-mombodyblue[mom.momBodyCount].height*0.5);
                    }else {
                        // console.log(2);
                        // ctx1.drawImage(mombodyorange[mom.momBodyCount],-mombodyorange[mom.momBodyCount].width*0.5,-mombodyorange[mom.momBodyCount].height*0.5);
                    }
                    if(mom.momBodyCount>7){
                        mom.momBodyCount=7;
                    }
                }
            }
        }
    }
}

//大鱼喂小鱼
function momBabyCollision() {
    var l=calLength2(mom.x,mom.y,son.x,son.y);
    if(l<900){
        if(mom.momBodyCount!=0){
            data.addScore();
            data.reset();
            ctx1.beginPath();
            //阴影
            ctx1.shadowBlur=10;
            ctx1.shadowColor="blue";
            ctx1.strokeStyle="blue";
            ctx1.lineCap=10;
            ctx1.arc(son.x,son.y,30,0,Math.PI*2,false);
            ctx1.stroke();
            son.babyBodyCount=0;
            setTimeout(function () {
                mom.momBodyCount=0;
            },300);
        }
    }
}

function gameover() {
    var w=can1.width;
    var h=can1.height;
    if(son.babyBodyCount==19){
        myflag=false;
        //alert("GAME OVER!您的得分是："+data.score);
        ctx1.save();
        ctx1.font="50px 宋体";
        ctx1.textAlign="center";
        //阴影
        ctx1.shadowBlur=10;
        ctx1.shadowColor="pink";
        ctx1.fillStyle="pink";
        ctx1.fillText("GAME OVER!",w*0.5,h*0.5-100);
        ctx1.restore();

        a.style.display="block";

        //son.babyBodyCount=0;
        //data.score=0;
    }
}
function again() {
    console.log(123);
    son.babyBodyCount=0;
    data.score=0;
    myflag=true;
    a.style.display="none";
}