stop = document.getElementById('stop')
letras = 'ABCDEFGHIJLMNOPQRSTUV'

function configs(){

    stop.innerHTML = `<div>Configure a partida:</div>
    <div><select id="dificuldade">
        <option value="4">4 categorias</option>
        <option value="6">6 categorias</option>
        <option value="8">8 categorias</option>
        <option value="10">10 categorias</option>
    </select></div>
    <div><select id="segundos">
        <option value="30">30 segundos</option>
        <option value="45">45 segundos</option>
        <option value="60">60 segundos</option>
        <option value="90">90 segundos</option>
    </select></div>
    <div><button onclick="startGame()">Enviar</div>`

}

function startGame(){

    dif = document.getElementById('dificuldade').value
    seg = document.getElementById('segundos').value
    letra = letras[Math.floor(Math.random() * letras.length)]

    todascat = ['Nome','Comida','Profissão','CEP','Filme','Série',
    'Objeto','Marca','Esporte','Aplicativo', 'Animal', 'Jogo']
    categoria = []

    html = `<div><div>Letra sorteada: <label id="letra">`+letra+`</label></div>
            <div id="tempo">0</div></div>
            <div class="entradas">`
    jogo = 1

    for(i=0; i<dif; i++){
        sorteada = Math.floor(Math.random() * todascat.length)
        categoria.push(todascat[sorteada])
        todascat.splice(sorteada, 1)
        html += '<input type="text" id="r'+i+'" placeholder="'+categoria[categoria.length-1]+'">'
    }

    html += '</div><div><button onclick="stopGame()">Stop!</button></div>'

    stop.innerHTML = html

}

function stopGame(){

    respostas = []
    for(i=0; i<dif; i++){
        respostas.push(document.getElementById('r'+i).value.toUpperCase())
    }

    html = '<div style="flex-direction: column;"><h3 style="margin: 0;">Etapa de verificação</h3>Desmarque as erradas:</div><div class="respostas">'
    for(i=0; i<respostas.length; i++){
        if(respostas[i][0] == letra){
            html += '<div><input type="checkbox" id="c'+i+'" checked> '+categoria[i]+': '+respostas[i]+'</div>'
        }else if(respostas[i].length > 0){
            html += '<div><input type="checkbox" id="c'+i+'" disabled> '+categoria[i]+': '+respostas[i]+'</div>'
        }else{
            html += '<div><input type="checkbox" id="c'+i+'" disabled> '+categoria[i]+': ...</div>'
        }
    }
    html += '</div><div><button onclick="validar()">Validar</button></div>'
    stop.innerHTML = html
}

function validar(){

    pts = 0
    for(i=0; i<respostas.length; i++){
        c = document.getElementById('c'+i).checked
        if(c == true){
            pts += 10
        }
    }

    stop.innerHTML = `<div><label>Você marcou <label id="letra">`+pts+`</label> pontos!</label></div>
    <div><button onclick="configs()">Jogar novamente?</button></div>`
}

// RELÓGIO
jogo = false
setInterval(() => {
    if(jogo){

        document.getElementById('tempo').innerHTML = seg
        seg -= 1

        if(seg < 0){
            stopGame()
        }

    }
}, 1000)