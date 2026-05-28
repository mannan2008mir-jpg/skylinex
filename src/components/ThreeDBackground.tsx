import { useEffect, useRef } from 'react';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  ox: number; // original relative positions
  oy: number;
  oz: number;
  color: string;
}

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Keep track of mouse coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5
      targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Create 3D particles in a spherical/cloud structure
    const particlesCount = 75;
    const particles: Particle3D[] = [];
    const focalLength = 400;

    for (let i = 0; i < particlesCount; i++) {
      // Choose random spherical coordinates
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 120 + Math.random() * 180; // distance from center

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        // Cyan & Purple dual colored neon particles matching the bg-mesh theme
        color: Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(87, 27, 193, ',
      });
    }

    // Animation variables
    let angleX = 0.001;
    let angleY = 0.0012;

    const tick = () => {
      // Smoothly interpolate mouse positions for easing rotation and parallax
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Rotative velocities with default drift + mouse influence
      const currentAngleY = angleY + mouseX * 0.008;
      const currentAngleX = angleX + mouseY * 0.008;

      // Base auto-rotation increment
      angleY += 0.001;
      angleX += 0.0005;

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      // Project particles to 2D
      const projected = particles.map((p) => {
        // Rotate around Y axis
        let x1 = p.ox * cosY - p.oz * sinY;
        let z1 = p.ox * sinY + p.oz * cosY;

        // Rotate around X axis
        let y2 = p.oy * cosX - z1 * sinX;
        let z2 = p.oy * sinX + z1 * cosX;

        // Perspective scaling
        const scale = focalLength / (focalLength + z2);
        const projX = x1 * scale + width / 2;
        const projY = y2 * scale + height / 2;

        return {
          px: projX,
          py: projY,
          pz: z2,
          scale,
          color: p.color,
        };
      });

      // Draw interactive connections (3D network lines)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.px < 0 || p1.px > width || p1.py < 0 || p1.py > height) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          
          // Distance in 3D projection
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Threshold for distance in pixels, proportional to perspective scale
          const activeDist = 120 * ((p1.scale + p2.scale) / 2);

          if (dist < activeDist) {
            // Transparency weakens as lines extend
            const alpha = (1 - dist / activeDist) * 0.12 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      projected.forEach((p) => {
        if (p.px < 0 || p.px > width || p.py < 0 || p.py > height) return;

        const size = Math.max(0.5, p.scale * 2.2);
        const alpha = Math.min(1, Math.max(0.12, p.scale * p.scale)) * 0.7;

        // Outer neon glow
        ctx.shadowBlur = size * 3;
        ctx.shadowColor = p.color.includes('240') ? '#00f0ff' : '#571bc1';

        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow for performance
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20 opacity-35 bg-background select-none"
      id="three-d-cybernetwork-bg"
    />
  );
}
