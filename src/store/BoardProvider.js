import boardContext from "./board-context.js";
import { useState, useReducer } from "react";
import { TOOL_ITEMS } from "../constants.js";
const boardReducer = (state, action) => {};
const initialBoardState = {};
const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState,
  );
  //   const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);
  //   const [elements, setElements] = useState([]);

  const handleToolItemClick = (tool) => {
    setActiveToolItem(tool);
  };
  const BoardContextValue = {
    activeToolItem,
    handleToolItemClick,
  };
  return (
    <boardContext.Provider value={BoardContextValue}>
      {children}
    </boardContext.Provider>
  );
};
export default BoardProvider;
