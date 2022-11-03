// Etapa 1 - Seleciona elementos para inicializar vídeo
const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");

// Etapa 2 - Seleciona elementos para capturar foto
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");

// [Etapa 3] SALVAR FOTO - Seleciona elemento HTML
const botaoEnviarFoto = document.querySelector("[data-enviar]"); 

// 2 - Inicia variável imagemURL
let imagemURL = "";

// 1 - Add evento ao botaoIniciarCamera para inicializar vídeo
botaoIniciarCamera.addEventListener("click", async function() {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({
        video: true, audio: false
    });

    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";

    video.srcObject = iniciarVideo;
})

// 2 - Add evento ao botaoTirarFoto para capturar foto
botaoTirarFoto.addEventListener("click", function() {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL("image/jpeg"); //transforma imagem em uma URL

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
})

// 3 - Add evento ao botaoEnviarFoto para salvar foto
botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes); //visualizar em objeto

    converteRetorno.imagem = imagemURL; // cria o atributo imagem dentro do objeto

    localStorage.setItem("cadastro", JSON.stringify(converteRetorno)); //atualiza o objeto no localStorage e transforma valor em JSON.

    window.location.href = "../pages/abrir-conta-form-3.html";
}) 