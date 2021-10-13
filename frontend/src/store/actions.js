import { ethers } from "ethers";
import consulta from "@/assets/Consulta.json";

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
    commit("setState", { field: "error", value: e });
  }
};

/**
 * Check if we're authorized to access wallet
 */
const connectWallet = async ({ commit, state, dispatch }) => {
  if (state.ethereum) {
    state.accounts = await state.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (state.accounts.length) {
      state.account = state.accounts[0];
      console.log(`Found an authorized account: ${state.account}`);
      if (!state.contract) {
        await dispatch("connectContract");
      }
    } else {
      console.log("No accounts found");
    }
  } else {
    commit("getMetamask");
  }
};

const disconnectWallet = async ({ state }) => {
  await state.ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
  state.accounts = [];
  state.account = null;
};

const getVotes = async ({ state, commit }) => {
  try {
    const txn = await state.contract.getOpciones();
    state.options = txn.map((o) => {
      return { description: o.descripcion, votes: o.votos.toNumber() };
    });
  } catch (e) {
    console.error(e);
    commit("setState", { field: "error", value: e });
  }
};

const vote = async ({ state, commit }, payload) => {
  try {
    const txn = await state.contract.votar(payload.key, payload.option);
    commit("setState", { field: "mining", value: true });
    console.log("Mining...", txn.hash);
    await txn.wait();
    console.log("Mined -- ", txn.hash);
    commit("setState", { field: "mining", value: false });
  } catch (e) {
    commit("setState", { field: "mining", value: false });
    commit("setState", {
      field: "error",
      value: {
        name: "Transaction error",
        message: e.data ? e.data.message : e.message,
      },
    });
    console.error(e);
  }
};

export default {
  checkWeb3Availability,
  connectContract,
  connectWallet,
  disconnectWallet,
  getVotes,
  vote,
};
