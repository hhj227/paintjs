const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraseBtn = document.getElementById("jsErase"); // 추가된 코드: 지우개 버튼 요소


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 800;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let erasing = false; // 추가된 코드: 지우개 동작 여부를 나타내는 변수

function stopPainting(event){
    painting = false;
}

function startPainting(event){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX+5;
    const y = event.offsetY+25;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else
        if (erasing) { // 추가된 코드: 지우개 모드일 때
            ctx.clearRect(x, y, ctx.lineWidth, ctx.lineWidth); // 현재 위치에서 정해진 크기만큼 캔버스를 지움
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling===true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🖼]";
    link.click();
}
function handleEraseClick() { // 추가된 코드: 지우개 버튼 클릭 시 호출되는 함수
    if (erasing) {
        erasing = false;
        eraseBtn.classList.remove("active");
    } else {
        erasing = true;
        eraseBtn.classList.add("active");
        filling = false; // 지우개 모드일 때는 채우기 모드를 해제
        mode.innerText = "Fill";
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

if (eraseBtn) {
    eraseBtn.addEventListener("click", handleEraseClick);
}
