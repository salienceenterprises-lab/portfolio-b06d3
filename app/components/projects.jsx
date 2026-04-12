"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFlask, FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

const TEAL   = "#00838F";
const NAVY   = "#0a1f3c";
const WHITE  = "#ffffff";
const GREY   = "#546E7A";
const LIGHT  = "#f0f7fa";
const BORDER = "#e0ecf0";

export default function MedicProjects({ data }) {
  const list = data?.projects || [];
  if (!list.length) return null;

  const [expanded, setExpanded] = useState(null);

  return (
    <section id="projects" style={{ background: LIGHT, borderTop: `1px solid ${BORDER}` }}>
      <style>{`@media(max-width:768px){.med-proj-inner{padding:4rem 1.25rem!important;}}`}</style>
      <div className="med-proj-inner" style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
        >
          <div style={{ width: "20px", height: "20px", background: "rgba(0,131,143,0.1)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: TEAL }}>04</span>
          </div>
          <div style={{ width: "32px", height: "2px", background: TEAL, borderRadius: "2px" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Research & Projects</span>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {list.map((project, i) => {
            const isOpen = expanded === i;
            const desc = project.description || project.summary || "";
            const github = project.github || project.repo || project.repoUrl || "";
            const live = project.live || project.liveUrl || project.demo || project.link || "";
            const tags = Array.isArray(project.stack) ? project.stack : Array.isArray(project.tech) ? project.tech : Array.isArray(project.tags) ? project.tags : [];

            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                style={{
                  background: WHITE,
                  borderRadius: "12px",
                  border: `1px solid ${isOpen ? "rgba(0,131,143,0.3)" : BORDER}`,
                  overflow: "hidden",
                  boxShadow: isOpen ? "0 6px 24px rgba(0,131,143,0.1)" : "0 2px 12px rgba(10,31,60,0.04)",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                }}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    width: "100%", textAlign: "left",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "1.6rem 2rem",
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "10px", flexShrink: 0,
                    background: isOpen ? "rgba(0,131,143,0.12)" : "rgba(0,131,143,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s",
                  }}>
                    <FaFlask size={16} style={{ color: TEAL }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: NAVY, marginBottom: "4px" }}>
                      {project.title || project.name}
                    </div>
                    {tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {tags.slice(0, 4).map((tag, j) => (
                          <span key={j} style={{
                            fontSize: "10px", fontWeight: 600,
                            color: TEAL, background: "rgba(0,131,143,0.08)",
                            padding: "2px 10px", borderRadius: "100px",
                          }}>{typeof tag === "string" ? tag : tag?.name || String(tag)}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                    {github && (
                      <a href={github} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: GREY, transition: "color 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = TEAL}
                        onMouseLeave={(e) => e.currentTarget.style.color = GREY}
                      ><FaGithub size={16} /></a>
                    )}
                    {live && (
                      <a href={live} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: GREY, transition: "color 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = TEAL}
                        onMouseLeave={(e) => e.currentTarget.style.color = GREY}
                      ><FaExternalLinkAlt size={14} /></a>
                    )}
                    <div style={{ color: GREY, transition: "color 0.2s" }}>
                      {isOpen ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
                    </div>
                  </div>
                </button>

                {/* Expanded body */}
                {isOpen && (desc || project.imageBase64) && (
                  <div style={{
                    padding: "0 2rem 1.8rem",
                    borderTop: `1px solid ${BORDER}`,
                    paddingTop: "1.4rem",
                  }}>
                    {project.imageBase64 && (
                      <div style={{ width: "100%", paddingTop: "52%", position: "relative", overflow: "hidden", marginBottom: "1rem", borderRadius: "6px", flexShrink: 0 }}>
                        <img src={project.imageBase64} alt={project.title || project.name}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                      </div>
                    )}
                    {desc && <p style={{ fontSize: "14px", color: GREY, lineHeight: 1.8, margin: 0, fontWeight: 400 }}>{desc}</p>}
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
