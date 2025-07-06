'use client';

import { useEffect } from 'react';

interface KakaoAdProps {
  unit: string;
  width: string;
  height: string;
}

export default function KakaoAd({ unit, width, height }: KakaoAdProps) {
  useEffect(() => {
    // 카카오 광고 스크립트 로드
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
    script.async = true;
    document.head.appendChild(script);

    // 광고 로드 후 cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <ins
      className="kakao_ad_area"
      style={{ display: 'none' }}
      data-ad-unit={unit}
      data-ad-width={width}
      data-ad-height={height}
    />
  );
} 