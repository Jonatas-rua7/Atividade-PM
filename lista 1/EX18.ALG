algoritmo "ex18"
var
   salario, parcela : real
inicio
   escreva("Salário: ")
   leia(salario)
   escreva("Valor da parcela: ")
   leia(parcela)
   se (parcela <= salario * 0.30) entao
      escreva("Empréstimo aprovado")
   senao
      escreva("Empréstimo negado")
   fimse
fimalgoritmo
