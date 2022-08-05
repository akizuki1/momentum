
import styles from '../styles/navBarComponent.module.css'
import { useWeb3React } from "@web3-react/core";
import { connector } from "../config/web3";

export default function NavBarComponent(props) {
  const {  account, deactivate, error } = useWeb3React();
  function disconnectWallet() {
    deactivate();
      props.connectionStatus(false, error, account);
  }

  return (
    <>
 

<div className={styles.container}>
 
  <div className={styles.pushRight}> 
  </div>
  {!account?(
    <div className={styles.item}><p className={styles.text}>Please connect your wallet</p></div>
  ):(
    <>
      <div className={styles.item}><p className={styles.text}>{account}</p></div>
  <div className={styles.buttons}> 
  <div  className={styles.tooltip}>  <svg  className={styles.button} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="3em" height="3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#da3526" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm.91 16.15a.5.5 0 0 1-.85-.35V17H12c-1.28 0-2.56-.49-3.54-1.46a5.005 5.005 0 0 1-1.14-5.3c.19-.51.86-.64 1.24-.25c.22.22.27.54.17.82c-.46 1.24-.2 2.68.8 3.68c.7.7 1.62 1.03 2.54 1.01v-.94c0-.45.54-.67.85-.35l1.62 1.62c.2.2.2.51 0 .71l-1.63 1.61zm2.53-4.13a.78.78 0 0 1-.17-.82c.46-1.24.2-2.68-.8-3.68c-.7-.7-1.62-1.04-2.53-1.02v.94c0 .45-.54.67-.85.35L9.46 8.18c-.2-.2-.2-.51 0-.71l1.62-1.62a.5.5 0 0 1 .85.35v.81c1.3-.02 2.61.45 3.6 1.45a5.005 5.005 0 0 1 1.14 5.3c-.19.52-.85.65-1.23.26z"/>
  </svg>
  <span className={styles.tooltipText}>Change wallet</span>
</div> 
<div onClick={()=>disconnectWallet()} className={styles.tooltip}> <svg className={styles.button} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="3em" height="3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#da3526" d="M336 376V272H191a16 16 0 0 1 0-32h145V136a56.06 56.06 0 0 0-56-56H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h192a56.06 56.06 0 0 0 56-56Zm89.37-104l-52.68 52.69a16 16 0 0 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62l-80-80a16 16 0 0 0-22.62 22.62L425.37 240H336v32Z"/></svg>
  
  <span className={styles.tooltipText}>Disconnect wallet</span>
</div> 
  </div>
    
    </>
  )}


  
</div>


    </>
  )
}
