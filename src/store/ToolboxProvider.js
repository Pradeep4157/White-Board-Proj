/*
    6:55
*/
import toolboxContext from "./toolbox-context";
import { useReducer } from "react";
import { TOOL_ITEMS, COLORS } from "../constants";
function toolboxReducer(state, action) {
  switch (action.type) {
    case "CHANGE_STROKE": {
      const newState = { ...state };
      newState[action.payload.tool].stroke = action.payload.stroke;
      return newState;
    }
    default:
      return state;
  }
}
const initialToolboxState = {
  [TOOL_ITEMS.LINE]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.RECTANGLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.CIRCLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.ARROW]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
};
const ToolboxProvider = ({ children }) => {
  const [toolboxState, dispatchToolboxAction] = useReducer(
    toolboxReducer,
    initialToolboxState,
  );
  const changeStrokeHandler = (tool, stroke) => {
    dispatchToolboxAction({
      type: "CHANGE_STROKE",
      payload: {
        stroke: stroke,
        tool: tool,
      },
    });
  };
  const toolboxContextValue = {
    toolboxState,
    changeStroke: changeStrokeHandler,
  };
  return (
    <toolboxContext.Provider value={toolboxContextValue}>
      {children}
    </toolboxContext.Provider>
  );
};
export default ToolboxProvider;
