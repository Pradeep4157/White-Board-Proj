import boardContext from "./board-context.js";
import { useReducer } from "react";
import { TOOL_ITEMS } from "../constants.js";
import rough from "roughjs/bin/rough";
const gen = rough.generator();
const boardReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TOOL": {
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    }
    case "DRAW_DOWN": {
      const newElement = {
        id: state.elements.length,
        x1: action.payload.clientX,
        y1: action.payload.clientY,
        x2: action.payload.clientX,
        y2: action.payload.clientY,
        roughEle: gen.line(
          action.payload.clientX,
          action.payload.clientY,
          action.payload.clientX,
          action.payload.clientY,
        ),
      };

      return { ...state, elements: [...state.elements, newElement] };
    }
    case "DRAW_MOVE": {
      if (state.elements.length === 0) {
        return state;
      }
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      newElements[index].x2 = clientX;
      newElements[index].y2 = clientY;
      newElements[index].roughEle = gen.line(
        newElements[index].x1,
        newElements[index].y1,
        clientX,
        clientY,
      );
      return {
        ...state,
        elements: newElements,
      };
    }
    default:
      return state;
  }
};
const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  elements: [],
};

const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState,
  );

  const boardMouseDownHandler = (event) => {
    const { clientX, clientY } = event;

    dispatchBoardAction({
      type: "DRAW_DOWN",
      payload: {
        clientX,
        clientY,
      },
    });
  };
  const boardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;
    dispatchBoardAction({
      type: "DRAW_MOVE",
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const changeToolHandler = (tool) => {
    dispatchBoardAction({
      type: "CHANGE_TOOL",
      payload: {
        tool,
      },
    });
  };

  const BoardContextValue = {
    activeToolItem: boardState.activeToolItem,
    changeToolHandler,
    elements: boardState.elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
  };
  return (
    <boardContext.Provider value={BoardContextValue}>
      {children}
    </boardContext.Provider>
  );
};
export default BoardProvider;
