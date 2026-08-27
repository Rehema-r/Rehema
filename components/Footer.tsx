import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <p className="eyebrow eyebrow-light">Un projet en tête ?</p>
          <h2>Construisons quelque chose d’utile.</h2>
        </div>
        <Link href="/contact" className="button button-light">
          Démarrer une conversation <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rehema Kasongo</p>
        <div className="footer-links">
          <a href="mailto:paparehemasaongo@gmail.com">Email</a>
          <a href="https://github.com/Rehema-r" target="_blank" rel="noreferrer">GitHub</a>
          <span>Kolwezi, RD Congo</span>
        </div>
      </div>
    </footer>
  );
}
