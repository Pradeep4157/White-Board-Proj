/*
    15:11
*/
import classes from "./index.module.css";
import { COLORS } from "../../constants.js";
import { useContext } from "react";
import boardContext from "../../store/board-context.js";
import toolboxContext from "../../store/toolbox-context.js";
import cx from "classnames";

const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext);
  const { toolboxState, changeStroke } = useContext(toolboxContext);
  const strokeColor = toolboxState[activeToolItem]?.stroke;
  return (
    <div className={classes.container}>
      <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Stroke</div>
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
    </div>
  );
};
export default Toolbox;
