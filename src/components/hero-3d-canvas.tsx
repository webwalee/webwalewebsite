import { useEffect, useRef } from "react";

export function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Dust particles
    const particleCount = 45;
    const particles: {
      x: number;
      y: number;
      z: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      pulse: number;
    }[] = [];

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.8 + 0.2, // depth factor
          size: Math.random() * 2 + 0.8,
          speedY: -(Math.random() * 0.3 + 0.1),
          speedX: (Math.random() - 0.5) * 0.15,
          alpha: Math.random() * 0.5 + 0.2,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.scale(dpr, dpr);
      if (particles.length === 0) {
        initParticles();
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("mousemove", onMouseMove);

    // Optional image preloading for floating screen preview
    const previewImg = new Image();
    previewImg.src = "/images/skyroute-coast.webp";
    let imgLoaded = false;
    previewImg.onload = () => {
      imgLoaded = true;
    };

    let startTime = performance.now();

    function render(currentTime: number) {
      if (!ctx) return;
      const time = (currentTime - startTime) * 0.001;

      // Smooth camera interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Clear with base depth
      ctx.clearRect(0, 0, width, height);

      // Deep room background with subtle radial gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 + mouseX * 80,
        height * 0.35 + mouseY * 50,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, "#131a29");
      bgGrad.addColorStop(0.4, "#0b0f19");
      bgGrad.addColorStop(1, "#05070d");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Architectural 3D Perspective Grid (Floor & Ceiling)
      const vpX = width * 0.52 + mouseX * 70;
      const vpY = height * 0.42 + mouseY * 45;

      ctx.save();
      ctx.lineWidth = 1;

      // Floor Grid
      const floorLines = 14;
      for (let i = 0; i <= floorLines; i++) {
        const spreadX = (i / floorLines) * (width * 1.6) - width * 0.3;
        const grad = ctx.createLinearGradient(vpX, vpY, spreadX, height);
        grad.addColorStop(0, "rgba(245, 158, 11, 0.0)");
        grad.addColorStop(0.3, "rgba(245, 158, 11, 0.04)");
        grad.addColorStop(1, "rgba(245, 158, 11, 0.15)");
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(vpX, vpY + height * 0.08);
        ctx.lineTo(spreadX, height);
        ctx.stroke();
      }

      // Horizontal floor transverse rings
      for (let j = 1; j <= 7; j++) {
        const t = Math.pow(j / 7, 2.2);
        const y = vpY + height * 0.08 + t * (height - (vpY + height * 0.08));
        const span = width * 0.2 + t * (width * 1.2);
        const leftX = vpX - span * 0.5;
        const rightX = vpX + span * 0.5;

        const hGrad = ctx.createLinearGradient(leftX, y, rightX, y);
        hGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        hGrad.addColorStop(0.5, `rgba(245, 158, 11, ${0.03 + t * 0.08})`);
        hGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = hGrad;
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
      }

      // Overhead Ceiling Truss Architecture (True Staging industrial vibe)
      const trussCount = 6;
      for (let k = 0; k <= trussCount; k++) {
        const topX = (k / trussCount) * width;
        const ceilGrad = ctx.createLinearGradient(topX, 0, vpX, vpY - 40);
        ceilGrad.addColorStop(0, "rgba(255, 255, 255, 0.06)");
        ceilGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = ceilGrad;
        ctx.beginPath();
        ctx.moveTo(topX, 0);
        ctx.lineTo(vpX + (topX - width * 0.5) * 0.15, vpY - 50);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Volumetric Spotlight Beams from top corners
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Golden Spotlight Beam from top right (aimed across the room)
      const spotGrad1 = ctx.createRadialGradient(
        width * 0.85,
        -50,
        10,
        width * 0.55 + mouseX * 40,
        height * 0.6,
        width * 0.65
      );
      spotGrad1.addColorStop(0, "rgba(245, 158, 11, 0.22)");
      spotGrad1.addColorStop(0.3, "rgba(245, 158, 11, 0.08)");
      spotGrad1.addColorStop(1, "rgba(245, 158, 11, 0)");
      ctx.fillStyle = spotGrad1;
      ctx.beginPath();
      ctx.moveTo(width * 0.8, 0);
      ctx.lineTo(width * 0.95, 0);
      ctx.lineTo(width * 0.7 + mouseX * 50, height);
      ctx.lineTo(width * 0.25 + mouseX * 50, height);
      ctx.closePath();
      ctx.fill();

      // Cool Cyan Ambient Spotlight from top left
      const spotGrad2 = ctx.createRadialGradient(
        width * 0.15,
        -40,
        10,
        width * 0.4 + mouseX * 30,
        height * 0.65,
        width * 0.6
      );
      spotGrad2.addColorStop(0, "rgba(56, 189, 248, 0.15)");
      spotGrad2.addColorStop(0.35, "rgba(56, 189, 248, 0.05)");
      spotGrad2.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = spotGrad2;
      ctx.beginPath();
      ctx.moveTo(width * 0.1, 0);
      ctx.lineTo(width * 0.22, 0);
      ctx.lineTo(width * 0.6 + mouseX * 30, height);
      ctx.lineTo(width * 0.15 + mouseX * 30, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 3. Floating 3D Exhibition Screens (True Staging Signature)
      // Screen 1: Primary Exhibition Display (Floating in the right volumetric space)
      if (width > 600) {
        ctx.save();
        const p1CenterX = width * 0.74 - mouseX * 45;
        const p1CenterY = height * 0.48 - mouseY * 35 + Math.sin(time * 1.2) * 10;
        const p1Width = Math.min(380, width * 0.38);
        const p1Height = p1Width * 0.62;

        ctx.translate(p1CenterX, p1CenterY);
        // Perspective rotation with mouse
        const rotY = -0.15 + mouseX * 0.08;
        const rotX = 0.06 - mouseY * 0.06;
        ctx.transform(1, rotX, rotY, 1, 0, 0);

        // Ambient glass shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
        ctx.shadowBlur = 45;
        ctx.shadowOffsetX = 15 - mouseX * 10;
        ctx.shadowOffsetY = 25 - mouseY * 10;

        // Glass panel container
        ctx.fillStyle = "rgba(11, 15, 25, 0.85)";
        roundRect(ctx, -p1Width / 2, -p1Height / 2, p1Width, p1Height, 14);
        ctx.fill();

        // Inner image or graphic preview
        ctx.save();
        ctx.shadowColor = "transparent";
        roundRect(ctx, -p1Width / 2 + 4, -p1Height / 2 + 4, p1Width - 8, p1Height - 8, 10);
        ctx.clip();
        if (imgLoaded) {
          ctx.globalAlpha = 0.65;
          ctx.drawImage(previewImg, -p1Width / 2, -p1Height / 2, p1Width, p1Height);
          // Vignette on image
          const panelVignette = ctx.createLinearGradient(0, -p1Height / 2, 0, p1Height / 2);
          panelVignette.addColorStop(0, "rgba(7, 10, 18, 0.2)");
          panelVignette.addColorStop(1, "rgba(7, 10, 18, 0.75)");
          ctx.fillStyle = panelVignette;
          ctx.fillRect(-p1Width / 2, -p1Height / 2, p1Width, p1Height);
        } else {
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(-p1Width / 2, -p1Height / 2, p1Width, p1Height);
        }

        // True Staging Style Minimal Corner Accents & Branding on Panel
        ctx.globalAlpha = 0.9;
        ctx.font = "600 11px monospace";
        ctx.fillStyle = "#f59e0b";
        ctx.fillText("01 / WEBWALE STUDIO", -p1Width / 2 + 18, -p1Height / 2 + 25);

        ctx.font = "800 16px 'Montserrat', sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("DIGITAL ARCHITECTURE", -p1Width / 2 + 18, p1Height / 2 - 25);
        ctx.font = "500 10px monospace";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("WEB DEVELOPMENT · 2026", -p1Width / 2 + 18, p1Height / 2 - 12);

        // Corner cross markers
        ctx.strokeStyle = "rgba(245, 158, 11, 0.7)";
        ctx.lineWidth = 1.5;
        drawCross(ctx, p1Width / 2 - 20, -p1Height / 2 + 20, 6);
        drawCross(ctx, p1Width / 2 - 20, p1Height / 2 - 20, 6);
        ctx.restore();

        // Glowing border frame
        const borderGrad = ctx.createLinearGradient(-p1Width / 2, -p1Height / 2, p1Width / 2, p1Height / 2);
        borderGrad.addColorStop(0, "rgba(245, 158, 11, 0.7)");
        borderGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.15)");
        borderGrad.addColorStop(1, "rgba(245, 158, 11, 0.4)");
        ctx.strokeStyle = borderGrad;
        ctx.lineWidth = 1.5;
        roundRect(ctx, -p1Width / 2, -p1Height / 2, p1Width, p1Height, 14);
        ctx.stroke();

        ctx.restore();

        // Screen 2: Secondary Background Screen (Floating further back to the left)
        ctx.save();
        const p2CenterX = width * 0.88 - mouseX * 20;
        const p2CenterY = height * 0.28 - mouseY * 15 + Math.cos(time * 0.9) * 8;
        const p2Width = p1Width * 0.65;
        const p2Height = p1Height * 0.65;

        ctx.translate(p2CenterX, p2CenterY);
        ctx.transform(1, 0.05, -0.22 + mouseX * 0.05, 1, 0, 0);

        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 30;
        ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
        roundRect(ctx, -p2Width / 2, -p2Height / 2, p2Width, p2Height, 10);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        roundRect(ctx, -p2Width / 2, -p2Height / 2, p2Width, p2Height, 10);
        ctx.stroke();

        ctx.font = "600 9px monospace";
        ctx.fillStyle = "rgba(245, 158, 11, 0.7)";
        ctx.fillText("02 / GLOBALPATH", -p2Width / 2 + 12, -p2Height / 2 + 18);
        ctx.restore();
      }

      // 4. Ambient Floating Dust Particles / Photons
      ctx.save();
      for (let p of particles) {
        // Drift
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.02;

        // Wrap around
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Parallax offset based on depth (z)
        const renderX = p.x + mouseX * (p.z * 35);
        const renderY = p.y + mouseY * (p.z * 25);
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size * p.z, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 5. Cinematic Edge Vignette to keep foreground text ultra-crisp
      const vigGrad = ctx.createLinearGradient(0, 0, width, 0);
      vigGrad.addColorStop(0, "rgba(7, 10, 18, 0.88)");
      vigGrad.addColorStop(0.35, "rgba(7, 10, 18, 0.65)");
      vigGrad.addColorStop(0.7, "rgba(7, 10, 18, 0.2)");
      vigGrad.addColorStop(1, "rgba(7, 10, 18, 0.55)");
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, width, height);

      // Bottom fade into next section
      const bottomFade = ctx.createLinearGradient(0, height * 0.75, 0, height);
      bottomFade.addColorStop(0, "rgba(7, 10, 18, 0)");
      bottomFade.addColorStop(1, "#070a12");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height * 0.75, width, height * 0.25);

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-3d-canvas" aria-hidden="true" />;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawCross(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.stroke();
}
