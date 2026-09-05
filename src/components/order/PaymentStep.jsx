import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCreditCard,
  deleteCreditCard,
  fetchCreditCards,
  updateCreditCard,
} from "../../store/actions/clientActions";
import CardForm from "./CardForm";
import SavedCardOption from "./SavedCardOption";

const PaymentStep = ({ selectedCardId, setSelectedCardId }) => {
  const dispatch = useDispatch();

  const creditCards = useSelector((state) => state.client.creditCards);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCreditCards());
  }, [dispatch]);

  const handleAddCard = () => {
    setEditingCard(null);
    setIsFormOpen(true);
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setEditingCard(null);
    setIsFormOpen(false);
  };

  const handleCardSubmit = async (cardData) => {
    setIsSubmitting(true);

    try {
      if (editingCard) {
        await dispatch(
          updateCreditCard({
            id: editingCard.id,
            ...cardData,
          }),
        );
      } else {
        await dispatch(createCreditCard(cardData));
      }

      handleCancelForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this card?",
    );

    if (!shouldDelete) {
      return;
    }

    await dispatch(deleteCreditCard(cardId));

    if (selectedCardId === cardId) {
      setSelectedCardId(null);
    }

    if (editingCard?.id === cardId) {
      handleCancelForm();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-dark">Payment Options</h2>

        <p className="mt-1 text-sm text-muted">
          Select a saved card or add a new card.
        </p>
      </div>

      {isFormOpen && (
        <CardForm
          card={editingCard}
          onSubmit={handleCardSubmit}
          onCancel={handleCancelForm}
          isSubmitting={isSubmitting}
        />
      )}

      <div className="flex flex-col gap-4">
        <h3 className="text-base font-bold text-dark">Payment Method</h3>

        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
          <button
            type="button"
            onClick={handleAddCard}
            className="flex min-h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-soft-gray bg-white text-primary transition hover:border-primary lg:w-[calc(50%_-_0.375rem)]"
          >
            <span className="text-3xl font-light">+</span>

            <span className="text-sm font-bold">Add New Card</span>
          </button>

          {creditCards.map((card) => (
            <div key={card.id} className="w-full lg:w-[calc(50%_-_0.375rem)]">
              <SavedCardOption
                card={card}
                isSelected={selectedCardId === card.id}
                onSelect={() => setSelectedCardId(card.id)}
                onEdit={handleEditCard}
                onDelete={handleDeleteCard}
              />
            </div>
          ))}
        </div>

        {creditCards.length === 0 && !isFormOpen && (
          <p className="text-sm text-muted">
            You do not have a saved card yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentStep;
