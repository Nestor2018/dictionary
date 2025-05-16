import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../hooks/useRedux";
import FontSelector from "./ui/FontSelector";
import ThemeToggle from "./ui/ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme } = useAppSelector((state) => state.theme);

  // Aplicar la clase dark al elemento HTML cuando el tema es oscuro
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
      <header className="border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-3xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Diccionario</h1>
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
