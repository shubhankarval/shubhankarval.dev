import { ImageResponse } from 'next/og';
import { profile } from '@content/profile';

export const alt = `${profile.name} - ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: 80,
        backgroundColor: '#09090b',
        color: '#f4f4f5',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              border: '1px solid #35353c',
              backgroundImage: 'linear-gradient(135deg, #67a8, #131316 60%, #35353c)',
            }}
          />
          <div style={{ fontSize: 48, fontWeight: 'bold' }}>{profile.name}</div>
        </div>
        <div style={{ marginTop: 20, fontSize: 34, color: '#9a9aa2' }}>{profile.role}</div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #26262b',
          paddingTop: 28,
          fontSize: 24,
          color: '#7a7a82',
        }}
      >
        <div style={{ display: 'flex' }}>{profile.location}</div>
        <div style={{ display: 'flex' }}>{profile.siteRepo}</div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
