export const isToday = d => {
  const today = new Date();
  const date = new Date(d);
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};
