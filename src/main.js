import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import en from './lang/en/en.json';
import ua from './lang/ua/ua.json';

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') || 'ua',
    fallbackLocale: 'en',
    messages: {
        en,
        ua,
    },
})

const app = createApp(App);
app.use(i18n);

app.mount('#app');
