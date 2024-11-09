document.getElementById("abrirfiltro").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("filtros").classList.toggle("show");
    document.getElementById("filtros").classList.toggle("hidden");
  });
  
document.getElementById("resetar-filtros").addEventListener("click", function() {
document.getElementById("filtros").classList.remove("show");
document.getElementById("filtros").classList.add("hidden");
});

document.getElementById("fecharfiltro").addEventListener("click", function(event) {
    fecharFiltro()
})

function fecharFiltro() {
    const filtrosdiv = document.getElementById("filtros")
    filtrosdiv.classList.remove("show")
    filtrosdiv.classList.add("hidden")
    overçla
}