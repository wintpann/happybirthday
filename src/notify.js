const n = new Notyf({ ripple: false, duration: 30000 });

export const notify = (message) => {
  n.dismissAll();
  setTimeout(() => n.success(message), 500);
};
