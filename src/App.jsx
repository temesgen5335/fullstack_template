import { useState } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';


function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/rag-qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error fetching RAG response:', error);
      setResponse('Sorry, there was an error fetching the response.');
    }
  };
 

  return (
    <>
      <Navbar />

      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your question"
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit">Ask</button>
        </form>
        {response && <div className="response">{response}</div>}
      </div>
    </>
  );
}

export default App
