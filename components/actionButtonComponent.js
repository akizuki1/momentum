import Image from "next/image";
import styles from "../styles/actionButtonComponent.module.css";
import logo from "../images/momentumLogo.png";
import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";


export default function ActionButtonComponent(props) {
  const injected = new InjectedConnector({
    supportedChainIds: [1, 5]
  });
  const validAddress = require("../config/validAddress/address.json");
  const CONTRACT_ADDRESS = "0x4b548223a7Dd001806d5C7d87CbF653De2B3d792";
  const ABI = require("../abis/abi.json");

  const {
    chainId,
    account,
    activate,
    deactivate,
    setError,
    active,
    error,
    library,
    connector
  } = useWeb3React();
  const [action, setAction] = useState(0);
  const [user, setUser] = useState({});
  const [web3, setWeb3] = useState({});

  useEffect(() => {
    if(account !== undefined && account !== null) {
      validateAddress();
    }
  },[account, validateAddress]);

  const actions = [
    {
      function: () => connectWallet(),
      text: "Connect wallet",
      type: "button",
    },
    {
      function: () => disconnectWallet(),
      text: "Disconnect wallet",
      type: "button",
    },
    {
      ico: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="18px"
          height="18px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="#da3526"
            d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
            opacity=".5"
          />
          <path fill="#da3526" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
            <animateTransform
              attributeName="transform"
              dur="1s"
              from="0 12 12"
              repeatCount="indefinite"
              to="360 12 12"
              type="rotate"
            />
          </path>
        </svg>
      ),
      text: "Account validation",
      type: "message",
    },
    {
      text: "You are not in the allow list",
      type: "message",
    },
    {
      function: async () => {

        const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        try {
          const gasEstimate = await contract.methods.claim(user.proof).estimateGas({
            from: account
          });
          contract.methods.claim(user.proof).send({
            from: account,
            gasLimit: gasEstimate + 15000
          }).once('sending', function (payload) {
            props.setNotification("Please confirm transaction", 2)
          })
            .once('transactionHash', function (hash) {
              props.setNotification("Transaction pending: https://etherscan.io/tx/" + hash, 2)
            })
            .on('confirmation', function (confNumber, receipt, latestBlockHash) {
              props.setNotification("Success! ", 1)
            })
            .on('error', function (error) {
              props.setNotification("Error: " + error, 0)
            });
        } catch (er) {
          console.log(er);
          setAction(5);
        }
      },
      text: "Claim",
      type: "button",
    },
    {
      text: "Already claimed",
      type: "message",
    },
    {
      function: () => mint(),
      text: "Mint",
      type: "button",
    },
    {
      text: "Already minted",
      type: "message",
    },
    {
      ico: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="18px"
          height="18px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="#da3526"
            d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
            opacity=".5"
          />
          <path fill="#da3526" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
            <animateTransform
              attributeName="transform"
              dur="1s"
              from="0 12 12"
              repeatCount="indefinite"
              to="360 12 12"
              type="rotate"
            />
          </path>
        </svg>
      ),
      text: "Claim in progress",
      type: "message",
    },
    {
      ico: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="18px"
          height="18px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="#da3526"
            d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
            opacity=".5"
          />
          <path fill="#da3526" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
            <animateTransform
              attributeName="transform"
              dur="1s"
              from="0 12 12"
              repeatCount="indefinite"
              to="360 12 12"
              type="rotate"
            />
          </path>
        </svg>
      ),
      text: "Mint in progress",
      type: "message",
    },
  ];

  async function connectWallet() {
    activate(injected);
    if (active || error) {
      setWeb3(new Web3(await injected.getProvider()));
      props.connectionStatus(true, error, account);
    }
  }

  function disconnectWallet() {
    deactivate();
    props.connectionStatus(true, error, account);
  }

  function validateAddress() {
    const findAddress = validAddress.find((item) => item.address === account);
    if (findAddress != undefined) {
      setUser(findAddress);
      setAction(4);
    } else {
      setAction(3);
    }
  }


  useEffect(() => {
    setAction(props.action);
  }, [props.action]);

  useEffect(() => {
    if (action === 2) {
      validateAddress();
    }
  }, [action]);

  useEffect(() => {
    if (active) {
      connectWallet();
      setAction(2);
    }
  }, [active]);

  return (
    <>
      <h1>
        <Image src={logo} alt="momentum" width={500} height={100} />
      </h1>

      {actions[action].type === "button" ? (
        active ? (
          <>
            <button
              className={styles.actionButton}
              onClick={actions[action].function}
            >
              {actions[action].text}
            </button>
          </>
        ) : (
          <button
            className={styles.actionButton}
            onClick={actions[action].function}
          >
            {actions[action].text}
          </button>
        )
      ) : (
        <>
          <div className={styles.actionContentMessage}>
            <span className={styles.actionIco}>{actions[action].ico}</span>{" "}
            <p className={styles.actionMessage}>{actions[action].text}</p>{" "}
          </div>
        </>
      )}
    </>
  );
}
