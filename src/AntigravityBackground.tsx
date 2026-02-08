import { useEffect, useRef } from "react";

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    hue: number;
};

export default function AntigravityBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        window.addEventListener("mousemove", (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        });

        // 🔥 Google-inspired gradient hues
        const palette = [210, 330, 45, 120, 260];

        const particles: Particle[] = Array.from({ length: 350 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2.2 + 0.8,
            hue: palette[Math.floor(Math.random() * palette.length)],
        }));

        function animate() {
            // 🌫️ Soft fade (motion trails)
            ctx.fillStyle = "rgba(255,255,255,0.12)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "lighter"; // ✨ color blending

            particles.forEach((p) => {
                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const radius = 160;

                if (dist < radius) {
                    const force = (radius - dist) / radius;
                    const angle = Math.atan2(dy, dx);

                    p.vx += Math.cos(angle) * force * 0.9;
                    p.vy += Math.sin(angle) * force * 0.9;
                }

                p.x += p.vx;
                p.y += p.vy;

                // 🧈 smooth motion
                p.vx *= 0.94;
                p.vy *= 0.94;

                // wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // 🌟 Glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.shadowBlur = 12;
                ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, 0.8)`;
                ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, 0.9)`;
                ctx.fill();
            });

            ctx.globalCompositeOperation = "source-over";
            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
            }}
        />
    );
}
