window.onload = atribuirEvento;

function atribuirEvento() {
  const botoesInverter = document.querySelectorAll(".inverter-moedas");
  botoesInverter.forEach(element => {
    element.onclick = inverter;
  });

  document.querySelector("#input-quantia").oninput = trocarValor;
  document.querySelector("#input-moeda-de").oninput = trocarOpcaoMoedaDe;
  document.querySelector("#input-moeda-para").oninput = trocarOpcaoMoedaPara;

  converter()
}

function pegarValorDoInput() {
  let elementoValor = document.querySelector("#input-quantia").value;

  if (elementoValor == "") {
    elementoValor = 0
  }

  const virgula = /,/gi;
  const valorInicial = elementoValor.replace(virgula, '.');
  return parseFloat(valorInicial);
}

function pegarMoedaDeInput() {
  return document.querySelector("#input-moeda-de");
}
function pegarMoedaParaInput() {
  return document.querySelector("#input-moeda-para");
}

function pegarElementosResultado() {
  const valorMoedaDe = document.querySelector("#quantia-moedaDe");
  const valorMoedaPara = document.querySelector("#quantiaConvertida-moedaPara");
  const valorUnitarioMoedaDe = document.querySelector("#valor-unitario-de");
  const valorUnitarioMoedaPara = document.querySelector("#valor-unitario-para");

  return { valorMoedaDe: valorMoedaDe, valorMoedaPara: valorMoedaPara, valorUnitarioMoedaDe: valorUnitarioMoedaDe, valorUnitarioMoedaPara: valorUnitarioMoedaPara };
}

function imprimirResultadoNaTela(valorConvertido, moedaDe, moedaPara, cotacao) {
  const valor = pegarValorDoInput();
  const de = pegarMoedaDeInput().value;
  const para = pegarMoedaParaInput().value;
  const elementosParaImprimirResultados = pegarElementosResultado();
  
  elementosParaImprimirResultados.valorMoedaDe.innerHTML = `${valor} ${moedaDe} = `;
  elementosParaImprimirResultados.valorMoedaPara.innerHTML = `${valorConvertido} ${moedaPara}`
  elementosParaImprimirResultados.valorUnitarioMoedaDe.innerHTML = `1 ${de} = ${cotacao} ${para}`;
}

function converter() {
  const valor = pegarValorDoInput();
  const moedaDe = pegarMoedaDeInput().value;
  const moedaPara = pegarMoedaParaInput().value;

  const elementoSelect = document.querySelector("#input-moeda-de");
  const simboloMoedaDe = elementoSelect.options[elementoSelect.selectedIndex].dataset.simbolo;
  
  document.querySelector("#bandeira-de").src = `/img/${moedaDe}.png`;
  document.querySelector("#bandeira-para").src = `/img/${moedaPara}.png`;
  document.querySelector("#simbolo-moeda-de").innerHTML = simboloMoedaDe;

  let chaveParaConversao = moedaDe + "-" + moedaPara;

  if(moedaDe == moedaPara){
    const nomeMoedaDe = pegarMoedaDeInput().options[pegarMoedaDeInput().selectedIndex].textContent.slice(6);
    const nomeMoedaPara = pegarMoedaParaInput().options[pegarMoedaParaInput().selectedIndex].textContent.slice(6);
    
    imprimirResultadoNaTela(valor, nomeMoedaDe, nomeMoedaPara, 1);
    return;
  }

  fetch(`https://economia.awesomeapi.com.br/last/${chaveParaConversao}`)
    .then(function (respostaDoServidor) {
      if (respostaDoServidor.ok == true) {
        return respostaDoServidor.json();
      }

      if(respostaDoServidor.status == 404) {
        let f = {}
        f[moedaDe + moedaPara] = { bid: 1, name: moedaDe }
        return f;
      } 
    })
    .then(function (respostaConvertidaParaObj) {
      const nomeDoObj = moedaDe + moedaPara;
      const nomeMoedas = respostaConvertidaParaObj[nomeDoObj].name.split("/");
      const cotacao = respostaConvertidaParaObj[nomeDoObj].bid;      
      
      imprimirResultadoNaTela(valor * cotacao, nomeMoedas[0], nomeMoedas[1], cotacao)
    })
  }

function inverter() {
  let moedaDe = pegarMoedaDeInput();
  let moedaPara = pegarMoedaParaInput();
  const mPara = moedaPara.value;
  moedaPara.value = moedaDe.value;
  moedaDe.value = mPara;

  const bandeiraDe = document.querySelector("#bandeira-de");
  const bandeiraPara = document.querySelector("#bandeira-para");
  const bPara = bandeiraPara.src;
  bandeiraPara.src = bandeiraDe.src;
  bandeiraDe.src = bPara;

  converter()
}

function trocarValor(evento) {
  let valorInput = evento.target.value;
  const re = /,/gi;
  const valor = valorInput.replace(re, '.');

  if (isNaN(valor)) {
    document.querySelector("#msg-erro").innerHTML = `Informe um valor válido`;
  } else {
    document.querySelector("#msg-erro").innerHTML = "";
    converter()
  }

}

function trocarOpcaoMoedaDe(evento) {
  const valorOpcaoDe = evento.target.value;

  document.querySelector("#bandeira-de").src = `/img/${valorOpcaoDe}.png`;

  converter()
}

function trocarOpcaoMoedaPara(evento) {
  const valorOpcaoPara = evento.target.value;

  document.querySelector("#bandeira-para").src = `/img/${valorOpcaoPara}.png`;
  converter()
}





