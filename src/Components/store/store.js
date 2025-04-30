export const Store = (key, data) => {
  const storedData = localStorage.getItem(key);
  const dataArray = storedData ? JSON.parse(storedData) : [];
  const isDuplicate = dataArray?.some(
    (user) =>
      user.userMail === data.userMail || user.userMobile === data.userMobile
  );

  if (isDuplicate) {
    return;
  } else {
    localStorage.setItem(key, JSON.stringify([...dataArray, data]));
  }
};

export const storeProduct = (key, data) => {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const newStore = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
