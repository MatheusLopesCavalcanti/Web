var jogoIniciado;
var nomeJogador1;
var nomeJogador2;
var pontosJogador1;
var pontosJogador2;

var turno;

var srcQuadradoCinza;
var posicaoValida;
var posicoesOcupadas = [9];

var fimDeJogo;
//==================================================================================================================

function start()
{
    jogoIniciado = false;
    nomeJogador1 = "Jogador1";
    nomeJogador2 = "Jogador2";
    pontosJogador1 = 0;
    pontosJogador2 = 0;
    turno = 0;
    fimDeJogo = false;

    posicoesOcupadas = [9];
    
}

//==================================================================================================================

function IniciarPartida()
{
    var capturaNomeJogador1 = document.getElementById("formNome").elements[0].value;
    var capturaNomeJogador2 = document.getElementById("formNome").elements[1].value;

    if(capturaNomeJogador1 != "" && capturaNomeJogador2 != "" ){
        nomeJogador1 = capturaNomeJogador1;
        nomeJogador2 = capturaNomeJogador2;

        document.getElementById("NomeJogador1").innerHTML = nomeJogador1;
        document.getElementById("NomeJogador2").innerHTML = nomeJogador2;

        jogoIniciado = true;

        turno = 1;
        document.getElementById("InstrucJogador1").innerHTML = "É sua vez!";
        document.getElementById("InstrucJogador2").innerHTML = "Aguarde";

        pontosJogador1 = 0;
        document.getElementById("PontosJogador1").innerHTML = pontosJogador1.toString();
        pontosJogador2 = 0;
        document.getElementById("PontosJogador2").innerHTML = pontosJogador2.toString();

        for (var i = 0; i < 9; i++){
            posicoesOcupadas[i] = "0";
            document.getElementById(i).src = "img/QuadradoCinza.png";
        }
    }
    
}

//==================================================================================================================

function jogada(cord)
{

    if(jogoIniciado){
        if(fimDeJogo){
            novaPartida();
        }else{
            if(posicoesOcupadas[cord] == "0"){
                if(turno == 1){
                    document.getElementById(cord).src = "img/Xis.png";
                    document.getElementById("InstrucJogador1").innerHTML = "Aguarde";
                    document.getElementById("InstrucJogador2").innerHTML = "É sua vez!";
                    posicoesOcupadas[cord] = "X";
                    turno = 2;
                }else{
                    document.getElementById(cord).src = "img/Bola.png";
                    document.getElementById("InstrucJogador1").innerHTML = "É sua vez!";
                    document.getElementById("InstrucJogador2").innerHTML = "Aguarde";
                    posicoesOcupadas[cord] = "O";
                    turno = 1;
                }
            }
            verificarVitoria();
        }
    }

}
//==================================================================================================================
function verificarVitoria(){
    if(
        posicoesOcupadas[0] == "X" && posicoesOcupadas[1] == "X"  && posicoesOcupadas[2] == "X" ||
        posicoesOcupadas[3] == "X" && posicoesOcupadas[4] == "X"  && posicoesOcupadas[5] == "X" ||
        posicoesOcupadas[6] == "X" && posicoesOcupadas[7] == "X"  && posicoesOcupadas[8] == "X" ||
        posicoesOcupadas[0] == "X" && posicoesOcupadas[3] == "X"  && posicoesOcupadas[6] == "X" ||
        posicoesOcupadas[1] == "X" && posicoesOcupadas[4] == "X"  && posicoesOcupadas[7] == "X" ||
        posicoesOcupadas[2] == "X" && posicoesOcupadas[5] == "X"  && posicoesOcupadas[8] == "X" ||
        posicoesOcupadas[0] == "X" && posicoesOcupadas[4] == "X"  && posicoesOcupadas[8] == "X" ||
        posicoesOcupadas[2] == "X" && posicoesOcupadas[4] == "X"  && posicoesOcupadas[6] == "X"
    ){
        pontosJogador1 ++;
        document.getElementById("PontosJogador1").innerHTML = pontosJogador1.toString();
        document.getElementById("InstrucJogador1").innerHTML = "Você venceu!";
        document.getElementById("InstrucJogador2").innerHTML = "Você perdeu!";
        fimDeJogo = true;
    }
    if(
        posicoesOcupadas[0] == "O" && posicoesOcupadas[1] == "O"  && posicoesOcupadas[2] == "O" ||
        posicoesOcupadas[3] == "O" && posicoesOcupadas[4] == "O"  && posicoesOcupadas[5] == "O" ||
        posicoesOcupadas[6] == "O" && posicoesOcupadas[7] == "O"  && posicoesOcupadas[8] == "O" ||
        posicoesOcupadas[0] == "O" && posicoesOcupadas[3] == "O"  && posicoesOcupadas[6] == "O" ||
        posicoesOcupadas[1] == "O" && posicoesOcupadas[4] == "O"  && posicoesOcupadas[7] == "O" ||
        posicoesOcupadas[2] == "O" && posicoesOcupadas[5] == "O"  && posicoesOcupadas[8] == "O" ||
        posicoesOcupadas[0] == "O" && posicoesOcupadas[4] == "O"  && posicoesOcupadas[8] == "O" ||
        posicoesOcupadas[2] == "O" && posicoesOcupadas[4] == "O"  && posicoesOcupadas[6] == "O"
    ){
        pontosJogador2 ++;
        document.getElementById("PontosJogador2").innerHTML = pontosJogador2.toString();
        document.getElementById("InstrucJogador1").innerHTML = "Você perdeu!";
        document.getElementById("InstrucJogador2").innerHTML = "Você venceu!";
        fimDeJogo = true;
    }


}
//==================================================================================================================
function novaPartida(){
    for (var i = 0; i < 9; i++){
        posicoesOcupadas[i] = "0";
        document.getElementById(i).src = "img/QuadradoCinza.png";

    }
    if(turno == 1){
        document.getElementById("InstrucJogador1").innerHTML = "É sua vez!";
        document.getElementById("InstrucJogador2").innerHTML = "Aguarde";
    }else{
        document.getElementById("InstrucJogador1").innerHTML = "Aguarde";
        document.getElementById("InstrucJogador2").innerHTML = "É sua vez!";        
    }
    fimDeJogo = false;
}
