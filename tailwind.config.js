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
            fontFamily: {
                sans: ['Manderley', ...defaultTheme.fontFamily.sans],
            },
            container: {
                center: true,
                padding: '12rem',
            },
            colors: {
                'primary': {
                    '50': '#fff1f2',
                    '100': '#ffe4e7',
                    '200': '#fecdd4',
                    '300': '#fea3b1',
                    '400': '#fc7087',
                    '500': '#f53e61',
                    '600': '#e42251',
                    '700': '#bf113f',
                    '800': '#a0113c',
                    '900': '#89123a',
                    '950': '#4c051b',
                },
                'secondary': {
                    '50': '#f2f7fd',
                    '100': '#e5eef9',
                    '200': '#c5dcf2',
                    '300': '#92c0e7',
                    '400': '#589ed8',
                    '500': '#3282c5',
                    '600': '#2367a6',
                    '700': '#1d5287',
                    '800': '#1c4770',
                    '900': '#1c3c5e',
                    '950': '#13273f',
                },

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
