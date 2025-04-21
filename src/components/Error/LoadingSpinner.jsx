import { useEffect, useRef } from "react";

function RotatingBreathingDots() {
  const dotsRef = useRef(null);

  const size = 120;
  const dotCount = 4;
  const dotSize = size * 0.12;
  const minRadius = size * 0.15;
  const maxRadius = size * 0.35;
  const colors = ["#00FF84", "#00C3FF", "#00FF84", "#00C3FF"];

  useEffect(() => {
    let t = 0;
    let rotation = 0;
    let animationFrameId;

    const animate = () => {
      if (!dotsRef.current) return;

      t += 0.05;
      rotation += 6;

      const radius = minRadius + (maxRadius - minRadius) * (0.5 + 0.5 * Math.sin(t));
      const dots = dotsRef.current.querySelectorAll(".dot");

      dots.forEach((dot, i) => {
        const baseAngle = (i * 360) / dotCount;
        const angle = ((baseAngle + rotation) * Math.PI) / 180;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        dot.style.transform = `translate(${x}px, ${y}px)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (dotsRef.current) {
      animate();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div
        style={{
          width: size,
          height: size,
          position: "relative",
        }}>
        <div ref={dotsRef} className="absolute inset-0">
          {colors.map((color, i) => (
            <div
              key={i}
              className="dot absolute rounded-full"
              style={{
                width: dotSize,
                height: dotSize,
                top: "50%",
                left: "50%",
                background: color,
                boxShadow: `0 0 8px ${color}`,
                transform: "translate(0, 0)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RotatingBreathingDots;
