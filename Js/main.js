const formulario = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

// Percorre a lista(const:itens) que armazena o local-storage criando elementos já armazenados 
itens.forEach( (elemento) => {
    criaElemento(elemento)
});

// Ao envio do formulário define se o elemento já existe ou não 
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    
    const nome = evento.target.elements.nome
    const quantidade = evento.target.elements.quantidade
    const existe = itens.find( elemento => elemento.nome === nome.value)
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }

    if (existe) {
        const posicao = itens.findIndex(elemento => elemento.id === existe.id)

        itemAtual.id = existe.id
        itens[posicao] = itemAtual
        atualizaElemento(itemAtual, posicao) 
    } else {
        itemAtual.id = itens.findLast(elemento => elemento) ? itens.findLast(elemento => elemento).id + 1 : 0;
        itens.push(itemAtual)
        criaElemento(itemAtual)
    }
    
    localStorage.setItem("itens", JSON.stringify(itens))
    nome.value = ""   
    quantidade.value = ""
})  

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")
    
    const novoNumero = document.createElement("strong")

    novoNumero.dataset.id = item.id
    novoNumero.innerHTML = item.quantidade

    novoItem.appendChild(novoNumero)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(criaBotao(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item, posicao) {    
    const todosItens = document.querySelectorAll(`[data-id]`)

    todosItens[posicao].innerText = item.quantidade
}

function criaBotao(id) {
    const botaoDeleta = document.createElement('button')

    botaoDeleta.classList.add("botaoDeleta")
    botaoDeleta.innerText = "X";

    botaoDeleta.addEventListener('click', function(){
        deletaElemento(this.parentNode, id)
    })

    return botaoDeleta
}

function deletaElemento(tag, id) {
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}
