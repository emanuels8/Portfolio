import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/hero/Hero";
import Work from "./components/Work";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/work"
          element={
            <div className="flex min-h-screen flex-col bg-[#0c1220]">
              <div className="flex flex-1 items-center justify-center">
                <Work />
              </div>
              <Footer />
            </div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
