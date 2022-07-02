import Questao from '../components/Questao'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'
import styles from '../styles/Home.module.css'

export default function Home() {
  const questaoTeste = new QuestaoModel(1,'Melhor cor',[
    RespostaModel.errada('verde'),
    RespostaModel.errada('vermelho'),
    RespostaModel.errada('azul'),
    RespostaModel.certa('amarelo'),
  ])
  
  return (
    <div style={{display: 'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}>
      <Questao valor={questaoTeste} />
    </div>
  )
}
