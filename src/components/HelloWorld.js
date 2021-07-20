// import { ipcRenderer } from "electron";
import React from "react";
import "../../tailwind.css";

const App = () => {
  const handleSubmit = (e) => {
    // window.api.receive("fromMain", (data) => {
    //   console.log(data);
    // });
    // window.api.send("toMain", "Test");
  };
  return (
    <div>
      <h1 className="text-lg font-semibold HelloWorld">Hello World!</h1>
    </div>
  );
};
export default App;
