import { useState, useEffect } from 'react';
import axios from 'axios';
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import './styles/App.css';
import CodeEditor from './components/CodeEditor';
import CodeReview from './components/CodeReview';

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });
    setReview(response.data);
  }

  return (
    <main>
      <CodeEditor code={code} setCode={setCode} reviewCode={reviewCode} />
      <CodeReview review={review} />
    </main>
  );
}

export default App;
