
import { useState, useEffect } from 'react'
import Processos from '../pages/Processos';
import { DateTime } from 'luxon';


interface Processos{
    id: string,
    numero: string,
    partes: string,
    relator: string,
    resumo: string,
    ordem: number,
    dataCriacao: []
}

interface ArrayProcessos extends Array<Processos>{}

interface PautaProps{
    id: string,
    orgaoJudicante: string,
    sistemaPauta: string,
    meioJulgamento: string,
    dataSessao: [],
    dataDivulgacao: [],
    dataPublicacao: [],
    dataCriacao: [],
    processos: ArrayProcessos
}

interface ArrayPautas extends Array<PautaProps>{}

interface FieldsProps{
    name: string,
    label: string
}

interface CamposProps extends Array<FieldsProps>{}

interface TablePautasProps{
    children: never[],
    campos: CamposProps,
    items: ArrayPautas
}


// Componente principal que apresenta as tabelas

export default function TablePautas({ campos, items }: TablePautasProps) {

    // console.log(items)
    const [isPauta, setIsPauta] = useState(true)
    const [isProcesso, setIsProcesso] = useState(false)
    // Lista de processos
    const [processos, setProcessos] = useState<ArrayProcessos>([])
  
    function toggleTableVisibility(processos:ArrayProcessos){
          // Vai mudar o valor booleano 
          setIsPauta(!isPauta)
          setIsProcesso(!isProcesso)
          setProcessos(processos)
    }

    function createDate(array: any){
        return new Date(array[0], array[1], array[2])
    }

    return (

        <>        
        {/* Visualização da tabela de Pautas */}
        {isPauta  &&
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                        <tr>
                            {campos.map( (campo) => (
                                <th key={campo.name} scope="col" className="py-3 px-4">
                                    {campo.label}
                                </th>
                            ))}
                            
                        </tr>
                    </thead>
                    <tbody>
                        {items.map( (item) => (
                            <tr key={item.id} 
                            className="text-sm border border-solid border-b-2 bg-white transition duration-300 ease-in-out hover:bg-gray-100  hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none" 
                            onClick={() => {
                                    console.log(item)
                                    toggleTableVisibility(item.processos)
                                   
                                }}>
                                <td className="py-3 px-4">{item.orgaoJudicante}</td>
                                <td className="py-3 px-4">{item.sistemaPauta}</td>
                                <td className="py-3 px-4">{item.meioJulgamento}</td>
                                <td className="py-3 px-4">{
                                    DateTime.fromISO(createDate(item.dataSessao).toISOString()).toFormat('dd/MM/yyyy')
                                    // item.dataSessao
                                }</td>
                                <td className="py-3 px-4">{
                                    DateTime.fromISO(createDate(item.dataDivulgacao).toISOString()).toFormat('dd/MM/yyyy')
                                    // item.dataDivulgacao
                                }</td>
                                <td className="py-3 px-4">{
                                    DateTime.fromISO(createDate(item.dataPublicacao).toISOString()).toFormat('dd/MM/yyyy')
                                    // item.dataPublicacao
                                }</td>
                                <td className="py-3 px-4">{
                                    DateTime.fromISO(createDate(item.dataCriacao).toISOString()).toFormat('dd/MM/yyyy')
                                    // createDate(item.dataCriacao).toISOString
                                }</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>

            </div>

        }
            {/* Visualização da tabela de Processo */}    
            {isProcesso && <Processos
                processos={processos}
            />}
        </>

    )

}