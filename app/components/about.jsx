"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGlobe } from "react-icons/fa";

const TEAL   = "#00838F";
const NAVY   = "#0a1f3c";
const WHITE  = "#ffffff";
const GREY   = "#546E7A";
const LIGHT  = "#f0f7fa";
const BORDER = "#e0ecf0";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay },
});

export default function MedicAbout({ data }) {
  if (!data) return null;
  const skills = data?.skills || [];
  const flatSkills = skills.flatMap?.((s) =>
    typeof s === "object" && s.items ? s.items : [s]
  ) || skills;

  const infoRows = [
    data?.location && { icon: <FaMapMarkerAlt size={13} />, label: "Location", value: data.location,    href: null },
    data?.email    && { icon: <FaEnvelope size={13} />,     label: "Email",    value: data.email,        href: `mailto:${data.email}` },
    data?.linkedin && { icon: <FaLinkedin size={13} />,     label: "LinkedIn", value: "View Profile",    href: data.linkedin },
    data?.website  && { icon: <FaGlobe size={13} />,        label: "Website",  value: data.website,      href: data.website },
  ].filter(Boolean);

  const values = [
    { label: "Purpose",    icon: "✦" },
    { label: "Excellence", icon: "◈" },
    { label: "Integrity",  icon: "◇" },
    { label: "Impact",     icon: "◉" },
  ];

  return (
    <section id="about" style={{ background: WHITE, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        {/* Section label */}
        <motion.div {...reveal(0)} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}>
          <div style={{ width: "20px", height: "20px", background: "rgba(0,131,143,0.1)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: TEAL }}>01</span>
          </div>
          <div style={{ width: "32px", height: "2px", background: TEAL, borderRadius: "2px" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>About Me</span>
        </motion.div>

        <style>{`@media(max-width:768px){.med-about-grid{grid-template-columns:1fr!important;gap:2.5rem!important;} #about>div{padding:4rem 1.25rem!important;}}`}</style>
        <div className="med-about-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "5rem", alignItems: "start" }}>
          {/* Left */}
          <div>
            <motion.h2 {...reveal(0.05)} style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900, color: NAVY,
              letterSpacing: "-0.03em", lineHeight: 1.1,
              margin: "0 0 1.5rem",
            }}>
              A Career Built on<br />
              <span style={{ color: TEAL }}>Purpose & People</span>
            </motion.h2>

            <motion.p {...reveal(0.1)} style={{
              fontSize: "15.5px", color: GREY,
              lineHeight: 1.85, margin: "0 0 2.5rem", fontWeight: 400,
            }}>
              {data?.bio || "Driven by genuine curiosity and a commitment to making a meaningful difference. I approach every challenge with care, precision, and a deep respect for the people I serve — because great work is always personal."}
            </motion.p>

            {/* Core values */}
            <motion.div {...reveal(0.15)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "2.5rem" }}>
              {values.map((v, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: LIGHT, border: `1px solid ${BORDER}`,
                  padding: "12px 16px", borderRadius: "8px",
                }}>
                  <span style={{ fontSize: "16px", color: TEAL, fontWeight: 700 }}>{v.icon}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: NAVY, letterSpacing: "0.04em" }}>{v.label}</span>
                </div>
              ))}
            </motion.div>

            {flatSkills.length > 0 && (
              <motion.div {...reveal(0.2)}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "1rem" }}>
                  Skills & Expertise
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {flatSkills.slice(0, 14).map((skill, i) => {
                    const label = typeof skill === "string" ? skill : skill?.name || String(skill);
                    return (
                      <span key={i} style={{
                        fontSize: "12px", fontWeight: 600, color: NAVY,
                        background: LIGHT, border: `1px solid ${BORDER}`,
                        padding: "5px 14px", borderRadius: "100px",
                        transition: "all 0.2s ease", cursor: "default",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.color = TEAL; e.currentTarget.style.background = "rgba(0,131,143,0.06)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = NAVY; e.currentTarget.style.background = LIGHT; }}
                      >{label}</span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: contact card */}
          {infoRows.length > 0 && (
            <motion.div {...reveal(0.1)}>
              <div style={{
                background: LIGHT, border: `1px solid ${BORDER}`,
                borderRadius: "12px", padding: "2.5rem",
                boxShadow: "0 4px 20px rgba(10,31,60,0.06)",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  marginBottom: "1.8rem",
                }}>
                  <div style={{ width: "3px", height: "20px", background: TEAL, borderRadius: "2px" }} />
                  <span style={{ fontSize: "11px", fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: "0.18em" }}>
                    Contact
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {infoRows.map((row, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "12px 0",
                      borderBottom: i < infoRows.length - 1 ? `1px solid ${BORDER}` : "none",
                    }}>
                      <div style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        background: "rgba(0,131,143,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: TEAL, flexShrink: 0,
                      }}>{row.icon}</div>
                      <div>
                        <div style={{ fontSize: "9px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2px" }}>
                          {row.label}
                        </div>
                        {row.href ? (
                          <a href={row.href} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: "13px", fontWeight: 600, color: NAVY, textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = TEAL}
                            onMouseLeave={(e) => e.currentTarget.style.color = NAVY}
                          >{row.value}</a>
                        ) : (
                          <span style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}>{row.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
