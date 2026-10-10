import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

// Carrega a lista de um módulo e recarrega toda vez que a tela volta ao foco
// (por exemplo, depois de salvar no formulário).
export default function useColecao(repositorio) {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(null);

  // Só a requisição mais recente pode atualizar a tela. Evita que uma resposta
  // antiga (ex.: recarga em andamento) desfaça uma exclusão que acabou de ocorrer.
  const ultimaRequisicao = useRef(0);
  const jaTemItens = useRef(false);

  const carregar = useCallback(
    async ({ puxar = false } = {}) => {
      const minha = ++ultimaRequisicao.current;

      if (puxar) {
        setAtualizando(true);
      } else if (!jaTemItens.current) {
        setCarregando(true);
      }

      try {
        const lista = await repositorio.list();
        if (minha !== ultimaRequisicao.current) return;
        jaTemItens.current = lista.length > 0;
        setItens(lista);
        setErro(null);
      } catch (error) {
        if (minha !== ultimaRequisicao.current) return;
        setErro(error.message);
      } finally {
        if (minha === ultimaRequisicao.current) {
          setCarregando(false);
          setAtualizando(false);
        }
      }
    },
    [repositorio]
  );

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  return { itens, carregando, atualizando, erro, carregar };
}
