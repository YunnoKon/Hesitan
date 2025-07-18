module.exports = {
  theme: {
    extend: {
      keyframes: {
        fade: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        zoom: { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } }
      },
      animation: {
        'fade': 'fade 0.5s ease-in-out forwards',
        'zoom': 'zoom 0.3s ease-out forwards',
      },
    },
  },
};
