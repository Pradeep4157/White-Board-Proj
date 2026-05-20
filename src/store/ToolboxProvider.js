import toolboxContext from "./toolbox-context";
import { useReducer } from "react";
import { TOOL_ITEMS, COLORS } from "../constants";
function toolboxReducer() {}
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
};
const ToolboxProvider = ({ children }) => {
  const [toolboxState, dispatchToolboxAction] = useReducer(
    toolboxReducer,
    initialToolboxState,
  );
  return (
    <toolboxContext.Provider value={toolboxContext}>
      {children}
    </toolboxContext.Provider>
  );
};
export default ToolboxProvider;
