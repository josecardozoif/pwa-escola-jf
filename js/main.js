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

let posicaoInicial;
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.querySelector('#mapa');

const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;
    map.src = "http://maps.google.com/maps?q=" + posicaoInicial.coords.latitude + "," + posicaoInicial.coords.longitude + "&z=16&output=embed";
};

let capPosicao;

    const caplatitude = document.querySelector('#caplat');
    const caplongitude = document.querySelector('#caplong');

const localizacao = async () => {
    const lat = caplatitude.value
    const long = caplongitude.value
    
    map.src = "http://maps.google.com/maps?q=" + parseFloat(lat) + "," +parseFloat(long) + "&z=16&output=embed";
    console.log("2")
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

const botao = document.querySelector('#btnCapturar')
botao.addEventListener('click', () => {
  console.log("1")
  localizacao();
  console.log("3")
});