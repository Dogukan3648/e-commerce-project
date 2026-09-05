const SavedCardOption = ({ card, isSelected, onSelect, onEdit, onDelete }) => {
  const lastFourDigits = String(card.card_no ?? "").slice(-4);
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between gap-3 px-1">
        <label className="flex min-w-0 cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="paymentCard"
            checked={isSelected}
            onChange={onSelect}
            aria-label={`Select card ending in ${lastFourDigits}`}
            className="size-4 shrink-0 cursor-pointer accent-primary"
          />

          <span className="truncate text-sm font-bold text-dark">
            {card.name_on_card}
          </span>
        </label>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => onEdit(card)}
            className="cursor-pointer text-xs font-bold text-primary"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(card.id)}
            className="cursor-pointer text-xs font-bold text-danger"
          >
            Delete
          </button>
        </div>
      </div>

      <div
        className={`flex min-h-28 flex-1 flex-col justify-between rounded-lg border bg-white p-4 ${
          isSelected ? "border-primary" : "border-border-light"
        }`}
      >
        <p className="text-sm font-bold text-dark">
          **** **** **** {lastFourDigits}
        </p>

        <p className="mt-3 text-sm text-muted">
          {String(card.expire_month).padStart(2, "0")} / {card.expire_year}
        </p>
      </div>
    </div>
  );
};

export default SavedCardOption;
