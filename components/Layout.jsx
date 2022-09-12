import React from "react";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";

export default function Layout({ children }) {
  return (
    <div id="main-layout">
      <header>
        <Announcement />
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Newsletter />
        <Footer />
      </footer>
    </div>
  );
}
