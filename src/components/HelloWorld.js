// import { ipcRenderer } from "electron";
import React from "react";
import "./helloworld.css";

const App = () => {
  const handleSubmit = (e) => {
    // window.api.receive("fromMain", (data) => {
    //   console.log(data);
    // });
    // window.api.send("toMain", "Test");
  };
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};
export default App;
