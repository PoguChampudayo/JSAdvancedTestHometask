import {
  amex, discover, jcb, maestro, masterCard, mir, visa, visaElectron,
} from './systemIdentifiers';

// function validateLuhn(number) {
//   const check = Number(String(number).slice(-1));
//   let row = String(number).split('').slice(0, -1);
//   row = row.map((el) => Number(el));
//   row = row.map((el) => {
//     if (!(row.indexOf(el) % 2)) {
//       return el * 2;
//     }
//     return el;
//   });
//   row = row.map((el) => {
//     if (el > 9) return el - 9;
//     return el;
//   });
//   return check === row.reduce((acc, cur) => acc + cur, 0);
// }

function validateLuhn(number) {
  const check = Number(String(number).slice(-1));
  const row = String(number).split('').slice(0, -1).map(Number)
    .reverse();
  for (const [index] of row.entries()) {
    if (index % 2 === 0) {
      row[index] *= 2;
      if (row[index] > 9) {
        row[index] -= 9;
      }
    }
  }
  const result = row.reduce((acc, cur) => acc + cur, 0);
  return check === result % 10;
}

export default class ValidationWidget {
  constructor(form) {
    this.form = document.forms[form];
    this.input = this.form.input;
    this.button = this.form.button;
    this.checkCreditCardLength = this.checkCreditCardLength.bind(this);
    this.findCreditCardSystem = this.findCreditCardSystem.bind(this);
    this.applySystemtoDOM = this.applySystemtoDOM.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.input.addEventListener('input', this.applySystemtoDOM);
    this.form.addEventListener('submit', this.onSubmit);
    this.cardIcons = document.querySelectorAll('.cardSystemImage');
  }

  checkCreditCardLength() {
    const l = this.input.value.length;
    if (amex(this.input.value)) return l === 15;
    if (discover(this.input.value)) return l === 14;
    if (jcb(this.input.value)) return (l >= 16 && l <= 19);
    if (maestro(this.input.value)) return (l >= 16 && l <= 19);
    if (masterCard(this.input.value)) return l === 16;
    if (mir(this.input.value)) return l === 16;
    if (visaElectron(this.input.value)) return l === 16;
    if (visa(this.input.value)) return (l >= 13 && l <= 19);
    return false;
  }

  findCreditCardSystem() {
    return {
      amex: amex(this.input.value),
      discover: discover(this.input.value),
      jcb: jcb(this.input.value),
      maestro: maestro(this.input.value),
      masterCard: masterCard(this.input.value),
      mir: mir(this.input.value),
      visa: visa(this.input.value),
      visaElectron: visaElectron(this.input.value),
    };
  }

  applySystemtoDOM() {
    if (this.input.value === '') {
      this.cardIcons.forEach(((el) => {
        el.classList.remove('cardHidden');
      }));
    } else {
      const cardValidation = this.findCreditCardSystem();

      for (let i = 0; i < this.cardIcons.length; i += 1) {
        if (cardValidation[this.cardIcons[i].id]) {
          this.cardIcons.item(i).classList.remove('cardHidden');
        } else {
          this.cardIcons.item(i).classList.add('cardHidden');
        }
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.checkCreditCardLength() && validateLuhn(Number(this.input.value))) {
      alert('Номер карты верен');
    } else {
      alert('Номер карты неверен');
    }
    this.input.value = '';
    const event = new Event('input');
    this.input.dispatchEvent(event);
  }

  initiate() {
    this.input.value = '';
    const event = new Event('input');
    this.input.dispatchEvent(event);
  }
}
