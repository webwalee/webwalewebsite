import { useState, useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MoveUpRight, Plus, X } from "lucide-react";
import { projects, type PortfolioProject } from "@/lib/portfolio";

/**
 * 1. SiteLoader: True Staging Style Luxury Radial SVG Preloader
 */
export function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Only show once per session to maintain quick subsequent loads
    const hasLoaded = sessionStorage.getItem("webwale_loader_seen");
    if (hasLoaded) {
      setRemoved(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoaded(true);
            sessionStorage.setItem("webwale_loader_seen", "true");
            setTimeout(() => setRemoved(true), 800);
          }, 200);
          return 100;
        }
        // Organic acceleration curve
        const step = Math.max(1, Math.floor((100 - prev) * 0.15) + Math.floor(Math.random() * 5));
        return Math.min(100, prev + step);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!isClient || removed) return null;

  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`site-loader ${loaded ? "site-loader-hidden" : ""}`} aria-hidden="true">
      <div className="site-loader-center">
        <div className="site-loader-circle-wrap">
          <svg className="site-loader-svg" viewBox="0 0 100 100">
            {/* Background track */}
            <circle cx="50" cy="50" r="44" className="site-loader-track" />
            {/* Progress stroke */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="site-loader-stroke"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="site-loader-emblem">W</div>
        </div>

        <div className="site-loader-counter">
          <span>{progress.toString().padStart(2, "0")}</span>
          <span className="site-loader-percent">%</span>
        </div>
        <p className="site-loader-text">WEBWALE STUDIO · LOADING</p>
      </div>
      <div className="site-loader-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

/**
 * 2. RollingText: True Staging Signature Dual-Layer Ticker on Hover
 */
export function RollingText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`rolling-text-wrap ${className}`}>
      <span className="roll-line roll-line-primary">{text}</span>
      <span className="roll-line roll-line-secondary" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

/**
 * 3. Parallax 3D Tilt Wrapper: Mouse movement tilts card in 3D space
 */
export function ParallaxTiltCard({
  children,
  className = "",
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  }

  function handleMouseLeave() {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`parallax-tilt-card ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/**
 * 4. TrueStagingProjectShowcase: 3D Exhibition Slider + "View All" Sliding Drawer
 */
export function TrueStagingProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeProject = projects[activeIndex];

  function handlePrev() {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 600);
  }

  function handleNext() {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 600);
  }

  return (
    <div className="ts-showcase-stage">
      {/* 3D Exhibition Spotlight & Track */}
      <div className="ts-exhibition-viewport">
        <div className={`ts-project-exhibit ${isTransitioning ? "ts-exhibit-switching" : ""}`}>
          {/* Main Visual Display */}
          <ParallaxTiltCard className="ts-display-card" maxTilt={6}>
            <Link
              to="/portfolio/$slug"
              params={{ slug: activeProject.slug }}
              className="ts-card-image-link"
              aria-label={`View ${activeProject.name} case study`}
            >
              <img
                src={activeProject.image}
                alt={activeProject.imageAlt}
                className="ts-card-image"
              />
              <div className="ts-image-overlay" />
              <div className="ts-card-badge">
                <span className="ts-badge-dot" />
                <span>CASE STUDY · 0{activeIndex + 1}</span>
              </div>
              <div className="ts-hover-view">
                <span className="ts-view-btn">
                  <RollingText text="VIEW PROJECT" />
                  <MoveUpRight className="w-4 h-4 ml-1.5" />
                </span>
              </div>
            </Link>
          </ParallaxTiltCard>

          {/* Exhibition Typography & Details */}
          <div className="ts-exhibit-meta">
            <div className="ts-meta-top">
              <span className="ts-category-tag">{activeProject.category}</span>
              <span className="ts-index-counter">
                0{activeIndex + 1} <em>/</em> 0{projects.length}
              </span>
            </div>

            <Link
              to="/portfolio/$slug"
              params={{ slug: activeProject.slug }}
              className="ts-title-link"
            >
              <h3 className="ts-project-title">
                {activeProject.name}
              </h3>
            </Link>

            <p className="ts-project-description">{activeProject.description}</p>

            <div className="ts-features-row">
              {activeProject.features.slice(0, 3).map((f) => (
                <span key={f} className="ts-feature-chip">
                  {f}
                </span>
              ))}
            </div>

            <div className="ts-cta-row">
              <Link
                to="/portfolio/$slug"
                params={{ slug: activeProject.slug }}
                className="ts-cta-pill button-gold"
              >
                <RollingText text="EXPLORE CONCEPT" />
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* True Staging Style Bottom Controls Bar */}
      <div className="ts-controls-bar">
        {/* Prev Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          className="ts-control-btn ts-prev-btn"
          aria-label="Previous project"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="ts-btn-label">PREV</span>
        </button>

        {/* Center "01 - 03 View All / Close All" with rotating + morphing icon */}
        <button
          type="button"
          onClick={() => setDrawerOpen((open) => !open)}
          className={`ts-view-all-btn ${drawerOpen ? "ts-drawer-active" : ""}`}
          aria-expanded={drawerOpen}
          aria-label={drawerOpen ? "Close project index" : "View all projects index"}
        >
          <span className="ts-view-all-text">
            01 – 0{projects.length} · {drawerOpen ? "CLOSE ALL" : "VIEW ALL"}
          </span>
          <span className={`ts-plus-icon ${drawerOpen ? "ts-plus-rotated" : ""}`}>
            <Plus className="w-4 h-4" />
          </span>
        </button>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={handleNext}
          className="ts-control-btn ts-next-btn"
          aria-label="Next project"
        >
          <span className="ts-btn-label">NEXT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* True Staging Architectural Drawer ("View All" Sliding Bottom Sheet) */}
      <div className={`ts-bottom-drawer ${drawerOpen ? "ts-drawer-open" : ""}`}>
        <div className="ts-drawer-header">
          <span className="ts-drawer-title">SELECTED WORKS ARCHIVE</span>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="ts-drawer-close"
            aria-label="Close project index"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="ts-drawer-list">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              to="/portfolio/$slug"
              params={{ slug: project.slug }}
              onClick={() => setDrawerOpen(false)}
              className="ts-drawer-item"
            >
              <span className="ts-drawer-index">0{index + 1}</span>
              <div className="ts-drawer-names">
                <h4 className="ts-drawer-name hover-italic">{project.name}</h4>
                <span className="ts-drawer-cat">{project.category}</span>
              </div>
              <img
                src={project.image}
                alt=""
                className="ts-drawer-thumb"
                loading="lazy"
              />
              <span className="ts-drawer-arrow">
                <MoveUpRight className="w-5 h-5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
