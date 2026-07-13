import { PDFParse } from "pdf-parse";

export const parsePDF = async (buffer) => {
  const parser = new PDFParse({ data: buffer });

  const result = await parser.getText();
console.log(result);
  return result.text;
};