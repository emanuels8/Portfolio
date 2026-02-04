import React from "react";
import "./App.css";
import Hero from "./components/Hero";

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Hero />
    </div>
  );
};

export default App;
