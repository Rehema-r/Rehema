export function StatsSection() {
  const signals = [
    { value: "Bac 3", label: "Informatique · Génie Logiciel" },
    { value: "2024", label: "Diplôme d’État obtenu" },
    { value: "Code", label: "Dépôts publics et documentation" },
    { value: "Clarté", label: "Réalisations, prototypes et concepts distingués" },
  ];
  return <section className="signal-stats" aria-label="Repères du parcours">{signals.map((signal, index) => <div key={signal.label}><small>0{index + 1}</small><strong>{signal.value}</strong><p>{signal.label}</p></div>)}</section>;
}
