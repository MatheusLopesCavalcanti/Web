var pontosJogador = 0;
var pontosComputador = 0;

function jogada(opcaoJogador)
{
    //alert(opcaoJogador);

    // a jogada do computador.
    var sorteio = Math.floor(Math.random() * 3);
    determinaImagem (sorteio, 'computador');
    determinaImagem (opcaoJogador, 'jogador');

    atualizarPontuacao(opcaoJogador, sorteio);

}

function determinaImagem( valorOpcao, personagem)
{
    var imagem;
    switch(valorOpcao)
    {
        case 0: imagem = 'pedra.png';
                break;
        case 1: imagem = 'papel.png';
                break;
        case 2: imagem = 'tesoura.png';
                break; 
    }
    var imgSelecionada = document.getElementById(personagem);
    imgSelecionada.src = imagem;
}

function atualizarPontuacao( jogador, computador){

    if(jogador == 0 && computador == 2 || jogador == 1 && computador == 0 || jogador == 2 && computador == 1 ){
        pontosJogador ++;
    }
    if(jogador == 2 && computador == 0 || jogador == 1 && computador == 2 || jogador == 0 && computador == 1 ){
        pontosComputador ++;
    }

    //alert(pontosJogador);
    document.getElementById("pontuacaoJogador").innerHTML = String(pontosJogador);
    document.getElementById("pontuacaoComputador").innerHTML = String(pontosComputador);

}

