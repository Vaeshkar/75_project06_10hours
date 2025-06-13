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
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.fromTo(
      buttonRef.current,
      { rotate: 0,
        scale: 0.9,
       },
      {
        rotate: 8,
        duration: 0.2,
        yoyo: true,
        repeat: 2,
        scale: 1.1,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      }
    );
  };

    const handleMouseLeave = () => {
    gsap.fromTo(
      buttonRef.current,
      {
        rotate: 8,
        duration: 0.1,
        yoyo: true,
        repeat: 2,
        scale: 1.1,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      { rotate: 0,
        scale: 0.9
       }
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchCancel={handleMouseLeave}
      className="bg-yellow-400 text-black px-4 py-2 rounded-3xl shadow hover:shadow-lg transition cursor-pointer"
      style={{ fontSize: '4vw' }}
    >
      New Entry
    </button>
  );
});

export default AddEntryButton;