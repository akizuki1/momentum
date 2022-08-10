import styles from "../styles/navBarComponent.module.css";
import { useWeb3React } from "@web3-react/core";

export default function NavBarComponent(props) {
  const { account, deactivate, error } = useWeb3React();
  function disconnectWallet() {
    deactivate();
    props.connectionStatus(false, error, account);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pushRight}></div>
        {!account ? (
          <div className={styles.item}>
            <p className={styles.text}>Please connect your wallet</p>
          </div>
        ) : (
          <>
            <div className={styles.item}>
              <p className={styles.text}>{account}</p>
            </div>
            <div className={styles.buttons}>
              <div
                onClick={() => disconnectWallet()}
                className={styles.tooltip}
              >
                {" "}
                <svg
                  className={styles.button}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="3em"
                  height="3em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#da3526"
                    d="M336 376V272H191a16 16 0 0 1 0-32h145V136a56.06 56.06 0 0 0-56-56H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h192a56.06 56.06 0 0 0 56-56Zm89.37-104l-52.68 52.69a16 16 0 0 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62l-80-80a16 16 0 0 0-22.62 22.62L425.37 240H336v32Z"
                  />
                </svg>
                <span className={styles.tooltipText}>Disconnect wallet</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
