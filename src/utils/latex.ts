import sharp from 'sharp';

interface LatexResponse {
  imageUrl: string;
  error: unknown;
}

export const latexToImage = async (latex: string) => {
  const body = {
    latexInput: `\\begin{align*}\n${latex}\n\\end{align*}\n`,
    outputFormat: 'PNG',
    outputScale: '150%',
  };

  const response = await fetch(
    'https://e1kf0882p7.execute-api.us-east-1.amazonaws.com/default/latex2image',
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error('');
  }

  const data = (await response.json()) as LatexResponse;

  const imageBuffer = await (await fetch(data.imageUrl)).arrayBuffer();

  return await sharp(imageBuffer)
    .negate({ alpha: false })
    .sharpen()
    .toBuffer();
};
