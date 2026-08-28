"use client";

import { useState } from "react";
import { skillGroups } from "@/features/skills/data/skills";

export function SkillsFilter() {
  const [active, setActive] = useState("Toutes");
  const visible = active === "Toutes" ? skillGroups : skillGroups.filter((group) => group.title === active);
  return (
    <>
      <div className="category-filters skills-filters">
        {["Toutes", ...skillGroups.map((group) => group.title)].map((item) => <button type="button" key={item} className={active === item ? "active" : ""} aria-pressed={active === item} onClick={() => setActive(item)}>{item}</button>)}
      </div>
      <div className="skills-matrix">
        {visible.map((group, index) => (
          <article key={group.title} className="skill-module">
            <span>MODULE / {String(index + 1).padStart(2, "0")}</span>
            <div><h2>{group.title}</h2><strong>{group.level}</strong></div>
            <p>{group.description}</p>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
    </>
  );
}
