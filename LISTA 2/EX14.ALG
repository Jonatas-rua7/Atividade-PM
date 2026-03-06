algoritmo "Ex14"
var
   voto, c1, c2, c3, total: inteiro
inicio
   c1 <- 0
   c2 <- 0
   c3 <- 0

   repita
      escreval("1-Cand A | 2-Cand B | 3-Cand C | 0-Fim")
      escreva("Voto: ")
      leia(voto)

      escolha voto
         caso 1
            c1 <- c1 + 1
         caso 2
            c2 <- c2 + 1
         caso 3
            c3 <- c3 + 1
      fimescolha
   ate voto = 0

   total <- c1 + c2 + c3

   se (total > 0) entao
      escreval("Candidato 1: ", c1, " votos (", (c1/total*100):2:1, "%)")
      escreval("Candidato 2: ", c2, " votos (", (c2/total*100):2:1, "%)")
      escreval("Candidato 3: ", c3, " votos (", (c3/total*100):2:1, "%)")

      se (c1 > c2) e (c1 > c3) entao
         escreval("Vencedor: Candidato 1")
      senao
         se (c2 > c1) e (c2 > c3) entao
            escreval("Vencedor: Candidato 2")
         senao
            se (c3 > c1) e (c3 > c2) entao
               escreval("Vencedor: Candidato 3")
            senao
               escreval("Empate!")
            fimse
         fimse
      fimse
   fimse
fimalgoritmo
