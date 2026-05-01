import { useRef, useEffect } from "react";
import rough from "roughjs";
function Board() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.widht = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    context.fillStyle = "red";
    context.fillRect(0, 0, 100, 100);
  });
  return <canvas ref={canvasRef}></canvas>;
}
export default Board;
