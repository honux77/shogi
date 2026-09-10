import { Link } from 'react-router-dom';

export function Home() {
  return (
    <nav className="home-menu">
      <Link to="/tutorial" className="home-menu-item">
        단계별 룰 학습
      </Link>
      <Link to="/play/ai" className="home-menu-item">
        AI와 대국
      </Link>
      <Link to="/play/local" className="home-menu-item home-menu-item-secondary">
        2인 로컬 연습
      </Link>
    </nav>
  );
}
