import "./index.css";
import HomePage from "./components/HomePage";
import Header from "./components/Head";
import * as React from "react";
import LandingPage from "./components/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/results",
    element: <LandingPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
