import TablePautas from "../components/TablePautas"
import { useState, useEffect } from 'react'
import {api} from '../service/api';
import {getPautas} from '../service/auth.service'

// Apresentar as pautas via tabela

export default function Pautas(){

    const [pautas, setPautas] = useState<any>([])


    const fieldsTable = [
        {name: 'orgao', label: 'Órgão Judicante' },
        {name: 'sistema', label: 'Sistema' },
        {name: 'meio', label: 'Meio de Julgamento' },
        {name: 'data_sessao', label: 'Data de Sessão' },
        {name: 'data_divulgacao', label: 'Data Divulgação' },
        {name: 'data_publicacao', label: 'Data Publicação' },
        {name: 'data_criacao', label: 'Data de Criação',  },
    ]

    const example =  [ {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        orgaoJudicante: "string",
        sistemaPauta: "TST",
        meioJulgamento: "HIBRIDO",
        dataSessao: "2022-08-30T10:33:20.866Z",
        dataDivulgacao: "2022-08-30T10:33:20.866Z",
        dataPublicacao: "2022-08-30T10:33:20.866Z",
        dataCriacao: "2022-08-30T10:33:20.866Z",
        processos: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            numero: "string",
            partes: "string",
            relator: "string",
            resumo: "string",
            ordem: 0,
            dataCriacao: "2022-08-30T10:33:20.866Z"
          }
        ]
      }]

      useEffect(() => {
        async function carregarDados(){
          const response = await getPautas();
          // console.log(response)
          setPautas(response)
        }
        
        carregarDados()
        .catch(console.error)
        //console.log("Teste")
      }, [])

      return (
        <>
            <TablePautas 
              campos={fieldsTable}
              items={pautas}
            >

            </TablePautas>
        </>
      )
}