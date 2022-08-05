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
