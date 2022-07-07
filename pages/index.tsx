import { useState } from 'react'
import Botao from '../components/Botao'
import Questao from '../components/Questao'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'

const questaoMock = new QuestaoModel(1,'Melhor cor',[
  RespostaModel.errada('verde'),
  RespostaModel.errada('vermelho'),
  RespostaModel.errada('azul'),
  RespostaModel.certa('amarelo'),
])

export default function Home() {
  const [questao, setQuestao] = useState(questaoMock)

  function respostaFornecida(indice: number) {
    setQuestao(questao.responderCom(indice))
  }

  function tempoEsgotado() {
    if(questao.naoRespondida) setQuestao(questao.responderCom(-1))
  }
  
  return (
    <div style={{display: 'flex',height:'100vh',justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
      <Questao 
      valor={questao} 
      tempoParaResposta={5}
      respostaFornecida={respostaFornecida}
      tempoEsgotado={tempoEsgotado} />
      <Botao texto="Próxima" href='/resultado' />
    </div>
  )
}
