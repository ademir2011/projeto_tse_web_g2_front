
import { useState, useEffect, KeyboardEvent  } from 'react'
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
    const [info, setInfo] = useState('')
    // Lista de processos
    const [processos, setProcessos] = useState<ArrayProcessos>([])
  
    function toggleTableVisibility(processos:ArrayProcessos){
          // Vai mudar o valor booleano 
          setIsPauta(!isPauta)
          setIsProcesso(!isProcesso)
          setProcessos(processos)
    }

    function myFunction(key: KeyboardEvent<HTMLImageElement>) {
        // Declare variables
        let input, filter, table, tr, td, tdSessao, i, txtValue, textSessao;
        input = document.getElementById("myInput");
        filter = info.toUpperCase();
        console.log(info)
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        
        console.log(tr)
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          tdSessao =  tr[i].getElementsByTagName("td")[3];
          if (td) {
            txtValue = td.textContent || td.innerText;
            txtValue = txtValue + " "+ tdSessao.textContent || tdSessao.innerText
            console.log(txtValue)
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }


    function createDate(array: any){
        return new Date(array[0], array[1], array[2])
    }

    return (

        <>        
        {/* Visualização da tabela de Pautas */}
        {isPauta  &&

           
            


            <div className="overflow-x-auto relative">
                    <>
                    <h3 className="font-medium leading-tight text-5xl m-2 ml-6 text-indigo-500">Lista de Pautas</h3>
                    <input  type="text" 
                        id="myInput" 
                        className='my-2 w-full rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        onKeyUp={myFunction} 
                        placeholder="Pesquise por órgão judicante ou data da sessão..."
                        onChange={event => {setInfo(event.target.value)}}
                        >

                        </input>
                    </>
                
                <table id="myTable" className="w-full text-sm text-left">
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