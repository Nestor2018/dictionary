import { render, screen } from "@testing-library/react";
import DictionaryResult from "../../components/DictionaryResult";
import { WordData } from "../../types/dictionary";

// Mock del componente AudioButton para simplificar las pruebas
jest.mock("../../components/ui/AudioButton", () => {
  return function MockAudioButton({ audioUrl }: { audioUrl: string }) {
    return (
      <button data-testid="audio-button" data-audio-url={audioUrl}>
        Play
      </button>
    );
  };
});

describe("DictionaryResult Component", () => {
  // Datos de prueba para una palabra
  const mockWordData: WordData = {
    word: "keyboard",
    phonetic: "/ˈkiːbɔːd/",
    phonetics: [
      {
        text: "/ˈkiːbɔːd/",
        audio: "https://example.com/audio/keyboard.mp3",
      },
    ],
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition:
              "Un dispositivo con teclas para operar una computadora.",
            example: "Escribió el documento usando el keyboard.",
          },
          {
            definition: "Un instrumento musical con teclas.",
            example: null,
          },
        ],
        synonyms: ["teclado", "piano"],
      },
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Escribir usando un teclado.",
            example: null,
          },
        ],
        synonyms: [],
      },
    ],
    sourceUrls: ["https://en.wiktionary.org/wiki/keyboard"],
  };

  test("renderiza correctamente la palabra y su fonética", () => {
    render(<DictionaryResult data={mockWordData} />);

    expect(screen.getByText("keyboard")).toBeInTheDocument();
    expect(screen.getByText("/ˈkiːbɔːd/")).toBeInTheDocument();
  });

  test("renderiza el botón de audio cuando hay URL de audio disponible", () => {
    render(<DictionaryResult data={mockWordData} />);

    const audioButton = screen.getByTestId("audio-button");
    expect(audioButton).toBeInTheDocument();
    expect(audioButton).toHaveAttribute(
      "data-audio-url",
      "https://example.com/audio/keyboard.mp3",
    );
  });

  test("no renderiza el botón de audio cuando no hay URL de audio", () => {
    const dataWithoutAudio = {
      ...mockWordData,
      phonetics: [{ text: "/ˈkiːbɔːd/", audio: "" }],
    };

    render(<DictionaryResult data={dataWithoutAudio} />);

    expect(screen.queryByTestId("audio-button")).not.toBeInTheDocument();
  });

  test("renderiza todas las partes del discurso (parts of speech)", () => {
    render(<DictionaryResult data={mockWordData} />);

    expect(screen.getByText("noun")).toBeInTheDocument();
    expect(screen.getByText("verb")).toBeInTheDocument();
  });

  test("renderiza todas las definiciones", () => {
    render(<DictionaryResult data={mockWordData} />);

    expect(
      screen.getByText(
        "Un dispositivo con teclas para operar una computadora.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un instrumento musical con teclas."),
    ).toBeInTheDocument();
    expect(screen.getByText("Escribir usando un teclado.")).toBeInTheDocument();
  });

  test("renderiza ejemplos cuando están disponibles", () => {
    render(<DictionaryResult data={mockWordData} />);

    expect(
      screen.getByText('"Escribió el documento usando el keyboard."'),
    ).toBeInTheDocument();
  });

  test("renderiza sinónimos cuando están disponibles", () => {
    render(<DictionaryResult data={mockWordData} />);

    expect(screen.getByText("Synonyms")).toBeInTheDocument();
    expect(screen.getByText("teclado")).toBeInTheDocument();
    expect(screen.getByText("piano")).toBeInTheDocument();
  });

  test("renderiza la URL de la fuente cuando está disponible", () => {
    render(<DictionaryResult data={mockWordData} />);

    const sourceLink = screen.getByText(
      "https://en.wiktionary.org/wiki/keyboard",
    );
    expect(sourceLink).toBeInTheDocument();
    expect(sourceLink).toHaveAttribute(
      "href",
      "https://en.wiktionary.org/wiki/keyboard",
    );
    expect(sourceLink).toHaveAttribute("target", "_blank");
    expect(sourceLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("no renderiza la sección de fuente cuando no hay URLs disponibles", () => {
    const dataWithoutSource = {
      ...mockWordData,
      sourceUrls: [],
    };

    render(<DictionaryResult data={dataWithoutSource} />);

    expect(screen.queryByText("Source")).not.toBeInTheDocument();
  });
});
