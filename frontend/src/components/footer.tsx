"use client";

import { delaGothicOne } from "@/lib/fonts";
import { InformationSite } from "./latestNews";
import { useEffect, useRef } from "react";
import type p5 from "p5";

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const sketchContainerRef = useRef<HTMLDivElement | null>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const canvasSizeRef = useRef({
    width: 0,
    height: 0,
  });
  const spotlightSideRef = useRef<"left" | "right" | "none">("none");

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!sketchContainerRef.current) {
        return;
      }

      // 動的インポート
      const { default: P5 } = await import("p5");

      if (!isMounted || !sketchContainerRef.current) {
        return;
      }

      const sketch = (p: p5) => {
        p.setup = () => {
          const rect = footerRef.current?.getBoundingClientRect() ?? {
            width: 0,
            height: 0,
          };
          canvasSizeRef.current.width = rect.width;
          canvasSizeRef.current.height = rect.height;

          p.createCanvas(rect.width, rect.height);
          p.background(0, 0);
          p.frameRate(30);
        };

        p.draw = () => {
          p.clear();
          const spotlight = spotlightSideRef.current;
          const gradientStrength = spotlight === "none" ? 0 : 1;

          if (gradientStrength > 0) {
            p.background("#3e5289");
            p.noStroke();
            p.fill("#e7c127");
            p.beginShape();
            if (spotlight === "left") {
              p.vertex(p.width / 2, p.height);
              p.vertex(p.width * 0.45, 0);
              p.vertex(0, 0);
              p.vertex(0, p.height / 2);
            } else if (spotlight === "right") {
              p.vertex(p.width / 2, p.height);
              p.vertex(p.width * 0.55, 0);
              p.vertex(p.width, 0);
              p.vertex(p.width, p.height / 2);
            }
            p.endShape(p.CLOSE);
          }
        };
      };

      p5InstanceRef.current = new P5(sketch, sketchContainerRef.current);
    };

    init();

    return () => {
      isMounted = false;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const footerElement = footerRef.current;
    if (!footerElement) {
      return;
    }

    const updateSize = (width: number, height: number) => {
      const nextWidth = Math.max(0, Math.floor(width));
      const nextHeight = Math.max(0, Math.floor(height));

      canvasSizeRef.current.width = nextWidth;
      canvasSizeRef.current.height = nextHeight;

      if (p5InstanceRef.current) {
        p5InstanceRef.current.resizeCanvas(
          canvasSizeRef.current.width,
          canvasSizeRef.current.height,
        );
      }
    };

    const rect = footerElement.getBoundingClientRect();
    updateSize(rect.width, rect.height);

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        updateSize(entry.contentRect.width, entry.contentRect.height);
      });
    });

    observer.observe(footerElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSpotlightEnter = (side: "left" | "right") => {
    spotlightSideRef.current = side;
  };

  const handleSpotlightLeave = () => {
    spotlightSideRef.current = "none";
  };

  return (
    <footer ref={footerRef} className="relative bg-[#67c8e6]">
      <div
        ref={sketchContainerRef}
        className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full"
      />
      <div className="relative z-1">
        <section className="flex flex-col items-center justify-center py-12">
          <div className={`text-4xl text-white ${delaGothicOne.className}`}>
            情報発信中サイト
          </div>
          <div className="my-10 flex gap-0 text-white">
            <div
              className="pr-6"
              onMouseEnter={() => handleSpotlightEnter("left")}
              onMouseLeave={handleSpotlightLeave}
              onFocus={() => handleSpotlightEnter("left")}
              onBlur={handleSpotlightLeave}
            >
              <InformationSite
                siteUrl="https://itomiri.com"
                feedUrl="https://itomiri.com/feed"
                siteName="井筒ミリ オフィシャルサイト"
                siteImagePath="/itomiri_com_ogp.png"
                siteDescription="「井筒ミリ」名義での活動を告知・紹介するサイト"
              />
            </div>
            <div
              className="pl-6"
              onMouseEnter={() => handleSpotlightEnter("right")}
              onMouseLeave={handleSpotlightLeave}
              onFocus={() => handleSpotlightEnter("right")}
              onBlur={handleSpotlightLeave}
            >
              <InformationSite
                siteUrl="https://blog.isirmt.com"
                feedUrl="https://blog.isirmt.com/feed"
                siteName="isirmt ブログ"
                siteImagePath="/blog_isirmt_com_ogp.png"
                siteDescription="「isirmt」名義で技術ブログを運用中"
              />
            </div>
          </div>
        </section>
        <div className="aspect-1235/110 bg-[url('/name_footer.svg')] bg-center bg-no-repeat" />
      </div>
    </footer>
  );
}
