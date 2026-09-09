import { Link } from 'react-router-dom';
import { LESSONS } from './lessons';
import { isLessonCompleted } from './progress';

export function TutorialHome() {
  return (
    <div className="tutorial-home">
      <h2>단계별 룰 학습</h2>
      <ol className="lesson-list">
        {LESSONS.map((lesson) => (
          <li key={lesson.id}>
            <Link to={`/tutorial/${lesson.id}`}>
              {isLessonCompleted(lesson.id) ? '✅ ' : ''}
              {lesson.title}
            </Link>
          </li>
        ))}
      </ol>
      <Link to="/">홈으로</Link>
    </div>
  );
}
