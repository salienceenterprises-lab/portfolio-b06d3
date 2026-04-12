"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

const TEAL   = "#00838F";
const NAVY   = "#0a1f3c";
const WHITE  = "#ffffff";
const GREY   = "#546E7A";
const LIGHT  = "#f0f7fa";
const BORDER = "#e0ecf0";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1], delay },
});

export default function MedicHero({ data }) {
  const hasPhoto     = !!data?.heroImageBase64;
  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;
  const nameParts    = (data?.name || "Portfolio").split(" ");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  const stats = [
    data?.experience?.length && { label: "Roles",       value: `${data.experience.length}` },
    data?.projects?.length   && { label: "Projects",    value: `${data.projects.length}`   },
    data?.community?.length  && { label: "Initiatives", value: `${data.community.length}`  },
  ].filter(Boolean);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: `linear-gradient(155deg, ${LIGHT} 0%, #e8f4f8 40%, #f5fbfc 100%)`,
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: "65px",
    }}>
      {/* Soft ambient circle */}
      <div style={{
        position: "absolute", top: "10%", right: hasPhoto ? "35%" : "5%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,131,143,0.07) 0%, transparent 70%)`,
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      {/* Decorative ring */}
      <div style={{
        position: "absolute", bottom: "15%", left: "-80px",
        width: "300px", height: "300px", borderRadius: "50%",
        border: `1px solid rgba(0,131,143,0.08)`,
        pointerEvents: "none",
      }} />

      <style>{`@media(max-width:768px){.med-hero-grid{grid-template-columns:1fr!important;gap:2.5rem!important;padding:3rem 1.25rem 4rem!important;} .med-passion-card{left:0!important;bottom:-20px!important;} .med-resume-chip{top:auto!important;right:0!important;bottom:-60px!important;} #hero{padding-bottom:7rem!important;}}`}</style>
      <div className="med-hero-grid" style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "5rem 2.5rem", width: "100%",
        position: "relative", zIndex: 1,
        display: "grid",
        gridTemplateColumns: hasPhoto ? "1fr 380px" : "1fr",
        gap: "5rem", alignItems: "center",
      }}>
        {/* Left */}
        <div>
          {/* Title badge */}
          {data?.title && (
            <motion.div {...fadeUp(0)} style={{ marginBottom: "2rem" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(0,131,143,0.08)",
                border: "1px solid rgba(0,131,143,0.2)",
                color: TEAL, fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.1em", padding: "6px 16px",
                borderRadius: "100px",
              }}>
                {data.title}
              </span>
            </motion.div>
          )}

          {/* Name */}
          <motion.div {...fadeUp(0.1)} style={{ marginBottom: "2rem" }}>
            {nameParts.map((word, i) => (
              <div key={i} style={{
                fontSize: "clamp(3rem, 7vw, 7rem)",
                fontWeight: 900, color: i === nameParts.length - 1 ? TEAL : NAVY,
                letterSpacing: "-0.04em", lineHeight: 0.9,
                display: "block",
              }}>
                {word}
              </div>
            ))}
          </motion.div>

          {/* Teal divider */}
          <motion.div {...fadeUp(0.18)} style={{ margin: "0 0 2rem" }}>
            <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg, ${TEAL}, #4DB6AC)`, borderRadius: "2px" }} />
          </motion.div>

          {/* Bio */}
          {(data?.sloganHeroSection || data?.bio) && (
            <motion.p {...fadeUp(0.22)} style={{
              fontSize: "15px", fontWeight: 400, color: GREY,
              lineHeight: 1.85, maxWidth: "520px", margin: "0 0 2.5rem",
            }}>
              {data?.sloganHeroSection || data?.bio?.slice(0, 200) + "…"}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div {...fadeUp(0.3)} style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "3rem" }}>
            <button onClick={() => scrollTo("contact")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: TEAL, color: WHITE, border: "none",
                padding: "13px 30px", fontSize: "13px", fontWeight: 700,
                letterSpacing: "0.04em", cursor: "pointer",
                borderRadius: "100px",
                boxShadow: "0 4px 18px rgba(0,131,143,0.28)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#00696F"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,131,143,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = TEAL; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,131,143,0.28)"; }}
            >
              Get In Touch <FaArrowRight size={12} />
            </button>
            <button onClick={() => scrollTo("about")}
              style={{
                background: "transparent", color: NAVY,
                border: `1.5px solid ${BORDER}`, padding: "12px 26px",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
                borderRadius: "100px", transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.color = TEAL; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = NAVY; }}
            >
              My Story
            </button>
            {data?.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ color: GREY, transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = TEAL}
                onMouseLeave={(e) => e.currentTarget.style.color = GREY}
              ><FaLinkedin size={20} /></a>
            )}
            {data?.email && (
              <a href={`mailto:${data.email}`}
                style={{ color: GREY, transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = TEAL}
                onMouseLeave={(e) => e.currentTarget.style.color = GREY}
              ><FaEnvelope size={18} /></a>
            )}
          </motion.div>

          {/* Stats */}
          {stats.length > 0 && (
            <motion.div {...fadeUp(0.38)} style={{
              display: "flex", gap: "0",
              borderTop: `1px solid ${BORDER}`, paddingTop: "2rem",
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  paddingRight: "2rem", marginRight: "2rem",
                  borderRight: i < stats.length - 1 ? `1px solid ${BORDER}` : "none",
                }}>
                  <div style={{
                    fontSize: "clamp(1.8rem, 3vw, 3rem)",
                    fontWeight: 900, color: TEAL,
                    letterSpacing: "-0.04em", lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: "10px", fontWeight: 600, color: GREY,
                    textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right: photo */}
        {hasPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            style={{ position: "relative" }}
            className="med-hero-photo"
          >
            {/* Teal accent ring */}
            <div style={{
              position: "absolute", inset: "-10px",
              borderRadius: "16px",
              border: `2px solid rgba(0,131,143,0.15)`,
              pointerEvents: "none",
            }} />

            <div style={{
              borderRadius: "14px",
              overflow: "hidden",
              border: `1px solid ${BORDER}`,
              boxShadow: "0 20px 60px rgba(10,31,60,0.12)",
            }}>
              <img
                src={data.heroImageBase64}
                alt={data.name}
                style={{
                  width: "100%", height: "480px",
                  objectFit: "cover", objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>

            {/* Floating passion card */}
            <div style={{
              position: "absolute", bottom: "24px", left: "-24px",
              background: WHITE,
              borderRadius: "10px",
              border: `1px solid ${BORDER}`,
              boxShadow: "0 8px 28px rgba(10,31,60,0.1)",
              padding: "14px 18px",
              display: "flex", alignItems: "center", gap: "12px",
              maxWidth: "220px",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(0,131,143,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <FaHeart size={14} style={{ color: TEAL }} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: NAVY }}>Driven by</div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: TEAL }}>Purpose & Passion</div>
              </div>
            </div>

            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  position: "absolute", top: "-16px", right: "-16px",
                  background: WHITE, borderRadius: "8px",
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 4px 16px rgba(10,31,60,0.08)",
                  padding: "10px 16px",
                  display: "flex", alignItems: "center", gap: "8px",
                  textDecoration: "none", transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,131,143,0.18)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,31,60,0.08)"}
              >
                <div style={{ fontSize: "11px", fontWeight: 700, color: TEAL }}>Download Résumé ↓</div>
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
