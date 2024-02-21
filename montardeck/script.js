const _cards = document.getElementById('cards')
const _meudeck = document.getElementById('meudeck')
cartas = 0
codigos = []

gerarCartas(1000)

function dado(lados){
    v = Math.floor(Math.random() * lados + 1)
}

function gerarCartas(qtd){

    html = ''
    for (x=0; x<qtd; x++){
        
        // VIDA
        vida = 0
        txtvida = ''
        for(i=0; i<10; i++){
            dado(2)
            if(v==1){
                vida++
                txtvida += '<label>❤</label>'
            }
        }
        if(vida==0){
            vida++
            txtvida += '<label>❤</label>'
        }

        // ATAQUE FÍSICO
        atk = 0
        do{
            dado(6)
            atk++
        }while(v > atk)

        // DEFESA
        def = 0
        do{
            dado(4)
            def++
        }while(v > def)

        // ATAQUE ELEMENTAL
        mgk = 0
        do{
            dado(4)
            mgk++
        }while(v > mgk)

        // ELEMENTO
        dado(2)
        if(v==1){
            cor = '#947a62'
            elm = 'Normal'
            et = 'none'
        }else{
            dado(8)
            if(v != 8){
                elementos = ['Blue','Red', 'Green']
                cores = ['dodgerblue', '#c8524c', '#548235']
            }else{
                elementos = ['Black','White']
                cores = ['#444', '#999']
            }
            cor = cores[Math.floor(Math.random() * cores.length)]
            elm = elementos[cores.indexOf(cor)]
            et = 'flex'
        }
        
        // OLHOS
        dado(8)
        if(v==0){
            o1 = 'center'
            o2 = 'center'
        }else{
            dado(2)
            if(v==1){
                o1 = 'left'
            }else{
                o1 = 'right'
            }
            dado(2)
            if(v==1){
                o2 = 'left'
            }else{
                o2 = 'right'
            }
        }

        // BOCA
        dado(8)
        if(v==0){
            br = '8px'
        }else{
            dado(2)
            if(v==1){
                br = '2px 2px 8px 8px'
            }else{
                br = '8px 8px 2px 2px'
            }
        }

        // ITENS
        itens_mao = ['faca', 'espada', 'escudinho', 'escudo', 'varinha', 'cajado', 'arco', 'veneno', 'bomba']
        itens_cabeca = ['medico', 'padre', 'sortudo', 'ninja', 'corredor']

        mao1 = itens_mao[Math.floor(Math.random() * itens_mao.length)]
        mao2 = itens_mao[Math.floor(Math.random() * itens_mao.length)]
        chapeu = itens_cabeca[Math.floor(Math.random() * itens_cabeca.length)]

        while(elm == 'Normal' && (mao1 == 'varinha' || mao1 == 'cajado')){
            mao1 = itens_mao[Math.floor(Math.random() * itens_mao.length)]
        }
        while(elm == 'Normal' && (mao2 == 'varinha' || mao2 == 'cajado')){
            mao2 = itens_mao[Math.floor(Math.random() * itens_mao.length)]
        }

        // MÃO DIREITA
        dado(6)
        if(v==1){
            m1 = 'block'
        }else{
            m1 = 'none'
        }

        // MÃO ESQUERDA
        dado(6)
        if(v==1){
            m2 = 'block'
        }else{
            m2 = 'none'
        }

        // CHAPÉU
        dado(6)
        if(v==1){
            ch = 'block'
        }else{
            ch = 'none'
        }

        // GERAR CÓDIGO
        codigos.push(vida+'/'+atk+'/'+def+'/'+et+'/'+mgk+'/'+m1+'/'+m2+'/'+mao1+'/'+mao2+'/'+cor+'/'+ch+'/'+chapeu+'/'+o1+'/'+o2+'/'+br)

        // INSERIR UMA CARTA NA LISTA
        html +=
        `<div class="carta" id="carta`+cartas+`" onclick="selecionar(`+cartas+`)">

            <div id="vida">`+vida+`</div>

            <div class="meio">
                <div class="mao" id="mao1" style="display: `+m1+`; background-color: `+cor+`"><div style="background-image: url('img/`+mao1+`.png')"></div></div>
                <div class="personagem" style="background-color:`+cor+`">
                    <div id="chapeu" style="display: `+ch+`; background-image: url('img/`+chapeu+`.png')"></div>
                    <div class="olhos">
                        <div id="olho1" style="justify-content: `+o1+`"><div></div></div>
                        <div id="olho2" style="justify-content: `+o2+`"><div></div></div>
                    </div>
                    <div id="boca" style="border-radius: `+br+`"></div>
                </div>
                <div class="mao" id="mao2" style="display: `+m2+`; background-color: `+cor+`"><div style="background-image: url('img/`+mao2+`.png')"></div></div>
            </div>

            <div class="atributos">
                <div id="ataque">`+atk+`</div>
                <div id="defesa">`+def+`</div>
                <div id="elemento" style="display: `+et+` ;background:`+cor+`">`+mgk+`</div>
            </div>

        </div>`

        cartas++
    }

    // INSERIR LISTA NA DIV
    _cards.innerHTML = html
}

contCartas = 0
function selecionar(i){
    if(document.getElementById('carta'+i).style.border != '8px solid deeppink'){
        if(contCartas < 12){
            contCartas++
            document.getElementById('carta'+i).style.border = '8px solid deeppink'
        }else{
            alert('Deck cheio. Você pode desmarcar cartas.')
        }
        
    }else{
        contCartas--
        document.getElementById('carta'+i).style.border = '8px solid #947a62'
    }
    document.getElementById('contCartas').innerHTML = contCartas
}

function montarDeck(){
    if(contCartas == 12){
        html = ''
        for(i=0; i<cartas; i++){
            if(!(document.getElementById('carta'+i).style.border != '8px solid deeppink')){

                codigo = codigos[i].split('/')
                vida = codigo[0]
                atk = codigo[1]
                def = codigo[2]
                et = codigo[3]
                mgk = codigo[4]
                m1 = codigo[5]
                m2 = codigo[6]
                mao1 = codigo[7]
                mao2 = codigo[8]
                cor = codigo[9]
                ch = codigo[10]
                chapeu = codigo[11]
                o1 = codigo[12]
                o2 = codigo[13]
                br = codigo[14]

                // INSERIR UMA CARTA NA LISTA
                html +=
                `<div class="carta" id="carta`+cartas+`" onclick="selecionar(`+cartas+`)">

                    <div id="vida">`+vida+`</div>

                    <div class="meio">
                        <div class="mao" id="mao1" style="display: `+m1+`; background-color: `+cor+`"><div style="background-image: url('img/`+mao1+`.png')"></div></div>
                        <div class="personagem" style="background-color:`+cor+`">
                            <div id="chapeu" style="display: `+ch+`; background-image: url('img/`+chapeu+`.png')"></div>
                            <div class="olhos">
                                <div id="olho1" style="justify-content: `+o1+`"><div></div></div>
                                <div id="olho2" style="justify-content: `+o2+`"><div></div></div>
                            </div>
                            <div id="boca" style="border-radius: `+br+`"></div>
                        </div>
                        <div class="mao" id="mao2" style="display: `+m2+`; background-color: `+cor+`"><div style="background-image: url('img/`+mao2+`.png')"></div></div>
                    </div>

                    <div class="atributos">
                        <div id="ataque">`+atk+`</div>
                        <div id="defesa">`+def+`</div>
                        <div id="elemento" style="display: `+et+`;background:`+cor+`">`+mgk+`</div>
                    </div>

                </div>`

            }
        }
        _meudeck.innerHTML = html
        converterParaImagem()
        _meudeck.innerHTML = ''
    }else{
        alert('Deck incompleto. '+contCartas+'/12')
    }
}

function converterParaImagem() {
    var divParaConverter = _meudeck

    html2canvas(divParaConverter).then(function(canvas) {
        var imagemConvertida = new Image()
        imagemConvertida.src = canvas.toDataURL("image/png")

        var linkDownload = document.createElement('a')
        linkDownload.href = imagemConvertida.src
        linkDownload.download = 'meu_deck.png'

        document.body.appendChild(linkDownload)
        linkDownload.click()
        document.body.removeChild(linkDownload)
    })
}
