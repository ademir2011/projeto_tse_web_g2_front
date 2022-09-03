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

interface FieldsProps{
    name: string,
    label: string
}

interface CamposProps extends Array<FieldsProps>{}

interface TableProcessosProps{
    campos: CamposProps,
    items: ArrayProcessos
}

export default function TableProcessos({ campos, items }: TableProcessosProps) {
   
    function createDate(array: any){
        return new Date(array[0], array[1], array[2])
    }


    return (

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
                        onClick={() => {console.log(item)}}>
                            <td className="py-3 px-4">{item.numero}</td>
                            <td className="py-3 px-4">{item.partes}</td>
                            <td className="py-3 px-4">{item.relator}</td>
                            <td className="py-3 px-4">{item.resumo}</td>
                            <td className="py-3 px-4">{
                                DateTime.fromISO(createDate(item.dataCriacao).toISOString()).toFormat('dd/MM/yyyy')
                            }</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        
    )

}