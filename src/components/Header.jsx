import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";



const Header = () => {
  const blueBoxRef = useRef(null);
  const headlineRef = useRef(null);
  const yellowButtonRef = useRef(null);
  const sublineRef = useRef(null);

  useGSAP(() => {
    const headlineLetters = headlineRef.current.querySelectorAll("span");
    const sublineLetters = sublineRef.current.querySelectorAll("span");

    const tl = gsap.timeline();

    tl.fromTo(
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
      )
      .fromTo(
        yellowButtonRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
  }, []);

  return (
    <header className="w-full p-4 mx-auto">
      <div className="grid grid-cols-3 gap-6 w-full h-full">
        <div
          ref={yellowButtonRef}
          className="rounded-3xl flex items-center justify-center h-full text-black hover:text-[#F9E900] hover:bg-black bg-[#F9E900] transition-colors duration-300 cursor-pointer"
        >
          <div className="-rotate-90 font-bold text-[4vw] whitespace-nowrap transition-colors duration-300" style={{ fontSize: '4vw' }}>
            New Entry
          </div>
        </div>
        <div
          ref={blueBoxRef}
          className="col-span-2 bg-[#00C2D1] p-4 rounded-3xl tracking-tighter leading-tight text-center h-full"
        >
          <h1
            ref={headlineRef}
            className="text-[6vw] font-bold bagel-fat-one-regular uppercase leading-[.8]"
          style={{ fontSize: '12vw' }}>
            {"Pers onal Diary".split(" ").map((char, i) => (
              <span key={i} className="inline-block">{char}</span>
            ))}
          </h1>
          <h3
            ref={sublineRef}    
            className="text-[3vw] font-bold bagel-fat-one-regular mt-4" style={{ fontSize: '5vw' }}>
            {"One Entry a day".split("").map((char, i) => (
              <span key={i} className="inline-block">{char}</span>
            ))}
          </h3>
        </div>
      </div>
    </header>
  );
}

export default Header;