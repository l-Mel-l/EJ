import React, { useState } from 'react';
import './Clicker.css';

function Clicker() {
  const [count, setCount] = useState(0);
  const [instances, setInstances] = useState([]);

  const imgWidth = 80;
  const imgHeight = 80;

  const getRandomPosition = () => {
    const maxX = window.innerWidth - imgWidth-150;
    const maxY = window.innerHeight - imgHeight-150;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    return { x, y };
  };

  const handleClick = () => {
    setCount(prev => prev + 1);
    const { x, y } = getRandomPosition();

    const id = Date.now();
    const newInstance = { id, x, y };

    setInstances(prev => [...prev, newInstance]);

    setTimeout(() => {
        setInstances(prev => prev.filter(instance => instance.id !== id));
      }, 5000);
    };

  const imageSrc = process.env.PUBLIC_URL + '/ej.jpg';
  const audioSrc = process.env.PUBLIC_URL + '/chich.mp3';

  return (
    <div className="clicker-container">
      <button className="clicker-button" onClick={handleClick}>
        Кликни ежа!
      </button>
      <p className="clicker-count">{count} ежей</p>
      {instances.map(instance => (
        <div key={instance.id}>
          <img src={imageSrc} alt="Random" className="clicker-image" style={{ left: instance.x, top: instance.y }}/>
          <audio src={audioSrc} autoPlay style={{ display: 'none' }}
            ref={audio => {if (audio) {audio.volume = 0.4;}
            }}
          />
        </div>
      ))}
    </div>
  );
}
export default Clicker;
