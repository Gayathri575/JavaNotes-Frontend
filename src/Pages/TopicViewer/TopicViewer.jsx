import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { topicConfigs } from "./topicConfigs";
import "./TopicViewer.css";

function TopicViewer() {
  const { topicId }  = useParams();
  const navigate     = useNavigate();
  const config       = topicConfigs[topicId];

  const [pages, setPages]           = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [openSections, setOpenSections] = useState({});
  const contentRef = useRef(null);

  // ── Fetch notes ────────────────────────────────────────────
  useEffect(() => {
    if (!config) return;
    setLoading(true);
    setError("");

    const fetchAll = config.fetchConfig.map(({ type, value }) => {
      const url = type === "topic"
        ? `/api/notes?topic=${encodeURIComponent(value)}`
        : `/api/notes/category?category=${encodeURIComponent(value)}`;
      return fetch(url).then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); });
    });

    Promise.all(fetchAll)
      .then(results => {
        const allData = results.flat();
        const orderedTitles = Object.values(config.sectionMap).flat();
        const sorted = orderedTitles
          .map(title => allData.find(p => p.title === title))
          .filter(Boolean);

        if (sorted.length > 0) {
          setPages(sorted);
          setCurrentPage(0);
          // Auto-open first section
          const firstSection = Object.keys(config.sectionMap)[0];
          setOpenSections({ [firstSection]: true });
        } else {
          setError(`No content found for "${config.label}"`);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [topicId]);

  // ── Scroll to top on page change ──────────────────────────
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [currentPage]);

  // ── Auto-open section containing current page ─────────────
  useEffect(() => {
    if (!config || pages.length === 0) return;
    const currentTitle = pages[currentPage]?.title;
    Object.entries(config.sectionMap).forEach(([section, titles]) => {
      if (titles.includes(currentTitle)) {
        setOpenSections(prev => ({ ...prev, [section]: true }));
      }
    });
  }, [currentPage, pages]);

  const toggleSection = useCallback((section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  // ── Strip a leading heading tag from content if it duplicates the title ──
  // Handles both literal "&" and HTML-escaped "&amp;" inside the title text.
  const stripLeadingTitle = useCallback((html, title) => {
    if (!html || !title) return html;

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Build a version of the title that matches either "&" or "&amp;"
    const flexibleTitle = title
      .split("&")
      .map(escapeRegex)
      .join("(?:&|&amp;)");

    const re = new RegExp(
      `^\\s*<h[1-6][^>]*>\\s*${flexibleTitle}\\s*<\\/h[1-6]>\\s*`,
      "i"
    );

    return html.replace(re, "");
  }, []);

  // ── Unknown topic ──────────────────────────────────────────
  if (!config) {
    return (
      <>
        <Navbar />
        <div className="tv-not-found">
          <h2>Topic not found 😕</h2>
          <button onClick={() => navigate("/articles")}>← Back to Articles</button>
        </div>
      </>
    );
  }

  const totalPages = pages.length;

  return (
    <>
      <Navbar />
      <div className="topic-container">

        {/* ── Sidebar ── */}
        <aside className="sidebar" id="sidebar">
          <ul id="sidebar-list">
            {!loading && Object.entries(config.sectionMap).map(([sectionName, titles]) => {
              const sectionNotes = titles
                .map(title => pages.findIndex(p => p.title === title))
                .filter(idx => idx !== -1);

              if (sectionNotes.length === 0) return null;
              const isOpen = !!openSections[sectionName];

              return (
                <li key={sectionName} style={{ listStyle: "none" }}>
                  <div
                    className="sidebar-section-header"
                    onClick={() => toggleSection(sectionName)}
                  >
                    <span>{sectionName}</span>
                    <span className="arrow">{isOpen ? "▾" : "▸"}</span>
                  </div>

                  {isOpen && (
                    <ul className="sidebar-sublist" style={{ display: "block" }}>
                      {sectionNotes.map(noteIdx => (
                        <li
                          key={noteIdx}
                          className={`sidebar-subitem ${noteIdx === currentPage ? "active" : ""}`}
                          onClick={() => setCurrentPage(noteIdx)}
                        >
                          {pages[noteIdx]?.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* ── Main Content ── */}
        <main className="topic-content">

          {/* Loading */}
          {loading && (
            <div id="page-content">
              <div className="loader">Loading {config.label} notes…</div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div id="page-content">
              <p style={{ color: "red" }}>{error}</p>
            </div>
          )}

          {/* Content */}
          {!loading && !error && pages.length > 0 && (
            <div id="page-content" ref={contentRef}>
              <div className="note-card">
                <h2>{pages[currentPage]?.title}</h2>
                <div
                  className="note-body"
                  dangerouslySetInnerHTML={{
                    __html:
                      stripLeadingTitle(
                        pages[currentPage]?.content,
                        pages[currentPage]?.title
                      ) || "Content is empty."
                  }}
                />
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="pagination">
            <button
              id="prev"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              ← Prev
            </button>
            <span id="page-number">
              {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : "0 / 0"}
            </span>
            <button
              id="next"
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next →
            </button>
          </div>
        </main>

      </div>
    </>
  );
}

export default TopicViewer;