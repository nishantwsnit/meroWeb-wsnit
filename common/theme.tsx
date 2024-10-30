import { Theme } from "@aws-amplify/ui-react";

export const theme: Theme = {
  name: "button-theme",
  tokens: {
    colors: {
      border: {
        // this will affect the default button's border color
        primary: { value: "black" },
      },
    },
    components: {
      text: {
        primary: {
          color: "#DC143C",
        },
      },
      button: {
        // this will affect the font weight of all button variants
        fontWeight: { value: "{fontWeights.medium}" },
        backgroundColor: { value: "#DC143C" },
        borderColor: { value: "{colors.purple.80}" },
        color: { value: "{colors.white}" },
        outlined: {
          info: {
            borderColor: "{colors.purple.60}",
            color: "{colors.purple.90}",
          },
        },

        // style the primary variation
        primary: {
          backgroundColor: { value: "#DC143C" },
          _hover: {
            backgroundColor: { value: "#DC143C" },
          },
          _focus: {
            backgroundColor: { value: "{colors.blue.80}" },
          },
          _active: {
            backgroundColor: { value: "{colors.blue.90}" },
          },
          _disabled: {
            backgroundColor: { value: "transparent" },
            borderColor: { value: "{colors.neutral.30}" },
          },
          error: {
            backgroundColor: { value: "{colors.pink.10}" },
            color: { value: "{colors.red.80}" },
            _hover: {
              backgroundColor: { value: "#a51b34" },
            },
            _focus: {
              backgroundColor: { value: "#9a0c26" },
            },
            _active: {
              backgroundColor: { value: "#9a0c26" },
            },
          },
        },
      },
    },
  },
};
