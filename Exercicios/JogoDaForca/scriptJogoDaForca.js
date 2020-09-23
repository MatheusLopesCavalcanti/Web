var palavra = "HOMEMARANHA"; 
var erros = 0;
var pontos = 0;
var quantidadeLetrasUtilizadas = 0;
var letraJaUtilizada = false;
var letraPresente = false;
var fimDeJogo = false;

var palavraMisteriosa;
var posicaoBarrasTextoPalavra = [];
var letrasSelecionadas = [];

//==================================================================================================================

function start(letra)
{
    palavra = "HOMEMARANHA";
    erros = 0;
    pontos = 0;
    quantidadeLetrasUtilizadas = 0;
    fimDeJogo = false;

    palavraMisteriosa = document.getElementById("textoPalavra").innerHTML;

    //Cria um vetor que salvará as posições na palavra misteriosa correspondente aos espaços a serem preenchidos
    for(var i = 0; i < palavraMisteriosa.length; i++){
        if(palavraMisteriosa[i].toString() == "_"){ 
            posicaoBarrasTextoPalavra.push(i);
        }
    }
    
}

//==================================================================================================================

function jogada(letra)
{  

    if(fimDeJogo == false){

        apagarBotao(letra);

        letraJaUtilizada = false;
        
        //Identificar se letra já foi selecionada. Do contrário, adicionar à lista de letras já selecionadas.
        if(quantidadeLetrasUtilizadas == 0){
            letrasSelecionadas.push(letra);
            quantidadeLetrasUtilizadas ++;
        }else{
            for(var k = 0; k < letrasSelecionadas.length; k++){
                if(letrasSelecionadas[k].toString() == letra.toString()){
                    letraJaUtilizada = true;
                    break;
                }else{
                    letraJaUtilizada = false;
                }
            }
        }


        //Identificar se letra presente na palavra misteriosa
        if(letraJaUtilizada == false){
            letrasSelecionadas.push(letra);
            
            letraPresente = false;
        
            for(var i = 0; i < palavra.length; i++){
                if(palavra[i].toString() == letra.toString()){
                    letraPresente = true;
                    adicionarLetra(letra, i);
                }
            }
        
            if(letraPresente == false){
                errar();
            }

        }
    }
           
}

//==================================================================================================================

function apagarBotao(letra){
    document.getElementById(letra).innerHTML = "";
}

//==================================================================================================================

//Se jogador acertou letra
function adicionarLetra( letra, i){

    pontos ++;

    //Transferir caracteres de Palavra Misteriosa para vetor, apenas alterando a letra selecionada
    var editandoPalavra = [];
    for(var j = 0; j < palavraMisteriosa.length; j++){
        if( j == posicaoBarrasTextoPalavra[i]){
            editandoPalavra.push(letra);
        }else{
            editandoPalavra.push(palavraMisteriosa[j]);
        }
        
    }

    //Alterar palavra misteriosa de acordo com vetor editado 
    palavraMisteriosa = editandoPalavra.join("");
    document.getElementById("textoPalavra").innerHTML = palavraMisteriosa;

    if(pontos == palavra.length){
        alert("Venceu");
        fimDeJogo = true;
    }

}

//==================================================================================================================

//Se jogador errou letra
function errar(){
    erros += 1;

    //Alterar imagem forca
    var imgForca = document.getElementById("imagemForca");
    var nomeImagem = "img/Forca" + erros.toString() + ".png";
    imgForca.src = nomeImagem;

    if(erros == 7){
        alert("Perdeu!");
        fimDeJogo = true;
    }
}