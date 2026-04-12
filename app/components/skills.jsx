"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat } from "react-icons/fa";

const TEAL   = "#00838F";
const NAVY   = "#0a1f3c";
const WHITE  = "#ffffff";
const GREY   = "#546E7A";
const LIGHT  = "#f0f7fa";
const BORDER = "#e0ecf0";

export default function MedicSkills({ data }) {
  const raw = data?.skills || [];
  if (!raw.length) return null;

  // Normalize: support flat string[], {name}[], or [{category, items}]
  const isGrouped = raw.some((s) => typeof s === "object" && s.items);
  const groups = isGrouped
    ? raw.map((g) => ({
        label: g.category || g.name || "Skills",
        items: (g.items || []).map((i) => (typeof i === "string" ? i : i?.name || String(i))),
      }))
    : [{ label: "Skills", items: raw.map((s) => (typeof s === "string" ? s : s?.name || String(s))) }];

  return (
    <section id="skills" style={{ background: WHITE, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
        >
          <div style={{ width: "20px", height: "20px", background: "rgba(0,131,143,0.1)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: TEAL }}>05</span>
          </div>
          <div style={{ width: "32px", height: "2px", background: TEAL, borderRadius: "2px" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Clinical & Technical Skills</span>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {groups.map((group, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              style={{
                background: LIGHT,
                borderRadius: "12px",
                border: `1px solid ${BORDER}`,
                padding: "1.8rem 2rem",
                boxShadow: "0 2px 12px rgba(10,31,60,0.04)",
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
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.4rem" }}>
                <div style={{
                  width: "30px", height: "30px", borderRadius: "50%",
                  background: "rgba(0,131,143,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <FaHeartbeat size={12} style={{ color: TEAL }} />
                </div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {group.label}
                </span>
              </div>

              {/* Skill chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {group.items.map((skill, j) => (
                  <span key={j} style={{
                    fontSize: "12px", fontWeight: 600,
                    color: NAVY, background: WHITE,
                    border: `1px solid ${BORDER}`,
                    padding: "5px 14px", borderRadius: "100px",
                    transition: "all 0.2s ease", cursor: "default",
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = TEAL;
                      e.currentTarget.style.color = TEAL;
                      e.currentTarget.style.background = "rgba(0,131,143,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.color = NAVY;
                      e.currentTarget.style.background = WHITE;
                    }}
                  >{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
