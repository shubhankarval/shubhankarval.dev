import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/** Mirrors the avatar circle in the sidebar - keep the gradients in sync with globals.css. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid #35353c',
        backgroundImage:
          'radial-gradient(circle at 30% 25%, #6ee7a8, transparent 55%), linear-gradient(135deg, #131316, #35353c)',
      }}
    />,
    {
      ...size,
    }
  );
}
