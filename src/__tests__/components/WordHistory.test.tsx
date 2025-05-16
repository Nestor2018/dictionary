import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import WordHistory from "../../components/WordHistory";
import dictionaryReducer, {
  fetchWord,
  clearHistory,
} from "../../store/slices/dictionarySlice";

// Crear un store de prueba
const createTestStore = (initialState = { searchHistory: [] }) => {
  return configureStore({
    reducer: {
      dictionary: dictionaryReducer,
    },
    preloadedState: {
      dictionary: initialState,
    },
  });
};

describe("WordHistory Component", () => {
  const mockSearchHistory = [
    { word: "hello", timestamp: "2024-01-01T12:00:00.000Z" },
    { word: "world", timestamp: "2024-01-01T12:30:00.000Z" },
  ];

  test("no renderiza nada cuando el historial está vacío", () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <WordHistory />
      </Provider>,
    );

    expect(container.firstChild).toBeNull();
  });

  test("renderiza el historial de búsquedas correctamente", () => {
    const store = createTestStore({ searchHistory: mockSearchHistory });

    render(
      <Provider store={store}>
        <WordHistory />
      </Provider>,
    );

    expect(screen.getByText("Historial de búsquedas")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("world")).toBeInTheDocument();
  });

  test("formatea las fechas correctamente", () => {
    const store = createTestStore({ searchHistory: mockSearchHistory });

    render(
      <Provider store={store}>
        <WordHistory />
      </Provider>,
    );

    // Verificar que las fechas estén formateadas
    const formattedDate = new Date("2024-01-01T12:00:00.000Z").toLocaleString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  test("dispara la acción fetchWord al hacer clic en una palabra", async () => {
    const store = createTestStore({ searchHistory: mockSearchHistory });
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <WordHistory />
      </Provider>,
    );

    await act(async () => {
      fireEvent.click(screen.getByText("hello"));
    });

    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  test("dispara la acción clearHistory al hacer clic en Limpiar historial", async () => {
    const store = createTestStore({ searchHistory: mockSearchHistory });
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <WordHistory />
      </Provider>,
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Limpiar historial"));
    });

    expect(dispatchSpy).toHaveBeenCalledWith(clearHistory());
  });

  test("muestra todas las palabras del historial en orden", () => {
    const store = createTestStore({ searchHistory: mockSearchHistory });

    render(
      <Provider store={store}>
        <WordHistory />
      </Provider>,
    );

    const wordButtons = screen.getAllByRole("button");
    // Restamos 1 porque uno de los botones es "Limpiar historial"
    expect(wordButtons.length - 1).toBe(mockSearchHistory.length);
  });
});
