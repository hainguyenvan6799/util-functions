export const dispatchCustomEvent = (eventName, data) => {
  document.dispatchEvent(
    new CustomEvent(`${PREFIX}${eventName}`, {
      detail: data,
    })
  );
};

export const listenEvent = (eventName, callback) => {
  document.addEventListener(`${PREFIX}${eventName}`, callback);
};
