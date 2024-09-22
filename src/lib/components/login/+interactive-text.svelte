<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { quadtree } from 'd3-quadtree';
  import { sqrt, cos, sin, atan2, random } from 'mathjs';

  export let text = "aia";

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let dots: Array<{ x: number; y: number; originalX: number; originalY: number; vx: number; vy: number; radius: number }> = [];
  let mouse = { x: 0, y: 0 };
  let isMouseOver = false;
  let fontSize = "30vw"; // Default font size for desktop

  interface Dot {
    x: number;
    y: number;
    originalX: number;
    originalY: number;
    vx: number;
    vy: number;
    radius: number;
  }

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  };

  const createDots = async () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas!.width, canvas!.height);

    // Adjust font size based on screen width
    if (window.innerWidth <= 768) {
      fontSize = "40vw";
    } else {
      fontSize = "30vw";
    }

    ctx.font = `${fontSize} 'Nunito', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const gradient = ctx.createLinearGradient(0, 0, canvas!.width, 0);
    gradient.addColorStop(0, "cyan");
    gradient.addColorStop(1, "blue");
    ctx.fillStyle = gradient;

    ctx.fillText(text, canvas!.width / 2, canvas!.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas!.width, canvas!.height);
    const data = imageData.data;

    dots = [];
    const qtree = quadtree<Dot>()
      .x(d => d.x)
      .y(d => d.y)
      .addAll([]);

    const minRadius = 1;
    const maxRadius = 3;
    const spacing = 4;

    for (let y = 0; y < canvas!.height; y += spacing) {
      for (let x = 0; x < canvas!.width; x += spacing) {
        const index = (y * canvas!.width + x) * 4;
        if (data[index + 3] > 128) {
          const offsetX = random() * spacing - spacing / 2;
          const offsetY = random() * spacing - spacing / 2;
          const radius = random() * (maxRadius - minRadius) + minRadius;
          const dot: Dot = { x: x + offsetX, y: y + offsetY, originalX: x + offsetX, originalY: y + offsetY, vx: 0, vy: 0, radius: radius };

          let collision = false;
          qtree.visit((node, x0, y0, x1, y1) => {
            if ("data" in node) {
              const dx = dot.x - node.data.x;
              const dy = dot.y - node.data.y;
              const distance = sqrt(dx * dx + dy * dy) as number;
              if (distance < dot.radius + node.data.radius) {
                collision = true;
              }
            }
          });

          if (!collision) {
            dots.push(dot);
            qtree.add(dot);
          }
        }
      }
    }
  };

  const drawDots = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    const gradient = ctx.createLinearGradient(0, 0, canvas!.width, 0);
    gradient.addColorStop(0, "cyan");
    gradient.addColorStop(1, "blue");
    ctx.fillStyle = gradient;

    dots.forEach(dot => {
      ctx!.beginPath();
      ctx!.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx!.fill();
    });
  };

  const animateDots = () => {
    dots.forEach(dot => {
      const dx = dot.x - mouse.x;
      const dy = dot.y - mouse.y;
      const distance = sqrt(dx * dx + dy * dy) as number;
      const maxDistance = 100;
      const force = 0.2; // Increased force for faster animation
      const damping = 0.85; // Damping factor for spring effect

      if (distance < maxDistance) {
        const angle = atan2(dy, dx);
        const effect = (maxDistance - distance) / maxDistance;
        dot.vx += cos(angle) * effect * force;
        dot.vy += sin(angle) * effect * force;
      }

      // Apply velocity with damping
      dot.vx *= damping;
      dot.vy *= damping;

      // Update dot position
      dot.x += dot.vx;
      dot.y += dot.vy;

      // Spring effect to original position
      dot.x += (dot.originalX - dot.x) * 0.05;
      dot.y += (dot.originalY - dot.y) * 0.05;
    });
    drawDots();
    requestAnimationFrame(animateDots);
  };

  const resizeCanvas = () => {
    if (typeof window !== 'undefined') {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      createDots();
      drawDots();
      animateDots();
    }
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      ctx = canvas!.getContext("2d");
      if (!ctx) return;

      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;

      createDots();
      drawDots();
      animateDots();

      window.addEventListener('resize', resizeCanvas);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', resizeCanvas);
    }
  });

  const handleMouseMove = (event: MouseEvent) => {
    const rect = canvas!.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    isMouseOver = true;
  };

  const handleMouseOut = () => {
    isMouseOver = false;
  };

  const handleTouchMove = (event: TouchEvent) => {
    const rect = canvas!.getBoundingClientRect();
    mouse.x = event.touches[0].clientX - rect.left;
    mouse.y = event.touches[0].clientY - rect.top;
    isMouseOver = true;
  };

  const handleTouchEnd = () => {
    isMouseOver = false;
  };

  const handleBlur = () => {
    isMouseOver = false;
  };
</script>

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;

  }
</style>

<canvas 
  bind:this={canvas} 
  on:mousemove={handleMouseMove} 
  on:mouseout={handleMouseOut} 
  on:touchmove={handleTouchMove} 
  on:touchend={handleTouchEnd} 
  on:blur={handleBlur} 
  tabindex="0"
  aria-label="Interactive canvas with animated dots">
</canvas>
