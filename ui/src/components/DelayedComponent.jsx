import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

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

DelayedComponent.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number
}

export default DelayedComponent;