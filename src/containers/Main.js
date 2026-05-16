import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { settings } from "../portfolio.js";
import PageTransition from "../aurora/PageTransition";

// Route-level code splitting: each page (and its dependencies — chart.js,
// etc.) becomes a separate chunk loaded on demand. The Aurora home
// page is the main entry, so it stays in the initial bundle.
import Home from "../pages/home/HomeComponent";
const Splash = lazy(() => import("../pages/splash/Splash"));
const Education = lazy(() => import("../pages/education/EducationComponent"));
const Experience = lazy(() => import("../pages/experience/Experience"));
const Projects = lazy(() => import("../pages/projects/Projects"));
const Stats = lazy(() => import("../pages/stats/Stats"));
const Contact = lazy(() => import("../pages/contact/ContactComponent"));
const Resume = lazy(() => import("../pages/resume/Resume"));

const RouteFallback = () => null;

export default function Main({ theme, setTheme }) {
  const isSplash = settings.isSplash;
  const themed = (Component) => <Component theme={theme} setTheme={setTheme} />;

  return (
    <div>
      <BrowserRouter basename="/">
        <Suspense fallback={<RouteFallback />}>
          <PageTransition>
            <Routes>
              <Route path="/" element={themed(isSplash ? Splash : Home)} />
              <Route path="/home" element={themed(Home)} />
              <Route path="/splash" element={themed(Splash)} />
              <Route path="/experience" element={themed(Experience)} />
              <Route path="/education" element={themed(Education)} />
              <Route path="/projects" element={themed(Projects)} />
              <Route path="/stats" element={themed(Stats)} />
              <Route path="/contact" element={themed(Contact)} />
              <Route path="/resume" element={themed(Resume)} />
              <Route path="/resume/:id" element={themed(Resume)} />
            </Routes>
          </PageTransition>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
