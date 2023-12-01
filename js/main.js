if('serviceWorker' in navigator){
    window.addEventListener('load', async () => {
        try{
            let reg;
            reg = await navigator.serviceWorker.register('/sw.js', {type: 'module'});
            console.log('Service worker registrada! ', reg);
        } catch (err) {
            console.log('Registro da service worker falhou: ', err);
        }
    });
}

let posicaoInicial;
const capturarPosicao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const sucesso = (posicao) => {
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;

    let embedString = `http://maps.google.com/maps?q=${posicaoInicial.coords.latitude},${posicaoInicial.coords.longitude}&z=16&output=embed`
    document.getElementsByTagName("iframe")[0].src = embedString;
}

const erro = (err) => {
    let errorMessage;
    switch(err.code){
        case 0:
            errorMessage = "Erro desconhecido!"
        break;
        case 1:
            errorMessage = "Permissão negada!"
        break;
        case 2:
            errorMessage = "Captura de posição indisponível!"
        break;
        case 3:
            errorMessage = "Tempo de solicitação excedido"
        break;
    }
    console.log('Ocorreu um erro: ' + errorMessage);
};

capturarPosicao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
});