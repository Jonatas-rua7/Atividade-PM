algoritmo "Ex17"
var
   i, ap, rec, rep: inteiro
   media: real
inicio
   ap <- 0
   rec <- 0
   rep <- 0

   para i de 1 ate 20 faca
      escreva("Média do aluno ", i, ": ")
      leia(media)

      se (media >= 7) entao
         ap <- ap + 1
      senao
         se (media >= 5) entao
            rec <- rec + 1
         senao
            rep <- rep + 1
         fimse
      fimse
   fimpara

   escreval("Aprovados: ", (ap/20*100):2:1, "%")
   escreval("Recuperação: ", (rec/20*100):2:1, "%")
   escreval("Reprovados: ", (rep/20*100):2:1, "%")
fimalgoritmo
