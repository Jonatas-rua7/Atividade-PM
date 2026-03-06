algoritmo "Ex11"
var
   valor, bruto, descontos: real
inicio
   bruto <- 0
   descontos <- 0
   escreva("Digite o valor da compra (0 para sair): ")
   leia(valor)

   enquanto (valor <> 0) faca
      bruto <- bruto + valor
      se (valor > 100) entao
         descontos <- descontos + (valor * 0.05)
      fimse
      escreva("Digite o próximo valor: ")
      leia(valor)
   fimenquanto

   escreval("Faturamento bruto: R$ ", bruto:2:2)
   escreval("Total de descontos: R$ ", descontos:2:2)
   escreval("Faturamento líquido: R$ ", (bruto - descontos):2:2)
fimalgoritmo
