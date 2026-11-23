import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, X, MessageSquare, ThumbsUp } from "lucide-react";

const mascotQuotes = [
  "Wah! Shandar choice! Let's build something epic! 🚀",
  "Awesome! WEBWALE ki team aapke sath hai! ✨",
  "Great pick! Aapka digital presence superhit hoga! 💻",
  "Ready to grow your business? Let's talk! 🔥",
  "Bilkul sahi kadam! Good websites build good businesses! 👍",
  "Got it! We'll make your website look stunning! 🌟",
];

export function MascotReaction() {
  const [visible, setVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [quote, setQuote] = useState(mascotQuotes[0]);
  const [sparkleKey, setSparkleKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showMascot = useCallback((customQuote?: string) => {
    // Pick next quote
    if (customQuote) {
      setQuote(customQuote);
    } else {
      setQuote(mascotQuotes[Math.floor(Math.random() * mascotQuotes.length)]);
    }

    setSparkleKey((k) => k + 1);
    setIsExiting(false);
    setVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Auto-hide after 5 seconds
    timerRef.current = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setVisible(false);
        setIsExiting(false);
      }, 400); // match exit transition
    }, 5000);
  }, []);

  const hideMascot = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsExiting(true);
    setTimeout(() => {
      setVisible(false);
      setIsExiting(false);
    }, 400);
  }, []);

  useEffect(() => {
    function handleGlobalClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore if clicking inside the mascot widget itself
      if (target.closest(".mascot-widget")) return;

      // Detect any clickable button or button-like anchor
      const buttonEl = target.closest(
        'button, a.button-gold, a.button-outline-light, a.price-cta, a.site-nav-cta, a.hero-primary, a.project-view-link, a.showcase-cta, button[type="submit"], input[type="submit"], [role="button"]'
      );

      if (buttonEl) {
        const text = buttonEl.textContent?.trim().toLowerCase() || "";
        let contextualQuote: string | undefined;

        if (text.includes("whatsapp") || text.includes("talk") || text.includes("enquiry")) {
          contextualQuote = "Direct WhatsApp connection! Let's talk about your dream project! 💬🔥";
        } else if (text.includes("starter") || text.includes("business") || text.includes("get started")) {
          contextualQuote = "Top-tier package choice! Quality work, delivered on time! 🚀";
        } else if (text.includes("explore") || text.includes("demo") || text.includes("work")) {
          contextualQuote = "Check out our live showcase! Aise hi customized websites hum banate hain! ✨";
        }

        showMascot(contextualQuote);
      }
    }

    function handleCustomEvent(e: Event) {
      const customEvent = e as CustomEvent<{ quote?: string }>;
      if (customEvent.detail?.quote) {
        showMascot(customEvent.detail.quote);
      }
    }

    document.addEventListener("click", handleGlobalClick, true);
    window.addEventListener("webwale-mascot", handleCustomEvent as EventListener);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
      window.removeEventListener("webwale-mascot", handleCustomEvent as EventListener);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showMascot]);

  return (
    <>
      {visible && (
        <aside
          className={`mascot-widget ${isExiting ? "mascot-exit" : "mascot-enter"}`}
          aria-live="polite"
          aria-label="WEBWALE Mascot Assistant"
        >
          {/* Sparkles Burst */}
          <div key={sparkleKey} className="mascot-sparkles" aria-hidden="true">
            <span className="sparkle s1">✨</span>
            <span className="sparkle s2">⭐</span>
            <span className="sparkle s3">⚡</span>
            <span className="sparkle s4">✨</span>
          </div>

          {/* Speech Bubble */}
          <div className="mascot-speech-bubble">
            <div className="mascot-bubble-header">
              <span className="mascot-badge">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                WEBWALE BUDDY
              </span>
              <button
                type="button"
                onClick={hideMascot}
                className="mascot-close-btn"
                aria-label="Close assistant"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="mascot-quote">{quote}</p>
            <div className="mascot-bubble-tail" />
          </div>

          {/* Character 3D Graphic */}
          <button
            type="button"
            className="mascot-character-btn"
            onClick={() => showMascot()}
            title="Click me for encouragement!"
            aria-label="WEBWALE mascot: Click for new message"
          >
            <div className="mascot-glow-ring" />
            <img
              src="/images/mascot.png"
              alt="WEBWALE Cyberpunk Gold Robot Mascot giving thumbs up"
              className="mascot-image"
              loading="eager"
            />
          </button>
        </aside>
      )}

      {/* Tiny corner summon button when inactive */}
      {!visible && (
        <button
          type="button"
          onClick={() => showMascot()}
          className="mascot-summon-pill"
          aria-label="Open WEBWALE assistant"
          title="Click to summon WEBWALE mascot"
        >
          <img
            src="/images/mascot.png"
            alt="Mascot avatar"
            className="w-6 h-6 object-contain rounded-full bg-slate-900 border border-amber-500/40"
          />
          <span className="text-xs font-semibold text-amber-300">WEBWALE</span>
          <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
        </button>
      )}
    </>
  );
}
