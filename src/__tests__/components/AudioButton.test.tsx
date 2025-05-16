import { render, screen, fireEvent } from "@testing-library/react";
import AudioButton from "../../components/ui/AudioButton";

// Mock para el objeto Audio
window.HTMLMediaElement.prototype.play = jest
  .fn()
  .mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = jest.fn();

describe("AudioButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza correctamente", () => {
    render(<AudioButton audioUrl="https://example.com/audio.mp3" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("inicia la reproducción cuando se hace clic en el botón", () => {
    render(<AudioButton audioUrl="https://example.com/audio.mp3" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  test("pausa la reproducción cuando se hace clic en el botón mientras está reproduciendo", () => {
    render(<AudioButton audioUrl="https://example.com/audio.mp3" />);

    const button = screen.getByRole("button");

    // Primer clic para iniciar
    fireEvent.click(button);

    // Segundo clic para pausar
    fireEvent.click(button);

    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  test("maneja errores de reproducción", async () => {
    // Sobrescribir la implementación para simular un error
    window.HTMLMediaElement.prototype.play = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject(new Error("Error de reproducción")),
      );

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<AudioButton audioUrl="https://example.com/audio.mp3" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Esperar a que se resuelva la promesa rechazada
    await Promise.resolve();

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
