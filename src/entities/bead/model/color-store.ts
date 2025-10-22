function createColorStore() {
  let color = "#000000";

  return {
    getColor: () => color,
    setColor: (newColor: string) => {
      color = newColor;
    },
  };
}

export const colorStore = createColorStore();
