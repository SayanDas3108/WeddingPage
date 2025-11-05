import { useState, useEffect, useRef } from "react";
import "./index.css";

export default function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showBride, setShowBride] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const userInteractedRef = useRef(false); // track if we've already handled first interaction

  const [form, setForm] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: 1,
    message: "",
  });

  // Toggle bride & groom every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => setShowBride((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  // Autoplay on first user interaction only (then remove listener)
  useEffect(() => {
    function handleUserInteraction() {
      if (userInteractedRef.current) return;
      userInteractedRef.current = true;
      if (audioRef.current && !musicPlaying) {
        audioRef.current
          .play()
          .then(() => setMusicPlaying(true))
          .catch((err) => {
            // Autoplay may be blocked on some devices — that's ok
            console.debug("Autoplay blocked:", err);
          });
      }
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    }

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [musicPlaying]);

  // Toggle music manually — stops or plays and updates state.
  function toggleMusic(e) {
    // avoid bubbling to global interaction handler (just in case)
    e?.stopPropagation?.();
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch((err) => {
          console.debug("Play error:", err);
        });
    }
  }

  // RSVP submit
  function submitRsvp(e) {
    e.preventDefault();
    setRsvpSent(true);
    setTimeout(() => {
      setRsvpOpen(false);
      setRsvpSent(false);
      setForm({
        name: "",
        email: "",
        attending: "yes",
        guests: 1,
        message: "",
      });
    }, 1600);
  }

  // Close mobile menu when resizing to desktop widths (optional nice touch)
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="page">
      {/* Fixed header */}
      <header className="full-header" onClick={() => setMenuOpen(false)}>
        <div className="header-left">
          <div className="date-text">December 15, 2025</div>
          <div className="time-text">9:00 AM</div>
        </div>

        <div className="header-center" aria-hidden>
          <span className="ring">💍</span>
          <h1 className="couple-names">Abhishek <span className="and">&</span> Suranjana</h1>
          <div className="subtext">Weds</div>
        </div>

        <div className="header-right">
          {/* hamburger - visible on small screens */}
          <button
            className="menu-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((s) => !s);
            }}
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a>
            <a href="#event" onClick={() => setMenuOpen(false)}>Event</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
            <button
              className="btn-outline"
              onClick={() => {
                setRsvpOpen(true);
                setMenuOpen(false);
              }}
            >
              RSVP
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-left">
            <h1 className="hero-title">We said “Yes” — now join our celebration</h1>
            <p className="hero-sub">A day of love, laughter, and togetherness.</p>

            <div className="poem-card">
              <svg viewBox="0 0 120 60" className="hands-svg" aria-hidden>
                <g transform="translate(0,0)">
                  <ellipse cx="35" cy="38" rx="18" ry="8" fill="#f5d6d9" />
                  <ellipse cx="85" cy="38" rx="18" ry="8" fill="#f5d6d9" />
                  <path d="M30 30 C45 22, 55 22, 70 30" stroke="#b76e79" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <circle cx="50" cy="30" r="4" fill="#fff5f7" stroke="#b76e79" strokeWidth="1.2"/>
                </g>
              </svg>

              <blockquote className="poem">
                <p>“Two hearts, one promise —</p>
                <p>Under the same sky we vow to laugh together,</p>
                <p>to hold hands through storms and sunlight.”</p>
                <cite>— S & P</cite>
              </blockquote>
            </div>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => setRsvpOpen(true)}>RSVP Now</button>
              <a className="btn-ghost" href="https://www.google.com/maps?q=Kolkata" target="_blank" rel="noreferrer">View on Map</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="photo-fade">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop" alt="bride" className={`fade-img ${showBride ? "active" : ""}`} />
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop" alt="groom" className={`fade-img ${!showBride ? "active" : ""}`} />
            </div>
            <div className="floating-flowers">🌸 🌿</div>
          </div>
        </section>

        <section id="story" className="story">
          <h2>Our Story</h2>
          <p className="story-text">They met over a cup of chai and discovered that conversation can feel like coming home. From small adventures to big dreams — they chose forever.</p>
          <div className="timeline">
            <div className="time-item"><strong>2019</strong><span>First met</span></div>
            <div className="time-item"><strong>2022</strong><span>Road trip together</span></div>
            <div className="time-item"><strong>2025</strong><span>We said yes</span></div>
          </div>
        </section>

        <section id="event" className="event">
          <h2>Event Details</h2>
          <div className="event-grid">
            <div className="card"><h3>Ceremony</h3><p>9:00 AM — St. Mary's Church, Park Street, Kolkata</p></div>
            <div className="card"><h3>Reception</h3><p>6:30 PM — The Grand Ballroom, Taj Hotel, Kolkata</p></div>
            <div className="card map-card"><h3>Location</h3>
              <div className="map-wrap"><iframe title="event-location" src="https://www.google.com/maps?q=Park%20Street%20Kolkata&output=embed" loading="lazy"/></div>
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery">
          <h2>Gallery</h2>
          <div className="grid">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" alt="prewedding1"/>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" alt="prewedding2"/>
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop" alt="prewedding3"/>
          </div>
        </section>
      </main>

      {/* Background music (put your audio file in public/ as soft_wedding_music.wav) */}
      <audio ref={audioRef} loop preload="auto" src="/soft_wedding_music.wav" />

      <button className={`music-btn ${musicPlaying ? "playing" : ""}`} onClick={toggleMusic} title={musicPlaying ? "Pause Music" : "Play Music"}>
        {musicPlaying ? "🔇" : "🎵"}
      </button>

      <footer className="footer"><p>With love — Abhishek & Suranjana • See you soon ❤️</p></footer>

      {rsvpOpen && (
        <div className="modal-backdrop" onClick={() => setRsvpOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>RSVP</h3>
            {!rsvpSent ? (
              <form onSubmit={submitRsvp} className="rsvp-form">
                <label>Name <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required/></label>
                <label>Email <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required/></label>
                <label>Attending
                  <select value={form.attending} onChange={(e) => setForm({ ...form, attending: e.target.value })}>
                    <option value="yes">Yes</option><option value="no">No</option>
                  </select>
                </label>
                <label>Guests <input type="number" min="0" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}/></label>
                <label>Message (optional) <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea></label>
                <div className="modal-actions">
                  <button type="submit" className="btn-primary">Send RSVP</button>
                  <button type="button" className="btn-outline" onClick={() => setRsvpOpen(false)}>Cancel</button>
                </div>
              </form>
            ) : <div className="sent">Thanks — your RSVP has been recorded ✨</div>}
          </div>
        </div>
      )}
    </div>
  );
}
