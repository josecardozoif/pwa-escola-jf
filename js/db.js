import { openDB } from "idb";

let db;

async function criarDB(){
    try {
        db = await openDB('banco', 1, {
            upgrade(db, oldVersion, newVersion, transaction){
                switch  (oldVersion) {
                    case 0:
                    case 1:
                        const store = db.createObjectStore('anotacao', {//tabela
                            keyPath: 'capTitle'//id dos itens
                        });
                        store.createIndex('id', 'id');
                        console.log("banco de dados criado!");
                }
            }
        });
        console.log("banco de dados aberto!");
    }catch (e) {
        console.log('Erro ao criar/abrir banco: ' + e.message);
    }
}

window.addEventListener('DOMContentLoaded', async event =>{criarDB();  document.getElementById('btnCapturar').addEventListener('click', cadastro); document.getElementById('btnLista').addEventListener('click', listar);});

const map = document.querySelector('#mapa');

    const caplatitude = document.querySelector('#caplat');
    const caplongitude = document.querySelector('#caplong');

const localizacao = async () => {
    const lat = caplatitude.value
    const long = caplongitude.value
    
    map.src = "http://maps.google.com/maps?q=" + parseFloat(lat) + "," +parseFloat(long) + "&z=16&output=embed";
    console.log("2")
  }

const botao = document.querySelector('#btnCapturar')
botao.addEventListener('click', () => {
  console.log("1")
  localizacao();
  console.log("3")
});

const cadastro = async()=>{
    const capTitle = document.querySelector("#capTitle").value
    const caplatitude = document.querySelector('#caplat').value;
    const caplongitude = document.querySelector('#caplong').value;
    const tx = await db.transaction('anotacao', 'readwrite')
    const store = tx.objectStore('anotacao');

    try {
        await store.add({capTitle:capTitle, caplatitude:caplatitude, caplongitude:caplongitude});
        await tx.done;
        console.log('Registro adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar registro:', error);
        tx.abort();

    }
}

const listar = async()=>{

    const tx = await db.transaction('anotacao', 'readonly');
    const store = await tx.objectStore('anotacao');
    const anotacoes = await store.getAll();
    
    if(anotacoes){
        const divLista = anotacoes.map(anotacao => {
            return `<div class="card">
                    <p id="carditem">Titulo: ${anotacao.capTitle};<br/>Latitude: ${anotacao.caplatitude};<br/> Longitude: ${anotacao.caplongitude}</p>
                   </div>`;
        }); 
        
        listagem(divLista.join(' '));

}}

function listagem(text){
    document.getElementById('resultados').innerHTML = text;
}