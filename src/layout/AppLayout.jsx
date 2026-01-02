import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content grows to fill available space */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default AppLayout;
