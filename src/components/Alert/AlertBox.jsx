import { useEffect, useState } from "react";

export default function AlertBox({ message, onClose }) {
  const [progress, setProgress] = useState(100);

useEffect(() => {
  let interval;
  const duration = 3000;
  const stepTime = 30;

  interval = setInterval(() => {
    setProgress(prev => {
      if (prev <= 0) {
        clearInterval(interval);
        return 0;
      }
      return prev - (100 * stepTime) / duration;
    });
  }, stepTime);

  const timer = setTimeout(onClose, duration);
  return () => {
    clearTimeout(timer);
    clearInterval(interval);
  };
}, [onClose]);

  return (
    <div className="max-w-[300px] bg-yellow-500 text-black p-6 rounded-3xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
         onClick={onClose}>
      <p className="text-xl">{message}</p>
      <div className="mt-2 h-3 w-full bg-black/30 rounded-3xl overflow-hidden">
      <div
          className="h-full bg-black transition-all duration-30"
          style={{ width: `${progress}%` }}
      />
      </div>
    </div>
    
  );
}
// Usage example:
// <AlertBox message="This is an alert!" onClose={() => setShowAlert(false)} />
// This component can be used to display alerts in your application.