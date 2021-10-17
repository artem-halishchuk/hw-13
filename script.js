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
    //task 1 start---------------------------------------------------------------------
    let ftuit = {
        apple: 20, banana: 30, orange: 50
    }
    let graph = new Graph(ftuit, new Ctx(400, 400, '.task1'));
    //task 1 end-----------------------------------------------------------------------

    //task 2 start---------------------------------------------------------------------
    let face = new ClockFace(10, 'white', 'black', 50, 'blue', new CtxClock());
    let hours = new Arrow(0.7, 16, 'red', new CtxClock());
    let minute = new Arrow(0.8, 8, 'green', new CtxClock());
    let second = new Arrow(0.9, 4, 'black', new CtxClock());
    let clock = new Clock(face, hours, minute, second);
    //task 2 end-----------------------------------------------------------------------
})
class Graph {
    constructor(object, ctx) {
        this.object = object;
        this.a();
        this.ctx = ctx
    }
    a() {
        this.sumData = 0;
        for (let key in this.object) this.sumData += this.object[key];
        for (let key in this.object) {
            console.log(key + ' ' + this.object[key]);
        }
    }
    segment() {
        canvasTask1Img.beginPath();
        canvasTask1Img.moveTo(300, 300);
        canvasTask1Img.arc(300, 300, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 320);
        canvasTask1Img.fill();
        canvasTask1Img.stroke();
    }
}
class ClockFace {
    constructor(border, color, colorBorder, fontSize, colorFont, createCanvas) {
        this.createCanvas = createCanvas;
        this.ctx = this.createCanvas.ctx;
        this.center = {
            x: this.createCanvas.width / 2,
            y: this.createCanvas.height / 2,
        };
        this.fontSize = fontSize;
        this.border = border;
        this.r = (this.center.x > this.center.y ? this.center.y : this.center.x);
        this.color = color;
        this.colorBorder = colorBorder;
        this.colorFont = colorFont;
        //this.draw = this.draw();
        
    }
    face() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colorBorder;
        this.ctx.arc(this.center.x, this.center.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.center.x, this.center.y, this.r-this.border, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    hours() {
        this.ctx.beginPath();
        for (let i = 4; i < 16; i++) {           
            let x = Math.cos((Math.PI / 180) * ((i - 3) * 30)) * (this.r - this.fontSize / 2 - (this.border+5));
            let y = Math.sin((Math.PI / 180) * ((i - 3) * 30)) * (this.r - this.fontSize / 2 - (this.border+5)) + this.fontSize / 3;
            console.log(this.r);
            let a = i;
            if (i > 12) a = i - 12;
            this.ctx.textAlign = "center";
            this.ctx.font = `bold ${this.fontSize}px serif`;
            this.ctx.fillStyle = this.colorFont;
            this.ctx.fillText(a, this.center.x + x, this.center.y + y);
        }
    }
    draw() {
        this.face();
        this.hours();
    }
}
class Ctx {
    constructor(width, height, selector) {
        this.width = width;
        this.height = height;
        this.selector = selector;
        this.ctx = this.create();
    }
    create() {
        let element = document.querySelector(this.selector);
        let canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.color = 'red';
        element.append(canvas);
        return canvas.getContext('2d');
    }
}
class CtxClock {
    constructor(width, height, selector) {
        this.width = 400;
        this.height = 400;
        this.selector = '.task2';
        this.ctx = this.create();
    }
    create() {
        let element = document.querySelector(this.selector);
        let canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.color = 'red';
        element.append(canvas);
        return canvas.getContext('2d');
    }
}
class Arrow {
    constructor(lenght, width, color, createCanvas) {
        this.createCanvas = createCanvas;
        this.ctx = this.createCanvas.ctx;
        this.center = {
            x: this.createCanvas.width / 2,
            y: this.createCanvas.height / 2,
        };
        this.color = color;
        this.lenght = lenght * (this.center.x > this.center.y ? this.center.y : this.center.x);
        this.width = width;
    }
    draw(rortate) {
        this.ctx.translate(this.center.x, this.center.y);
        this.ctx.rotate(rortate);
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.rect(-this.width / 2, 0, this.width, -this.lenght);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(0, 0, this.width * 1.2, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();  
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.createCanvas.width, this.createCanvas.height);
    }
}
class Clock {
    constructor(face, arrowHours, arrowMinute, arrowSecond) {
        this.arrowSecond = arrowSecond;
        this.arrowMinute = arrowMinute;
        this.arrowHours = arrowHours;
        this.face = face;
        this.face.draw();
        this.startAnimation();
    }
    startAnimation() {
        requestAnimationFrame(() => {
            let data = new Date();
            this.miliSecond = data.getMilliseconds();
            this.second = data.getSeconds();
            this.minutes = data.getMinutes();
            this.hours = data.getHours();
            this.clear();
            this.draw(); 
            this.startAnimation();
        })
    }
    draw() {
        this.arrowHours.draw(Math.PI / 180 * 360 / 12 * (this.hours > 12 ? this.hours - 12 : this.hours) + Math.PI / 180 * 360 / 12 / 60 * this.minutes);
        this.arrowMinute.draw(Math.PI / 180 * 360 / 60 * this.minutes + Math.PI / 180 * 360 / 60 / 60 * this.second);
        this.arrowSecond.draw(Math.PI / 180 * 360 / 60 * this.second + Math.PI / 180 * 360 / 60 / 1000 * this.miliSecond);
    }
    clear() {
        this.arrowHours.clear();
        this.arrowMinute.clear();
        this.arrowSecond.clear();
    }
}