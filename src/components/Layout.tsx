import { ReactNode } from "react";
import FontSelector from "./ui/FontSelector";
import ThemeToggle from "./ui/ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
      <header className="border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-3xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-slate-800 dark:text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              <line x1="12" y1="6" x2="18" y2="6" />
              <line x1="12" y1="10" x2="18" y2="10" />
              <line x1="12" y1="14" x2="18" y2="14" />
              <line x1="8" y1="6" x2="8" y2="6" />
              <line x1="8" y1="10" x2="8" y2="10" />
              <line x1="8" y1="14" x2="8" y2="14" />
            </svg>
          </div>
          <div className="flex items-center space-x-4">
            <FontSelector />
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;
