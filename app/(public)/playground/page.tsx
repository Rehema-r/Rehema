import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { QuizEngine } from "@/features/playground/quiz/quiz-engine";

export const metadata: Metadata = { title: "Playground", description: "Expériences interactives et quiz technique de Rehema Digital Universe." };

export default function PlaygroundPage() {
  return <PageContainer className="route-page"><PageHeader index="06" eyebrow="Experiment Lab" title={<>Tester, observer, <em>apprendre.</em></>} copy="Des modules légers et indépendants. Le premier laboratoire est un mini-quiz technique entièrement exécuté dans le navigateur." /><section className="playground-layout"><aside><p className="system-label accent">Module disponible</p><h2>Dev Quiz / 001</h2><p>Trois questions pour explorer les fondamentaux qui structurent ce portfolio.</p><div className="lab-note"><strong>Code Challenge</strong><span>Architecture prévue, exécution volontairement désactivée tant qu’un environnement isolé n’est pas connecté.</span></div></aside><QuizEngine /></section></PageContainer>;
}
