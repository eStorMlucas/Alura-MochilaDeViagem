const formulario = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    
    const nome = evento.target.elements.nome
    const quantidade = evento.target.elements.quantidade
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    itens.push(itemAtual)

    localStorage.setItem("itens", JSON.stringify(itens))

    criaElemento(itemAtual)

    nome.value = ""   
    quantidade.value = ""
})  

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const novoNumero = document.createElement("strong")
    novoNumero.innerHTML = item.quantidade

    novoItem.appendChild(novoNumero)
    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)

}