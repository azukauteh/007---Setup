// pdfFormatter.ts
// 📄 PDF formatter implementation using pdfkit

import { Formatter } from "./Formatter";
import PDFDocument from "pdfkit";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

export const pdfFormatter: Formatter = {
  extension: ".pdf",
  format(title, sections) {
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      const outputPath = resolve(process.cwd(), `${title.replace(/\s+/g, "_")}${this.extension}`);
      writeFileSync(outputPath, pdfBuffer);
    });

    doc.fontSize(20).text(title, { underline: true });
    for (const [heading, body] of Object.entries(sections)) {
      doc.moveDown().fontSize(16).text(heading);
      doc.fontSize(12).text(body);
    }

    doc.end();
    return ""; // PDF is written directly to disk
  },
};

