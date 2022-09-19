import React from "react";
import logoImg from "./assets/logo.png";
export default function Navigation() {
  return (
    <header>
      <nav className="mycontainer my-10">
        <div className=" p-4 flex items-center justify-center">
          <a href="/" id="logo" className="flex items-center gap-0.5">
            <img src={logoImg} id="logo-img" className="w-16" alt="logo" />
            <span id="logo-text" className="text-2xl">
              DailyBlog
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
