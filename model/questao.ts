import { embaralhar } from "../functions/arrays"
import RespostaModel from "./resposta"

export default class QuestaoModel{
    #id: number //# é equivalente a private no ecmascript
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean

    constructor(id: number, enunciado: string, respostas: RespostaModel[],acertou=false){
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id(){
        return this.#id
    }

    get enunciado(){
        return this.#enunciado
    }

    get respostas(){
        return this.#respostas
    }

    get acertou(){
        return this.#acertou
    }

    get naoRespondida(){
        return !this.respondida
    }

    get respondida(){
        for(let resposta of this.#respostas){
            if(resposta.revelada) return true
        }
        return false
    }

    embaralharRespostas(): QuestaoModel{
        let respostasEmbaralhadas = embaralhar(this.#respostas)
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    responderCom(indice: number):QuestaoModel{
        const acertou = this.#respostas[indice]?.certa//? nao chama se for undefined
        const respostas = this.#respostas.map((resposta, i)=>{
            const respostaSelecionada = indice === i
            const deveRevelar  = respostaSelecionada || resposta.certa
            return deveRevelar ? resposta.revelar() : resposta
        })    
        return new QuestaoModel(this.id,this.enunciado,respostas,acertou)//peguei diretamente mas poderia ser #id
    }

    paraObjeto(){
        return {
            id: this.#id, 
            enunciado: this.#enunciado,
            respostas: this.#respostas.map(resp=>resp.paraObjeto()),
            respondida: this.respondida,
            acertou: this.#acertou
        }
    }
}