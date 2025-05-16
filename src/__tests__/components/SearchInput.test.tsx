import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "../../components/ui/SearchInput";

describe("SearchInput Component", () => {
  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza correctamente", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        error={null}
      />,
    );

    expect(screen.getByPlaceholderText("keyboard")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  test("muestra error externo cuando se proporciona", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        error="Error externo de prueba"
      />,
    );

    expect(screen.getByText("Error externo de prueba")).toBeInTheDocument();
  });

  test("llama a onChange cuando se escribe en el input", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        error={null}
      />,
    );

    const input = screen.getByPlaceholderText("keyboard");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockOnChange).toHaveBeenCalledWith("test");
  });

  test("llama a onSearch cuando se presiona Enter con un valor válido", () => {
    render(
      <SearchInput
        value="valid"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        error={null}
      />,
    );

    const input = screen.getByPlaceholderText("keyboard");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnSearch).toHaveBeenCalled();
  });

  test("muestra error cuando se intenta buscar con un campo vacío", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        error={null}
      />,
    );

    const input = screen.getByPlaceholderText("keyboard");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(
      screen.getByText("No puedes buscar una palabra vacía"),
    ).toBeInTheDocument();
  });

  test("muestra error cuando se ingresan caracteres no permitidos", () => {
    render(
      <SearchInput
        value="test123"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        error={null}
      />,
    );

    const input = screen.getByPlaceholderText("keyboard");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(
      screen.getByText("Por favor, ingresa solo letras, espacios o guiones"),
    ).toBeInTheDocument();
  });

  test("llama a onSearch cuando se hace clic en el botón de búsqueda con un valor válido", () => {
    render(
      <SearchInput
        value="valid"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        error={null}
      />,
    );

    const button = screen.getByRole("button", { name: "Buscar" });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalled();
  });
});

