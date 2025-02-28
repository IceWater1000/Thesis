import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import "./index.css";
import App from "./App.tsx";
import External from "./External/External.tsx";
import Internal from "./Internal.tsx";
import FuncContArea from "./funcContArea/FuncContArea.tsx";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import { DataProvider } from "./DataContext.tsx";
import Home from "./External/Home/Home.tsx";
import DemographicProfile from "./External/DemographicProfile/DemographicProfile.tsx";
import BarangayPersonel from "./External/BarangayPersonel/BarangayPersonel.tsx";
import Announcements from "./External/Announcements/Announcements.tsx";
import Projects from "./External/Projects/Projects.tsx";
import Ordinances from "./External/Ordinances/Ordinances.tsx";
import Maps from "./External/Maps/Maps.tsx";
import ProjectSpecificDetails from "./External/Projects/ProjectSpecificDetails.tsx";
// Mock authentication state for example purposes
let isLoggedIN = false; // Replace this with actual authentication logic

const setLoggedIN = () => {
  isLoggedIN = !isLoggedIN;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <External />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "DemographicProfile",
        element: <DemographicProfile />,
      },
      {
        path: "BarangayPersonel",
        element: <BarangayPersonel />,
      },
      {
        path: "Announcements",
        element: <Announcements />,
      },
      {
        path: "Projects",
        element: <Projects />,
      },
      {
        path: "Projects/:projTitle",
        element: <ProjectSpecificDetails />,
      },
      {
        path: "Ordinances",
        element: <Ordinances />,
      },
      {
        path: "Maps",
        element: <Maps />,
      },
    ],
  },
  {
    path: "/internal",
    element: (
      <ProtectedRoute isLoggedIN={isLoggedIN}>
        <Internal />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <FuncContArea />,
      },
      {
        path: "Dashboard",
        element: <FuncContArea />,
      },
      {
        path: "Residents-Information",
        element: <FuncContArea />,
      },
      {
        path: "Household-Record",
        element: <FuncContArea />,
      },
      {
        path: "Household-Members",
        element: <FuncContArea />,
      },
      {
        path: "Senior-Citizens",
        element: <FuncContArea />,
      },
      {
        path: "KK-Members",
        element: <FuncContArea />,
      },
      {
        path: "Lupon-Records",
        element: <FuncContArea />,
      },
      {
        path: "Certificate-Issuances",
        element: <FuncContArea />,
      },
      {
        path: "Accounts",
        element: <FuncContArea />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
