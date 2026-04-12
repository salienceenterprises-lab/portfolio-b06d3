"use client";
import portfolioData   from "../profile.json";
import MedicNav        from "./components/nav";
import MedicHero       from "./components/hero";
import MedicAbout      from "./components/about";
import MedicEducation  from "./components/education";
import MedicExperience from "./components/experience";
import MedicProjects   from "./components/projects";
import MedicSkills     from "./components/skills";
import MedicCommunity  from "./components/community";
import MedicContact    from "./components/contact";

export default function MedicTemplateDeploy() {
  const data = portfolioData;
  return (
    <div className="medic-root" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f0f7fa", minHeight: "100vh" }}>
      <style>{`
        .medic-root *, .medic-root *::before, .medic-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 68px; }
        /* Responsive nav */
        .med-desktop-links { display: flex; align-items: center; gap: 2rem; }
        .med-hamburger { display: none; }
        @media (max-width: 767px) {
          .med-desktop-links { display: none !important; }
          .med-hamburger { display: flex !important; }
          .med-hero-photo { display: none !important; }
        }
      `}</style>
      <MedicNav        data={data} />
      <MedicHero       data={data} />
      <MedicAbout      data={data} />
      <MedicEducation  data={data} />
      <MedicExperience data={data} />
      <MedicProjects   data={data} />
      <MedicSkills     data={data} />
      <MedicCommunity  data={data} />
      <MedicContact    data={data} />
    </div>
  );
}
