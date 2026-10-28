import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const HERO_VIDEO = "/videos/dacars-hero.gif";
const STORY_VIDEO = "/videos/dacars-driving.gif";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90";

const STORY_POSTER =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85";

const categories = [
  {
    number: "01",
    name: "Luxury",
    subtitle: "Arrive in a different league.",
    className: "fleet-luxury",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "02",
    name: "Sports",
    subtitle: "Make every mile memorable.",
    className: "fleet-sports",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "03",
    name: "SUVs",
    subtitle: "Room for more possibilities.",
    className: "fleet-suv",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "04",
    name: "Economy",
    subtitle: "Smart drives. Easy on your budget.",
    className: "fleet-economy",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1100&q=85",
  },
];

const steps = [
  {
    number: "01",
    title: "Find your fit",
    description:
      "Explore the fleet and choose a car that suits your day.",
   
  },
  {
    number: "02",
    title: "Choose your time",
    description:
      "Set your rental dates and review your booking details.",
   
  },
  {
    number: "03",
    title: "Hit the road",
    description:
      "Confirm your booking and get ready for the drive.",
    
  },
];

const benefits = [
  {
    number: "01",
    title: "Freedom on your terms",
    description:
      "Choose a vehicle and rental time that works for you.",
    
  },
  {
    number: "02",
    title: "A car for every occasion",
    description:
      "Discover cars suited to different journeys and lifestyles.",
    
  },
  {
    number: "03",
    title: "A simpler way to book",
    description:
      "Explore the fleet and manage your journey online.",
   
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);

  // Animated opening sequence
  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    let frameId;

    function animate(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(
        100,
        Math.round((elapsed / duration) * 100)
      );

      setLoadingProgress(progress);

      if (progress < 100) {
        frameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIntroFinished(true);
        }, 220);
      }
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Reveal sections as the visitor scrolls
  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) =>
        item.classList.add("is-visible")
      );

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Scroll progress and gentle hero-video movement
  useEffect(() => {
    let ticking = false;

    function updateMotion() {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const progress =
          scrollableHeight > 0
            ? window.scrollY / scrollableHeight
            : 0;

        document.documentElement.style.setProperty(
          "--dc-scroll-progress",
          String(Math.max(0, Math.min(1, progress)))
        );

        const hero = document.querySelector(".dc-hero");
        const video = document.querySelector(".dc-hero-video");

        if (hero && video) {
          const heroTop = hero.getBoundingClientRect().top;

          const shift = Math.min(
            35,
            Math.max(0, -heroTop * 0.08)
          );

          video.style.setProperty(
            "--dc-video-shift",
            `${shift}px`
          );
        }

        ticking = false;
      });
    }

    updateMotion();

    window.addEventListener("scroll", updateMotion, {
      passive: true,
    });

    window.addEventListener("resize", updateMotion);

    return () => {
      window.removeEventListener("scroll", updateMotion);
      window.removeEventListener("resize", updateMotion);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="dacars-home" id="top">
      {/* SCROLL PROGRESS */}
      <div className="dc-scroll-progress" aria-hidden="true">
        <span />
      </div>

      {/* ANIMATED PRELOADER */}
      <div
        className={`dc-preloader ${
          introFinished ? "is-done" : ""
        }`}
        aria-hidden="true"
      >
        <div className="dc-preloader-header">
          <span className="dc-loader-brand">
            DA<span>CARS</span>
          </span>

          <small>PREMIUM AUTOMOTIVE EXPERIENCE</small>
        </div>

        <div className="dc-preloader-center">
          <div className="dc-loader-emblem">D</div>

          <div className="dc-loader-caption">
            <span>THE ROAD IS YOURS</span>

            <strong>
              {String(loadingProgress).padStart(2, "0")}
              <span>%</span>
            </strong>
          </div>
        </div>

        <div className="dc-preloader-footer">
          <div className="dc-loader-track">
            <span style={{ width: `${loadingProgress}%` }} />
          </div>

          <div className="dc-loader-footer-text">
            {/* <span>PREPARING YOUR DRIVE</span>
            <span>DC / 026</span> */}
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <header className="dc-navbar">
        <Link
          to="/"
          className="dc-brand"
          aria-label="DaCars homepage"
          onClick={closeMenu}
        >
          <span className="dc-brand-mark">D</span>

          <span className="dc-brand-name">
            Da<span>Cars</span>
          </span>
        </Link>

        <button
          type="button"
          className={`dc-menu-toggle ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`dc-nav-links ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label="Main navigation"
        >
          <Link to="/" className="active" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/cars" onClick={closeMenu}>
            Our Fleet
          </Link>

          <a href="#how-it-works" onClick={closeMenu}>
            How It Works
          </a>

          <Link
            to="/signin"
            className="dc-signin-link"
            onClick={closeMenu}
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="dc-nav-cta"
            onClick={closeMenu}
          >
            Get Started <span>↗</span>
          </Link>
        </nav>
      </header>

      {/* VIDEO 1: HERO */}
      <section className="dc-hero" aria-label="DaCars car rentals">
        <div className="dc-hero-backdrop" />

      <img
  className="dc-hero-video"
  src={HERO_VIDEO}
  alt=""
  aria-hidden="true"
/>

        <div className="dc-hero-shade" />
        <div className="dc-hero-grid" aria-hidden="true" />

        <div className="dc-hero-inner">
          <div className="dc-hero-copy">
            <p className="dc-eyebrow dc-hero-eyebrow">
              <span className="dc-live-dot" />
              PREMIUM CAR RENTALS
              <span className="dc-eyebrow-line" />
              BUILT AROUND YOU
            </p>

            <h1>
              YOUR NEXT DRIVE
              <br />
              <span>STARTS HERE</span>
            </h1>

            <p className="dc-hero-description">
              The keys to your next journey are closer than
              you think. Discover a better way to drive, with
              flexible rentals and a fleet for every mood
            </p>

            <div className="dc-hero-actions">
              <Link
                to="/cars"
                className="dc-button dc-button-primary"
              >
                Explore the fleet 
              </Link>

              <Link
                to="/signup"
                className="dc-button dc-button-glass"
              >
                Create an account
              </Link>
            </div>

            <div className="dc-hero-proof">
              <div className="dc-proof-avatars" aria-hidden="true">
                <span>D</span>
                <span>C</span>
                <span>+</span>
              </div>

              <div>
                <strong>Your plans Your pace</strong>
                <small>Flexible car rental, made simple</small>
              </div>
            </div>
          </div>

          <div className="dc-hero-side-note" aria-hidden="true">
            <span className="dc-side-note-line" />
            {/* <span>FIND YOUR FREEDOM</span> */}
            {/* <span className="dc-side-note-number">DC / 026</span> */}
          </div>
        </div>

        <div className="dc-hero-bottom">
          <div className="dc-hero-bottom-item">
            <span>01</span> PREMIUM FLEET
          </div>

          <div className="dc-hero-bottom-item">
            <span>02</span> FLEXIBLE RENTALS
          </div>

          <a href="#explore-fleet" className="dc-scroll-cue">
            <span className="dc-scroll-mouse" />
            SCROLL TO EXPLORE
          </a>
        </div>
      </section>

      {/* INTRO STRIP - NO LOCATION SEARCH */}
      <section className="dc-booking-strip">
        <div className="dc-booking-intro">
          <span className="dc-section-tag">
            THE DRIVE IS YOURS
          </span>

          <h2>Ready for your next drive?</h2>

          <p>Choose the car that fits your plans.</p>
        </div>

        <div className="dc-booking-detail">
          {/* <span className="dc-detail-icon">◈</span> */}

          <div>
            <small>YOUR NEXT RIDE</small>
            <strong>A fleet for every mood</strong>
          </div>
        </div>

        <div className="dc-booking-detail">
          {/* <span className="dc-detail-icon">◷</span> */}

          <div>
            <small>YOUR SCHEDULE</small>
            <strong>Flexible rental options</strong>
          </div>
        </div>

        <Link to="/cars" className="dc-find-button">
          Explore cars
        </Link>
      </section>

      {/* STATS */}
      <section
        className="dc-stats-row"
        aria-label="DaCars at a glance"
        data-reveal
      >
        <div className="dc-stat-lead">
          <span className="dc-section-tag">
            THE DACARS DIFFERENCE
          </span>

          <p>A better kind of drive</p>
        </div>

        <div className="dc-stat">
          <strong>24<span>/7</span></strong>
          <small>ONLINE ACCESS</small>
        </div>

        <div className="dc-stat">
          <strong>R350<span>+</span></strong>
          <small>STARTING PER HOUR</small>
        </div>

        <div className="dc-stat">
          <strong>04</strong>
          <small>WAYS TO FIND YOUR FIT</small>
        </div>
      </section>

      {/* CAR CATEGORIES */}
      <section className="dc-fleet-section" id="explore-fleet">
        <div className="dc-section-heading" data-reveal>
          <div>
            <span className="dc-section-tag">
              A FLEET WITH PERSONALITY
            </span>

            <h2>
              Find the car that <em>feels righ</em>
            </h2>

            <p>
              From polished arrivals to spontaneous escapes,
              there's a drive for the way you move
            </p>
          </div>

          <Link className="dc-text-link" to="/cars">
            Explore all cars 
          </Link>
        </div>

        <div className="dc-fleet-grid">
          {categories.map((category, index) => (
            <Link
              to="/cars"
              className={`dc-fleet-card ${category.className}`}
              key={category.name}
              data-reveal
              style={{
                "--reveal-delay": `${index * 100}ms`,
              }}
            >
              <img
                src={category.image}
                alt={`${category.name} rental category`}
                loading="lazy"
              />

              <div className="dc-fleet-card-shade" />

              <span className="dc-fleet-index">
                {category.number} / FLEET
              </span>

              <div className="dc-fleet-card-bottom">
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.subtitle}</p>
                </div>

                <span className="dc-round-arrow"></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="dc-manifesto">
        <div className="dc-manifesto-image" data-reveal>
          <img
            src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=90"
            alt="Premium car on the open road"
            loading="lazy"
          />

          <div className="dc-image-caption">
            <span>DESIGNED FOR THE DRIVE</span>
            <span>DACARS / 01</span>
          </div>

          <div className="dc-image-stamp">
            <strong>DRIVE</strong>
            <span>YOUR WAY</span>
          </div>
        </div>

        <div className="dc-manifesto-copy" data-reveal>
          <span className="dc-section-tag">
            MORE THAN GETTING THERE
          </span>

          <h2>
            It's not just the destination
            <em> It's the feeling</em>
          </h2>

          <p>
            Some days call for comfort Others call for a
            little more power. DaCars makes it simple to
            choose the drive that fits your moment — without
            the long-term commitment.
          </p>

          <div className="dc-benefit-list">
            <div>
              {/* <span className="dc-check">✓</span> */}
              <div>
                <strong>Freedom on your terms</strong>
                <small>
                  Choose a vehicle and rental time that works
                  for you
                </small>
              </div>
            </div>

            <div>
              {/* <span className="dc-check">✓</span> */}
              <div>
                <strong>A car for every occasion</strong>
                <small>
                  Browse luxury, sports, SUV and economy
                  options.
                </small>
              </div>
            </div>

            <div>
              {/* <span className="dc-check">✓</span> */}
              <div>
                <strong>A simpler way to book</strong>
                <small>
                  Explore the fleet and manage your journey
                  online.
                </small>
              </div>
            </div>
          </div>

          <Link
            to="/cars"
            className="dc-button dc-button-primary"
          >
            Meet your next car 
          </Link>
        </div>
      </section>

      {/* VIDEO 2: CINEMATIC DRIVING */}
      <section className="dc-video-story" data-reveal>
        <div className="dc-video-story-copy">
          <span className="dc-section-tag">
            MADE FOR THE OPEN ROAD
          </span>

          <h2>
            Every journey deserves
            <em> a better drive.</em>
          </h2>

          <p>
            From city streets to weekend escapes, find a car
            that makes getting there part of the experience.
          </p>

          <Link
            to="/cars"
            className="dc-button dc-button-primary"
          >
            Find your next car 
          </Link>
        </div>

        <div className="dc-video-story-frame">
         <img
  className="dc-story-video"
  src={STORY_VIDEO}
  alt="Cinematic driving footage"
/>

          <div className="dc-story-video-shade" />

          <span className="dc-story-video-label">
            <span /> THE DRIVE IS YOURS
          </span>

          <span className="dc-story-video-index">
            02 / EXPERIENCE
          </span>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="dc-how-section" id="how-it-works">
        <div className="dc-how-heading" data-reveal>
          <span className="dc-section-tag">
            THREE STEPS. THEN GO.
          </span>

          <h2>
            Less planning. <em>More driving.</em>
          </h2>

          <p>
            Your next drive is just a few simple steps away.
          </p>
        </div>

        <div className="dc-steps-grid">
          {steps.map((step, index) => (
            <article
              className="dc-step-card"
              key={step.number}
              data-reveal
              style={{
                "--reveal-delay": `${index * 110}ms`,
              }}
            >
              <div className="dc-step-top">
                <span>{step.number}</span>
                <span className="dc-step-icon">{step.icon}</span>
              </div>

              <h3>{step.title}</h3>
              <p>{step.description}</p>

              <div className="dc-step-rule">
                <span />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="dc-benefits-section">
        <div className="dc-benefits-header" data-reveal>
          <span className="dc-section-tag">BUILT AROUND YOU</span>

          <h2>
            Every detail.
            <br />
            <em>Driven by you.</em>
          </h2>

          <p>
            A rental experience designed to make getting
            there just as good as being there
          </p>
        </div>

        <div className="dc-benefits-grid">
          {benefits.map((benefit, index) => (
            <article
              className="dc-benefit-card"
              key={benefit.number}
              data-reveal
              style={{
                "--reveal-delay": `${index * 100}ms`,
              }}
            >
              <div className="dc-benefit-top">
                <span>{benefit.number}</span>
                <span className="dc-benefit-icon">
                  {benefit.icon}
                </span>
              </div>

              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>

              <div className="dc-benefit-line" />
            </article>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="dc-final-cta">
        <div className="dc-final-cta-image" />
        <div className="dc-final-cta-overlay" />

        <div className="dc-final-cta-content" data-reveal>
          <span className="dc-section-tag">
            THE ROAD IS CALLING
          </span>

          <h2>
            Make room for
            <br />
            <em>one more adventure.</em>
          </h2>

          <p>
            Your next favourite drive could be closer
            than you think.
          </p>

          <div className="dc-hero-actions dc-cta-actions">
            <Link
              to="/signup"
              className="dc-button dc-button-primary"
            >
              Start your journey
            </Link>

            <Link
              to="/cars"
              className="dc-button dc-button-glass"
            >
              Browse the fleet
            </Link>
          </div>
        </div>

        <div className="dc-cta-code">
          D C — DRIVE DIFFERENT
        </div>
      </section>

      {/* FOOTER */}
      <footer className="dc-footer">
        <div className="dc-footer-main">
          <div className="dc-footer-brand">
            <Link to="/" className="dc-brand">
              <span className="dc-brand-mark">D</span>

              <span className="dc-brand-name">
                Da<span>Cars</span>
              </span>
            </Link>

            <p>
              Premium car rentals made simple.
              <br />
              Choose your car. Choose your time. Hit the road.
            </p>
          </div>

          <div className="dc-footer-col">
            <h3>EXPLORE</h3>
            <Link to="/">Home</Link>
            <Link to="/cars">Our Fleet</Link>
            <a href="#how-it-works">How It Works</a>
          </div>

          <div className="dc-footer-col">
            <h3>YOUR ACCOUNT</h3>
            <Link to="/signup">Create an Account</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </div>

          <div className="dc-footer-col">
            <h3>READY WHEN YOU ARE</h3>

            <p>
              Find a car for the plans you've made — or
              the ones you haven't yet.
            </p>

            <Link to="/cars" className="dc-footer-link">
              Explore cars 
            </Link>
          </div>
        </div>

        <div className="dc-footer-bottom">
          <span>
             {new Date().getFullYear()} DaCars.
            All rights reserved.
          </span>

          <span>DRIVE WITH CONFIDENCE.</span>

          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Back to top 
          </a>
        </div>
      </footer>
    </main>
  );
}

export default Home;