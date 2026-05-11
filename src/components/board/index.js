import { useRef, useEffect, useContext } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
function Board() {
  const canvasRef = useRef();
  const { elements, boardMouseDownHandler } = useContext(boardContext);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle);
    });
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "red";
    context.fillRect(0, 0, 100, 100);
  });
  const handleBrowseMouseDown = (event) => {
    boardMouseDownHandler(event);
  };
  return <canvas ref={canvasRef} onMouseDown={handleBrowseMouseDown}></canvas>;
}
export default Board;
