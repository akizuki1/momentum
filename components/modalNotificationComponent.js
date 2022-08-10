import styles from "../styles/modalNotificationComponent.module.css";

export default function ModalNotificationComponent(props) {
  const notifications = [
    {
      ico: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="4em"
          height="4em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="#da3526"
            fillRule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1Zm3.707 8.707a1 1 0 0 0-1.414-1.414L12 10.586L9.707 8.293a1 1 0 1 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      type: "error",
    },
    {
      ico: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="4em"
          height="4em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#da3526"
            d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
          />
        </svg>
      ),
      type: "success",
    },
    {
      ico: (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="4em" height="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#da3526" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="#da3526" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
      ),
      type: "waiting",
    },
    {
      ico: (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="4em" height="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="#da3526" d="M9 15h2V9H9v6zm1-10c-.5 0-1 .5-1 1s.5 1 1 1s1-.5 1-1s-.5-1-1-1zm0-4c-5 0-9 4-9 9s4 9 9 9s9-4 9-9s-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7s7 3.1 7 7s-3.1 7-7 7z"/></svg>
      ),
      type: "info",
    },
  ];

  function showNotification() {
    props.showNotification();
  }

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span onClick={() => showNotification()} className={styles.close}>
            &times;
          </span>
          <p className={styles.ico}>
            {notifications[props.typeNotification].ico}
          </p>

          <p>{props.messageNotification}</p>
        </div>
      </div>
    </>
  );
}
