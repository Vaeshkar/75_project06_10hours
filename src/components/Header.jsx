import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import AddEntryButton from "./Header/AddEntryButton";

export default function Header(props) {
  const blueBoxRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const originalOrderRef = useRef([]);
  const addButtonRef = useRef(null);

  useGSAP(() => {
    const headlineLetters = headlineRef.current.querySelectorAll("span");
    const sublineLetters = sublineRef.current.querySelectorAll("span");

    const tl = gsap.timeline();

    tl.fromTo(
      addButtonRef.current,
      { x: '-100vw', opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        blueBoxRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      )
      .fromTo(
        headlineLetters,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 },
        "-=0.3"
      )
      .fromTo(
        sublineLetters,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.3 },
        "-=0.2"
      );

    let isShuffled = false;

    const animateLetterSwap = (from, to) => {
      const factor = .3; 

      gsap.to(from, {
        x: (to.offsetLeft - from.offsetLeft) * factor,
        y: (to.offsetTop - from.offsetTop) * factor,
        duration: 0.4,
        ease: "ease.inOut"
      });
    };

    const shuffleLetters = () => {
      const letters = Array.from(headlineLetters);
      if (!originalOrderRef.current.length) {
        originalOrderRef.current = letters.slice();
      }

      const targetOrder = isShuffled
        ? originalOrderRef.current
        : letters.slice().sort(() => Math.random() - 0.5);

      letters.forEach((letter, i) => {
        animateLetterSwap(letter, targetOrder[i]);
        headlineRef.current.appendChild(targetOrder[i]);
      });

      isShuffled = !isShuffled;
    };

    const interval = setInterval(shuffleLetters, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full p-4 mx-auto z-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        <div className="md:col-span-1 flex justify-center items-center w-full h-full">
          <AddEntryButton ref={addButtonRef} onClick={props.onAddEntry} />
        </div>
        <div
          ref={blueBoxRef}
          className="md:col-span-3 w-full bg-[#00C2D1] p-4 rounded-3xl tracking-tighter leading-tight text-center flex flex-col justify-center"
        >
          <h1
            ref={headlineRef}
            className="text-[6vw] font-bold bagel-fat-one-regular uppercase leading-[.8]"
          style={{ fontSize: 'clamp(5.75rem, 0.5rem + 23.3333vw, 18rem)' }}>
            {"Personal_Diary".split("").map((char, i) => (
              <span key={`p-${i}`} className="inline-block">{char === "_" ? "\u00A0" : char}</span>
            ))}
          </h1>
          <h3
            ref={sublineRef}
            className="text-[3vw] font-bold bagel-fat-one-regular mt-4" style={{ fontSize: 'clamp(2.5rem, 0.5714rem + 8.5714vw, 7rem)' }}>
            {"One_Entry_a_day".split("").map((char, i) => (
              <span key={i} className="inline-block">{char === "_" ? "\u00A0" : char}</span>
            ))}
          </h3>
        </div>
      </div>
    </header>
  );
}