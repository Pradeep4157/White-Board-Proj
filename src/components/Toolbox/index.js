/*
  08:10
*/
import classes from "./index.module.css";
import { COLORS, FILL_TOOL_TYPES } from "../../constants.js";
import { useContext } from "react";
import boardContext from "../../store/board-context.js";
import toolboxContext from "../../store/toolbox-context.js";
import cx from "classnames";

const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext);
  const { toolboxState, changeStroke, changeFill } = useContext(toolboxContext);
  const strokeColor = toolboxState[activeToolItem]?.stroke;
  const fillColor = toolboxState[activeToolItem]?.fill;

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
    </div>
  );
};
export default Toolbox;
