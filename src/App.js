import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const remoteUrlRef = useRef();
  const cacheKeyRef = useRef();
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const Log = ({ value, replacer = null, space = 2 }) => (
    <pre>
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await axios.post("http://localhost:8000/remote-cache", {
      "remoteUrl": remoteUrlRef.current.value,
      "cacheKey": cacheKeyRef.current.value,
    })
    setLoading(false);
    setResult(data);
  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        Url
        <input type="text" name="remote-url" ref={remoteUrlRef} />
        <br />
        Cache Key
        <input type="text" name="cacheKey" ref={cacheKeyRef} />
        <button type='submit' >Send</button>
      </form>
        {
          loading && "Loading....."
        }
        {

          !loading && result && result.map((item, index) => (
            <pre key={index}>
              <code>{JSON.stringify(item, "", 2)}</code>
            </pre>
          ))

        }
      
    </div>
  );
}

export default App;
