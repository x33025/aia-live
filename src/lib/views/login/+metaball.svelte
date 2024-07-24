<script lang="ts">
    import { onMount } from 'svelte';
    import { random } from 'mathjs';
  
    interface Shape {
      x: number;
      y: number;
      size: number;
      dx: number;
      dy: number;
      color: string;
    }
  
    let bgCanvas: HTMLCanvasElement | null = null;
    let bgCtx: CanvasRenderingContext2D | null = null;
    const metaballColor = 'rgb(110, 180, 250)';
    const numBlobs = 5;
    const maxSize = 200;
    const minSize = 100;
    const speed = 0.5;
  
    const createBlobs = (): Shape[] => {
      if (!bgCanvas) return [];
      const shapes: Shape[] = [];
      for (let i = 0; i < numBlobs; i++) {
        shapes.push({
          x: random() * bgCanvas.width,
          y: random() * bgCanvas.height,
          size: random() * (maxSize - minSize) + minSize,
          dx: (random() - 0.5) * speed,
          dy: (random() - 0.5) * speed,
          color: metaballColor
        });
      }
      return shapes;
    };
  
    const animateBlobs = (shapes: Shape[]) => {
      if (!bgCanvas || !bgCtx) return;
  
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.globalCompositeOperation = 'source-over';
  
      shapes.forEach(shape => {
        shape.x += shape.dx;
        shape.y += shape.dy;
  
        if (!bgCanvas || !bgCtx) return;
  
        // Ensure the blobs stay within the bounds of the screen
        if (shape.x < shape.size || shape.x > bgCanvas.width - shape.size) shape.dx *= -1;
        if (shape.y < shape.size || shape.y > bgCanvas.height - shape.size) shape.dy *= -1;
  
        bgCtx.fillStyle = shape.color;
        bgCtx.beginPath();
        bgCtx.ellipse(shape.x, shape.y, shape.size, shape.size, 0, 0, Math.PI * 2);
        bgCtx.fill();
      });
  
      requestAnimationFrame(() => animateBlobs(shapes));
    };
  
    onMount(() => {
      if (bgCanvas) {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
        bgCtx = bgCanvas.getContext("2d");
  
        if (bgCtx) {
          const shapes = createBlobs();
          animateBlobs(shapes);
        }
      }
    });
  </script>
  
  <style>
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
    }
  
    .blur-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(50px); /* Increased blur effect */
      z-index: 1;
    }
  
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>
  
  <div class="background">
    <canvas bind:this={bgCanvas}></canvas>
    <div class="blur-overlay"></div>
  </div>