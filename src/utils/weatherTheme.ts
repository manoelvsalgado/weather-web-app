export const getBackgroundColor = (temp: number | null) => {
  if (temp === null) return "gray.700";
  if (temp <= 5) return "#C0C0C0";
  if (temp >= 6 && temp <= 15) return "#87CEFA";
  return "#00BFFF";
};

export const getTextColor = (temp: number | null) => {
  return temp !== null && temp <= 5 ? "black" : "white";
};

export const useWeatherStyles = (temp: number | null) => {
  const backgroundColor = getBackgroundColor(temp);
  const textColor = getTextColor(temp);
  return { backgroundColor, textColor };
};
