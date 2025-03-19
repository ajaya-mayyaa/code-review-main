import Editor from "react-simple-code-editor";
import prism from "prismjs";

function CodeEditor({ code, setCode, reviewCode }) {
  return (
    <div className="left">
      <div className="code">
        <Editor
          value={code}
          onValueChange={(newCode) => setCode(newCode)}
          highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: "5px",
            height: "100%",
            width: "100%"
          }}
        />
      </div>
      <div onClick={reviewCode} className="review">Review</div>
    </div>
  );
}

export default CodeEditor;
