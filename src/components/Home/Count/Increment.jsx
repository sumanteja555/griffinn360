import React, { useState, useEffect, useRef } from "react";

const IncrementInView = ({ toNumber, children, styles }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Adjust the threshold based on your needs
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isVisible) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < toNumber) {
            return prevCount + 1;
          }
          clearInterval(interval);
          return prevCount;
        });
      }, 10); // Adjust the interval based on your needs
    }

    return () => clearInterval(interval);
  }, [isVisible, toNumber]);

  return (
    <div ref={ref} className={styles}>
      {count}
      {children}
    </div>
  );
};

export default IncrementInView;
