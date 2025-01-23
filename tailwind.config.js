/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    './client/public/*.html',
    './client/public/src/**/*.js'
  ],
  theme: {
    extend: {
      keyframes: {
        'vibrate': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-10px)' },
        },
        
        'fade-in-form': {
          from: {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slidegradient': {
          '0%': { 
            backgroundPosition : '0% 0%' 
          },
          '100%': { 
            backgroundPosition: '100% 0%'
          }
        },
       
      },
      animation:{
        'slidegradient': 'slidegradient 2s alternate-reverse infinite',
        'vibrate': 'vibrate 0.9s ease-in-out 2',
        'fade-in-form' : 'fade-in-form 2s'
      },
      backgroundImage: {
        'animated-gradient': 'radial-gradient(circle, #070831, #163753, #0a1e6e)',
      },
    },
  },
  plugins: [],
};

