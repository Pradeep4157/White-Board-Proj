import { useRef, useEffect, useContext } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
function Board() {
  const canvasRef = useRef();
  const elements = useContext(boardContext);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle);
    });
  }, [elements]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "red";
    context.fillRect(0, 0, 100, 100);
  });
  const handleBrowseMouseDown = (event) => {
    const clientX = event.clientX;
    const clientY = event.clientY;
    console.log(clientX, clientY);
  };
  return <canvas ref={canvasRef} onMouseDown={handleBrowseMouseDown}></canvas>;
}
export default Board;
