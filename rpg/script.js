function enviarFicha(){
    nome = document.getElementById('nome').value
    forc = parseInt(document.getElementById('for').value)
    des = parseInt(document.getElementById('des').value)
    con = parseInt(document.getElementById('con').value)
    int = parseInt(document.getElementById('int').value)
    car = parseInt(document.getElementById('car').value)
    arma = document.getElementById('arma').value
    foto = document.getElementById('foto').value

    nivel = 1
    vida = 10 + nivel + (con*5)
    armadura = 10 + nivel + des

    fichaValida = true

    if( nome.length < 2 || nome.length > 10 ){
        alert('Nome inválido. (Entre 2 a 10 caracteres)')
        fichaValida = false
    }

    if( isNaN(forc) || isNaN(des) || isNaN(con) || isNaN(int) || isNaN(car)){
        alert('Preencha TODOS os atributos.')
        fichaValida = false
    }

    somaAtributos = forc+des+con+int+car
    if( somaAtributos > 8 ){
        alert('Você ultrapassou o limite colocando '+somaAtributos+' pontos.')
        fichaValida = false
    }

    if( fichaValida == true ){

        document.getElementById('ficha').style.display = 'none'
        document.getElementById('fichapronta').style.display = 'block'

        document.getElementById('nomeficha').innerHTML = nome
        document.getElementById('infoficha').innerHTML = 'Arma: '+arma+'<br>Vida: '+vida+'<br>Armadura: '+armadura
        document.getElementById('fotoficha').src = foto
        document.getElementById('atributosficha').innerHTML = 'Força: '+forc+' | Destreza: '+des+' | Constituição: '+con+' | Inteligencia: '+int+' | Carisma: '+car
    }

}