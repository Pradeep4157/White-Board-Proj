import classes from "./index.module.css";
import { COLORS } from "../../constants.js";
import cx from "classnames";
const Toolbox = () => {
  return (
    <div className={classes.container}>
      <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Stroke</div>
        <div className={classes.colorsContainer}>
          {Object.keys(COLORS).map((color) => {
            return (
              <div
                className={cx(classes.colorBox)}
                style={{ backgroundColor: color }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Toolbox;
