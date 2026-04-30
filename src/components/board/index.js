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
    context.fillRect(0, 0, 150, 75);
    // making shapes using roughjs..
    const roughCanvas = rough.canvas(canvas);
    const generator = roughCanvas.generator;
    let rect1 = generator.rectangle(100, 80, 100, 100);
    let rect2 = generator.rectangle(10, 150, 130, 140, { fill: "red" });
    roughCanvas.draw(rect1);
    roughCanvas.draw(rect2);
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}

export default Board;
