import { useEffect, useRef } from "react";

type Particle = {
    x: number;
    y: number;
    ox: number;
    oy: number;
    vx: number;
    vy: number;
    r: number;
    color: string;
};

export default function AntigravityBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMouseMove);

        const colors = [
            "#EA4335",
            "#4285F4",
            "#FBBC05",
            "#34A853",
            "#000000",
        ];

        const particles: Particle[] = Array.from({ length: 600 }, () => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;

            return {
                x,
                y,
                ox: x, // original X
                oy: y, // original Y
                vx: 0,
                vy: 0,
                r: Math.random() * 1.4 + 0.6,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of particles) {
                // 🔁 SPRING BACK TO ORIGINAL POSITION
                const springStrength = 0.01;
                p.vx += (p.ox - p.x) * springStrength;
                p.vy += (p.oy - p.y) * springStrength;

                // 🧲 CURSOR FORCE (temporary)
                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const influenceRadius = 140;

                if (dist < influenceRadius) {
                    const force = (influenceRadius - dist) / influenceRadius;
                    const angle = Math.atan2(dy, dx);
                    p.vx += Math.cos(angle) * force * 0.6;
                    p.vy += Math.sin(angle) * force * 0.6;
                }

                // MOVE
                p.x += p.vx;
                p.y += p.vy;

                // 🧈 SMOOTH DAMPING
                p.vx *= 0.88;
                p.vy *= 0.88;

                // DRAW (NO GLOW)
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                background: "#ffffff",
            }}
        />
    );
}
