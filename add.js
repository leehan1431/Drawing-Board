const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "black";
const CNAVAS_SIZE = 500;

let painting = false;
let filling = false;

//캔버스 크기
canvas.width = CNAVAS_SIZE;
canvas.height = CNAVAS_SIZE;

//선색, 선굵기
ctx.strokeStyle = "INITIAL_COLOR";
ctx.lineWidth = 1.5;
ctx.fillStyle = "INITIAL_COLOR";

//선 정지
function stopPainting(){
    painting = false;
}

//선 시작
function startPainting(){
    painting = true;  
}

// 마우스를 컨버스 내에서 움직이면 컨버스 내에서의 마우스 좌표를 가져옴
function onMouseMove(event){
    // 컨버스 내에서의 마우스 좌표
    const x = event.offsetX;
    const y = event.offsetY; 
    //페인팅을 안할 시에 마우스를 움직이면 path로 옮겨진다.
    //클릭을 하면 시작지점이 path의 끝나는 지점이다.
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    //클릭 시
    //lineTo를 이용하여 좌표를 가져오고, stroke를 사용하여 선을 그린다. 
    //strokeStyle이 black이라서 검은선
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

//색 바꾸기
//팔레트를 클릭 하면 해당 배경색이 변수 color에 저장
//저장된 변수 color를 strokeStyle에 대입하여 색을 바꾼다.
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

//각 색상 버튼을 클릭하면 backgroundColor를 가져와서 대입한다.
function handlePaintColorClick(event){
    const PaintColor = event.target.style.backgroundColor;
    ctx.fillStyle = PaintColor;
}

//선 굵기 바꾸기
//Range의 value(굵기)를 가져와 lineWidth에 대입하여 굵기는 바꾼다.
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

//채우기 버튼 바꾸기
function handleModeClick(evnet){
    // ===data type과 value값이 같으면 Fill
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    // 아니면 filling이 true가 되면서 Paint
    }else{
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.fillStyle;
        console.log(ctx.fillStyle);
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CNAVAS_SIZE,CNAVAS_SIZE);
    }
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
}

Array.from(colors).forEach(color =>
     color.addEventListener("click",handleColorClick)
);
Array.from(colors).forEach(color =>
    color.addEventListener("click",handlePaintColorClick)
);
if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click",handleModeClick);

}