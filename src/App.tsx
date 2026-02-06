import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/hero/Hero";
import Projects from "./components/Projects";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route
        path="/projects"
        element={
          <div className="flex min-h-screen items-center justify-center">
            <Projects />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
