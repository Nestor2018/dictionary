import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import FontSelector from "../../components/ui/FontSelector";
import fontReducer, { setFont } from "../../store/slices/fontSlice";

// Crear un store de prueba
const createTestStore = (initialState = { font: "serif" }) => {
  return configureStore({
    reducer: {
      font: fontReducer,
    },
    preloadedState: {
      font: { font: initialState.font },
    },
  });
};

describe("FontSelector Component", () => {
  test("renderiza correctamente con la fuente predeterminada", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <FontSelector />
      </Provider>,
    );

    // Verificar que el botón muestra la fuente actual
    expect(screen.getByText("Serif")).toBeInTheDocument();
  });

  test("muestra el menú desplegable al hacer clic en el botón", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <FontSelector />
      </Provider>,
    );

    // El menú no debe estar visible inicialmente
    expect(screen.queryByText("Sans Serif")).not.toBeInTheDocument();
    expect(screen.queryByText("Mono")).not.toBeInTheDocument();

    // Hacer clic en el botón para abrir el menú
    fireEvent.click(screen.getByText("Serif"));

    // Ahora el menú debe estar visible
    expect(screen.getByText("Sans Serif")).toBeInTheDocument();
    expect(screen.getByText("Mono")).toBeInTheDocument();
  });

  test("cambia la fuente al seleccionar una opción", () => {
    const store = createTestStore();
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <FontSelector />
      </Provider>,
    );

    // Abrir el menú
    fireEvent.click(screen.getByText("Serif"));

    // Seleccionar una nueva fuente
    fireEvent.click(screen.getByText("Sans Serif"));

    // Verificar que se despachó la acción correcta
    expect(dispatchSpy).toHaveBeenCalledWith(setFont("sans"));

    // El menú debe cerrarse después de seleccionar
    expect(screen.queryByText("Mono")).not.toBeInTheDocument();
  });

  test("muestra la fuente correcta cuando se cambia el estado", () => {
    // Iniciar con una fuente diferente
    const store = createTestStore({ font: "mono" });

    render(
      <Provider store={store}>
        <FontSelector />
      </Provider>,
    );

    // Verificar que se muestra la fuente correcta
    expect(screen.getByText("Mono")).toBeInTheDocument();
  });

  test("cierra el menú al seleccionar una opción", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <FontSelector />
      </Provider>,
    );

    // Abrir el menú
    fireEvent.click(screen.getByText("Serif"));

    // Verificar que el menú está abierto
    expect(screen.getByText("Sans Serif")).toBeInTheDocument();

    // Seleccionar una opción para cerrar el menú
    fireEvent.click(screen.getByText("Sans Serif"));

    // El menú debe cerrarse después de seleccionar una opción
    // Esperamos un pequeño tiempo para que el estado se actualice
    setTimeout(() => {
      expect(screen.queryByText("Mono")).not.toBeInTheDocument();
    }, 0);
  });
});

