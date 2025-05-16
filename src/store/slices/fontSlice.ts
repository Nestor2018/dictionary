import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Definimos los tipos posibles para la fuente
type FontType = "serif" | "sans" | "mono";

// Estado inicial
const initialState: { font: FontType } = {
  font: "serif", // Por defecto usamos serif
};

// Creamos el slice
const fontSlice = createSlice({
  name: "font",
  initialState,
  reducers: {
    setFont: (state, action: PayloadAction<FontType>) => {
      state.font = action.payload;
      
      // Eliminamos todas las clases de fuente primero
      document.documentElement.classList.remove('serif', 'sans', 'mono');
      
      // Aplicamos la clase al HTML para cambiar la fuente
      document.documentElement.classList.add(action.payload);
    },
  },
});

export const { setFont } = fontSlice.actions;
export default fontSlice.reducer;