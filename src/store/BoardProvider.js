/*26:34 */
import boardContext from "./board-context.js";
import { useReducer } from "react";

import { TOOL_ITEMS, TOOL_ACTION_TYPES } from "../constants.js";
import { createElement } from "../utils/elements.js";
import { getSvgPathFromStroke } from "../utils/elements.js";
import { BOARD_ACTIONS } from "../constants.js";
import { getStroke } from "perfect-freehand";
import { isPointNearElement } from "../utils/elements.js";
const boardReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TOOL": {
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.NONE,
        activeToolItem: action.payload.tool,
      };
    }
    case BOARD_ACTIONS.CHANGE_ACTION_TYPE: {
      return {
        ...state,
        toolActionType: action.payload.actionType,
      };
    }
    case "DRAW_DOWN": {
      const { id, x1, y1, x2, y2, stroke, fill, size } = action.payload;
      const newElement = createElement(id, x1, y1, x2, y2, {
        type: state.activeToolItem,
        stroke: stroke,
        fill: fill,
        size: size,
      });
      return {
        ...state,
        toolActionType:
          state.activeToolItem === TOOL_ITEMS.TEXT
            ? TOOL_ACTION_TYPES.WRITING
            : TOOL_ACTION_TYPES.DRAWING,
        elements: [...state.elements, newElement],
      };
    }
    case BOARD_ACTIONS.ERASE: {
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements].filter((element) => {
        return !isPointNearElement(element, clientX, clientY);
      });
      return { ...state, elements: newElements };
    }
    case "DRAW_MOVE": {
      // if (
      //   state.elements.length === 0 ||
      //   state.toolActionType !== TOOL_ACTION_TYPES.DRAWING
      // ) {
      //   return state;
      // }
      const { clientX, clientY } = action.payload;

      const index = state.elements.length - 1;
      const newElements = [...state.elements];
      const { type } = newElements[index];

      switch (type) {
        case TOOL_ITEMS.LINE:
          newElements[index].x2 = clientX;
          newElements[index].y2 = clientY;
          newElements[index] = createElement(
            index,
            newElements[index].x1,
            newElements[index].y1,
            clientX,
            clientY,
            {
              type: state.activeToolItem,
              stroke: newElements[index].stroke,
              fill: newElements[index].fill,
              size: newElements[index].size,
            },
          );
          return {
            ...state,
            elements: newElements,
          };
        case TOOL_ITEMS.RECTANGLE:
          newElements[index].x2 = clientX;
          newElements[index].y2 = clientY;
          newElements[index] = createElement(
            index,
            newElements[index].x1,
            newElements[index].y1,
            clientX,
            clientY,
            {
              type: state.activeToolItem,
              stroke: newElements[index].stroke,
              fill: newElements[index].fill,
              size: newElements[index].size,
            },
          );
          return {
            ...state,
            elements: newElements,
          };
        case TOOL_ITEMS.CIRCLE:
          newElements[index].x2 = clientX;
          newElements[index].y2 = clientY;
          newElements[index] = createElement(
            index,
            newElements[index].x1,
            newElements[index].y1,
            clientX,
            clientY,
            {
              type: state.activeToolItem,
              stroke: newElements[index].stroke,
              fill: newElements[index].fill,
              size: newElements[index].size,
            },
          );
          return {
            ...state,
            elements: newElements,
          };
        case TOOL_ITEMS.ARROW:
          newElements[index].x2 = clientX;
          newElements[index].y2 = clientY;
          newElements[index] = createElement(
            index,
            newElements[index].x1,
            newElements[index].y1,
            clientX,
            clientY,
            {
              type: state.activeToolItem,
              stroke: newElements[index].stroke,
              fill: newElements[index].fill,
              size: newElements[index].size,
            },
          );
          return {
            ...state,
            elements: newElements,
          };
        case TOOL_ITEMS.BRUSH:
          newElements[index].points = [
            ...newElements[index].points,
            { x: clientX, y: clientY },
          ];
          newElements[index].path = new Path2D(
            getSvgPathFromStroke(getStroke(newElements[index].points)),
          );
          return { ...state, elements: newElements };

        default:
          break;
      }
      break;
    }
    case BOARD_ACTIONS.CHANGE_TEXT: {
      const index = state.elements.length - 1;
      const newElements = [...state.elements];
      newElements[index].text = action.payload.text;
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.NONE,
        elements: newElements,
      };
    }

    default:
      throw new Error("error in boardReducer");
  }
};
const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  toolActionType: TOOL_ACTION_TYPES.NONE,
  elements: [],
};

const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState,
  );

  const boardMouseDownHandler = (event, toolboxState) => {
    // if (boardState.activeToolItem === TOOL_ITEMS.TEXT) {
    //   dispatchBoardAction({
    //     type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
    //     payload: {
    //       actionType: TOOL_ACTION_TYPES.WRITING,
    //     },
    //   });
    //   return;
    // }
    if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
    const { clientX, clientY } = event;
    if (boardState.activeToolItem === TOOL_ITEMS.ERASER) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
        payload: {
          actionType: TOOL_ACTION_TYPES.ERASING,
        },
      });
      return;
    }

    dispatchBoardAction({
      type: "DRAW_DOWN",
      payload: {
        id: Date.now(),
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        stroke: toolboxState[boardState.activeToolItem]?.stroke,
        fill: toolboxState[boardState.activeToolItem]?.fill,
        size: toolboxState[boardState.activeToolItem]?.size,
      },
    });
  };
  const boardMouseUpHandler = () => {
    console.log("mouseup");
    console.log(boardState.activeToolItem);
    console.log(boardState.toolActionType);
    if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
      payload: {
        actionType: TOOL_ACTION_TYPES.NONE,
      },
    });
  };
  const boardMouseMoveHandler = (event) => {
    if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
    const { clientX, clientY } = event;
    if (boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING) {
      dispatchBoardAction({
        type: "DRAW_MOVE",
        payload: {
          clientX,
          clientY,
        },
      });
    } else if (boardState.toolActionType === TOOL_ACTION_TYPES.ERASING) {
      dispatchBoardAction({
        type: "ERASE",
        payload: {
          clientX,
          clientY,
        },
      });
    }
  };

  const changeToolHandler = (tool) => {
    dispatchBoardAction({
      type: "CHANGE_TOOL",
      payload: {
        tool,
      },
    });
  };
  const textAreaBlurHandler = (text) => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_TEXT,
      payload: {
        text,
      },
    });
  };
  const BoardContextValue = {
    activeToolItem: boardState.activeToolItem,
    changeToolHandler,
    elements: boardState.elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    toolActionType: boardState.toolActionType,
  };
  return (
    <boardContext.Provider value={BoardContextValue}>
      {children}
    </boardContext.Provider>
  );
};
export default BoardProvider;
