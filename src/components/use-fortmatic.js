import { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import Fortmatic from 'fortmatic';
const usePromise = () => {
  const ref = [];
  const container = useRef(ref);
  //   useRef returns a mutable ref object whose
  //   .current property is initialized to the passed argument (initialValue).
  //   The returned object will persist for the full lifetime of the component.
  ref[0] = new Promise((resolve, reject) => {
    ref[1] = resolve;
    ref[2] = reject;
  });
  return container.current;
};
const useFortmatic = apiKey => {
  const [accounts, setAccounts] = useState([]);
  const [web3Ready, setWeb3Ready] = usePromise();
  const [web3IsInitialized, setWeb3IsInitialized] = useState(false);
  const signIn = async () => {
    const { web3 } = await web3Ready;
    // Get the current user account addresses.
    // Auth if needed.
    // signIn returns a promise that should wait for signIn
    // to complete before it resolves.
    await web3.eth.getAccounts().then(setAccounts);
  };
  const signOut = async () => {
    const { fm } = await web3Ready;
    // signOut returns a promise that will wait
    // until signout is complete to resolve.
    await fm.user.logout();
    setAccounts([]);
  };
  // Fire only once after components mounts.
  useEffect(() => {
    const initializeWeb3 = async () => {
      const fm = new Fortmatic(apiKey);
      const web3 = new Web3(fm.getProvider());
      // This needs to run before we update state
      // if we want to enable users to stay signed
      // in between page reloads.
      (await fm.user.isLoggedIn()) && signIn();
      setWeb3Ready({ fm, web3 });
      setWeb3IsInitialized(true);
    };
    initializeWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    accounts,
    signOut,
    signIn,
    web3Ready,
    web3IsInitialized
  };
};
export default useFortmatic;
