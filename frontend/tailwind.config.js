/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'btn-grad': 'linear-gradient(to right, #ff0f7b, #f89b29)',
      },
      colors: {
        white: "#fff",
        red: "#ee0c0c",
        black: "#000",
        wireframe: "#313131",
        crimson: "#f8444f",
        "my-color": "#78bdc4",
        silver: "#c4c4c4",
        slategray: "#56697f",
        lightslategray: "#94a3b8",
        darkslategray: "#444",
        gray: {
          "100": "#262626",
          "200": "rgba(255, 255, 255, 0.89)",
          "300": "rgba(255, 255, 255, 0.86)",
          "400": "rgba(0, 0, 0, 0.79)",
          "500": "rgba(255, 255, 255, 0.88)",
        },
        snow: "#fef5f6",
        lavenderblush: "#fef0f1",
        salmon: "#ff5e69",
        lightcoral: {
          "100": "#fc9ba2",
          "200": "#fa7079",
        },
        lightblue: "#8bbbc9",
        slategray: "#357082",
        gainsboro: {
          "100": "#e6e6e6",
          "200": "#e3e3e3",
          "300": "rgba(230, 230, 230, 0.88)",
          primaryColor: '#F8444F',
          SecondaryColor: '#2B2D42',
          AccentColors: '#000000',
          Background :'#ffffff'
        },
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
        inter: "Inter",
        inherit: "inherit",
        "body-ui": "Inter",
        roboto: "Roboto",
        "features-heading": "Montserrat",
        inter: "Inter",
      },
      borderRadius: {
        mini: "15px",
        "102xl-5": "121.5px",
        "27xl": "46px",
      },
      gridTemplateColumns: {
        'custom-cols': 'repeat(3, minmax(300px, 1fr))',
      },
      gridTemplateRows: {
        'custom-rows': 'repeat(3, minmax(300px, 1fr))',
      },
    },
    fontSize: {
      xl: "20px",
      base: "16px",
      sm: "14px",
      inherit: "inherit",
      sm: "14px",
      smi: "13px",
      lg: "18px",
      base: "16px",
      "5xl": "24px",
      lgi: "19px",
      "17xl": "36px",
      "3xl": "22px",
      "10xl": "29px",
      "3xs": "10px",
      xs: "12px",
      "11xl": "30px",
      "51xl": "70px",
      "23xl": "42px",
      "37xl": "56px",
      "7xs": "6px",
      "5xs": "8px",
    },
  },
  screens: {
    lg: {
      max: "1200px",
    },
    mq1050: {
      raw: "screen and (max-width: 1050px)",
    },
    mq750: {
      raw: "screen and (max-width: 750px)",
    },
    mq450: {
      raw: "screen and (max-width: 450px)",
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}