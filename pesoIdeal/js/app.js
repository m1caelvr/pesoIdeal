const inputText = document.getElementById('peso-input');
const labelText = document.querySelector('.peso-label');
const inputAltura = document.getElementById('altura-input');
const labelAltura = document.querySelector('.altura-label');

window.onload = function() {
    setTimeout(() => {
        document.body.style.background = 'var(--secundary-one)';
        document.getElementById('elementblur').style.opacity = '1';
        setTimeout(() => {
            document.getElementById('tittleOne').style.webkitTextFillColor  = '#fff';
        }, 2200);
    }, 3000);
    setTimeout(() => {
        document.getElementById('continue-button').style.opacity = '1';
        document.getElementById('continue-button').style.transform = 'translate(0, 0px)';
    }, 5200);
};

document.getElementById('continue-button').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('section-1').style.transform = 'translateY(-100vh)';
    setTimeout(() => {
        document.getElementById('section-2').style.transform = 'translateY(-100vh)';
    }, 200);
});

var sexoSelecionado = null;

document.getElementById('back-to-top').addEventListener('click', function(event) {
    event.preventDefault();

    labelAltura.classList.remove('filled');
    labelText.classList.remove('filled');
    
    var inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(function(input) {
        input.value = '';
    });

    var radios = document.querySelectorAll('input[type="radio"][name="sexo"]');
    radios.forEach(function(radio) {
        radio.checked = false;
    });

    console.log("sexo at top: " + sexoSelecionado);

    document.getElementById('section-4').style.transform = 'translateY(0)';
    setTimeout(() => {
        document.getElementById('section-3').style.transform = 'translateY(-100vh)';
        setTimeout(() => {            
            document.getElementById('section-2').style.transform = 'translateY(-100vh)';
            setTimeout(() => {
                document.getElementById('section-1').style.transform = 'translateY(-100vh)';
            }, 200);
        }, 400);
    }, 200);
});



inputText.addEventListener('input', function() {
    if (inputText.value > 0) {
        labelText.classList.add('filled');
    } else {
        labelText.classList.remove('filled');
    }
});

inputAltura.addEventListener('input', function() {
    if (inputAltura.value > 0) {
        labelAltura.classList.add('filled');
    } else {
        labelAltura.classList.remove('filled');
    }
});

var imc;
var devine;
var broca;
var imcLevelText;
var imcLevelValueId;
var colorText;

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    var masculinoSelecionado = document.getElementById('sexo-input-masculino').checked;
    var femininoSelecionado = document.getElementById('sexo-input-feminino').checked;
    
    if (masculinoSelecionado || femininoSelecionado) {
        event.preventDefault();

        var bold = document.getElementsByClassName('bold');
        for (let i = 0; i < bold.length; i++) {
            bold[i].style.backgroundColor = '#ffffff12';
        }
        var item = document.getElementsByClassName('item');
        for (let i = 0; i < item.length; i++) {
            item[i].style.backgroundColor = '#00000000';
        }

        document.getElementById('section-2').style.transform = 'translateY(-200vh)';
        document.getElementById('section-3').style.transform = 'translateY(-200vh)';
        setTimeout(() => {
            document.getElementById('section-4').style.transform = 'translateY(-113vh)';
        }, 500);

        var pesoInput = document.getElementById('peso-input').value;
        var alturaInput = document.getElementById('altura-input').value;

        console.log("Sexo selecionado: ", sexoSelecionado);

        imc = parseFloat(calcularIMC(pesoInput, alturaInput).toFixed(2));
        devine = parseFloat(calculatorByDevine(alturaInput).toFixed(2));
        broca = calculatorByBroca(alturaInput, sexoSelecionado);

        imcLevelText = imcLevel(imc);
        imcLevelValueId = imcLevelText.id;
        var imcLevelValueText = imcLevelText.level;
        var imcLevelValueColor = imcLevelText.color;

        let imcLevelContent = document.getElementById('imc-level');
        let weightDevine = document.getElementById('weight-devine');
        let weightBroca = document.getElementById('weight-broca');

        console.log(imcLevelText.level);


        document.getElementById('weight-current').textContent = pesoInput + "Kg";
        document.getElementById('imc-value').textContent = imc;

        weightDevine.textContent = devine + "Kg";
        weightDevine.style.color = imcLevelValueColor;

        weightBroca.textContent = broca + "Kg";
        weightBroca.style.color = imcLevelValueColor;

        imcLevelContent.textContent = imcLevelValueText;
        imcLevelContent.style.color = imcLevelValueColor;

        IMCid(imcLevelValueId);

    } else {
        invalidFunction();
        return;
    }
});

var inputs = document.querySelectorAll('input[type="radio"][name="sexo"]');

inputs.forEach(function(input) {
    input.addEventListener('change', function(event) {
        if (event.target.checked) {
            sexoSelecionado = event.target.value;
        }
    });
});


function imcLevel(imcValue) {
    if (imcValue < 18.5) {
        let id = 1;
        let levelIMC = 'Baixo peso';
        colorText = '#ede100';
        return {id: id, level: levelIMC, color: colorText}

    } else if (imcValue >= 18.5 && imcValue < 25) {
        let id = 2;
        let levelIMC = 'Peso normal';
        colorText = '#16c40a';
        return {id: id, level: levelIMC, color: colorText}

    } else if (imcValue >= 25 && imcValue < 30) {
        let id = 3;
        let levelIMC = 'Sobrepeso';
        colorText = '#ede100';
        return {id: id, level: levelIMC, color: colorText}

    } else if (imcValue >= 30 && imcValue < 35) {
        let id = 4;
        let levelIMC = 'Obesidade grau I';
        colorText = '#ff7700';
        return {id: id, level: levelIMC, color: colorText}

    } else if (imcValue >= 35 && imcValue < 40) {
        let id = 5;
        let levelIMC = 'Obesidade grau II';
        colorText = '#ff2119';
        return {id: id, level: levelIMC, color: colorText}

    } else if (imcValue >= 40) {
        let id = 6;
        let levelIMC = 'Obesidade grau III';
        colorText = '#c80b0e';
        return {id: id, level: levelIMC, color: colorText}
    }
}
function IMCid(id) {
    if (id === 1) {
        let item9 = document.getElementsByClassName('item9');
        let item2 = document.getElementsByClassName('item2');
        let imcLevelValueColor = imcLevelText.color;
        for (let i = 0; i < item9.length; i++) {
            item9[i].style.backgroundColor = imcLevelValueColor;
        }
        for (let i = 0; i < item2.length; i++) {
            item2[i].style.backgroundColor = imcLevelValueColor;
        }
    } else if (id === 2) {
        let imcLevelValueColor = imcLevelText.color;
        let item9 = document.getElementsByClassName('item10');
        let item2 = document.getElementsByClassName('item3');
        for (let i = 0; i < item9.length; i++) {
            item9[i].style.backgroundColor = imcLevelValueColor;
        }
        for (let i = 0; i < item2.length; i++) {
            item2[i].style.backgroundColor = imcLevelValueColor;
        }
    } else if (id === 3) {
        let imcLevelValueColor = imcLevelText.color;
        let item9 = document.getElementsByClassName('item11');
        let item2 = document.getElementsByClassName('item4');
        for (let i = 0; i < item9.length; i++) {
            item9[i].style.backgroundColor = imcLevelValueColor;
        }
        for (let i = 0; i < item2.length; i++) {
            item2[i].style.backgroundColor = imcLevelValueColor;
        }
    } else if (id === 4) {
        let imcLevelValueColor = imcLevelText.color;
        let item9 = document.getElementsByClassName('item12');
        let item2 = document.getElementsByClassName('item5');
        for (let i = 0; i < item9.length; i++) {
            item9[i].style.backgroundColor = imcLevelValueColor;
        }
        for (let i = 0; i < item2.length; i++) {
            item2[i].style.backgroundColor = imcLevelValueColor;
        }
    } else if (id === 5) {
        let imcLevelValueColor = imcLevelText.color;
        let item9 = document.getElementsByClassName('item13');
        let item2 = document.getElementsByClassName('item6');
        for (let i = 0; i < item9.length; i++) {
            item9[i].style.backgroundColor = imcLevelValueColor;
        }
        for (let i = 0; i < item2.length; i++) {
            item2[i].style.backgroundColor = imcLevelValueColor;
        }
    } else if (id === 6) {
        let imcLevelValueColor = imcLevelText.color;
        let item9 = document.getElementsByClassName('item14');
        let item2 = document.getElementsByClassName('item7');
        for (let i = 0; i < item9.length; i++) {
            item9[i].style.backgroundColor = imcLevelValueColor;
        }
        for (let i = 0; i < item2.length; i++) {
            item2[i].style.backgroundColor = imcLevelValueColor;
        }
    }
}


function invalidFunction() {
    var tituloSexo = document.querySelector('.tittle-sexo');
    tituloSexo.style.animation = 'invalid .4s ease';
    tituloSexo.addEventListener('animationend', function() {
        tituloSexo.style.animation = '';
    }, { once: true });
}


function calcularIMC(peso, altura) {
    altura /= 100;
    return peso / (altura * altura);
}
function calculatorByDevine(altura) {
    return 50 + 0.91 * (altura - 152.4);
}
function calculatorByBroca(altura, sexo) {
    var coeficiente;
    if (sexo === 'man') {
        if (altura <= 164) {
            coeficiente = 100;
        } else if (altura > 164 && altura <= 175) {
            coeficiente = 105;
        } else if (altura > 175) {
            coeficiente = 110;
        } else {
            coeficiente = 0;
        }
    } else if (sexo === 'woman') {
        if (altura <= 154) {
            coeficiente = 100;
        } else if (altura > 154 && altura <= 165) {
            coeficiente = 105;
        } else if (altura > 165) {
            coeficiente = 110;
        } else {
            coeficiente = 0;
        }
    }
    if (coeficiente !== undefined) {
        return (altura - coeficiente).toFixed(2);
    } else {
        console.log("altura: " + altura + "\n" + "sexo: " + sexo + "\n" + "coeficiente: " + coeficiente);
        return NaN;
    }
}

setTimeout(() => {
    
}, timeout);
document.addEventListener("DOMContentLoaded", function() {
    var shareContentAncho = document.getElementById("share-content-ancho");

    shareContentAncho.addEventListener('click', function(event) {
        event.preventDefault();

        var result = '*Reultado do seu peso ideal:*' + '\n\n' + 'IMC: ' + imc  + '\n' + 'Seu peso ideal é entre: ' + broca + ' e ' + devine + '\n' + 'Nível do seu IMC: ' + imcLevelText.level;
        var conteudo = encodeURIComponent(result + "\n\n" + window.location.href + "\n```[Peso ideal - by WebMind]```");
        var whatsappURL = "https://api.whatsapp.com/send?text=" + conteudo;

        window.open(whatsappURL);
    });
}, false);