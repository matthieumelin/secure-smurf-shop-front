import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import chroma from "chroma-js";

export default function Button({ type, title, onClick }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const gradientElem = document.createElement("div");
    gradientElem.classList.add("gradient");
    buttonRef.current.appendChild(gradientElem);

    buttonRef.current.addEventListener("pointermove", (e) => {
      const rect = buttonRef.current.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(buttonRef.current, {
        "--pointer-x": `${x}px`,
        "--pointer-y": `${y}px`,
        duration: 0.6,
      });

      gsap.to(buttonRef.current, {
        "--button-glow": chroma
          .mix(
            window
              .getComputedStyle(buttonRef.current)
              .getPropertyValue("--button-glow-start")
              .trim(),
            window
              .getComputedStyle(buttonRef.current)
              .getPropertyValue("--button-glow-end")
              .trim(),
            x / rect.width
          )
          .hex(),
        duration: 0.2,
      });
    });
  }, []);

  return (
    <button
      type={type}
      className="glow-button"
      ref={buttonRef}
      onClick={onClick}
    >
      <span>{title}</span>
    </button>
  );
}
