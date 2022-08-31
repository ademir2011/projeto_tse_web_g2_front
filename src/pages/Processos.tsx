

// Apresentar os processos via tabela

import TableProcessos from "../components/TableProcessos"


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

interface ProcessoProps{
   
    processos: ArrayProcessos
}

export default function Processos({processos}: ProcessoProps){

    const fieldsTable = [
        {name: 'numero', label: 'Número' },
        {name: 'partes', label: 'Partes' },
        {name: 'relator', label: 'Meio de Julgamento' },
        {name: 'resumo', label: 'Data de Sessão' },
        {name: 'dataCriacao', label: 'Data Divulgação' }
        
    ]

    return (
        <TableProcessos
            campos={fieldsTable}
            items={processos}
        />
    )

}