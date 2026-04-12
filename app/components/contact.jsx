"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

const TEAL   = "#00838F";
const NAVY   = "#0a1f3c";
const WHITE  = "#ffffff";
const GREY   = "#546E7A";
const LIGHT  = "#f0f7fa";
const BORDER = "#e0ecf0";

export default function MedicContact({ data }) {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [status, setStatus]   = useState("idle"); // idle | sending | sent | error
  const [focused, setFocused] = useState(null);

  const WEB3FORMS_KEY = data?.web3forms_key || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const infoCards = [
    data?.email    && { icon: <FaEnvelope size={16} />,      label: "Email",    value: data.email,    href: `mailto:${data.email}` },
    data?.linkedin && { icon: <FaLinkedin size={16} />,      label: "LinkedIn", value: "View Profile", href: data.linkedin },
    data?.location && { icon: <FaMapMarkerAlt size={16} />,  label: "Location", value: data.location,  href: null },
  ].filter(Boolean);

  const inputStyle = (field) => ({
    width: "100%", background: WHITE,
    border: `1.5px solid ${focused === field ? TEAL : BORDER}`,
    borderRadius: "8px",
    padding: "13px 16px",
    fontSize: "14px", color: NAVY, fontWeight: 400,
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused === field ? "0 0 0 3px rgba(0,131,143,0.1)" : "none",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form, to: data?.email }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" style={{ background: WHITE, borderTop: `1px solid ${BORDER}`, paddingBottom: "9rem" }}>
      <style>{`.medic-root input::placeholder, .medic-root textarea::placeholder { color: rgba(84,110,122,0.4); } @media(max-width:768px){#contact{padding-bottom:9rem!important;}}`}</style>
      {/* Teal top stripe */}
      <div style={{ height: "4px", background: `linear-gradient(90deg, ${TEAL}, #4DB6AC)` }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}
        >
          <div style={{ width: "20px", height: "20px", background: "rgba(0,131,143,0.1)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: TEAL }}>07</span>
          </div>
          <div style={{ width: "32px", height: "2px", background: TEAL, borderRadius: "2px" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Get In Touch</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.05 }}
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: NAVY, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 4rem" }}
        >
          Let&apos;s Work Together<br />
          <span style={{ color: TEAL }}>Towards Better Care.</span>
        </motion.h2>

        <style>{`@media(max-width:768px){.med-contact-grid{grid-template-columns:1fr!important;gap:2.5rem!important;} .med-contact-form-grid{grid-template-columns:1fr!important;} #contact>div:not(:first-child){padding:4rem 1.25rem!important;}}`}</style>
        <div className="med-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "4rem", alignItems: "start" }}>
          {/* Left: info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p style={{ fontSize: "15px", color: GREY, lineHeight: 1.8, margin: "0 0 2.5rem", fontWeight: 400 }}>
              {data?.contactBlurb || "Whether you're a program coordinator, fellow student, or research collaborator — I'd love to connect and explore how we can make a difference together."}
            </p>

            {infoCards.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {infoCards.map((card, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    background: LIGHT, border: `1px solid ${BORDER}`,
                    borderRadius: "10px", padding: "14px 18px",
                  }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: "rgba(0,131,143,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: TEAL, flexShrink: 0,
                    }}>{card.icon}</div>
                    <div>
                      <div style={{ fontSize: "9px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2px" }}>{card.label}</div>
                      {card.href ? (
                        <a href={card.href} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: "13px", fontWeight: 600, color: NAVY, textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = TEAL}
                          onMouseLeave={(e) => e.currentTarget.style.color = NAVY}
                        >{card.value}</a>
                      ) : (
                        <span style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}>{card.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          >
            {status === "sent" ? (
              <div style={{
                background: "rgba(0,131,143,0.06)", border: `1px solid rgba(0,131,143,0.25)`,
                borderRadius: "12px", padding: "3rem",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
                textAlign: "center",
              }}>
                <FaCheckCircle size={40} style={{ color: TEAL }} />
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: NAVY, margin: 0 }}>Message Received!</h3>
                <p style={{ fontSize: "14px", color: GREY, margin: 0, lineHeight: 1.7 }}>
                  Thank you for reaching out. I'll get back to you shortly.
                </p>
                <button onClick={() => setStatus("idle")} style={{
                  background: TEAL, color: WHITE, border: "none",
                  padding: "10px 24px", borderRadius: "6px",
                  fontSize: "12px", fontWeight: 700, cursor: "pointer",
                  letterSpacing: "0.04em",
                }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="med-contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px" }}>Name</label>
                    <input
                      required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      placeholder="Dr. Jane Smith"
                      style={inputStyle("name")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px" }}>Email</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      placeholder="jane@university.edu"
                      style={inputStyle("email")}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px" }}>Message</label>
                  <textarea
                    required rows={6} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    placeholder="Tell me about your opportunity, research, or how I can help…"
                    style={{ ...inputStyle("message"), resize: "vertical", lineHeight: 1.7 }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ fontSize: "13px", color: "#e53e3e", margin: 0 }}>Something went wrong. Please try again or email directly.</p>
                )}

                <button type="submit" disabled={status === "sending"}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px", alignSelf: "flex-start",
                    background: TEAL, color: WHITE, border: "none",
                    padding: "13px 32px", fontSize: "13px", fontWeight: 700,
                    letterSpacing: "0.04em", cursor: status === "sending" ? "wait" : "pointer",
                    borderRadius: "8px",
                    boxShadow: "0 4px 18px rgba(0,131,143,0.28)",
                    transition: "all 0.25s ease",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.background = "#00696F"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,131,143,0.4)"; }}}
                  onMouseLeave={(e) => { e.currentTarget.style.background = TEAL; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,131,143,0.28)"; }}
                >
                  {status === "sending" ? "Sending…" : <><FaPaperPlane size={12} /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "1.8rem 2.5rem", textAlign: "center" }}>
        <span style={{ fontSize: "12px", color: GREY, fontWeight: 500 }}>
          {data?.name || "Portfolio"} &nbsp;·&nbsp; Built with care &nbsp;
          <span style={{ color: TEAL }}>✚</span>
          &nbsp; Powered by Salience Studio
        </span>
      </div>
    </section>
  );
}
