import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

async function request (url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            headers,
            body,
            method
        })
        return { st: response.status, res: await response.json() };
    } catch (err) {
        console.log(err.message);   
    }
};

createApp({
    data () {
        return {
            words: [],
            word: ''
        }
    },
    methods: {
        getRandomWord () {
            const index = Math.floor(Math.random() * this.words.length);
            console.log(this.words, this.words[index]);
            this.word = this.words[index];
            if (this.word == undefined) this.word = 'The words are over, refresh the page to restart';
            this.words[index] = this.words.at(-1);
            this.words.splice(this.words.length - 1, 1);
        }
    },
    mounted () {
        request('/api/words?just-words=true')
            .then( res => {
                this.words = res.res;
                console.log(this.words);
            });
    }
}).mount('body')