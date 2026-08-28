"use client";

import { useState } from "react";

const questions = [
  { question: "Quel composant Next.js reste serveur par défaut ?", options: ["Tous les composants", "Seulement les layouts", "Aucun composant"], answer: 0 },
  { question: "Quel principe guide une API publique sûre ?", options: ["Faire confiance au client", "Valider côté serveur", "Masquer les erreurs"], answer: 1 },
  { question: "Pourquoi utiliser une migration de base de données ?", options: ["Versionner le schéma", "Accélérer le CSS", "Créer une image Docker"], answer: 0 },
];

export function QuizEngine() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function answer(option: number) {
    const nextScore = score + (option === questions[index].answer ? 1 : 0);
    if (index === questions.length - 1) {
      setScore(nextScore);
      setDone(true);
      return;
    }
    setScore(nextScore);
    setIndex((value) => value + 1);
  }

  function restart() { setIndex(0); setScore(0); setDone(false); }

  if (done) return <div className="quiz-card"><p className="system-label accent">Session terminée</p><h2>{score} / {questions.length}</h2><p>Le résultat mesure uniquement cette courte session de découverte.</p><button type="button" className="primary-action" onClick={restart}>Recommencer</button></div>;

  return (
    <div className="quiz-card">
      <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      <p className="system-label">Question {index + 1} / {questions.length}</p>
      <h2>{questions[index].question}</h2>
      <div className="quiz-options">{questions[index].options.map((option, optionIndex) => <button type="button" key={option} onClick={() => answer(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>
    </div>
  );
}
