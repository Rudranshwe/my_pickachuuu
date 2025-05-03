let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;

    this.init();
  }

  init() {
    const paper = this.paper;

    const updatePosition = () => {
      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    };

    const start = (x, y) => {
      this.holdingPaper = true;
      this.prevMouseX = x;
      this.prevMouseY = y;
      paper.style.zIndex = highestZ++;
    };

    const move = (x, y) => {
      if (!this.holdingPaper) return;
      this.velX = x - this.prevMouseX;
      this.velY = y - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevMouseX = x;
      this.prevMouseY = y;

      updatePosition();
    };

    const end = () => {
      this.holdingPaper = false;
    };

    // Mouse
    paper.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      start(e.clientX, e.clientY);
    });

    document.addEventListener("mousemove", (e) => {
      move(e.clientX, e.clientY);
    });

    document.addEventListener("mouseup", end);

    // Touch
    paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      start(touch.clientX, touch.clientY);
      e.preventDefault();
    }, { passive: false });

    paper.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      move(touch.clientX, touch.clientY);
      e.preventDefault();
    }, { passive: false });

    document.addEventListener("touchend", end);
  }
}

document.querySelectorAll(".paper").forEach(paper => {
  new Paper(paper);
});
