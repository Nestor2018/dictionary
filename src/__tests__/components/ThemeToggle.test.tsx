import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ThemeToggle from "../../components/ui/ThemeToggle";
import { toggleTheme } from "../../store/slices/themeSlice";

// Mock de matchMedia
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

const mockStore = configureStore([]);

describe("ThemeToggle Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      theme: {
        theme: "light",
      },
    });
    store.dispatch = jest.fn();
  });

  test("renderiza correctamente en modo claro", () => {
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>,
    );

    const toggleButton = screen.getByRole("switch");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-checked", "false");
  });

  test("renderiza correctamente en modo oscuro", () => {
    store = mockStore({
      theme: {
        theme: "dark",
      },
    });

    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>,
    );

    const toggleButton = screen.getByRole("switch");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-checked", "true");
  });

  test("dispara la acción toggleTheme cuando se hace clic en el botón", () => {
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>,
    );

    const toggleButton = screen.getByRole("switch");
    fireEvent.click(toggleButton);

    expect(store.dispatch).toHaveBeenCalledWith(toggleTheme());
  });
});

