class TouchPaper {
  constructor(paper) {
    this.paper = paper;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.init();
  }

  init() {
    const paper = this.paper;

    // Enable touch-only dragging, mouse events are ignored
    paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const rect = paper.getBoundingClientRect();

      this.offsetX = touch.clientX - rect.left;
      this.offsetY = touch.clientY - rect.top;

      this.isDragging = true;
      e.preventDefault(); // Prevents any default touch actions
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;

      const touch = e.touches[0];
      const x = touch.clientX - this.offsetX;
      const y = touch.clientY - this.offsetY;

      this.paper.style.transform = `translate(${x}px, ${y}px) rotate(-5deg)`;
      e.preventDefault(); // Prevents scrolling or zooming
    }, { passive: false });

    document.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }
}

document.querySelectorAll('.paper').forEach(paper => new TouchPaper(paper));

// Disable mouse events entirely
document.addEventListener('mousedown', (e) => e.preventDefault());
document.addEventListener('mousemove', (e) => e.preventDefault());
document.addEventListener('mouseup', (e) => e.preventDefault());
