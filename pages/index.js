import Head from "next/head";
import ActionButtonComponent from "../components/actionButtonComponent";
import LinksComponent from "../components/linksComponent";
import styles from "../styles/index.module.css";
import { useState } from "react";
import NavBarComponent from "../components/navBarComponent";
import ModalNotificationComponent from "../components/modalNotificationComponent";

export default function Home() {

  const [connected, setConnected] = useState(false);
  const [messageNotification, setMessageNotification] = useState("");
  const [typeNotification, setTypeNotification] = useState(0);
  const [openNotification, setOpenNotification] = useState(false);
  const [action, setAction] = useState(0);
  const [account, setAccount] = useState("disconnect");

  function connectionStatus(status, error,account) {
    if (!error) {
      setConnected(status);
      if(status===true){
        setAction(2)
      }else{
        setAction(0)
        setAccount("disconnect")
      }
      setAccount(account)

    } else {
      setMessageNotification("Connection failure, error: " + error);
      setTypeNotification(0);
      setOpenNotification(true);
    }
  }

  function setNotification(message, type){
    setMessageNotification(message);
      setTypeNotification(type);
      setOpenNotification(true);

  }

  function showNotification() {
    setOpenNotification(!openNotification);
  }


  return (
    <>
    <NavBarComponent account={account}  connectionStatus={connectionStatus} />

      <div className={styles.container}>
        <Head>
          <title>Momentum</title>
          <meta name="description" content="Momentum powered by KFNC" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        {openNotification === true ? (
          <ModalNotificationComponent
            messageNotification={messageNotification}
            typeNotification={typeNotification}
            showNotification={showNotification}
          />
        ) : null}
        <main className={styles.main}>
          <ActionButtonComponent
            connectionStatus={connectionStatus}
            setNotification={setNotification}
            action={action}
          />
          {connected === false ? (
            <LinksComponent />
          ) : (
            <div className={styles.containerLinks}>
              <LinksComponent />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
