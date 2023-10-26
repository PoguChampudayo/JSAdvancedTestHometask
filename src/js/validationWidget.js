import {amex, discover, jcb, maestro, masterCard, mir, visa, visaElectron } from "./systemIdentifiers";

export default class ValidationWidget {
    constructor (form) {
        this.form = document.forms[form]
        this.input = this.form.input
        this.button = this.form.button
        this.checkCreditCardLength=this.checkCreditCardLength.bind(this)
        this.findCreditCardSystem=this.findCreditCardSystem.bind(this)
        this.applySystemtoDOM=this.applySystemtoDOM.bind(this)
        this.validateLuhn=this.validateLuhn.bind(this)
        this.onButtonPress=this.onButtonPress.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.input.addEventListener('input', this.applySystemtoDOM)
        this.form.addEventListener('submit', this.onSubmit)
        

        // this.cardIcons = document.querySelectorAll('.cardSystemImage')
    }
    

    checkCreditCardLength() {
        if (amex(this.input.value)) return this.input.value.length === 15
        if (discover(this.input.value)) return this.input.value.length === 14
        if (jcb(this.input.value)) return (this.input.value.length >= 16 && this.input.value <= 19)
        if (maestro(this.input.value)) return (this.input.value.length >= 16 && this.input.value <= 19)
        if (masterCard(this.input.value)) return this.input.value.length === 16
        if (mir(this.input.value)) return this.input.value.length === 16
        if (visa(this.input.value)) return (this.input.value.length >= 13 && this.input.value <= 19)
        if (visaElectron(this.input.value)) return this.input.value.length === 16
        return false
    }

    findCreditCardSystem () {
        return {
            'amex': amex(this.input.value),
            'discover': discover(this.input.value),
            'jcb': jcb(this.input.value),
            'maestro': maestro(this.input.value),
            'masterCard': masterCard(this.input.value),
            'mir': mir(this.input.value),
            'visa': visa(this.input.value),
            'visaElectron': visaElectron(this.input.value),
        }
    }

    applySystemtoDOM() {
        let cardValidation = this.findCreditCardSystem()
        Object.keys(cardValidation).forEach(el => {
            if (!cardValidation[el]) {
                document.getElementById(el).classList.add('cardHidden')
            }
            else {
                document.getElementById(el).classList.remove('cardHidden')
            }
        });
    }
    

    validateLuhn (number) {
        let check = Number(String(number).slice(-1));
        let row = String(number).split('').slice(0, -1);
        row = row.map((el) => Number(el));
        row = row.map((el) => {
            if (!(row.indexOf(el) % 2)) {
                return el * 2;
            }
            else return el;
        })
        row = row.map((el) => {
            if (el > 9) return el - 9;
            else return el;
        })
        return check === row.reduce((acc, cur) => acc + cur, 0);
    }

    onButtonPress () {
        if (this.checkCreditCardLength(this.input.value) && this.validateLuhn(this.input.value)) {
            alert('Номер карты верен')
        }
        else {
            alert('Номер карты неверен')
        }
    }

    onSubmit (e) {
        e.preventDefault()
    }


}