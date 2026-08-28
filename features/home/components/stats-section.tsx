import { AnimatedCounter } from "@/components/motion/animated-counter";
import { projects } from "@/features/projects/data";

export function StatsSection() {
  const technologies = new Set(projects.flatMap((project) => project.tags)).size;
  const active = projects.filter((project) => ["Activité", "En développement", "Prototype"].includes(project.status)).length;
  const stats = [
    { value: projects.length, label: "Initiatives documentées" },
    { value: active, label: "Systèmes actifs ou prototypés" },
    { value: technologies, label: "Technologies explorées" },
    { value: 4, suffix: "+", label: "Années de pratique" },
  ];
  return <section className="signal-stats" aria-label="Statistiques du portfolio">{stats.map((stat, index) => <div key={stat.label}><small>0{index + 1}</small><strong><AnimatedCounter value={stat.value} suffix={stat.suffix} /></strong><p>{stat.label}</p></div>)}</section>;
}
