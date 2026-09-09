import './board.css';

interface PromotionPromptProps {
  onChoose: (promote: boolean) => void;
}

export function PromotionPrompt({ onChoose }: PromotionPromptProps) {
  return (
    <div className="promotion-prompt-overlay">
      <div className="promotion-prompt">
        <p>성(成)하시겠습니까?</p>
        <div className="promotion-prompt-actions">
          <button type="button" onClick={() => onChoose(true)}>
            성 (Promote)
          </button>
          <button type="button" onClick={() => onChoose(false)}>
            그대로 (Keep)
          </button>
        </div>
      </div>
    </div>
  );
}
