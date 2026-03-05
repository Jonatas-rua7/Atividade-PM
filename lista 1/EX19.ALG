algoritmo "ex19"
var
   ano : inteiro
inicio
   escreva("Digite o ano: ")
   leia(ano)
   se (ano mod 4 = 0) e (ano mod 100 <> 0) ou (ano mod 400 = 0) entao
      escreva("Ano bissexto")
   senao
      escreva("Não é bissexto")
   fimse
fimalgoritmo
