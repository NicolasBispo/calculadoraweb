// Bloco de Definição de Eventos
var botaoLigar = document.querySelector('.ligar');
botaoLigar.addEventListener('click', (e) => {
    limparFormulaAtual();
    atualizarVisor();
});

const botoesMatematica = document.querySelectorAll('.matematica');
botoesMatematica.forEach(function (botao) {
    botao.addEventListener('click', (e) => {
        adicionarSimboloNaFormula(botao.innerHTML);
        atualizarVisor();
    });
});

const botoesNumero = document.querySelectorAll('.botao-numero');
botoesNumero.forEach(function (botao) {
    botao.addEventListener('click', (e) => {
        adicionarValorAFormula(botao.innerHTML);
        atualizarVisor();
    });
});

var botaoApagarCaractere = document.querySelector('.apagar');
botaoApagarCaractere.addEventListener('click', (e) => {
    apagarCaractere();
    atualizarVisor();
    let valorResultado = analisaFormula();
    atualizarVisorResultadoSimultaneo(valorResultado);
});

const botaoResultado = document.querySelector('.resultado-operacao');
botaoResultado.addEventListener('click', (e) => {
    exibirResultadoEquacao();
});

// Bloco de Funções
function adicionarSimboloNaFormula(simbolo) {
    const simbolosMatematicos = ['x', '/', '+', '-']
    let booleanSimbolo = null

    //Verificar se o ultimo caractere da formula é um simbolo matematico
    let ultimoCaractereFormula = formulaAtual[formulaAtual.length-1]

    console.log('[ADICIONAR SIMBOLO] Formula atual é:', formulaAtual)
    console.log('[ADICIONAR SIMBOLO] Ultimo caractere da formula é:', ultimoCaractereFormula)
    if(simbolosMatematicos.includes(ultimoCaractereFormula)){
        //Ultimo caractere é um simbolo matemático!
        console.log('Ultimo simbolo da string é simbolo matematico')
        booleanSimbolo = true;
    }
    else{
        //Nao é um simbolo matematico
        console.log('Ultimo simbolo da string não é simbolo matematico')
        booleanSimbolo = false
    }
    
    if(booleanSimbolo === true){
        //Se for um simbolo matematico eu comparo para verificar se estou inserindo é
        //O mesmo da formula
        if(ultimoCaractereFormula === simbolo){
            //Se for eu não faço nada
            return
        }
        else{
            //Agora se nao for eu vou apagar o ultimo simbolo e inserir o que eu quero
            formulaAtual = formulaAtual.slice(0, -1);
            formulaAtual += simbolo
        }        
    }
    else{
        //Se o ultimo caractere nao for um simbolo matematico eu simplesmente insiro o simbolo
        //Normalmente
        formulaAtual += simbolo
    }
}

function limparFormulaAtual() {
    formulaAtual = "";
    atualizarVisor();
    let valorResultado = analisaFormula();
    atualizarVisorResultadoSimultaneo(valorResultado);
}

function adicionarValorAFormula(valorAdicionar) {
    formulaAtual += valorAdicionar;
}

function analisaFormula() {
    console.log('[ANALISA FORMULA]: Analisando a formula')
    try{
        let formulaTratada = formulaAtual.replace(/x/g, '*');
        let valorFormula = eval(formulaTratada);
        console.log('[1]Formula montada encontrada:' , formulaAtual)
        console.log('Resultado da formula:', valorFormula)
        if(valorFormula == "" || valorFormula == undefined){
            let vazio = "";
            return vazio;
        }
        else{
            resultadoEquacao = valorFormula
            return valorFormula;
        }  
    }
    catch(error){
        console.log('[0]Formula nao montada!')
        console.log('Valor atual da formula:', formulaAtual)
        if(formulaAtual == undefined){
            let vazio = ""
            return vazio
        }
        else{
            return formulaAtual
        }
    }
}

function atualizarVisorResultadoSimultaneo(valor) {
    const visorResultadoSimultaneo = document.querySelector('.visor-resultado');
    visorResultadoSimultaneo.innerHTML = valor;
}

function apagarCaractere() {
    formulaAtual = formulaAtual.slice(0, -1);
}

function exibirResultadoEquacao() {
    visorCalculadora.innerHTML = resultadoEquacao
    const visorResultadoSimultaneo = document.querySelector('.visor-resultado')
    visorResultadoSimultaneo.innerHTML = ""
    formulaAtual = resultadoEquacao
}

function atualizarVisor() {
    visorCalculadora.innerHTML = formulaAtual
    if(formulaAtual != ""){
        let valorResultado = analisaFormula()
        atualizarVisorResultadoSimultaneo(valorResultado)
    }    
}

// Bloco de Variáveis Globais
var statusCalculadora = false; // Calculadora desligada inicialmente
var visorCalculadora = document.querySelector('.visor');
var elementosVisor = "";
var formulaAtual = "";
var formulaMatematica = "";
var resultadoEquacao = 0;
