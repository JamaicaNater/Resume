// Home.js
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/resume">Go to resume</Link>
    </div>
  );
};

export default HomePage;
