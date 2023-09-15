import React from "react";
import Router from "./Router";

function App() {
  let admin = localStorage.getItem("admin");
  return (
    <>
      <Router />
    </>
  );
}
export default App;
