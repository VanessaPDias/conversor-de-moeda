window.onload = atribuirEvento;

function atribuirEvento(){
  document.querySelector("#inverter-moedas").onclick = inverter;
  document.querySelector("#input-quantia").oninput = trocarValor;
  document.querySelector("#input-moeda-origem").oninput = trocarOpcaoOrigem;
  document.querySelector("#input-moeda-destino").oninput = trocarOpcaoDestino;
  converter()
}

function pegarDadosInput() {
  let quantia = document.querySelector("#input-quantia").value;
  const opcaoOrigem = document.querySelector("#input-moeda-origem").value;  
  const opcaoDestino = document.querySelector("#input-moeda-destino").value;

  if(quantia == ""){
    quantia = 0;
  }
  const valor = parseFloat(quantia);

  return {valor, opcaoOrigem, opcaoDestino};
}

function pegarElementosResultado() {
  const valorMoedaOrigem = document.querySelector("#quantia-moedaOrigem");
  const valorMoedaDestino = document.querySelector("#quantiaConvertida-moedaDestino");
  const valorUnitarioMoedaOrigem = document.querySelector("#valor-unitario-origem");
  const valorUnitarioMoedaDestino = document.querySelector("#valor-unitario-destino");

  return {valorMoedaOrigem, valorMoedaDestino, valorUnitarioMoedaOrigem, valorUnitarioMoedaDestino};
}

function imprimirResultadoNaTela(valorConvertido, moedaOrigemSingular, moedaOrigemPlural, moedaDestinoSingular,moedaDestinoPlural, bandeiraOrigem, cotacao) {
  const dadosDeEntrada = pegarDadosInput()
  const elementosParaImprimirDados = pegarElementosResultado();
  if(dadosDeEntrada.valor > 1){
    moedaOrigemSingular = moedaOrigemPlural;
  };
  if(valorConvertido > 1){
    moedaDestinoSingular = moedaDestinoPlural;
  }

  elementosParaImprimirDados.valorMoedaOrigem.innerHTML = `${dadosDeEntrada.valor} ${moedaOrigemSingular} = `;
  elementosParaImprimirDados.valorMoedaDestino.innerHTML = `${valorConvertido} ${moedaDestinoSingular}`
  elementosParaImprimirDados.valorUnitarioMoedaOrigem.innerHTML = `1 ${dadosDeEntrada.opcaoOrigem} = ${cotacao} ${dadosDeEntrada.opcaoDestino}`;
}

function converter(){
  const dadosParaConversao = pegarDadosInput();
  let chaveParaConversao = dadosParaConversao.opcaoOrigem + "-" + dadosParaConversao.opcaoDestino;
  let valorConvertido;
  let moedaOrigemSingular;
  let moedaOrigemPlural;
  let moedaDestinoSingular;
  let moedaDestinoPlural;
  let cotacao;
  

  for( let i = 0; i < moedas.length; i++){
    
    if(chaveParaConversao == moedas[i].chave){
      valorConvertido = dadosParaConversao.valor * moedas[i].cotacao;
      moedaOrigemSingular = moedas[i].origem.singular;
      moedaOrigemPlural = moedas[i].origem.plural;
      moedaDestinoSingular = moedas[i].destino.singular;
      moedaDestinoPlural = moedas[i].destino.plural;
      bandeiraOrigem = moedas[i].origem.bandeira;
      cotacao = moedas[i].cotacao;
    }
  }
  imprimirResultadoNaTela(valorConvertido, moedaOrigemSingular, moedaOrigemPlural, moedaDestinoSingular,moedaDestinoPlural, bandeiraOrigem, cotacao)
}

function inverter(){
  const opcoesOrigem = document.querySelector("#input-moeda-origem");
  const opcoesDestino = document.querySelector("#input-moeda-destino");
  const destino = opcoesDestino.value;
  
  opcoesDestino.value = opcoesOrigem.value;
  opcoesOrigem.value = destino;
  

  converter()
}

function trocarValor(evento){
  if(isNaN(evento.target.value)){
    document.querySelector("#msg-erro").innerHTML = `Informe um valor válido`;
  } else {
    document.querySelector("#msg-erro").innerHTML = "";
    converter()
  }
  
}

function trocarOpcaoOrigem(){
  converter()
}

function trocarOpcaoDestino(){
  converter()
}



  const moedas = [
    {
      chave: "USD-USD",
      cotacao: 1.00,
      origem: {
        bandeira: "img/us.png",
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      },
      destino: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      } 
    },
    {
      chave: "USD-EUR",
      cotacao: 0.8675,
      origem: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      },
      destino: {
        singular: "Euro",
        plural: "Euros"
      } 
    },
    {
      chave: "USD-BRL",
      cotacao: 5.5328,
      origem: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      },
      destino: {
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      }
    },
    {
      chave: "USD-GBP",
      cotacao: 0.7364,
      origem: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      },
      destino: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      }
    },
    {
      chave: "EUR-EUR",
      cotacao: 1.000,
      origem: {
        singular: "Euro",
        plural: "Euros"
      },
      destino: {
        singular: "Euro",
        plural: "Euros",
      }
    },
    {
      chave: "EUR-USD",
      cotacao: 1.1526,
      origem: {
        singular: "Euro",
        plural: "Euros"
      },
      destino: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA",
      }
    },
    {
      chave: "EUR-BRL",
      cotacao: 6.3772,
      origem: {
        singular: "Euro",
        plural: "Euros"
      },
      destino: {
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      }
    },
    {
      chave: "EUR-GBP",
      cotacao: 0.8486,
      origem: {
        singular: "Euro",
        plural: "Euros"
      },
      destino: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      }
    },
    {
      chave: "BRL-BRL",
      cotacao: 1.000,
      origem: {
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      },
      destino: {
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      }
    },
    {
      chave: "BRL-USD",
      cotacao: 0.1807,
      origem: {
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      },
      destino: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      }
    },
    {
      chave: "BRL-EUR",
      cotacao: 0.1568,
      origem: {
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      },
      destino: {
        singular: "Euro",
        plural: "Euros"
      }
    },
    {
      chave: "BRL-GBP",
      cotacao: 0.1330,
      origem: {
        singular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      },
      destino: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      }
    },
    {
      chave: "GBP-GBP",
      cotacao: 1.000,
      origem: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      },
      destino: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      }
    },
    {
      chave: "GBP-USD",
      cotacao: 1.3581,
      origem: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      },
      destino: {
        singular: "Dólar dos EUA",
        plural: "Dólares dos EUA"
      }
    },
    {
      chave: "GBP-EUR",
      cotacao: 1.1784,
      origem: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      },
      destino: {
        singular: "Euro",
        plural: "Euros"
      }
    },
    {
      chave: "GBP-BRL",
      cotacao: 7.5146,
      origem: {
        singular: "Libra Esterlina",
        plural: "Libras Esterlinas"
      },
      destino: {
        ssingular: "Real Brasileiro",
        plural: "Reais Brasileiro"
      }
    }
    
  ];
