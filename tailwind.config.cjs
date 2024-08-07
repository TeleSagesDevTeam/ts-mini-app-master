/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/**/**/*.{html,js,svelte,ts}'],
	theme: {
	  extend: {
		borderRadius: {
		  'btn': "10px",
		  'menu': "8px"
		},
		colors: {
		  primary: "#3076F7",
		  "primary-hover": "#5C96FF",
		  "primary-active": "#72A2F9",
		  "primary-disabled": "#333333",
  
		  'menu-item-active': "#202224",
		  kurwa: "#1A2533",
  
		  "search": "#202224",
  
		  "light-text": "#AAAAAA",
		  "dark-text": "#5C5F62",
  
		  "btn-muted": "#202224",
		  "btn-muted-hover": "#36393B",
		  "btn-muted-active": "#36393B",
		  "btn-outline-border": "#4E4E4ECC",
  
		  "green": "#24FFD3",
  
		  "modal-bg": "#141414",
		  "overlay": "#010911CC",
		  "modal-content": "#141414",
		},
		boxShadow: {
		  "step-active": "0px 0px 20px #3076F7",
		},
		padding: {
		  'btn': "12px 16px",
		  "menu": "14.5px 17px"
		},
		fontSize: {
			small: "12px",
			mid: "14px",
		  btn: "16px",
		  menu: "16px",
		  "menu-item": "16px",
		  "intro-title": "32px",
		},
		borderColor: {
		  'menu': "#202224"
		},
		margin: {
		  "sm": "6px",
		  "md": "14px",
		}
	  },
	  fontFamily: {
		'body': ['"Montserrat"', 'sans-serif'],
		'display': ['"Montserrat"', 'sans-serif'],
		'sans': ['"Montserrat"', 'sans-serif'],
	  }
	},
	plugins: [],
}