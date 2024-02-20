/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        robotoThin: ['Roboto_100Thin'],
        robotoThinItalic: ['Roboto_100Thin_Italic'],
        robotoLight: ['Roboto_300Light'],
        robotoLightItalic: ['Roboto_300Light_Italic'],
        robotoRegular: ['Roboto_400Regular'],
        robotoRegularItalic: ['Roboto_400Regular_Italic'],
        robotoMedium: ['Roboto_500Medium'],
        robotoMediumItalic: ['Roboto_500Medium_Italic'],
        robotoBold: ['Roboto_700Bold'],
        robotoBoldItalic: ['Roboto_700Bold_Italic'],
        robotoBlack: ['Roboto_900Black'],
        robotoBlackItalic: ['Roboto_900Black_Italic'],
      },
    },
  },
  plugins: [],
};
