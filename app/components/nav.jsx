"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const TEAL   = "#00838F";
const NAVY   = "#0a1f3c";
const WHITE  = "#ffffff";
const GREY   = "#546E7A";
const BORDER = "#e0ecf0";

export default function MedicNav({ data }) {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen,    setMobileOpen]    = useState(false);

  const allLinks = [
    { label: "About",      key: "about",      href: "#about"      },
    { label: "Education",  key: "education",  href: "#education"  },
    { label: "Experience", key: "experience", href: "#experience" },
    { label: "Projects",   key: "projects",   href: "#projects"   },
    { label: "Skills",     key: "skills",     href: "#skills"     },
    { label: "Community",  key: "community",  href: "#community"  },
    { label: "Contact",    key: "contact",    href: "#contact"    },
  ];

  const activeLinks = allLinks.filter((l) => {
    if (l.label === "About") return true;
    if (l.key === "contact") return !!(data?.email || data?.github || data?.linkedin);
    const d = data?.[l.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;

  useEffect(() => {
    const ids = ["hero", ...activeLinks.map((l) => l.href.replace("#", ""))];
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sorted = ids
        .map((id) => ({ id, top: document.getElementById(id)?.offsetTop ?? Infinity }))
        .filter((s) => s.top !== Infinity)
        .sort((a, b) => a.top - b.top);
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].top - 120) { setActiveSection(sorted[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  // Initials from name
  const initials = (data?.name || "P")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <style>{`
        .med-link {
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.04em; color: ${GREY};
          text-decoration: none; padding: 4px 0;
          position: relative; transition: color 0.2s ease;
        }
        .med-link::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px; background: ${TEAL};
          transition: width 0.25s ease;
          border-radius: 2px;
        }
        .med-link:hover { color: ${NAVY}; }
        .med-link:hover::after,
        .med-link.active::after { width: 100%; }
        .med-link.active { color: ${NAVY}; font-weight: 700; }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: WHITE,
        borderBottom: `1px solid ${scrolled ? BORDER : "transparent"}`,
        boxShadow: scrolled ? "0 2px 16px rgba(0,131,143,0.08)" : "none",
        transition: "all 0.3s ease",
      }}>
        {/* Teal top stripe */}
        <div style={{ height: "3px", background: `linear-gradient(90deg, ${TEAL}, #4DB6AC)` }} />

        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 2.5rem", height: "62px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo: initials monogram */}
          <a href="#hero" onClick={(e) => go(e, "#hero")} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "8px",
              background: TEAL,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: WHITE, letterSpacing: "-0.02em" }}>{initials}</span>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: NAVY, letterSpacing: "-0.01em", lineHeight: 1 }}>
                {data?.name?.split(" ")[0] || "Portfolio"}
              </div>
              {data?.title && (
                <div style={{ fontSize: "9px", fontWeight: 600, color: TEAL, letterSpacing: "0.06em", lineHeight: 1.2 }}>
                  {data.title}
                </div>
              )}
            </div>
          </a>

          {/* Desktop links */}
          <div className="med-desktop-links">
            {activeLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className={`med-link ${isActive ? "active" : ""}`}>
                  {link.label}
                </a>
              );
            })}
            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  background: TEAL, color: WHITE,
                  fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.06em", textDecoration: "none",
                  padding: "8px 20px", borderRadius: "100px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 8px rgba(0,131,143,0.2)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#00696F"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,131,143,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = TEAL; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,131,143,0.2)"; }}
              >
                Résumé
              </a>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="med-hamburger"
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, padding: "6px" }}>
            {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: "fixed", top: "65px", left: 0, right: 0, zIndex: 199,
              background: WHITE, borderBottom: `1px solid ${BORDER}`,
              padding: "1.5rem 2.5rem 2rem",
              display: "flex", flexDirection: "column", gap: "0",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,131,143,0.1)",
            }}
          >
            {activeLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                style={{
                  fontSize: "14px", fontWeight: 600, color: NAVY,
                  textDecoration: "none", padding: "12px 0",
                  borderBottom: `1px solid ${BORDER}`,
                }}>
                {link.label}
              </a>
            ))}
            {resumeSource && (
              <a href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{ fontSize: "13px", fontWeight: 700, color: TEAL, textDecoration: "none", marginTop: "1rem" }}>
                Download Résumé ↓
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
