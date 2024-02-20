import React, { useState } from 'react';
import axios from 'axios'; // Ensure you have axios installed or use fetch API instead

function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [answer, setAnswer] = useState('');
  const baseUrl = 'https://us-central1-foerderpilot.cloudfunctions.net/foerderpilot?text="'; // Replace with your chatbot base URL

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullUrl = `${baseUrl}${encodeURIComponent(userInput)}"`;
    try {
      const response = await axios.get(fullUrl);
      // Assuming the chatbot response is in the response.data
      setAnswer(response.data);
    } catch (error) {
      console.error('Error fetching the chatbot response:', error);
      setAnswer('Failed to get response');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={handleChange} placeholder="Type your message here" />
        <button type="submit">Send</button>
      </form>
      {answer && <div><strong>Bot's response:</strong> {answer}</div>}
    </div>
  );
}

export default Chatbot;
