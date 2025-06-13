import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function LoadingScreen({ onComplete }) {
  const loadingRef = useRef();
  const [exitAnimDone, setExitAnimDone] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(loadingRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    tl.to(loadingRef.current, 
      { y: '100vh', opacity: 0, duration: 0.6, delay: 0.7, ease: "power2.inOut",
        onComplete: () => setExitAnimDone(true)
      }
    );
  }, []);

  useEffect(() => {
    if (exitAnimDone && typeof onComplete === "function") {
      onComplete();
    }
  }, [exitAnimDone, onComplete]);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-lime-300 via-amber-300 to-pink-500"
    >
      <h1
        className="text-white text-8xl bagel-fat-one-regularleading-tight text-center"
        style={{ fontSize: "28vw" }}
      >
        LOA<br />DIN<br />G
      </h1>
    </div>
  );
}