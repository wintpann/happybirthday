const notify = new Notyf({ ripple: false, duration: 15000 });

export const success = (message) => notify.success(message);
