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
            inputValue: {
                save: ''
            },
            isWrongText: false,
            words: []
        }
    },
    methods: {
        changeInputData (dir, event) {
            switch (dir) {
                case 'save form':
                    this.inputValue.save = event.target.value;
                    break;
            }
        },
        logg () {
            console.log("hello");
        },
        async saveText () {
            if (this.isWrongText) return;
            else if (this.inputValue.save === '' || this.inputValue.save === ' ') return;
            console.log(this.inputValue.save);
            const res = await request('/api/save', 'POST', { text: this.inputValue.save });
            
            if (!res) return;
            
            if (res.st === 203) {
                this.isWrongText = true;
                this.openNotif(4, 'The word entered incorrectly');
                this.words = res.res;
            } else if (res.st === 200) {
                this.inputValue.save = '';
                this.openNotif(4, 'The word has been saved successful');
            };

            if (res.st  === 209) {
                console.log(12345);
                this.inputValue.save = '';
                this.openNotif(4, 'The word has been alredy saved');
            }
        },
        setTextInInput (word) {
            this.words = [];
            this.isWrongText = false;
            this.inputValue.save = word;
        },
        openNotif (s = 3, text, type) {
            const notif = document.getElementById('notif');
            notif.textContent = text;
            notif.classList.remove('hidden');
            setTimeout(() => {
                notif.classList.add('hidden');
            }, s * 1000);
        }
    },
    mounted() {
        
    }
}).mount('body')