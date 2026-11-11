const AddressCard = ({
  address,
  isSelected,
  onSelect,
  radioName,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between gap-3 px-1">
        <label className="flex min-w-0 cursor-pointer items-center gap-2">
          <input
            type="radio"
            name={radioName}
            checked={isSelected}
            onChange={onSelect}
            aria-label={`Select ${address.title}`}
            className="size-4 shrink-0 cursor-pointer accent-primary"
          />

          <span className="truncate text-sm font-bold text-dark">
            {address.title}
          </span>
        </label>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => onEdit(address)}
            className="cursor-pointer text-xs font-bold text-primary"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(address.id)}
            className="cursor-pointer text-xs font-bold text-danger"
          >
            Delete
          </button>
        </div>
      </div>

      <div
        className={`flex min-h-28 flex-1 flex-col rounded-lg border bg-white p-4 ${
          isSelected ? "border-primary" : "border-border-light"
        }`}
      >
        <p className="text-sm font-bold text-dark">
          {address.name} {address.surname}
        </p>

        <p className="mt-1 text-sm text-muted">{address.phone}</p>

        <p className="mt-3 text-sm leading-6 text-muted">
          {address.neighborhood}, {address.district}, {address.city}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
