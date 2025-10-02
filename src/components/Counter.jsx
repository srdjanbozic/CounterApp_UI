import { useState, useEffect } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch initial count from backend
  useEffect(() => {
    fetch('http://localhost:8000/api/counter')
      .then(response => response.json())
      .then(data => {
        setCount(data.count);
        setLoading(false);
      })
      .catch(() => {
        console.error('Failed to fetch initial count');
        setLoading(false);
      });
  }, []);

  const increment = () => {
    fetch('http://localhost:8000/api/counter/increment', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => setCount(data.count))
      .catch(() => {
        console.error('Failed to increment count');
      });
  };

  const decrement = () => {
    fetch('http://localhost:8000/api/counter/decrement', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => setCount(data.count))
      .catch(() => {
        console.error('Failed to decrement count');
      });
  };

  const reset = () => {
    fetch('http://localhost:8000/api/counter/reset', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => setCount(data.count))
      .catch(() => {
        console.error('Failed to reset count');
      });
  };

  if (loading) {
    return <div className="counter">Loading...</div>;
  }

  return (
    <div className="counter">
      <h1>Counter App</h1>
      <div className="count-display">
        <span className="count">{count}</span>
      </div>
      <div className="buttons">
        <button onClick={decrement} className="btn btn-decrement">
          Decrement
        </button>
        <button onClick={reset} className="btn btn-reset">
          Reset
        </button>
        <button onClick={increment} className="btn btn-increment">
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
