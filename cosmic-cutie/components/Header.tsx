import React from "react";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-cosmic-500">Cosmic Cutie</h1>
        <nav className="text-sm text-slate-600">
          <a className="mr-4 hover:underline" href="#dashboard">Dashboard</a>
          <a className="mr-4 hover:underline" href="#widgets">Widgets</a>
          <a className="hover:underline" href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}