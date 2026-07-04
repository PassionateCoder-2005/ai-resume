import { PDFParse } from 'pdf-parse';
export const parsePDF=async (file) => {
 const parser = new PDFParse({ url: file.secure_url });
	const result = await parser.getText();
	return result.text      
}