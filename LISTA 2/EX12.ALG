algoritmo "Ex12"
var
   idade, soma, cont, maiores, menores: inteiro
   media, percMenores: real
inicio
   soma <- 0
   cont <- 0
   maiores <- 0
   menores <- 0

   escreva("Digite a idade (0 para sair): ")
   leia(idade)

   enquanto (idade <> 0) faca
      soma <- soma + idade
      cont <- cont + 1

      se (idade >= 18) entao
         maiores <- maiores + 1
      senao
         menores <- menores + 1
      fimse

      escreva("Digite a próxima idade: ")
      leia(idade)
   fimenquanto

   se (cont > 0) entao
      media <- soma / cont
      percMenores <- (menores / cont) * 100
      escreval("Média das idades: ", media:2:1)
      escreval("Maiores de 18: ", maiores)
      escreval("Percentual de menores: ", percMenores:2:1, "%")
   fimse
fimalgoritmo
