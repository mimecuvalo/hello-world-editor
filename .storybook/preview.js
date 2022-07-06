import { StrictMode } from "react";

export const parameters = {
  layout: "padded",
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const themeDecorator = (Story) => {
  return (
    <StrictMode>
      <Story />
    </StrictMode>
  );
};

export const decorators = [themeDecorator];
