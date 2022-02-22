import "./App.css";

import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setStateValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStateValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setValue];
}

function fisherYates(array) {
  var count = array.length,
    randomnumber,
    temp;
  while (count) {
    randomnumber = (Math.random() * count--) | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp;
  }
}

export default function App() {
  const [lines, setLines] = useLocalStorage("lines", "");
  const [output, setOutput] = useState(0);

  const links = lines.split("\n").filter((line) => line.trim());
  fisherYates(links);

  return (
    <div className="App">
      <button onClick={() => setOutput(Math.random())}>Shuffle</button>
      <ol>
        {links.map((link) => {
          return (
            <li key={link}>
              <a href={link}>{link}</a>
            </li>
          );
        })}
      </ol>
      <textarea
        rows="10"
        style={{ width: "100%" }}
        onChange={(e) => setLines(e.target.value)}
        value={lines}
      ></textarea>
    </div>
  );
}
