import React from "react";
import Header from "../components/Header";
import ChartWidget from "../components/ChartWidget";
import dynamic from "next/dynamic";
import VueWidgetLoader from "../components/VueWidgetLoader";
import SvelteWidgetLoader from "../components/SvelteWidgetLoader";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <section>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="text-slate-600 mt-2">Interactive dashboard visualizing celestial brightness and moon phases. Built to demonstrate cross-framework widgets and robust front-end architecture.</p>
          </section>

          <ChartWidget />

          <section id="widgets" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VueWidgetLoader />
            <SvelteWidgetLoader />
          </section>

          <section id="about" className="card">
            <h3 className="font-semibold">About this demo</h3>
            <ul className="mt-2 list-disc list-inside text-sm text-slate-600">
              <li>Next.js + TypeScript host</li>
              <li>React + Redux Toolkit for data fetching and application state</li>
              <li>Chart.js for charts</li>
              <li>Vue & Svelte widgets exported as web components (demo)</li>
              <li>TailwindCSS + Material UI available for styling</li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-sm text-slate-600">
          © {new Date().getFullYear()} Cosmic Cutie — Demo
        </div>
      </footer>
    </>
  );
}