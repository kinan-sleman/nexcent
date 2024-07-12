import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { animate } from "framer-motion";

interface CounterProps {
  from: number;
  to: number;
  onInView?: () => void;
}

const Counter: React.FC<CounterProps> = ({ from, to, onInView }) => {
  const nodeRef = useRef<HTMLParagraphElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const node = nodeRef.current;

    let controls;

    if (inView && node) {
      controls = animate(from, to, {
        duration: 1,
        onUpdate(value) {
          node.textContent = Math.ceil(value).toLocaleString();
        },
      });
    }

    if (inView && onInView) {
      onInView();
    }

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [from, to, inView, onInView]);

  return <p ref={(el) => { ref(el); nodeRef.current = el; }} />;
}

export default Counter;
