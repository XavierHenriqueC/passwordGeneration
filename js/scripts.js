//Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lenghtInput = document.querySelector("#lenght");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

//Funções
const openCloseGenerator = () => {
    generatePasswordContainer.classList.toggle("hide");
};


//Funçao para gerar string de letras minusculas aleatórias
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 97);
};

//Funçao para gerar string de letras maiusculas aleatórias
const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 65);
};

//Funçao para gerar numeros inteiros de 0 a 10 aleatórios
const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbols = "(){}[]=<>/,.!@#$%&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatedPassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = "";
    const passwordLength = +lenghtInput.value;
    
    const generators = [];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }
    
    if(numbersInput.checked) {
        generators.push(getNumber);
    }
    
    if(symbolsInput.checked) {
        generators.push(getSymbol);
    }

    if(generators.lenght === 0) {
        return;
    }

    if (generators.length >= 1) {
        for (i = 0; i < passwordLength; i = i + generators.length) {

            generators.forEach(() => {
                const randomValue = generators[Math.floor(Math.random() * generators.length)]();
    
                password += randomValue;
            });
        }
    }

    password = password.slice(0, passwordLength);
        
    generatedPasswordElement.style.display = "block"
    generatedPasswordElement.querySelector("h4").innerText = password;
   
}

//console.log(getLetterLowerCase(), getLetterUpperCase(), getNumber(), getSymbol());


//Eventos
generatePasswordButton.addEventListener("click", () => {

    if(lenghtInput.value > 20) {
        lenghtInput.value = 20;
    }

    generatedPassword (getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol);
});

openCloseGeneratorButton.addEventListener("click", () => {
    openCloseGenerator();
})

copyPasswordButton.addEventListener ("click", (e) => {
    e.preventDefault();

    const password = generatedPasswordElement.querySelector("h4").innerText;
    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha Copiada!";

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar";
        }, 1000);
    })
    
})