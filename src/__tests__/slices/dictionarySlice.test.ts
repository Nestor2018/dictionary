import dictionaryReducer, {
  resetState,
  clearHistory,
  addToHistory,
  fetchWord,
} from "../../store/slices/dictionarySlice";
import { DictionaryState } from "../../types/dictionary";

describe("dictionarySlice", () => {
  const initialState: DictionaryState = {
    currentWord: null,
    searchHistory: [],
    status: "idle",
    error: null,
  };

  test("debe manejar el estado inicial", () => {
    expect(dictionaryReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  test("debe manejar resetState", () => {
    const state: DictionaryState = {
      currentWord: {
        word: "test",
        phonetic: "/test/",
        phonetics: [],
        meanings: [],
        sourceUrls: [],
      },
      searchHistory: [{ word: "test", timestamp: new Date() }],
      status: "succeeded",
      error: null,
    };

    expect(dictionaryReducer(state, resetState())).toEqual(initialState);
  });

  test("debe manejar clearHistory", () => {
    const state: DictionaryState = {
      currentWord: {
        word: "test",
        phonetic: "/test/",
        phonetics: [],
        meanings: [],
        sourceUrls: [],
      },
      searchHistory: [{ word: "test", timestamp: new Date() }],
      status: "succeeded",
      error: null,
    };

    expect(dictionaryReducer(state, clearHistory())).toEqual({
      ...state,
      searchHistory: [],
    });
  });

  test("debe manejar addToHistory", () => {
    const state: DictionaryState = {
      currentWord: null,
      searchHistory: [],
      status: "idle",
      error: null,
    };

    const newState = dictionaryReducer(state, addToHistory("test"));

    expect(newState.searchHistory.length).toBe(1);
    expect(newState.searchHistory[0].word).toBe("test");
  });

  test("debe manejar addToHistory con palabra duplicada", () => {
    const oldDate = new Date(2020, 1, 1);
    const state: DictionaryState = {
      currentWord: null,
      searchHistory: [{ word: "test", timestamp: oldDate }],
      status: "idle",
      error: null,
    };

    const newState = dictionaryReducer(state, addToHistory("test"));

    expect(newState.searchHistory.length).toBe(1);
    expect(newState.searchHistory[0].word).toBe("test");
    expect(newState.searchHistory[0].timestamp).not.toEqual(oldDate);
  });

  test("debe manejar fetchWord.pending", () => {
    const action = { type: fetchWord.pending.type };
    const state = dictionaryReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      status: "loading",
      error: null,
    });
  });

  test("debe manejar fetchWord.fulfilled", () => {
    const mockWord = {
      word: "test",
      phonetic: "/test/",
      phonetics: [],
      meanings: [],
      sourceUrls: [],
    };

    const action = {
      type: fetchWord.fulfilled.type,
      payload: mockWord,
    };

    const state = dictionaryReducer(initialState, action);

    expect(state.status).toBe("succeeded");
    expect(state.currentWord).toEqual(mockWord);
    expect(state.searchHistory.length).toBe(1);
    expect(state.searchHistory[0].word).toBe("test");
  });

  test("debe manejar fetchWord.rejected", () => {
    const action = {
      type: fetchWord.rejected.type,
      payload: "Error message",
    };

    const state = dictionaryReducer(initialState, action);

    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error message");
  });
});

