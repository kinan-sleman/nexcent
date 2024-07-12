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
    let controls: any;

    const node = nodeRef.current;

    if (inView && node) {
      controls = animate(from, to, {
        duration: 1,
        onUpdate(value) {
          if (node) {
            node.textContent = Math.ceil(value).toLocaleString();
          }
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

  const setRefs = (el: HTMLParagraphElement | null) => {
    ref(el);
    // Modify the nodeRef's current property only when el exists
    if (el) {
      (nodeRef as React.MutableRefObject<HTMLParagraphElement | null>).current = el;
    }
  };

  return <p ref={setRefs} />;
};

export default Counter;
