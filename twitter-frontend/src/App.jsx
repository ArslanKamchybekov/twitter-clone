import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Tweet from './Tweet'
import './App.css'

function App() {

  const [yourName, setYourName] = useState("");
  const [content, setContent] = useState("");

  const [tweets, setTweets] = useState([]);

  const handleResetInputs = () => {
    setYourName("");
    setYourPFP("");
  }

  const handleLoadTweets = async () => {
    const response = await fetch("http://localhost:4000/tweets");
    const json = await response.json();
    setTweets(json.tweets)
  }

  const handleAddTweet = async () => {
    const response = await fetch("http://localhost:4000/tweets", {
      method: "POST",
      body: JSON.stringify({
        content: content,
        sender: yourName
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    await response.json()
    await handleLoadTweets()
  }

  const handleDeleteTweet = async (id) => {
  }


  useEffect(() => {
    handleLoadTweets();
  }, [])

  return (
    <div>
      <div className="header">
        <h3>Twitter</h3>
      </div>
      <div className="timeline">
        <h1>My Timeline</h1>
        <div className="container">
          <input
            type="text"
            placeholder="Your Name"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleAddTweet}
          >
            Add Post
          </button>
        </div>

        {tweets.map((tweet, index) => (
          <Tweet
            _id={tweet._id}
            sender={tweet.sender}
            content={tweet.content}
            key={index}
            handleDeleteTweet={handleDeleteTweet}
            handleReload={handleLoadTweets}
          />
        ))}


      </div>
    </div>
  )
}

export default App
