import Navbar from "../Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <header id="hero" className="hero">
        <div className="hero-content">
          <h1>Your Backend Engineering Reference Hub</h1>
          <p>
            Structured, revision-ready guides for Java, Spring Boot, Hibernate,
            and System Design — built for developers who move fast.
          </p>
        </div>
      </header>

      {/* ── Why JavaHub ── */}
      <section id="why" className="why">
        <h2>Why JavaHub?</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>The Problem</h3>
              <p>
                Every interview cycle meant relearning the same OOPS principles,
                Spring Boot annotations, and design patterns from scattered
                sources — wasting hours that should have gone into practice.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <h3>Fragmented Knowledge</h3>
              <p>
                Concepts were spread across bookmarks, PDFs, and random notes —
                with no structure, no hierarchy, and no quick way to locate what
                mattered most under pressure.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <h3>The Solution</h3>
              <p>
                JavaHub centralizes everything — organized by topic, built for
                rapid revision, and designed to help backend developers retain
                complex patterns and walk into interviews prepared.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <h3>Impact</h3>
              <p>
                This platform improves revision speed, reduces dependency on
                multiple resources, and helps developers stay interview-ready at
                any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <h2>Ready to Engineer Your Preparation?</h2>
        <p>
          Stop re-searching what you've already learned. JavaHub puts every core
          concept, pattern, and interview topic at your fingertips. 🚀
        </p>
        <a href="/articles" className="cta-btn">
          Start Learning
        </a>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h3>
              Java<span>Hub</span>
            </h3>
            <p>
              A structured learning platform for backend developers — covering
              Java, Spring Boot, Hibernate, and System Design in one organized,
              revision-ready hub.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 JavaHub. Built with ☕ and Spring Boot Logic.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;