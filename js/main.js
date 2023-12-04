if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}

let posicaoInicial;//variavel para capturar a posicao
const capturarLocalizacao = document.getElementById('caploc');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('mapa');

const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;
    map.src = "http://maps.google.com/maps?q=" + posicaoInicial.coords.latitude + "," + posicaoInicial.coords.longitude + "&z=16&output=embed";
};

let capPosicao;
    const caplatitude = document.getElementById('caplat').value;
    const caplongitude = document.getElementById('caplong').value;

const localizacao = async () => {

    capPosicao = posicao2;
    caplatitude.innerHTML = capPosicao.coords.caplatitude;
    caplongitude.innerHTML = capPosicao.coords.caplongitude;

    map.src = "http://maps.google.com/maps?q=" + capPosicao.coords.caplatitude + "," + capPosicao.coords.caplongitude + "&z=16&output=embed";
    console.log("FOI")
  }

  const erro = (error) => {//callback de error (falha para captura de localizacao)
    let errorMessage;
    switch (error.code) {
        case 0:
            errorMessage = "Erro desconhecido"
            break;
        case 1:
            errorMessage = "Permissão negada!"
            break;
        case 2:
            errorMessage = "Captura de posição indisponível!"
            break;
        case 3:
            errorMessage = "Tempo de solicitação excedido!"
            break;
    }
    console.log('Ocorreu um erro: ' + errorMessage);
};

const botao = document.querySelector ('btnCapturar')
botao.addEventListener('click', () => {
  console.log("LOCAL")
  localizacao();
  console.log("BOTAO")
});



capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
});

//---------------------------------------------------------------------------------------------------//
