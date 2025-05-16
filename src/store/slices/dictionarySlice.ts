import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  DictionaryState,
  WordData,
  SearchHistoryItem,
} from "../../types/dictionary";

// Thunk para buscar una palabra
export const fetchWord = createAsyncThunk(
  "dictionary/fetchWord",
  async (word: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );

      if (!response.ok) {
        // Si la respuesta no es exitosa, lanzamos un error
        return rejectWithValue("No se encontró la palabra en el diccionario");
      }

      const data = await response.json();
      return data[0] as WordData; // Tomamos el primer resultado
    } catch (error) {
      return rejectWithValue(
        "Error al conectar con el servicio de diccionario",
      );
    }
  },
);

const initialState: DictionaryState = {
  currentWord: null,
  searchHistory: [],
  status: "idle",
  error: null,
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    resetState: () => initialState,
    clearHistory: (state) => {
      state.searchHistory = [];
    },
    addToHistory: (state, action: PayloadAction<string>) => {
      const newItem: SearchHistoryItem = {
        word: action.payload,
        timestamp: new Date(),
      };

      // Evitar duplicados (si ya existe la palabra, la movemos al principio)
      state.searchHistory = [
        newItem,
        ...state.searchHistory.filter((item) => item.word !== action.payload),
      ].slice(0, 10); // Limitamos a 10 elementos
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWord.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentWord = action.payload;
        // Añadimos la palabra al historial
        const newItem: SearchHistoryItem = {
          word: action.payload.word,
          timestamp: new Date(),
        };
        state.searchHistory = [
          newItem,
          ...state.searchHistory.filter(
            (item) => item.word !== action.payload.word,
          ),
        ].slice(0, 10);
      })
      .addCase(fetchWord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetState, clearHistory, addToHistory } =
  dictionarySlice.actions;
export default dictionarySlice.reducer;

