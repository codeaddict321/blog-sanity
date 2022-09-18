import React from "react";

export default function Navigation() {
  return (
    <header>
      <nav className="mycontainer">
        <div className=" p-4 flex items-center justify-center">
          <a href="/" id="logo" className="flex items-center gap-0.5">
            <img src="/logo.png" id="logo-img" className="w-16" alt="logo" />
            <span id="logo-text" className="text-2xl">
              DailyBlog
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
