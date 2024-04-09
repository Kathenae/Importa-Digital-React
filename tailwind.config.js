import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            screens: {
                'xl2': '1536px', // Custom breakpoint
            },
            fontFamily: {
                sans: ['Manderley', ...defaultTheme.fontFamily.sans],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    lg: '12rem',
                },
            },
            colors: {
                "primary": {
                    "base": "#ed8504",
                    "accent": "#faea00",
                    '50': '#fffaeb',
                    '100': '#fff0c6',
                    '200': '#ffdf87',
                    '300': '#ffc749',
                    '400': '#ffb01f',
                    '500': '#ed8504',
                    '600': '#de6701',
                    '700': '#b84505',
                    '800': '#95350b',
                    '900': '#7b2c0c',
                    '950': '#471501',
                },
                "secondary": {
                    "base": "#211c22"
                }
            }
        },
    },

    plugins: [
        forms,
        iconsPlugin({
            collections: getIconCollections(["mdi", "lucide"]),
        })
    ],
};
