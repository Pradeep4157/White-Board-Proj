import { useRef, useEffect } from "react";
import rough from "roughjs";
import Board from "./components/Board";
import ToolBar from "./components/ToolBar";
import BoardProvider from "./store/BoardProvider.js";
import ToolboxProvider from "./store/ToolboxProvider.js";
import Toolbox from "./components/Toolbox/index.js";
function App() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <ToolBar />
        <Board />
        <Toolbox />
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default App;
