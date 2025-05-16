import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { setTheme, toggleTheme } from "../../store/slices/themeSlice";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  console.log("theme", theme);
  const isDarkMode = theme === "dark";
  console.log("isDarkMode", isDarkMode);

  useEffect(() => {
    console.log("useEffect theme", theme);
    // Verificar si el usuario tiene preferencia de tema oscuro
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (prefersDarkMode) {
      dispatch(setTheme("light"));
    }
  }, []);

  const handleToggleTheme = () => {
    console.log("click");
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleToggleTheme}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
          isDarkMode ? "bg-purple-500" : "bg-gray-300"
        }`}
        role="switch"
        aria-checked={isDarkMode}
      >
        <span
          className={`${
            isDarkMode ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </button>
      <span className="text-xs">
        {isDarkMode ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill="#6B7280"
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default ThemeToggle;

