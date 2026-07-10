'use client';

import useEmblaCarousel from 'embla-carousel-react';

export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const slides = Array.from({ length: 5 }, (_, index) => `Slide ${index + 1}`);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide border" key={slide}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center space-x-2">
        <button className="embla__prev" onClick={scrollPrev}>
          Scroll to prev
        </button>
        <button className="embla__next" onClick={scrollNext}>
          Scroll to next
        </button>
      </div>
    </div>
  );
}
