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
        console.log(err.message, 123);
        return null;   
    }
};

const trnUrl = 'https://translate.google.com/?hl=ru&sl=en&tl=ru&op=translate&text=';

createApp({
    data() {
        return {
            words: [],
            canAddWord: false,
            addWordBtnText: 'Add translation',
            headerOfModal: '',
            title: 'Your saved words :',
            canEdit: false,
            currentWord: '',
            modalWindowPlc: '',
            inputValue: {
                addWord: ''
            }
        }
    },
    methods: {
        changeInputData (dir, event) {
            switch (dir) {
                case 'save':
                    this.inputValue.addWord = event.target.value;
                    break;
            }
        },
        redirectToTranslatorOrSave (word) {
            console.log(12345);
            word = word.split(':')[0].trim();
            if (this.canAddWord) {
                this.currentWord = word;
                this.headerOfModal = 'Add a transition';
                this.openModel();
                
                this.modalWindowPlc = word;
                return;
            } else {
                let url = trnUrl;
                const arr = word.split(' ');
    
                for (let i = 0; i < arr.length; i++) {
                    url += arr[i];
    
                    if (arr[i + 1] != undefined) url += '%20';
                }
    
                window.open(url);
            }
        },
        editTr (word) {
            console.log('edit');
            this.canEdit = true;
            let tWord = '';
            if (word.split(':')[1] == undefined) tWord = '';
            else {
                tWord = word.split(':')[1].trim();
            }
            this.inputValue.addWord = tWord;
            this.currentWord = word.split(':')[0].trim();
            this.headerOfModal = `Edit translation - ${this.currentWord}`;
            this.openModel();
        },
        closeModal () {
            document.getElementById('exampleModal').style.display = 'none';
        },
        openModel () {
            document.getElementById('exampleModal').style.display = 'block';
        },
        setAddWord () {
            this.canAddWord = !this.canAddWord;

            if (this.canAddWord) this.addWordBtnText = 'Back';
            else this.addWordBtnText = 'Add translation';
        },
        saveWord () {
            if (this.inputValue.addWord === '' || this.currentWord === '' || this.inputValue.addWord === ' ' || this.currentWord === ' ') return;
            console.log(this.inputValue.addWord, this.currentWord);
            if (this.canEdit) {
                request('/api/update/trns', 'POST', {text: this.inputValue.addWord, target: this.currentWord})
                    .then( res => {
                        if (res.st === 200) {
                            this.closeModal();
                            request('/api/words')
                                .then( res => {
                                    this.words = res.res;
                                    if (this.word.length === 0) this.title = 'No words yet';
                                    console.log(this.words);
                                })
                        }
                    })
                this.canEdit = false;
                return;
            }
            request('/api/save/trns', 'POST', { text: this.inputValue.addWord, target: this.currentWord })
                .then( res => {
                    if (res.st === 200) {
                        this.closeModal();
                        request('/api/words')
                            .then( res => {
                                this.words = res.res;
                                console.log(this.words);
                            })
                    }
                })
        },
        deleteTr (word) {
            word = word.split(':')[0].trim();
            console.log('delete', word);
            request('/api/delete', 'POST', { word: word })
                .then( res => {
                    if (res.st === 200) {
                        request('/api/words')
                            .then( res => {
                                this.words = res.res;
                                console.log(this.words);
                            })
                    }
                })
        }
    },
    mounted () {
        request('/api/words')
            .then( res => {
                this.words = res.res;
                console.log(this.words);
            })
    }
}).mount('body')