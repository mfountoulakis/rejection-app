export const getDate = d => compareDate => {
  const date = new Date(d);
  return (
    date.getDate() == compareDate.getDate() &&
    date.getMonth() == compareDate.getMonth() &&
    date.getFullYear() == compareDate.getFullYear()
  );
};
