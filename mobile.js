let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    const updateTransform = () => {
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    };

    const startDrag = (x, y) => {
      this.holdingPaper = true;
      this.prevMouseX = x;
      this.prevMouseY = y;

      paper.style.zIndex = highestZ++;
    };

    const duringDrag = (x, y) => {
      if (!this.holdingPaper) return;

      this.velX = x - this.prevMouseX;
      this.velY = y - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevMouseX = x;
      this.prevMouseY = y;

      updateTransform();
    };

    const endDrag = () => {
      this.holdingPaper = false;
    };

    // Desktop
    document.addEventListener('mousemove', (e) => {
      duringDrag(e.clientX, e.clientY);
    });

    paper.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Only left click
      startDrag(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', endDrag);

    // Touch
    paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
      e.preventDefault();
    });

    paper.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      duringDrag(touch.clientX, touch.clientY);
      e.preventDefault(); // prevent scrolling
    });

    window.addEventListener('touchend', endDrag);
  }
}

document.querySelectorAll('.paper').forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
