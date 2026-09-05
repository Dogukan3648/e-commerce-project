import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../../store/actions/clientActions";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

const AddressStep = ({
  addressList,
  selectedShippingAddressId,
  setSelectedShippingAddressId,
  selectedReceiptAddressId,
  setSelectedReceiptAddressId,
  sameAsShipping,
  setSameAsShipping,
}) => {
  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = async (addressId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!shouldDelete) {
      return;
    }

    await dispatch(deleteAddress(addressId));

    if (selectedShippingAddressId === addressId) {
      setSelectedShippingAddressId(null);
    }

    if (selectedReceiptAddressId === addressId) {
      setSelectedReceiptAddressId(null);
    }

    if (editingAddress?.id === addressId) {
      handleCancelForm();
    }
  };

  const handleAddressSubmit = async (addressData) => {
    setIsSubmitting(true);

    try {
      if (editingAddress) {
        await dispatch(
          updateAddress({
            id: editingAddress.id,
            ...addressData,
          }),
        );
      } else {
        await dispatch(createAddress(addressData));
      }

      handleCancelForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSameAsShippingChange = (event) => {
    const isChecked = event.target.checked;

    setSameAsShipping(isChecked);

    if (isChecked) {
      setSelectedReceiptAddressId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {isFormOpen && (
        <AddressForm
          address={editingAddress}
          onSubmit={handleAddressSubmit}
          onCancel={handleCancelForm}
          isSubmitting={isSubmitting}
        />
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-bold text-dark">Shipping Address</h3>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={sameAsShipping}
              onChange={handleSameAsShippingChange}
              className="size-4 cursor-pointer accent-primary"
            />

            <span className="text-sm font-bold text-dark">
              Use shipping address as receipt address
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
          <button
            type="button"
            onClick={handleAddAddress}
            className="flex min-h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-soft-gray bg-white text-primary transition hover:border-primary lg:w-[calc(50%_-_0.375rem)]"
          >
            <span className="text-3xl font-light">+</span>
            <span className="text-sm font-bold">Add New Address</span>
          </button>

          {addressList.map((address) => (
            <div
              key={address.id}
              className="w-full lg:w-[calc(50%_-_0.375rem)]"
            >
              <AddressCard
                address={address}
                onDelete={handleDeleteAddress}
                onEdit={handleEditAddress}
                radioName="shippingAddress"
                isSelected={selectedShippingAddressId === address.id}
                onSelect={() => setSelectedShippingAddressId(address.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {!sameAsShipping && (
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-dark">Receipt Address</h3>

          <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
            {addressList.map((address) => (
              <div
                key={address.id}
                className="w-full lg:w-[calc(50%_-_0.375rem)]"
              >
                <AddressCard
                  address={address}
                  onDelete={handleDeleteAddress}
                  onEdit={handleEditAddress}
                  radioName="receiptAddress"
                  isSelected={selectedReceiptAddressId === address.id}
                  onSelect={() => setSelectedReceiptAddressId(address.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressStep;
