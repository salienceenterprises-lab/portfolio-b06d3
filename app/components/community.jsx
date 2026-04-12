"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHandsHelping } from "react-icons/fa";

const TEAL   = "#00838F";
const NAVY   = "#0a1f3c";
const WHITE  = "#ffffff";
const GREY   = "#546E7A";
const LIGHT  = "#f0f7fa";
const BORDER = "#e0ecf0";

export default function MedicCommunity({ data }) {
  const list = data?.community || [];
  if (!list.length) return null;

  return (
    <section id="community" style={{ background: LIGHT, borderTop: `1px solid ${BORDER}` }}>
      <div className="med-inner" style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
        >
          <div style={{ width: "20px", height: "20px", background: "rgba(0,131,143,0.1)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: TEAL }}>06</span>
          </div>
          <div style={{ width: "32px", height: "2px", background: TEAL, borderRadius: "2px" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Community Service</span>
        </motion.div>

        <style>{`@media(max-width:768px){.med-comm-grid{grid-template-columns:1fr!important;} #community .med-inner{padding:4rem 1.25rem!important;}}`}</style>
        <div className="med-comm-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
        }}>
          {list.map((item, i) => {
            const title = item.title || item.name || item.organization || item.role || "";
            const org = item.organization || item.company || item.employer || "";
            const duration = item.duration || item.years || item.period || item.year || "";
            const description = item.description || item.summary || "";

            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                style={{
                  background: WHITE,
                  borderRadius: "12px",
                  border: `1px solid ${BORDER}`,
                  padding: "1.8rem 2rem",
                  boxShadow: "0 2px 12px rgba(10,31,60,0.04)",
                  display: "flex", flexDirection: "column", gap: "1rem",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,131,143,0.1)";
                  e.currentTarget.style.borderColor = "rgba(0,131,143,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(10,31,60,0.04)";
                  e.currentTarget.style.borderColor = BORDER;
                }}
              >
                {/* Top: icon + index */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "10px",
                    background: "rgba(0,131,143,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <FaHandsHelping size={18} style={{ color: TEAL }} />
                  </div>
                  <span style={{
                    fontSize: "10px", fontWeight: 700,
                    color: TEAL, background: "rgba(0,131,143,0.08)",
                    padding: "3px 10px", borderRadius: "100px",
                    letterSpacing: "0.05em",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: NAVY, margin: "0 0 4px", lineHeight: 1.3 }}>
                    {title}
                  </h3>
                  {org && title !== org && (
                    <div style={{ fontSize: "12px", fontWeight: 600, color: TEAL }}>{org}</div>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <p style={{ fontSize: "13px", color: GREY, lineHeight: 1.75, margin: 0, fontWeight: 400 }}>
                    {description}
                  </p>
                )}

                {/* Duration */}
                {duration && (
                  <div style={{
                    fontSize: "11px", fontWeight: 600, color: GREY,
                    borderTop: `1px solid ${BORDER}`, paddingTop: "0.8rem",
                    marginTop: "auto",
                  }}>
                    {duration}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
