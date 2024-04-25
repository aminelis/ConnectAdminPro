const Footer = () => (
  <footer style={{ backgroundColor: '#87CEEB', color: '#fff', textAlign: 'center', padding: '0.5rem', position: 'fixed', bottom: 0, width: '100%', fontWeight: 'bold' }}>
    Developed With ❤️ By{" "}
    <a
      href="https://amine-alassir-portfolio.netlify.app/"
      target="_blank"
      rel="noreferrer"
      style={{ color: 'white', textDecoration: 'underline', transition: 'color 0.3s ease-in-out' }}
    >
      Al assir Amine
    </a>
  </footer>
);

export default Footer; // Vous devez exporter la fonction Footer si vous prévoyez de l'utiliser ailleurs
