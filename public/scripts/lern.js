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
            word: '',
            translation: '',
            styles: {
                helper: {
                    filter: 'blur(5px)',
                    backgroundColor: '#cccccc'
                }
            }
        }
    },
    methods: {
        getRandomWord () {
            this.closeHelper();
            const index = Math.floor(Math.random() * this.words.length);

            this.word = this.words[index].word;

            if (this.word == undefined) this.word = 'The words are over, refresh the page to restart';

            let trns = JSON.parse(this.words[index].translations);

            let mass = '';
            for (let i = 0; i < trns.length; i++) {
                mass += trns[i];

                if (trns[i + 1] != undefined) mass += ' ';
            }
            this.translation = mass;

            if (trns.length === 0) {
                this.translation = 'Translation not yet added';
                this.showHelper();
            }

            this.words[index] = this.words.at(-1);
            this.words.splice(this.words.length - 1, 1);
        },
        showHelper () {
            this.styles.helper.filter = 'none';
            this.styles.helper.backgroundColor = 'none';
        },
        closeHelper() {
            this.styles.helper.filter = 'blur(5px)';
            this.styles.helper.backgroundColor = '#cccccc';
        }
    },
    mounted () {
        request('/api/words?for-lern=true')
            .then( res => {
                this.words = res.res;
                console.log(this.words);
            });
    }
}).mount('body')