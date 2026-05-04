import { Formatter, Section } from "./Formatter";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export class HtmlFormatter implements Formatter {
  readonly extension = "html";

  async format(title: string, sections: Section[]): Promise<string> {
    const safeTitle = escapeHtml(title);

    const content = sections
      .map(
        ({ heading, body }) => `
        <section>
          <h2>${escapeHtml(heading)}</h2>
          <p>${escapeHtml(body).replace(/\n/g, "<br/>")}</p>
        </section>
      `
      )
      .join("");

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${safeTitle}</title>
</head>
<body>
  <h1>${safeTitle}</h1>
  <p><em>Generated on ${new Date().toISOString()}</em></p>
  ${content}
</body>
</html>
    `;
  }
}
