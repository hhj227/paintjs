const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraseBtn = document.getElementById("jsErase"); // 추가된 코드: 지우개 버튼 요소
const resetBtn = document.getElementById("jsReset"); // 추가된 코드: 초기화 버튼 요소


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
let filling = true;
let erasing = false;
let paint = false;

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
            ctx.clearRect(x, y, ctx.lineWidth+10, ctx.lineWidth+10); // 현재 위치에서 정해진 크기만큼 캔버스를 지움
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
        paint = true;
      
        mode.innerText = "Paint";
        canvas.style.cursor = "url(./cursor3.cur), auto";
    } else{
        filling = true;
        paint = false;
        mode.innerText = "Fill";
        canvas.style.cursor = "url(./cursor.cur), auto";
    }
    erasing = false;
    eraseBtn.classList.remove("active");
    eraseBtn.style.backgroundColor = "white";
    
    

    
}

function handleCanvasClick(){
    if (paint) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(){
    event.preventDefault();
}
function handleResetClick() {
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleSaveClick() {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCtx.fillStyle = "white";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    const image = tempCanvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🖼]";
    link.click();
}
function handleEraseClick() { // 추가된 코드: 지우개 버튼 클릭 시 호출되는 함수
    if (erasing) {
        erasing = false;
        eraseBtn.classList.remove("active");
        eraseBtn.style.backgroundColor = "white";
        canvas.style.cursor = "url(./cursor.cur), auto";
       
        mode.innerText = "Fill";
        

    } else {
        erasing = true;
        eraseBtn.classList.add("active");
        filling = false;
        painting = false;
        paint = false;

        canvas.style.cursor = "url(./cursor2.cur), auto";  // 지우개 커서 이미지로 변경
        eraseBtn.style.backgroundColor = "gray";
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
if (resetBtn) {
    resetBtn.addEventListener("click", handleResetClick);
}

