import { createContext, useContext, useMemo, useReducer, useEffect } from 'react';

const AppStateContext = createContext();
const AppDispatchContext = createContext();


// get stored values from localstorage
const getStoredEditMode = async () => {
  try {
    const editModeData = localStorage.getItem('editMode');
    return editModeData ? editModeData : "false"
  }
  catch (err) {
    return "false"
  }
};

const getStoredVertical = async () => {
  try {
    const verticalData = localStorage.getItem('vertical');
    return verticalData ? verticalData : 'BNBChain'
  }
  catch (err) {
    return 'BNBChain'
  }
};

const getStoredWalletConnection = async () => {
  try {
    const walletConnectionData = localStorage.getItem('handleWalletConnection');
    return walletConnectionData ? walletConnectionData : false
  }
  catch (err) {
    return false
  }
};

const getStoredAdminMode = async () => {
  try {
    const adminModeData = localStorage.getItem('handleAdminMode');
    return adminModeData ? adminModeData : false
  }
  catch (err) {
    return false
  }
};

const getStoredPublicKey = async () => {
  try {
    const publicKey = localStorage.getItem('PublicKey');
    return publicKey ? publicKey : ''
  }
  catch (err) {
    return ''
  }
};



function AppReducer(state, action) {
  switch (action.type) {
    case 'editMode':
      if (window) window.localStorage.setItem('editMode', action.payload);
      return {
        ...state,
        editMode: action.payload
      };
    case 'vertical':
      if (window) window.localStorage.setItem('vertical', action.payload);
      return {
        ...state,
        vertical: action.payload
      };
    case 'handleWalletConnection':
      if (window) window.localStorage.setItem('handleWalletConnection', action.payload);
      return {
        ...state,
        isConnectedToWallet: action.payload
      };
    case 'handleAdminMode':
      if (window) window.localStorage.setItem('handleAdminMode', action.payload);
      return {
        ...state,
        isAdminMode: action.payload
      };
    case 'savePublicKey':
      if (window) window.localStorage.setItem('PublicKey', action.payload);
      return {
        ...state,
        publicKey: action.payload
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, {
    editMode: false,
    vertical: 'BNBChain',
    isConnectedToWallet: false,
    isAdminMode: false,
    publicKey: ""
  });

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  const rehydateState = async () => {
    const fetchWalletConnection = await getStoredWalletConnection();
    const fetchAdminMode = await getStoredAdminMode();
    const fetchPublicKey = await getStoredPublicKey();
    const fetchEditMode = await getStoredEditMode();


    dispatch({ type: 'handleWalletConnection', payload: fetchWalletConnection });
    dispatch({ type: 'handleAdminMode', payload: fetchAdminMode });
    dispatch({ type: 'savePublicKey', payload: fetchPublicKey });
    dispatch({ type: 'editMode', payload: fetchEditMode });

  }


  // Rehydrate state with the values present in the localstorage on page refresh
  useEffect(() => {
    rehydateState();
  }, []);

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);
