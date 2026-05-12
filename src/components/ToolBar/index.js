import React, { useState } from "react";
import classes from "./index.module.css";
import cx from "classnames";
import { useContext } from "react";
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
    </div>
  );
};
export default Toolbar;
