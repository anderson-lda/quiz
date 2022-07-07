import { useState } from 'react'
import Botao from '../components/Botao'
import Questao from '../components/Questao'
import Questionario from '../components/Questionario'
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

  function questaoRespondida(questao: QuestaoModel){

  }

  function irParaProximoPasso(){

  }
  
  return (
    <div style={{display: 'flex',height:'100vh',justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
      <Questionario 
      questao={questao}
      ultima={false}
      questaoRespondida={questaoRespondida} 
      irParaProximoPasso={irParaProximoPasso} />
    </div>
  )
}
