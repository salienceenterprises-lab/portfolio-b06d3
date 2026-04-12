"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStethoscope } from "react-icons/fa";

const TEAL   = "#00838F";
const NAVY   = "#0a1f3c";
const WHITE  = "#ffffff";
const GREY   = "#546E7A";
const LIGHT  = "#f0f7fa";
const BORDER = "#e0ecf0";

export default function MedicExperience({ data }) {
  const list = data?.experience || [];
  if (!list.length) return null;

  const [active, setActive] = useState(0);
  const job = list[active];

  const bullets = Array.isArray(job?.highlights)
    ? job.highlights
    : Array.isArray(job?.responsibilities)
    ? job.responsibilities
    : Array.isArray(job?.bullets)
    ? job.bullets
    : typeof job?.description === "string"
    ? job.description.split("\n").filter(Boolean)
    : [];

  return (
    <section id="experience" style={{ background: WHITE, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
        >
          <div style={{ width: "20px", height: "20px", background: "rgba(0,131,143,0.1)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: TEAL }}>03</span>
          </div>
          <div style={{ width: "32px", height: "2px", background: TEAL, borderRadius: "2px" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Clinical Experience</span>
        </motion.div>

        <style>{`@media(max-width:768px){.med-exp-grid{grid-template-columns:1fr!important;} .med-exp-sidebar{border-right:none!important;border-bottom:1px solid #e0ecf0!important;display:flex!important;flex-direction:row!important;overflow-x:auto!important;} .med-exp-sidebar button{min-width:130px!important;border-left:none!important;border-bottom:3px solid transparent!important;border-top:none!important;justify-content:flex-start!important;} #experience>div{padding:4rem 1.25rem!important;}}`}</style>
        <div className="med-exp-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "0", borderRadius: "12px", border: `1px solid ${BORDER}`, overflow: "hidden", boxShadow: "0 4px 20px rgba(10,31,60,0.06)" }}>
          {/* Left */}
          <div className="med-exp-sidebar" style={{ background: LIGHT, borderRight: `1px solid ${BORDER}` }}>
            {list.map((item, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  width: "100%", textAlign: "left",
                  background: active === i ? WHITE : "transparent",
                  border: "none",
                  borderLeft: active === i ? `3px solid ${TEAL}` : "3px solid transparent",
                  borderBottom: `1px solid ${BORDER}`,
                  padding: "1.4rem 1.6rem",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                  background: active === i ? "rgba(0,131,143,0.12)" : "rgba(0,131,143,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s",
                }}>
                  <FaStethoscope size={14} style={{ color: TEAL }} />
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: active === i ? NAVY : GREY, marginBottom: "2px", transition: "color 0.2s" }}>
                    {item.company || item.employer || item.organization}
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: 600, color: active === i ? TEAL : "#94a3b8", transition: "color 0.2s" }}>
                    {item.period || item.duration || item.years || ""}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              style={{ padding: "2.5rem 3rem", background: WHITE }}
            >
              <div style={{ fontSize: "11px", fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px" }}>
                {job?.role || job?.title || job?.position}
              </div>
              <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 900, color: NAVY, letterSpacing: "-0.02em", margin: "0 0 1.5rem" }}>
                {job?.company || job?.employer || job?.organization}
              </h3>
              <div style={{ width: "32px", height: "3px", background: TEAL, borderRadius: "2px", marginBottom: "1.8rem" }} />

              {job?.description && (
                <p style={{ fontSize: "14px", color: GREY, lineHeight: 1.75, marginBottom: bullets.length > 0 ? "1.25rem" : 0 }}>{job.description}</p>
              )}
              {bullets.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {bullets.map((b, j) => (
                    <div key={j} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: TEAL, flexShrink: 0, marginTop: "7px" }} />
                      <span style={{ fontSize: "14px", color: GREY, lineHeight: 1.75, fontWeight: 400 }}>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
