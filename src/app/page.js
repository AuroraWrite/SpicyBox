"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const redirectTimerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  const handleContinue = (e) => {
    e.stopPropagation();
    if (isLoading) return;
    setIsLoading(true);
    redirectTimerRef.current = setTimeout(() => {
      window.location.href = "https://nastyporn.ai/explore?utm_ref=1c6a28b00a";
    }, 5000);
  };

  // Gesture tracking refs
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchCurrentX = useRef(0);
  const touchCurrentY = useRef(0);
  const isSwiping = useRef(false);

  // Touch gesture handlers (Mobile swipe)
  const handleTouchStart = (e) => {
    if (!e.touches || !e.touches[0]) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentX.current = e.touches[0].clientX;
    touchCurrentY.current = e.touches[0].clientY;
    isSwiping.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current || !e.touches || !e.touches[0]) return;
    touchCurrentX.current = e.touches[0].clientX;
    touchCurrentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const endX =
      e.changedTouches && e.changedTouches[0]
        ? e.changedTouches[0].clientX
        : touchCurrentX.current;
    const endY =
      e.changedTouches && e.changedTouches[0]
        ? e.changedTouches[0].clientY
        : touchCurrentY.current;

    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    // Detect horizontal swipe with 30px threshold
    if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY) * 0.6) {
      if (deltaX < 0) {
        // Swiped Left (←) -> Advance to next page
        setStep((prev) => Math.min(prev + 1, 5));
      } else {
        // Swiped Right (→) -> Back to previous page
        setStep((prev) => Math.max(prev - 1, 1));
      }
    }
  };

  // Mouse drag support for desktop testing
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    touchCurrentX.current = e.clientX;
    touchCurrentY.current = e.clientY;
    isSwiping.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isSwiping.current) return;
    touchCurrentX.current = e.clientX;
    touchCurrentY.current = e.clientY;
  };

  const handleMouseUp = (e) => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const deltaX = e.clientX - touchStartX.current;
    const deltaY = e.clientY - touchStartY.current;

    if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY) * 0.6) {
      if (deltaX < 0) {
        setStep((prev) => Math.min(prev + 1, 5));
      } else {
        setStep((prev) => Math.max(prev - 1, 1));
      }
    }
  };

  // Keyboard navigation support on desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setStep((prev) => Math.min(prev + 1, 5));
      } else if (e.key === "ArrowLeft") {
        setStep((prev) => Math.max(prev - 1, 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTakePhotosClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Progress bar click navigation
  const handleBarClick = (barIndex) => {
    if (barIndex === 1) {
      setStep(2);
    } else if (barIndex === 2) {
      setStep(3);
    } else if (barIndex >= 3) {
      setStep(4);
    }
  };

  const gestureProps = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
  };

  // ================= STEP 5: AGE VERIFICATION & COMMUNITY RULES =================
  if (step === 5) {
    return (
      <main className={styles.screenWrapperStep2} {...gestureProps}>
        <div className={styles.fullScreenContent}>
          <div className={styles.step5Body}>
            {/* Header: Welcome + App Logo (Spicy Box) */}
            <header className={styles.step5Header}>
              <span className={styles.step5WelcomeLabel}>Welcome</span>
              <div className={styles.step5LogoWrap}>
                <img
                  src="/spicy-box-logo-fig2.png"
                  alt="Spicy Box"
                  className={styles.step5SpicyLogoImg}
                />
              </div>
            </header>

            {/* Middle Section: 3 Rules Cards + Disclaimer (Jump to Pages 1, 2, 3, 4 respectively) */}
            <div className={styles.step5RulesList}>
              <div
                className={styles.step5RuleCard}
                onClick={(e) => {
                  e.stopPropagation();
                  setStep(1);
                }}
                role="button"
                tabIndex={0}
                aria-label="Перейти на страницу 1"
              >
                <span className={styles.step5RuleIcon} role="img" aria-label="18+">
                  🔞
                </span>
                <p className={styles.step5RuleText}>
                  Вам должно быть не менее 18 лет, чтобы пользоваться этим сайтом.
                </p>
              </div>

              <div
                className={styles.step5RuleCard}
                onClick={(e) => {
                  e.stopPropagation();
                  setStep(2);
                }}
                role="button"
                tabIndex={0}
                aria-label="Перейти на страницу 2"
              >
                <span className={styles.step5RuleIcon} role="img" aria-label="Pushpin">
                  📌
                </span>
                <p className={styles.step5RuleText}>
                  Не используйте чужие фотографии без разрешения их владельцев.
                </p>
              </div>

              <div
                className={styles.step5RuleCard}
                onClick={(e) => {
                  e.stopPropagation();
                  setStep(3);
                }}
                role="button"
                tabIndex={0}
                aria-label="Перейти на страницу 3"
              >
                <span className={styles.step5RuleIcon} role="img" aria-label="Responsibility">
                  🧑‍💼
                </span>
                <p className={styles.step5RuleText}>
                  Вы несёте полную ответственность за созданные вами видео и изображения.
                </p>
              </div>
            </div>

            {/* Disclaimer Agreement (Jumps to Page 4) */}
            <p
              className={styles.step5Disclaimer}
              onClick={(e) => {
                e.stopPropagation();
                setStep(4);
              }}
              role="button"
              tabIndex={0}
              aria-label="Перейти на страницу 4"
            >
              Продолжая пользоваться сайтом, вы соглашаетесь с вышеуказанными правилами.
            </p>
          </div>

          {/* Bottom Primary Button: 5s Loading -> Redirect */}
          <footer className={styles.bottomFooter}>
            <button
              className={`${styles.tryFreeBtn} ${styles.step5BlackBtn} ${isLoading ? styles.btnLoading : ""}`}
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.btnSpinner} />
              ) : (
                "Продолжить"
              )}
            </button>
          </footer>
        </div>

        {/* Full-Page Loading Overlay during 5s countdown */}
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingCard}>
              <div className={styles.spinner} />
              <span className={styles.loadingText}>Загрузка...</span>
            </div>
          </div>
        )}
      </main>
    );
  }

  // ================= STEP 4: MINI-MOVIE CREATION SCREEN =================
  if (step === 4) {
    return (
      <main className={styles.screenWrapperStep2} {...gestureProps}>
        <div className={styles.fullScreenContent}>
          {/* Top Story Progress Bars: 3 of 4 segments active */}
          <header className={styles.step2TopBar}>
            <div className={styles.storyProgressWrap}>
              {[1, 2, 3, 4].map((barIndex) => {
                const isActive = barIndex <= 3;
                return (
                  <button
                    key={barIndex}
                    type="button"
                    className={`${styles.storyBarBtn} ${isActive ? styles.storyBarActive : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBarClick(barIndex);
                    }}
                    aria-label={`Story segment ${barIndex}`}
                  >
                    <span className={styles.storyBarLine} />
                  </button>
                );
              })}
            </div>
          </header>

          <div className={styles.step2Body}>
            {/* Top Header Group: Capsule + Title + Subtitle */}
            <div className={styles.headerGroup}>
              <div className={styles.quickBadgeSolid}>
                Горячее Обычных Соло-Видео
              </div>
              <h1 className={styles.step2Title}>
                Преврати фото в 18+ Mini-Movie
              </h1>
              <p className={styles.step2Subtitle}>
                Выбери сценарий → Загрузи её фото →
                <br />
                Наслаждайся Mini-Movie
              </p>
            </div>

            {/* Middle Section: Video IMG_6502.MOV (Identical container to Step 3) */}
            <div className={styles.step3VideoContainer}>
              <video
                src="/IMG_6502.MOV"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className={styles.step3Video}
              />
            </div>

            {/* Layout Balancer: Matches Step 3 criteriaFootnote spacing exactly */}
            <p className={styles.criteriaFootnote} style={{ visibility: "hidden", pointerEvents: "none" }} aria-hidden="true">
              Чем лучше фото — тем горячее и реалистичнее будет 18+ видео
            </p>
          </div>

          {/* Bottom Primary Button: Advances to Step 5 */}
          <footer className={styles.bottomFooter}>
            <button
              className={`${styles.tryFreeBtn} ${styles.step5BlackBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                setStep(5);
              }}
            >
              Создать Mini-Movie
            </button>
          </footer>
        </div>
      </main>
    );
  }

  // ================= STEP 3: PHOTO CRITERIA & SELECTION SCREEN =================
  if (step === 3) {
    return (
      <main className={styles.screenWrapperStep2} {...gestureProps}>
        <div className={styles.fullScreenContent}>
          {/* Top Story Progress Bars: Clickable */}
          <header className={styles.step2TopBar}>
            <div className={styles.storyProgressWrap}>
              {[1, 2, 3, 4].map((barIndex) => {
                const isActive = barIndex <= 2;
                return (
                  <button
                    key={barIndex}
                    type="button"
                    className={`${styles.storyBarBtn} ${isActive ? styles.storyBarActive : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBarClick(barIndex);
                    }}
                    aria-label={`Story segment ${barIndex}`}
                  >
                    <span className={styles.storyBarLine} />
                  </button>
                );
              })}
            </div>
          </header>

          <div className={styles.step2Body}>
            {/* Top Header Group: Capsule + Title + Subtitle */}
            <div className={styles.headerGroup}>
              <div className={styles.quickBadgeSolid}>
                Без Размытия. Без Очков. Без Фильтров
              </div>
              <h1 className={styles.step2Title}>Лучшее фото = лучшее видео</h1>
              <p className={styles.step2Subtitle}>
                Загрузи чёткое, хорошо освещённое фото её лица
              </p>
            </div>

            {/* Middle Section: Video IMG_6499.MOV (Click advances to Step 4) */}
            <div
              className={styles.step3VideoContainer}
              onClick={(e) => {
                e.stopPropagation();
                setStep(4);
              }}
            >
              <video
                src="/IMG_6499.MOV"
                autoPlay
                loop
                muted
                playsInline
                className={styles.step3Video}
              />

              {/* Interactive Button Overlay for TAKE PHOTOS -> transitions to Step 4 */}
              <button
                type="button"
                className={styles.takePhotosOverlayBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setStep(4);
                }}
                aria-label="TAKE PHOTOS"
              />
            </div>

            {/* Footnote with Dual-Color Highlight */}
            <p className={styles.bonusNote}>
              Чем лучше фото — тем{" "}
              <span className={styles.bonusHighlight}>горячее</span> и{" "}
              <span className={styles.bonusHighlight}>реалистичнее</span> будет 18+ видео
            </p>
          </div>

          {/* Bottom Primary Button: Aligned to footer -> Transitions to Step 4 */}
          <footer className={styles.bottomFooter}>
            <button
              className={`${styles.tryFreeBtn} ${styles.step5BlackBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                setStep(4);
              }}
            >
              Попробовать бесплатно
            </button>
          </footer>
        </div>
      </main>
    );
  }

  // ================= STEP 2: FULL-SCREEN SCREEN MATCHING SCREENSHOT =================
  if (step === 2) {
    return (
      <main className={styles.screenWrapperStep2} {...gestureProps}>
        <div className={styles.fullScreenContent}>
          {/* Top Story Progress Bars: Clickable */}
          <header className={styles.step2TopBar}>
            <div className={styles.storyProgressWrap}>
              {[1, 2, 3, 4].map((barIndex) => {
                const isActive = barIndex <= 1;
                return (
                  <button
                    key={barIndex}
                    type="button"
                    className={`${styles.storyBarBtn} ${isActive ? styles.storyBarActive : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBarClick(barIndex);
                    }}
                    aria-label={`Story segment ${barIndex}`}
                  >
                    <span className={styles.storyBarLine} />
                  </button>
                );
              })}
            </div>
          </header>

          <div className={styles.step2Body}>
            {/* Top Header Group: Capsule + Title + Subtitle tightly grouped */}
            <div className={styles.headerGroup}>
              <div className={styles.quickBadgeSolid}>
                Быстро. Просто. Бесплатно
              </div>
              <h1 className={styles.step2Title}>Твоё бесплатное 18+ видео ждёт</h1>
              <p className={styles.step2Subtitle}>
                Просто загрузи любое фото → получи видео с её лицом за 30 секунд
              </p>
            </div>

            {/* Middle Card: Video with FREE TRIAL Button below */}
            <div className={styles.middleVideoSection}>
              <div className={styles.middleVideoWrap}>
                <video
                  src="/IMG_6497.MOV"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.middleVideo}
                />
              </div>

              {/* Free Trial Button below video -> Transitions to Step 3 */}
              <button
                className={styles.freeTrialBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setStep(3);
                }}
              >
                <span className={styles.trialEmoji}>😈</span>
                <span>FREE TRIAL</span>
              </button>
            </div>

            {/* Bonus Footnote with White text & Pink highlight */}
            <p className={styles.bonusNote}>
              Сразу после бесплатного видео ты{" "}
              <span className={styles.bonusHighlight}>получишь бонус</span>,
              который снесёт тебе крышу 😏
            </p>
          </div>

          {/* Bottom Primary Button: Aligned identically to Step 1 footer */}
          <footer className={styles.bottomFooter}>
            <button
              className={`${styles.tryFreeBtn} ${styles.step5BlackBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                setStep(3);
              }}
            >
              Попробовать бесплатно
            </button>
          </footer>
        </div>
      </main>
    );
  }

  // ================= STEP 1: INITIAL SPICY BOX SCREEN =================
  return (
    <main className={styles.screenWrapper} {...gestureProps}>
      <div className={styles.modalCard}>
        {/* Fullscreen Video Background */}
        <div className={styles.videoBgContainer}>
          <video
            src="https://cdn.musebox.ai/gen-4c919630-cc34-462d-8811-e3af4f6559c5.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.bgVideo}
          />
          <div className={styles.videoBackdropGradient} />
        </div>

        {/* Foreground Content */}
        <div className={styles.contentWrap}>
          {/* Top Bar: AD on left, Spicy Box logo centered */}
          <header className={styles.topBar}>
            <span className={styles.adTag}>AD</span>
            <div className={styles.logoTitleWrap}>
              <img
                src="/spicy-box-logo.png"
                alt="Spicy Box"
                className={styles.logoImg}
              />
            </div>
          </header>

          {/* Typography & Badge Header */}
          <section className={styles.heroTextSection}>
            <h1 className={styles.heroTitle}>
              Загрузи любое её фото
              <br />
              и получи горячее видео
              <br />
              <span className={styles.ageBadge}>18+</span>
            </h1>

            <div className={styles.neonPillBadge}>
              <span>Без Цензуры</span>
            </div>
          </section>

          {/* Middle Spacer to showcase background video */}
          <div className={styles.middleSpacer} />

          {/* Bottom CTA Button: Transitions to Step 2 */}
          <footer className={styles.bottomFooter}>
            <button
              className={styles.continueButton}
              onClick={(e) => {
                e.stopPropagation();
                setStep(2);
              }}
            >
              Продолжить
            </button>
          </footer>
        </div>
      </div>
    </main>
  );
}
