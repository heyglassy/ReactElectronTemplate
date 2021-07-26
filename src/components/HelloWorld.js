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
    <div className="flex flex-col justify-items-center m-10">
      <h1 className="text-lg font-semibold HelloWorld text-center m-2">
        Domain Name to IP Address Lookup
      </h1>
      {ip ? <h1 className="m-2 text-center ip">{ip}</h1> : null}
      <input
        value={url}
        className="m-2 h-7 text-white bg-black text-purple-400 input"
        type="text"
        placeholder="Enter URL here."
        onChange={(e) => {
          setUrl(e.target.value);
          setIp();
        }}
      />
      <input
        type="button"
        onClick={handleSubmit}
        value="Lookup URL"
        className="m-2 h-7 lookup bg-gradient-to-r from-green-400 to-blue-500 text-white"
      />
      <input
        type="button"
        onClick={() =>
          window.open(
            "https://github.com",
            "_blank",
            "top=500,left=200,frame=false,nodeIntegration=no"
          )
        }
        value="Docs"
        className="m-2 h-7 docs bg-gradient-to-r from-green-400 to-blue-500 text-white"
      />
    </div>
  );
};
export default App;
