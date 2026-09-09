import { Link } from 'react-router-dom';

export function Home() {
  return (
    <nav className="home-menu">
      <Link to="/tutorial" className="home-menu-item">
        단계별 룰 학습
      </Link>
      <Link to="/play" className="home-menu-item">
        대국 연습 (2인 로컬)
      </Link>
    </nav>
  );
}
