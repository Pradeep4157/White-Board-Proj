import { TOOL_ITEMS } from "../constants.js";
export const roughElement = (id, x1, y1, x2, y2, { type }) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
  };
  switch (type) {
    case TOOL_ITEMS.LINE: {
      element.roughEle = gen.line(x1, y1, x2, y2);
      return element;
    }
    case TOOL_ITEMS.RECTANGLE: {
      element.roughEle = gen.rectangle(x1, y1, x1 - x2, y1 - y2);
      return element;
    }
    default: {
      throw new Error("Type is not recognized");
    }
  }
};
