import classes from "./index.module.css";
import cx from "classnames";
import { useContext } from "react";
import { TOOL_ITEMS } from "../../constants.js";
import boardContext from "../../store/board-context.js";
import {
  FaSlash,
  FaRegCircle,
  FaEraser,
  FaArrowRight,
  FaDownload,
  FaFont,
  FaPaintBrush,
  FaUndoAlt,
  FaRedoAlt,
} from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
const Toolbar = () => {
  const { activeToolItem, changeToolHandler } = useContext(boardContext);

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "LINE",
        })}
        onClick={() => {
          changeToolHandler("LINE");
        }}
      >
        <FaSlash />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "RECTANGLE",
        })}
        onClick={() => {
          changeToolHandler("RECTANGLE");
        }}
      >
        <LuRectangleHorizontal />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.CIRCLE,
        })}
        onClick={() => {
          changeToolHandler("CIRCLE");
        }}
      >
        <FaRegCircle />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ARROW,
        })}
        onClick={() => {
          changeToolHandler("ARROW");
        }}
      >
        <FaArrowRight />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.BRUSH,
        })}
        onClick={() => {
          changeToolHandler("BRUSH");
        }}
      >
        <FaPaintBrush />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ERASER,
        })}
        onClick={() => {
          changeToolHandler("ERASER");
        }}
      >
        <FaEraser />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.TEXT,
        })}
        onClick={() => {
          changeToolHandler("TEXT");
        }}
      >
        <FaFont />
      </div>
    </div>
  );
};
export default Toolbar;
