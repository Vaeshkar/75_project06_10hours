import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { forwardRef } from 'react';

const AddEntryButton = forwardRef(function AddEntryButton(props, ref) {
  const innerRef = useRef(null);
  const buttonRef = ref || innerRef;

  useGSAP(() => {
    gsap.fromTo(
      buttonRef.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'ease.out' }
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.fromTo(
      buttonRef.current,
      { rotate: 0,
        scale: 1,
       },
      {
        rotate: -6,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        scale: 1.1,
        transformOrigin: 'center center',
        ease: 'circ.inOut',
      }
    );
  };


  return (
    <button
      ref={buttonRef}
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseEnter}
      className="bg-yellow-400 text-black px-4 py-2 rounded-3xl cursor-pointer"
      style={{ fontSize: '4vw' }}
    >
      New Entry
    </button>
  );
});

export default AddEntryButton;