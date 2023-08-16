import React, { useState, useEffect } from 'react';

const DelayedComponent = ({ children, delay=100 }) => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return showComponent ? children : null;
};

export default DelayedComponent;
