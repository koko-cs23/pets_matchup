import { getPlaiceholder } from 'plaiceholder';

export default async function getBase64(imgUrl: string) {
  try {
    const res = await fetch(imgUrl);
    if (!res.ok) {
      throw new Error(`failed to fetch image: ${res.status} ${res.statusText}`);
    }
    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.stack);
    }
  }
}
