"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const TEAL   = "#00838F";
const NAVY   = "#0a1f3c";
const WHITE  = "#ffffff";
const GREY   = "#546E7A";
const LIGHT  = "#f0f7fa";
const BORDER = "#e0ecf0";

export default function MedicEducation({ data }) {
  const list = data?.education || [];
  if (!list.length) return null;

  return (
    <section id="education" style={{ background: LIGHT, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
        >
          <div style={{ width: "20px", height: "20px", background: "rgba(0,131,143,0.1)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: TEAL }}>02</span>
          </div>
          <div style={{ width: "32px", height: "2px", background: TEAL, borderRadius: "2px" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Education</span>
        </motion.div>

        <style>{`@media(max-width:768px){.med-edu-card{grid-template-columns:48px 1fr!important;padding:1.5rem!important;} .med-edu-period{display:none!important;} #education>div{padding:4rem 1.25rem!important;}}`}</style>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {list.map((edu, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="med-edu-card"
              style={{
                background: WHITE, borderRadius: "10px",
                border: `1px solid ${BORDER}`,
                padding: "2rem 2.5rem",
                display: "grid", gridTemplateColumns: "56px 1fr auto",
                gap: "1.5rem", alignItems: "start",
                boxShadow: "0 2px 12px rgba(10,31,60,0.04)",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,131,143,0.1)"; e.currentTarget.style.borderColor = "rgba(0,131,143,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(10,31,60,0.04)"; e.currentTarget.style.borderColor = BORDER; }}
            >
              {/* Icon */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "10px",
                background: "rgba(0,131,143,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <FaGraduationCap size={22} style={{ color: TEAL }} />
              </div>

              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: NAVY, margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                  {edu.degree || edu.field || edu.title}
                </h3>
                <div style={{ fontSize: "13px", fontWeight: 600, color: TEAL, marginBottom: "4px" }}>
                  {edu.institution || edu.school}
                </div>
                {edu.location && (
                  <div style={{ fontSize: "12px", color: GREY, marginBottom: "0.5rem" }}>{edu.location}</div>
                )}
                {edu.description && (
                  <p style={{ fontSize: "13px", color: GREY, lineHeight: 1.7, margin: "0 0 8px", fontWeight: 400 }}>
                    {edu.description}
                  </p>
                )}
                {(edu.achievements || edu.highlights)?.length > 0 && (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                    {(edu.achievements || edu.highlights).map((a, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: GREY, lineHeight: 1.6 }}>
                        <span style={{ color: TEAL, flexShrink: 0 }}>✦</span>{a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="med-edu-period" style={{
                fontSize: "11px", fontWeight: 700, color: WHITE,
                background: TEAL, padding: "4px 12px",
                borderRadius: "100px", whiteSpace: "nowrap",
                height: "fit-content",
              }}>
                {edu.period || edu.duration || edu.years || edu.year || ""}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
