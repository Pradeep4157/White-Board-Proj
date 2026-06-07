/* 24:05 */
import { useRef, useLayoutEffect, useContext, useEffect } from "react";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants.js";
import rough from "roughjs";
import toolboxContext from "../../store/toolbox-context.js";
import boardContext from "../../store/board-context";
import classes from "./index.module.css";

function Board() {
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    toolActionType,
  } = useContext(boardContext);
  const { toolboxState } = useContext(toolboxContext);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          roughCanvas.draw(element.roughEle);
          break;
        case TOOL_ITEMS.BRUSH:
          context.fillStyle = element.stroke;
          context.fill(element.path);
          context.restore();
          break;
        case TOOL_ITEMS.TEXT:
          break;
        default:
          throw new Error("error in useLayoutEffect");
      }
    });
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);
  // useLayoutEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   context.fillStyle = "red";
  //   context.fillRect(0, 0, 100, 100);
  // });
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (toolActionType === TOOL_ACTION_TYPES.WRITING) {
      textArea.focus();
    }
  }, [toolActionType]);
  const handleMouseDown = (event) => {
    console.log("calling mouse down...");
    boardMouseDownHandler(event, toolboxState);
  };
  const handleMouseMove = (event) => {
    boardMouseMoveHandler(event);
  };
  const handleMouseUp = () => {
    boardMouseUpHandler();
  };
  return (
    <>
      {toolActionType === TOOL_ACTION_TYPES.WRITING && (
        <textarea
          type="text"
          ref={textAreaRef}
          className={classes.textElementBox}
          style={{
            top: elements[elements.length - 1].y1,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1].textEle?.size}px`,
            color: elements[elements.length - 1].textEle?.stroke,
          }}
          // onBlur = {(event) => textAreaBlur(event.target.value)}
        ></textarea>
      )}
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </>
  );
}
export default Board;
