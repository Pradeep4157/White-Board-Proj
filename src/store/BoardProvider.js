import boardContext from "./board-context.js";
import { useReducer } from "react";
import { TOOL_ITEMS } from "../constants.js";
const boardReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TOOL":
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
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

  //   const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);
  //   const [elements, setElements] = useState([]);

  const handleToolItemClick = (tool) => {
    dispatchBoardAction({
      type: "CHANGE_TOOL",
      payload: {
        tool,
      },
    });
  };

  const BoardContextValue = {
    activeToolItem: boardState.activeToolItem,
    handleToolItemClick,
  };
  return (
    <boardContext.Provider value={BoardContextValue}>
      {children}
    </boardContext.Provider>
  );
};
export default BoardProvider;
