algoritmo "Ex8"
var
   i: inteiro
   vendas, bonus: real

inicio
   para i de 1 ate 10 faca
      escreva("Vendedor ", i, " - Total vendido: ")
      leia(vendas)

      se (vendas >= 5000) entao
         bonus <- vendas * 0.10
      senao
         bonus <- vendas * 0.05
      fimse

      escreval("Bônus recebido: R$ ", bonus:2:2)
      escreval("---")
   fimpara
fimalgoritmo
