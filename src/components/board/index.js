import { useRef, useEffect } from "react";
import rough from "roughjs";
function Board() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
