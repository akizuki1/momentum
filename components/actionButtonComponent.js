import Image from "next/image";
import styles from "../styles/actionButtonComponent.module.css";
import logo from "../images/momentumLogo.png";
import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { connector } from "../config/web3";

export default function ActionButtonComponent(props) {
  const validAddress = require("../config/validAddress/address.json");

  const { activate, active, deactivate, account, error } = useWeb3React();
  const [action, setAction] = useState(0);

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
      function: () => claim(),
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

  function connectWallet() {
    activate(connector);
    if (active || error) {
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
