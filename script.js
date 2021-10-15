function popup() {
    let popup = document.querySelector('.popup');
    popup.style.display = 'block';
    let popupContent = document.querySelector('.popup__content');
    let close = document.querySelector('.popup_close');

    let contentText = document.createElement('div');
    contentText.classList.add('content__text');
    popupContent.append(contentText);
    contentText.innerHTML = '';

    contentText.innerHTML = 'This is popup!'
    close.addEventListener('click', () => {
        popup.classList.add('popup-hidden');
        setTimeout(() => {
            popup.classList.remove('popup-hidden');
            popup.style.display = 'none';
            table.remove();
        },500);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    let CanvasTask1 = document.querySelector('.canvas__task1');
    let canvasTask1Img = CanvasTask1.getContext('2d');
    canvasTask1Img.fillRect(50, 50, 50, 50);

    //line
    canvasTask1Img.beginPath();
    canvasTask1Img.moveTo(100, 10);
    canvasTask1Img.lineTo(200, 54);
    canvasTask1Img.lineTo(200, 14);
    canvasTask1Img.closePath(); //замкнуть
    canvasTask1Img.stroke(); //конец рисования линии

    canvasTask1Img.beginPath();
    canvasTask1Img.moveTo(150,40);
    canvasTask1Img.lineTo(150,100);
    canvasTask1Img.lineTo(170, 150);
    canvasTask1Img.fill(); //зарашивает-замыкает без closePath() и stroke()

    canvasTask1Img.strokeRect(550, 150, 100, 75); //не закрашенный прямоугол
    canvasTask1Img.fillRect(550, 10, 100, 75); //акрашенный прямоугол

    //canvasTask1Img.rect(750, 150, 100, 75); //прмоугольник
    //canvasTask1Img.stroke(); //отрисует контур прямоугольника
    //canvasTask1Img.fill(); //закрасит прямоугольник


    canvasTask1Img.clearRect(50, 50, 550, 1);// ластик


    canvasTask1Img.arc(100, 100, 75, 0, 2*Math.PI);
    canvasTask1Img.stroke();

    canvasTask1Img.beginPath();
    canvasTask1Img.moveTo(300, 300);
    canvasTask1Img.arc(300, 300, 100, (Math.PI/180)*0, (Math.PI/180)*320);
    canvasTask1Img.fill();
    canvasTask1Img.stroke();

    let clock = new Clock(5, 180, 'white', 'red', canvasTask1Img);
    clock.draw();
})
class Clock {
    constructor(border, r, color, colorBorder, ctx) {
        this.border = border;
        this.r = r;
        this.center = border/2 + r;
        this.color = color;
        this.colorBorder = colorBorder;
        this.ctx = ctx;
    }
    face(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.center, this.center, this.r, 0, 2*Math.PI);
        ctx.closePath()
        ctx.strokeStyle = this.colorBorder;
        ctx.lineWidth = this.border;
        ctx.stroke();
        ctx.fill();
    }
    horse(ctx) {
        ctx.lineWidth = 1;

        let x = null;
        let y = null;
        for (let i=1; i<13; i++) {
            x = Math.cos((Math.PI/180)*(i*30))*(this.r-50);
            y = Math.sin((Math.PI/180)*(i*30))*(this.r-50);
            console.log((Math.PI/180)*(i*30));
            console.log((Math.PI/180)*(i*30));
            ctx.strokeText(i,this.center+x,this.center+y);
        }
    }
    draw() {
        this.face(this.ctx);
        this.horse(this.ctx);
    }
}
const CanvasUtils = {
    clear(ctx) {
        ctx.clearRect(ctx.width, ctx.height);
    }
}