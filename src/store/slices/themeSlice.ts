import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Definimos los tipos posibles para el tema
type Theme = "light" | "dark";

// Estado inicial
const initialState: { theme: Theme } = {
  theme: "light", // Por defecto usamos el tema claro
};

// Creamos el slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;

      // Aplicamos la clase al HTML para el tema oscuro
      if (action.payload === "dark") {
        document.documentElement.classList.add("dark");
        // document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        // document.documentElement.setAttribute("data-theme", "light");
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";

      // Aplicamos la clase al HTML para el tema oscuro
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
        // document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        // document.documentElement.setAttribute("data-theme", "light");
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

