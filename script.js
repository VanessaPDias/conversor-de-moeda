window.onload = atribuirEvento;



function atribuirEvento() {
  const botoesInverter = document.querySelectorAll(".inverter-moedas");
  botoesInverter.forEach(element => {
    element.onclick = inverter;
  });

  document.querySelector("#input-quantia").oninput = trocarValor;
  document.querySelector("#input-moeda-origem").oninput = trocarOpcaoOrigem;
  document.querySelector("#input-moeda-destino").oninput = trocarOpcaoDestino;

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

function pegarOrigemDoInput() {
  return document.querySelector("#input-moeda-origem").value;
}
function pegarDestinoDoInput() {
  return document.querySelector("#input-moeda-destino").value;
}

function pegarElementosResultado() {
  const valorMoedaOrigem = document.querySelector("#quantia-moedaOrigem");
  const valorMoedaDestino = document.querySelector("#quantiaConvertida-moedaDestino");
  const valorUnitarioMoedaOrigem = document.querySelector("#valor-unitario-origem");
  const valorUnitarioMoedaDestino = document.querySelector("#valor-unitario-destino");

  return { valorMoedaOrigem, valorMoedaDestino, valorUnitarioMoedaOrigem, valorUnitarioMoedaDestino };
}

function imprimirResultadoNaTela(valorConvertido, moedaDeOrigem, moedaDeDestino, cotacao) {
  const valorDeEntrada = pegarValorDoInput();
  const origemDeEntrada = pegarOrigemDoInput();
  const destinoDeEntrada = pegarDestinoDoInput();
  const elementosParaImprimirDados = pegarElementosResultado();
  
  elementosParaImprimirDados.valorMoedaOrigem.innerHTML = `${valorDeEntrada} ${moedaDeOrigem} = `;
  elementosParaImprimirDados.valorMoedaDestino.innerHTML = `${valorConvertido} ${moedaDeDestino}`
  elementosParaImprimirDados.valorUnitarioMoedaOrigem.innerHTML = `1 ${origemDeEntrada} = ${cotacao} ${destinoDeEntrada}`;
}

function converter() {
  const valorDeEntrada = pegarValorDoInput();
  const origemDeEntrada = pegarOrigemDoInput();
  const destinoDeEntrada = pegarDestinoDoInput();

  const elementoSelect = document.querySelector("#input-moeda-origem");
  const simboloMoedaOrigem = elementoSelect.options[elementoSelect.selectedIndex].dataset.simbolo;
  
  document.querySelector("#bandeira-origem").src = `/img/${origemDeEntrada}.png`;
  document.querySelector("#bandeira-destino").src = `/img/${destinoDeEntrada}.png`;
  document.querySelector("#simbolo-moeda-origem").innerHTML = simboloMoedaOrigem;

  let chaveParaConversao = origemDeEntrada + "-" + destinoDeEntrada;


  fetch(`https://economia.awesomeapi.com.br/last/${chaveParaConversao}`)
    .then(function (respostaDoServidor) {
      if (respostaDoServidor.ok == true) {
        return respostaDoServidor.json();
      }

      if(respostaDoServidor.status == 404) {
        let f = {}
        f[origemDeEntrada + destinoDeEntrada] = { bid: 1, name: origemDeEntrada }
        return f;
        // return f[origemDeEntrada + destinoDeEntrada] = 
      } 
    })
    .then(function (respostaConvertidaParaObj) {
      console.log(respostaConvertidaParaObj);
      const elementoObjeto = origemDeEntrada + destinoDeEntrada;
      const nomeMoedas = respostaConvertidaParaObj[elementoObjeto].name.split("/");
      const cotacao = respostaConvertidaParaObj[elementoObjeto].bid;      
      
      imprimirResultadoNaTela(valorDeEntrada * cotacao, nomeMoedas[0], nomeMoedas[1], cotacao)
    })
  }

function inverter() {
  const opcoesOrigem = document.querySelector("#input-moeda-origem");
  const opcoesDestino = document.querySelector("#input-moeda-destino");
  const oDestino = opcoesDestino.value;
  opcoesDestino.value = opcoesOrigem.value;
  opcoesOrigem.value = oDestino;

  const bandeiraOrigem = document.querySelector("#bandeira-origem");
  const bandeiraDestino = document.querySelector("#bandeira-destino");
  const bDestino = bandeiraDestino.src;
  bandeiraDestino.src = bandeiraOrigem.src;
  bandeiraOrigem.src = bDestino;

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

function trocarOpcaoOrigem(evento) {
  const valorOpcaoOrigem = evento.target.value;

  document.querySelector("#bandeira-origem").src = `/img/${valorOpcaoOrigem}.png`;

  converter()
}

function trocarOpcaoDestino(evento) {
  const valorOpcaoDestino = evento.target.value;

  document.querySelector("#bandeira-destino").src = `/img/${valorOpcaoDestino}.png`;
  converter()
}





