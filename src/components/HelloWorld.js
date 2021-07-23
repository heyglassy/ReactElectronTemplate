// import { ipcRenderer } from "electron";
import React from "react";
import { useState } from "react";
import "../../tailwind.css";

const App = () => {
  const [ip, setIp] = useState();
  const [url, setUrl] = useState("");
  const handleSubmit = (e) => {
    window.api.receive("fromMain", (result) => {
      if (result == "Not Found") {
        setIp(result[0]);
      } else {
        setIp(result[0]);
      }
    });
    window.api.send("toMain", url);
    setUrl("");
  };
  return (
    <div>
      <h1 className="text-lg font-semibold HelloWorld">Hello World!</h1>
      {ip ? <h1 className="ip">{ip}</h1> : null}
      <input
        value={url}
        className="bg-gradient-to-r from-green-400 to-blue-500 text-purple-400 text"
        type="text"
        onChange={(e) => {
          setUrl(e.target.value);
          setIp();
        }}
      />
      <input
        type="button"
        onClick={handleSubmit}
        value="Lookup"
        className="button"
      />
    </div>
  );
};
export default App;
