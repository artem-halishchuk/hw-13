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

    canvasTask1Img.clearRect(0, 0, CanvasTask1.getBoundingClientRect().width, CanvasTask1.getBoundingClientRect().height);
    let clock = new Clock(5, 180, 'white', 'red', canvasTask1Img);
    clock.draw();

    let canvasFrame = document.querySelector('.canvas__frame');
    let frame = new CanvasFrame(canvasFrame);
    let data = new Date();
    
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
    hours(ctx, fotSize) {
        ctx.lineWidth = 1;
        for (let i=4; i<16; i++) {
            let x = Math.cos((Math.PI/180)*((i-3)*30))*(this.r-fotSize/2-10);
            let y = Math.sin((Math.PI/180)*((i-3)*30))*(this.r-fotSize/2-10)+fotSize/3;
            let a = i;
            if (i > 12) a = i - 12;
            ctx.font = `bold ${fotSize}px serif`;
            ctx.textAlign = "center";
            ctx.fillStyle = this.colorBorder;
            ctx.fillText(a,this.center+x,this.center+y);
        }
    }
    arrowSecond() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'yellow'
        this.ctx.rect(this.center - 1, this.center + 25, 2, -this.r + 20);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'yellow'
        this.ctx.arc(this.center, this.center, 5, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black'
        this.ctx.arc(this.center, this.center, 2, 0, 2 * Math.PI);
        this.ctx.fill();

    }
    arrowMinute() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'green'
        this.ctx.rect(this.center - 3, this.center + 15, 6, -this.r + 40);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'green'
        this.ctx.arc(this.center, this.center, 7, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
    }
    arrowHour() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black'
        this.ctx.rect(this.center - 5, this.center + 10, 10, -this.r + 50);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black'
        this.ctx.arc(this.center, this.center, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
    }
    draw() {
        this.face(this.ctx);
        this.hours(this.ctx, 40);
        this.arrowHour();
        this.arrowMinute();
        this.arrowSecond();
    }
}

const CanvasUtils = {
    clear(ctx) {
        ctx.clearRect(0, 0, 900, 400);
    }
}


class Circle {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}


class CanvasFrame {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.getBoundingClientRect().width;
        this.height = canvas.getBoundingClientRect().height;  
        this.circle = new Circle(100, 100, 50, 'blue');
        this.clock = new Clock(2, 196, 'while', 'red', this.ctx);        
        this.startAnimation();
        this.canvas = canvas;
    }
    startAnimation() {
        requestAnimationFrame(t => {
            if(!this.startAnimationTime) this.startAnimationTime = t;
            this.draw(t - this.startAnimationTime);
            this.startAnimation();
            
        })
    }
    draw(time) {       
        let currentPosition = time * this.width/20000;
        if(currentPosition <= this.width) {
            this.circle.x = currentPosition-this.circle.r;
        }
        else {
            this.clear();
            this.startAnimationTime = 0;
        }
        this.clear();
        this.circle.draw(this.ctx);
        this.clock.draw();
        
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}