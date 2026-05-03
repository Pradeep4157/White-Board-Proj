import { useRef, useEffect } from "react";
import rough from "roughjs";
import Board from "./components/board";
import ToolBar from "./components/ToolBar";
import BoardProvider from "./store/BoardProvider.js";
function App() {
  return (
    <BoardProvider>
      <ToolBar />
      <Board />
    </BoardProvider>
  );
}

export default App;
