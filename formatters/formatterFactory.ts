// formatterFactory.ts
// 🏭 Factory to select formatter by type

import { Formatter } from "./Formatter";
import { markdownFormatter } from "./markdownFormatter";
import { htmlFormatter } from "./htmlFormatter";
import { pdfFormatter } from "./pdfFormatter";

export function getFormatter(type: "markdown" | "html" | "pdf"): Formatter {
  switch (type) {
    case "markdown":
      return markdownFormatter;
    case "html":
      return htmlFormatter;
    case "pdf":
      return pdfFormatter;
    default:
      throw new Error(`Unsupported formatter type: ${type}`);
  }
}

