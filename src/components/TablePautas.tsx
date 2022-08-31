
import { useState } from 'react'
import Processos from '../pages/Processos';
import { DateTime } from 'luxon';

interface Processos{
    id: string,
    numero: string,
    partes: string,
    relator: string,
    resumo: string,
    ordem: number,
    dataCriacao: string
}

interface ArrayProcessos extends Array<Processos>{}

interface PautaProps{
    id: string,
    orgaoJudicante: string,
    sistemaPauta: string,
    meioJulgamento: string,
    dataSessao: string,
    dataDivulgacao: string,
    dataPublicacao: string,
    dataCriacao: string,
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

export default function TablePautas({ campos, items }: TablePautasProps) {

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
                                    DateTime.fromISO(item.dataSessao).toFormat('dd/MM/yyyy')
                                }</td>
                                <td className="py-3 px-4">{
                                    DateTime.fromISO(item.dataDivulgacao).toFormat('dd/MM/yyyy')
                                }</td>
                                <td className="py-3 px-4">{
                                    DateTime.fromISO(item.dataPublicacao).toFormat('dd/MM/yyyy')
                                }</td>
                                <td className="py-3 px-4">{
                                    DateTime.fromISO(item.dataCriacao).toFormat('dd/MM/yyyy')
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