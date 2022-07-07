import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import { useRouter } from 'next/router'

//mesma porta back e front, logo não há preocupação com CORS
const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsDasQuestoes(){ //com async e await não é preciso trabalhar com promises abaixo
    const resp = await fetch(`${BASE_URL}/questionario`) //fetch está disponível nos browsers e faz chamadas http para o servidor; outra opção seria o axios
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(idQuestao:number){ 
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`) 
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(()=>{
    carregarIdsDasQuestoes()
  },[])

  useEffect(()=>{
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  },[idsDasQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta(){
    if(questao){
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
    }
  }

  function irParaProximoPasso(){
    const proximoId = idProximaPergunta()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoId: number){
    carregarQuestao(proximoId)
  }

  function finalizar(){
    router.push({
      pathname: "/resultado",
      query:{
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }
  
  return (
      <Questionario 
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida} 
      irParaProximoPasso={irParaProximoPasso} />
  )
}
