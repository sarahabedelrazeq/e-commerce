import React from "react";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div id="main-layout">
      <header className="mb-5">
        <Announcement />
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
