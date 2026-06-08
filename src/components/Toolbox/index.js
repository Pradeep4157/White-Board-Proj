import classes from "./index.module.css";
import {
  COLORS,
  FILL_TOOL_TYPES,
  SIZE_TOOL_TYPES,
  TOOL_ITEMS,
} from "../../constants.js";
import { useContext } from "react";
import boardContext from "../../store/board-context.js";
import toolboxContext from "../../store/toolbox-context.js";
import cx from "classnames";

const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext);
  const { toolboxState, changeStroke, changeFill, changeSize } =
    useContext(toolboxContext);
  const strokeColor = toolboxState[activeToolItem]?.stroke;
  const fillColor = toolboxState[activeToolItem]?.fill;
  let size = toolboxState[activeToolItem]?.size;

  return (
    <div className={classes.container}>
      <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Stroke Color</div>
        <div className={classes.colorsContainer}>
          {Object.keys(COLORS).map((color) => {
            return (
              <div
                className={cx(classes.colorBox, {
                  [classes.activeColorBox]: strokeColor === COLORS[color],
                })}
                style={{ backgroundColor: color }}
                onClick={() => {
                  changeStroke(activeToolItem, COLORS[color]);
                }}
              ></div>
            );
          })}
        </div>
      </div>
      {FILL_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Fill Color</div>
          <div className={classes.colorsContainer}>
            {Object.keys(COLORS).map((color) => {
              return (
                <div
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: fillColor === COLORS[color],
                  })}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    changeFill(activeToolItem, COLORS[color]);
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      )}
      <div>
        {SIZE_TOOL_TYPES.includes(activeToolItem) && (
          <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>
              {activeToolItem === TOOL_ITEMS.TEXT ? "Font Size" : "Brush Size"}
            </div>
            <input
              type="range"
              min={activeToolItem === TOOL_ITEMS.TEXT ? 12 : 1}
              max={activeToolItem === TOOL_ITEMS.TEXT ? 64 : 10}
              step={1}
              value={size}
              onChange={(event) =>
                changeSize(activeToolItem, Number(event.target.value))
              }
            ></input>
          </div>
        )}
      </div>
    </div>
  );
};
export default Toolbox;
