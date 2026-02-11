import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const Hero = lazy(() => import("./components/hero/Hero"));
const Work = lazy(() => import("./components/Work"));
const Footer = lazy(() => import("./components/Footer"));
const NotFound = lazy(() => import("./components/NotFound"));

const App: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0c1220]" />
      }
    >
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/work"
          element={
            <main className="flex min-h-screen flex-col bg-[#0c1220]">
              <div className="flex flex-1 items-center justify-center">
                <Work />
              </div>
              <Footer />
            </main>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
