
export type Section = {
  heading: string;
  body: string;
};

export interface Formatter {
  readonly extension: string;

  format(
    title: string,
    sections: Section[],
    metadata?: Record<string, unknown>
  ): Promise<string | Buffer>;
}
