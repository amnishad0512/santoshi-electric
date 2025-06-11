import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[];
}

type AddressAction =
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'REMOVE_ADDRESS'; payload: string }
  | { type: 'UPDATE_ADDRESS'; payload: Address }
  | { type: 'SET_DEFAULT'; payload: string };

const initialState: AddressState = {
  addresses: [],
};

const addressReducer = (state: AddressState, action: AddressAction): AddressState => {
  switch (action.type) {
    case 'ADD_ADDRESS': {
      // If this is the first address, make it default
      const isFirstAddress = state.addresses.length === 0;
      const newAddress = {
        ...action.payload,
        isDefault: isFirstAddress ? true : action.payload.isDefault,
      };

      // If the new address is set as default, remove default from others
      const updatedAddresses = newAddress.isDefault
        ? state.addresses.map(addr => ({
            ...addr,
            isDefault: false,
          }))
        : state.addresses;

      return {
        ...state,
        addresses: [...updatedAddresses, newAddress],
      };
    }
    case 'REMOVE_ADDRESS': {
      const removedAddress = state.addresses.find(addr => addr.id === action.payload);
      const remainingAddresses = state.addresses.filter(addr => addr.id !== action.payload);

      // If we removed the default address and there are other addresses, make the first one default
      if (removedAddress?.isDefault && remainingAddresses.length > 0) {
        remainingAddresses[0].isDefault = true;
      }

      return {
        ...state,
        addresses: remainingAddresses,
      };
    }
    case 'UPDATE_ADDRESS': {
      return {
        ...state,
        addresses: state.addresses.map(addr =>
          addr.id === action.payload.id ? action.payload : addr
        ),
      };
    }
    case 'SET_DEFAULT': {
      return {
        ...state,
        addresses: state.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === action.payload,
        })),
      };
    }
    default:
      return state;
  }
};

interface AddressContextType {
  state: AddressState;
  addAddress: (address: Omit<Address, 'id' | 'isDefault'>) => void;
  removeAddress: (id: string) => void;
  updateAddress: (address: Address) => void;
  setDefaultAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(addressReducer, initialState);

  const addAddress = (address: Omit<Address, 'id' | 'isDefault'>) => {
    const newAddress: Address = {
      ...address,
      id: Math.random().toString(36).substr(2, 9), // Simple ID generation
      isDefault: state.addresses.length === 0, // Make default if it's the first address
    };
    dispatch({ type: 'ADD_ADDRESS', payload: newAddress });
  };

  const removeAddress = (id: string) => {
    dispatch({ type: 'REMOVE_ADDRESS', payload: id });
  };

  const updateAddress = (address: Address) => {
    dispatch({ type: 'UPDATE_ADDRESS', payload: address });
  };

  const setDefaultAddress = (id: string) => {
    dispatch({ type: 'SET_DEFAULT', payload: id });
  };

  return (
    <AddressContext.Provider
      value={{ state, addAddress, removeAddress, updateAddress, setDefaultAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
}; 