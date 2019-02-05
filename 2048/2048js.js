
reStartGame();
$(".best").html(localStorage.best);
var score=0;
var best=0;
if(localStorage.best!=0)
{
    best = localStorage.best-0

}
else
{
    best =0;

}
var moved;
$("#start").click(
    function (){
        console.log("startGame");
        reStartGame();
    }
    );//=StartGame
$(".gameOver").hide();
function reStartGame()
{
    score=0;

    moved=false;
    var cells=$(".cell");
    for(var i=0;i<cells.length;i++)
    {
        cells.eq(i).html("").addClass("emptyCell").removeClass("notEmptyCell");
    }
    newCell();
    newCell();
    $(".gameOver").fadeOut(300);
    reFreshColor();
    $(".score").html(0);
}

function getSideCell(currentCell, direction){

    var currentCellX=currentCell.attr("x")-0;
    var currentCellY=currentCell.attr("y")-0;
    //此为玄学

    switch(direction){
        case "top":
            var sideCellX=currentCellX;
            var sideCellY=currentCellY-1;
            break;
        case "right":
            var sideCellX=currentCellX+1;
            var sideCellY=currentCellY;
            break;
        case "down":
            var sideCellX=currentCellX;
            var sideCellY=currentCellY+1;
            break;
        case "left":
            var sideCellX=currentCellX-1;
            var sideCellY=currentCellY;
            break;
    }
    var sideCell=$(".x"+sideCellX+"y"+sideCellY);//???

    return sideCell;

}


function singleCellMove(currentCell,direction){

    var sideCell=getSideCell(currentCell,direction);

    if(sideCell.length==0){

    }//.length==0判断是否存在
    else if(sideCell.html()==""){
        sideCell.html(currentCell.html());
        currentCell.html("");
        sideCell.addClass("notEmptyCell").removeClass("emptyCell");
        currentCell.removeClass("notEmptyCell").addClass("emptyCell");
        singleCellMove(sideCell,direction);
        moved=true;
    }
    else if((sideCell.html()!="")&&(sideCell.html()==currentCell.html())){
        sideCell.html(currentCell.html()*2);
        // console.log(sideCell.html());
        score += (sideCell.html()-0);//
         $(".score").html(score);
         if((localStorage.best-0)<score)
         {
             localStorage.best=score;
         }
         $(".best").html(localStorage.best);
        currentCell.html("");
        currentCell.removeClass("notEmptyCell").addClass("emptyCell");
        moved=true;

    }
    else{


    }//当前与临近不相同
    reFreshColor();
}

function allCellMove(direction) {

    var notEmptyCells = $(".notEmptyCell");//类选择器同时多个对象似乎是返回数组
if(direction == "left"||direction == "top")
    for (var i = 0; i < notEmptyCells.length; i++) {
        var movableCell = notEmptyCells.eq(i);
        console.log("movableCell x" + movableCell.attr("x") + ",movableCell y" + movableCell.attr("y"));
        singleCellMove(movableCell, direction);
    }

else if (direction =="right" || direction == "down")
    for(var i=notEmptyCells.length-1;i>=0;i--)
    {
        var movableCell=notEmptyCells.eq(i);
        console.log("movableCell x"+movableCell.attr("x")+",movableCell y"+movableCell.attr("y"));
        singleCellMove(movableCell,direction);
    }

    if(moved){
        newCell();
        reFreshColor();
    }
}

function newCell(){

    var randomArray=new Array(2,2,2,4);

    var emptyCells=$(".emptyCell");
    var randomPosition=Math.floor(Math.random()*emptyCells.length);
    var randomNum=randomArray[Math.floor(Math.random()*4)];
    emptyCells.eq(randomPosition).html(randomNum).addClass("notEmptyCell").removeClass("emptyCell");
    //写的也许会有问题
    console.log("position:"+randomPosition+"num"+ randomNum);
    reFreshColor();
}



$(document).keydown(function (e) {
    switch (e.keyCode) {
        case 38:
            allCellMove("top");
            moved = false;
            console.log("top");
            isGameOver();
            break;
        case 39:
            allCellMove("right");
            moved = false;
            console.log("right");
            isGameOver();
            break;
        case 40:
            allCellMove("down");
            moved = false;
            console.log("down");
            isGameOver();
            break;
        case 37:
            allCellMove("left");
            moved = false;
            console.log("left");
            isGameOver();
            break;
    }
});

function  isGameOver() {
    var noGameOver=0;
    var notEmptyCells=$(".notEmptyCell");
    if(notEmptyCells.length==16)
    {
        for(var i=0;i<16;i++) {
            if(notEmptyCells.eq(i).html()==getSideCell(notEmptyCells.eq(i),"top").html()||notEmptyCells.eq(i).html()==getSideCell(notEmptyCells.eq(i),"right").html()||notEmptyCells.eq(i).html()==getSideCell(notEmptyCells.eq(i),"down").html()||notEmptyCells.eq(i).html()==getSideCell(notEmptyCells.eq(i),"left"))
            {
                noGameOver=1;
             }
        }
        if(!noGameOver){


            setTimeout(function () {

                $(".gameOver").fadeIn(1000);
                },1000);

        }
    }



}

function reFreshColor() {
    var cells = $(".cell");
    for (var i = 0; i < 16; i++)
    {
        switch(cells.eq(i).html()) {
            case "":
                cells.eq(i).css("background-color", "#FFEBCD");
                break;
            case "2":
                cells.eq(i).css("background-color", "#28FF13");
                break;
            case "4":
                cells.eq(i).css("background-color", "#FFEC01");
                break;
            case "8":
                cells.eq(i).css("background-color", "#FF0009");
                break;
            case "16":
                cells.eq(i).css("background-color", "#FF0AFD");
                break;
            case "32":
                cells.eq(i).css("background-color", "#0210FF");
                break;
            case "64":
                cells.eq(i).css("background-color", "#03FAFF");
                break;
            case "128":
                cells.eq(i).css("background-color", "#F8F7FF");
                break;
            case "256":
                cells.eq(i).css("background-color", "#3D3D3D");
                break;
            case "512":
                cells.eq(i).css("background-color", "#EC7FFF");
                break;
            case "1024":
                cells.eq(i).css("background-color", "#FAFF90");
                break;
            case "2048":
                cells.eq(i).css("background-color", "#98FFB5");
                break;
        }
    }
}