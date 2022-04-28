module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#150245',
      'blue-dark': '#0e012e',
      'blue-light': '#87edf6',
      'counter-disabled': "#1a2a43",
      'blue-accent': "#36598d",
      'pink': '#df5ef0',
      'pink-dark': "#fb1a7c",
      'white': '#ffffff',
    },
    fontSize: {
      'sub-heading': '1.5rem',
      'heading': '3rem',
    },
    gridTemplateColumns: {
      '1': 'repeat(1, minmax(250px, 1fr))',
      '2': 'repeat(2, minmax(250px, 1fr))',
      '4': 'repeat(4, minmax(250px, 1fr))',
    },
    extend: {},
  },
  plugins: [],
}
