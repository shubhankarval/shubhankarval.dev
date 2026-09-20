import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/* iOS masks this to a rounded square and renders transparency as black, so the tile stays opaque. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d0d0f',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 112,
          height: 112,
          borderRadius: '50%',
          border: '2px solid #35353c',
          backgroundImage:
            'radial-gradient(circle at 30% 25%, #6ee7a8, transparent 55%), linear-gradient(135deg, #131316, #35353c)',
        }}
      />
    </div>,
    {
      ...size,
    }
  );
}
