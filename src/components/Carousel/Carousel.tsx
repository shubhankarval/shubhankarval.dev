'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex touch-pan-y touch-pinch-zoom">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>

      <button className="embla__prev">Scroll to prev</button>
      <button className="embla__next">Scroll to next</button>
    </div>
  );
}
