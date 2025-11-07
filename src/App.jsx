import { useState, useEffect, useRef } from "react";
import "./index.css";

export default function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showBride, setShowBride] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const userInteractedRef = useRef(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: 1,
    message: "",
  });

  useEffect(() => {
    const interval = setInterval(() => setShowBride((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleUserInteraction() {
      if (userInteractedRef.current) return;
      userInteractedRef.current = true;
      if (audioRef.current && !musicPlaying) {
        audioRef.current
          .play()
          .then(() => setMusicPlaying(true))
          .catch((err) => console.debug("Autoplay blocked:", err));
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

  function toggleMusic(e) {
    e?.stopPropagation?.();
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch((err) => console.debug("Play error:", err));
    }
  }

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
          <div className="date-text">December 15, 2025 / ১৫ ডিসেম্বর, ২০২৫</div>
          <div className="time-text">9:00 AM / সকাল ৯:০০</div>
        </div>

        <div className="header-center" aria-hidden>
          <span className="ring">💍</span>
          <h1 className="couple-names">
            Abhishek <span className="and">&</span> Suranjana
          </h1>
          <div className="subtext">Weds / বিবাহ</div>
        </div>

        <div className="header-right">
          <button
            className="menu-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((s) => !s);
            }}
            aria-label="Toggle navigation / নেভিগেশন টগল"
          >
            ☰
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#story" onClick={() => setMenuOpen(false)}>Our Story / আমাদের গল্প</a>
            <a href="#event" onClick={() => setMenuOpen(false)}>Event / অনুষ্ঠান</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery / গ্যালারি</a>
            <button
              className="btn-outline"
              onClick={() => {
                setRsvpOpen(true);
                setMenuOpen(false);
              }}
            >
              RSVP / উপস্থিতি নিশ্চিত করুন
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-left">
            <h1 className="hero-title">We said “Yes” — now join our celebration / আমরা বলেছি “হ্যাঁ” — আমাদের আনন্দে যোগ দিন</h1>
            <p className="hero-sub">A day of love, laughter, and togetherness / ভালোবাসা, হাসি, এবং একসাথে কাটানোর একটি দিন</p>

            <div className="poem-card">
              <svg viewBox="0 0 120 60" className="hands-svg" aria-hidden>
                <g transform="translate(0,0)">
                  <ellipse cx="35" cy="38" rx="18" ry="8" fill="#f5d6d9" />
                  <ellipse cx="85" cy="38" rx="18" ry="8" fill="#f5d6d9" />
                  <path d="M30 30 C45 22, 55 22, 70 30" stroke="#b76e79" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <circle cx="50" cy="30" r="4" fill="#fff5f7" stroke="#b76e79" strokeWidth="1.2" />
                </g>
              </svg>

              <div className="poem-container">
  <div className="poem-column">
    <p className="poem">
            “Two hearts, one promise —<br/>
            Under the same sky we vow to laugh together,<br/>
            to hold hands through storms and sunlight.”<br/><br/>
            — S & P
          </p>
        </div>

        <div className="poem-column">
          <p className="poem">
            দুইটি হৃদয়, একটি প্রতিশ্রুতি —<br/>
            একই আকাশের নিচে আমরা একসাথে হাসার প্রতিশ্রুতি দেই,<br/>
            ঝড় আর রোদে হাত ধরে রাখার প্রতিশ্রুতি।<br/><br/>
            — এস ও পি
          </p>
        </div>
      </div>


            </div>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => setRsvpOpen(true)}>RSVP / উপস্থিতি নিশ্চিত করুন</button>
              <a
                className="btn-ghost"
                href="https://www.google.com/maps?q=Sumati+Bala+Palace,+Kolkata"
                target="_blank"
                rel="noreferrer"
              >
                View on Map / মানচিত্রে দেখুন
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="photo-fade">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop"
                alt="bride"
                className={`fade-img ${showBride ? "active" : ""}`}
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop"
                alt="groom"
                className={`fade-img ${!showBride ? "active" : ""}`}
              />
            </div>
            <div className="floating-flowers">🌸 🌿</div>
          </div>
        </section>

        <section id="story" className="story">
          <h2>Our Story / আমাদের গল্প</h2>
          <p className="story-text">
            They met over a cup of chai and discovered that conversation can feel like coming home. / তারা এক কাপ চায়ের আড্ডায় দেখা করে এবং আবিষ্কার করে কথোপকথন কখনও কখনও বাড়িতে ফিরে আসার মতো অনুভূতি দেয়।
          </p>
          <div className="timeline">
            <div className="time-item"><strong>2019</strong><span>First met / প্রথম দেখা</span></div>
            <div className="time-item"><strong>2022</strong><span>Road trip together / একসাথে রোড ট্রিপ</span></div>
            <div className="time-item"><strong>2025</strong><span>We said yes / আমরা বলেছি হ্যাঁ</span></div>
          </div>
        </section>

        <section id="event" className="event">
          <h2>Event Details / অনুষ্ঠানের বিবরণ</h2>
          <div className="event-grid">
            <div className="card">
              <h3>Ceremony / বিবাহ অনুষ্ঠান</h3>
              <p>9:00 AM — St. Mary's Church, Park Street, Kolkata / সকাল ৯:০০ — সেন্ট মেরি’স চার্চ, পার্ক স্ট্রিট, কলকাতা</p>
            </div>
            <div className="card">
              <h3>Reception / অভ্যর্থনা অনুষ্ঠান</h3>
              <p>6:30 PM — The Grand Ballroom, Taj Hotel, Kolkata / সন্ধ্যা ৬:৩০ — দ্য গ্র্যান্ড বলরুম, তাজ হোটেল, কলকাতা</p>
            </div>
            <div className="card map-card">
              <h3>Location / লোকেশন</h3>
              <div className="map-wrap">
                <iframe
                  title="event-location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.9873472568425!2d88.4154831!3d22.4472032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0273ef56863685%3A0xc99a0e5791e71b24!2sSumati%20Bala%20Palace%20Marriage%20House!5e0!3m2!1sen!2sin!4v1730930000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* NEW FAMILY DETAILS SECTION */}
        <section id="family" className="family-section">
          <h2>Family Details & Contact / পারিবারিক বিবরণ ও যোগাযোগ</h2>
          <div className="family-grid">
            <div className="card">
              <h3>Bride’s Family / কনের পরিবার</h3>
              <div className="detail">
                <div> Name - Suranjana Das </div>
                <div> নাম - সুরঞ্জনা দাস </div>
              </div>
              <div className="detail">
                <div> Father - Chittaranjan Das </div>
                <div> পিতা - চিত্তরঞ্জন দাস </div>
              </div>
              <div className="detail">
                <div> Mother - Tulu Das </div>
                <div> মা - তুলু দাস </div>
              </div>
              <div className="detail">
                <div> Sister - Tiyasa Das </div>
                <div> বোন - তিয়াসা দাস </div>
              </div>
              <div className="detail">
                <div> Address - Sonarpur Kamrabad Subhash Pally, Kolkata - 700150 </div>
                <div> ঠিকানা - সোনারপুর কামরাবাদ সুভাষ পল্লী, কলকাতা - 700150 </div>
              </div>
            </div>

            <div className="card">
              <h3>Groom’s Family / বর এর পরিবার</h3>
              <div className="detail">
                <div> Name - Abhishek Chakraborty </div>
                <div> নাম - অভিষেক চক্রবর্তী </div>
              </div>
              <div className="detail">
                <div> Father - Gopal Chakraborty </div>
                <div> পিতা - গোপাল চক্রবর্তী </div>
              </div>
              <div className="detail">
                <div> Mother - Mita Chakraborty </div>
                <div> মা - মিতা চক্রবর্তী </div>
              </div>
              <div className="detail">
                <div> Sister - Anindita Chakraborty </div>
                <div> বোন - অনিন্দিতা চক্রবর্তী </div>
              </div>
              <div className="detail">
                <div> Address - Sonarpur Kamrabad Mandirtola, Kolkata - 700150 </div>
                <div> ঠিকানা - সোনারপুর কামরাবাদ মন্দিরতলা, কলকাতা - 700150 </div>
              </div>
            </div>

            <div className="card contact-card">
              <h3>Contact / যোগাযোগ</h3>
              <div className="detail">
                <div> Phone - 7278048114 </div>
                <div> ফোন - ৭২৭৮০৪৮১১৪ </div>
              </div>
              <div className="detail">
                <div> Alternate - 9477413567 </div>
                <div> বিকল্প - ৯৪৭৭৪১৩৫৬৭ </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery">
          <h2>Gallery / গ্যালারি</h2>
          <div className="grid">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" alt="prewedding1" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" alt="prewedding2" />
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop" alt="prewedding3" />
          </div>
        </section>
      </main>

      <audio ref={audioRef} loop preload="auto" src="/soft_wedding_music.wav" />

      <button className={`music-btn ${musicPlaying ? "playing" : ""}`} onClick={toggleMusic} title={musicPlaying ? "Pause Music / সঙ্গীত বন্ধ করুন" : "Play Music / সঙ্গীত চালু করুন"}>
        {musicPlaying ? "🔇" : "🎵"}
      </button>

      <footer className="footer">
        <p>With love — Abhishek & Suranjana • See you soon ❤️ / ভালোবাসা সহ — Abhishek & Suranjana • শীঘ্রই দেখা হবে ❤️</p>
      </footer>

      {rsvpOpen && (
        <div className="modal-backdrop" onClick={() => setRsvpOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>RSVP / উপস্থিতি নিশ্চিত করুন</h3>
            {!rsvpSent ? (
              <form onSubmit={submitRsvp} className="rsvp-form">
                <label className="stacked">
                  <div>Name - নাম</div>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </label>

                <label className="stacked">
                  <div>Email - ইমেইল</div>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </label>

                <label className="stacked">
                  <div>Attending - উপস্থিতি</div>
                  <select value={form.attending} onChange={(e) => setForm({ ...form, attending: e.target.value })}>
                    <option value="yes">Yes / হ্যাঁ</option>
                    <option value="no">No / না</option>
                  </select>
                </label>

                <label className="stacked">
                  <div>Guests - অতিথি</div>
                  <input type="number" min="0" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
                </label>

                <label className="stacked">
                  <div>Message (optional) - বার্তা (ঐচ্ছিক)</div>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                </label>

                <div className="modal-actions">
                  <button type="submit" className="btn-primary">Send RSVP / উপস্থিতি নিশ্চিত করুন</button>
                  <button type="button" className="btn-outline" onClick={() => setRsvpOpen(false)}>Cancel / বাতিল</button>
                </div>
              </form>
            ) : (
              <div className="sent">Thanks — your RSVP has been recorded ✨ / ধন্যবাদ — আপনার উপস্থিতি রেকর্ড করা হয়েছে ✨</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
