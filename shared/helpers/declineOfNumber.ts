export const dayTitles = ['день', 'дня', 'дней'];

export const declineOfNumber = (count: number, titles: Array<string>): string => {
  const cases = [2, 0, 1, 1, 1, 2];

  const index = count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)];

  return `${count} ${titles[index]}`;
};
