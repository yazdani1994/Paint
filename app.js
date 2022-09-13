const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // زمینه ۲بعدی برای ترسیم
const brushWidth = document.querySelector("#brush-width");
const brushColor = document.querySelector("#color-picker");
const brush = document.querySelector(".brush");
const eraser = document.querySelector(".eraser");
const clearBtn = document.querySelector(".clear");
const saveBtn = document.querySelector(".save");

let isDrawing = false;
let currentWidth = 5;
let currentColor = "";

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function drawing(e) {
  if (!isDrawing) return;

  ctx.lineTo(e.offsetX, e.offsetY); //  from x to y will draw
  ctx.strokeStyle = `${currentColor}`; // رنگ قلم را تعیین می کند
  ctx.stroke(); // برای ترسیم خط
}

function startDraw() {
  isDrawing = true;
  ctx.beginPath(); // هربار یک نقطه جدید در نظر می گیرد

  ctx.lineWidth = currentWidth; // عرض قلم طراحی را مشخص می کند
}

function endDraw() {
  isDrawing = false;
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", endDraw);

brushWidth.addEventListener("change", () => {
  currentWidth = brushWidth.value;
});

brushColor.addEventListener("change", () => {
  currentColor = brushColor.value;
});

eraser.addEventListener("click", () => {
  eraser.classList.add("active");
  brush.classList.remove("active");
  currentColor = "white";
});

brush.addEventListener("click", () => {
  eraser.classList.remove("active");
  brush.classList.add("active");
  currentColor = brushColor.value;
});

clearBtn.addEventListener("click", () => {
  ctx.fillStyle = "white"; // رنگ مستطیل را مشخص می کند
  ctx.fillRect(0, 0, canvas.width, canvas.height); //  یک مستطیل میکشیم
});

saveBtn.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = `${Date.now()}.jpg`; // name for pic
  link.href = canvas.toDataURL();
  link.click();
});
