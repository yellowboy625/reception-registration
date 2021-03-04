import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hero from './Components/Hero';

class Site extends React.Component{
  render() {
    return (
      <React.StrictMode>
        <Hero />
      </React.StrictMode>
    );
  }
};

ReactDOM.render(<Site />, document.getElementById("root"));