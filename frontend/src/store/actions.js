import { ethers } from "ethers";
import consulta from "./../../../artifacts/contracts/Consulta.sol/Consulta.json";

/*
 * Make sure we have access to window.ethereum
 */
const checkWeb3Availability = ({ commit }) => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      commit("getMetamask");
      return;
    } else {
      commit("setState", { field: "ethereum", value: ethereum });
      commit("clearError");
    }
  } catch (e) {
    console.errpr(e);
    commit("setState", { field: "error", value: e });
  }
};

const connectContract = ({ commit, state }) => {
  try {
    if (state.ethereum) {
      state.provider = new ethers.providers.Web3Provider(state.ethereum);
      state.signer = state.provider.getSigner();
      state.contract = new ethers.Contract(
        state.contractAddress,
        consulta.abi,
        state.signer
      );
      // state.provider.on("NewWave", (from, timestamp, message) => {
      //   console.log(from, timestamp, message);
      // });
    } else {
      commit("getMetamask");
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * Check if we're authorized to access wallet
 */
const connectWallet = async ({ commit, state }) => {
  if (state.ethereum) {
    state.accounts = await state.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (state.accounts.length) {
      state.account = state.accounts[0];
      console.log(`Found an authorized account: ${state.account}`);
      if (!state.contract) {
        //connectContract;
      }
    } else {
      console.log("No accounts found");
    }
  } else {
    commit("getMetamask");
  }
};

export default {
  checkWeb3Availability,
  connectContract,
  connectWallet,
};
