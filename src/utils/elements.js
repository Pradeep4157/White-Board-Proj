import { TOOL_ITEMS } from "../constants.js";
import { getArrowHeadCoordinates } from "../utils/math.js";
import rough from "roughjs";
const gen = rough.generator();
export const createRoughElement = (
  id,
  x1,
  y1,
  x2,
  y2,
  { type, stroke, fill },
) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    stroke,
    fill,
  };
  let options = {
    seed: id + 1,
  };
  if (stroke) {
    console.log(stroke);
    options.stroke = stroke;
  }
  if (fill) {
    options.fill = fill;
  }
  switch (type) {
    case TOOL_ITEMS.LINE: {
      element.roughEle = gen.line(x1, y1, x2, y2, options);
      return element;
    }
    case TOOL_ITEMS.RECTANGLE: {
      element.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
      return element;
    }
    case TOOL_ITEMS.CIRCLE: {
      const cx = (x1 + x2) / 2,
        cy = (y1 + y2) / 2;
      const width = x2 - x1,
        height = y2 - y1;
      element.roughEle = gen.ellipse(cx, cy, width, height, options);
      return element;
    }
    case TOOL_ITEMS.ARROW: {
      const { x3, y3, x4, y4 } = getArrowHeadCoordinates(x1, y1, x2, y2, 20);
      element.roughEle = gen.linearPath(
        [
          [x1, y1],
          [x2, y2],
          [x3, y3],
          [x2, y2],
          [x4, y4],
        ],
        options,
      );
      return element;
    }
    default: {
      throw new Error("Type is not recognized");
    }
  }
};
