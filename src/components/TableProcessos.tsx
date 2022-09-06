import { DateTime } from 'luxon';
import { KeyboardEvent, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentMagnifyingGlassIcon, UserGroupIcon } from '@heroicons/react/20/solid'


interface Processos {
    id: string,
    numero: string,
    partes: string,
    relator: string,
    resumo: string,
    ordem: number,
    dataCriacao: []
}

interface ArrayProcessos extends Array<Processos> { }

interface FieldsProps {
    name: string,
    label: string
}

interface CamposProps extends Array<FieldsProps> { }

interface TableProcessosProps {
    campos: CamposProps,
    items: ArrayProcessos
}

export default function TableProcessos({ campos, items }: TableProcessosProps) {

    const [info, setInfo] = useState('')
    let [isOpen, setIsOpen] = useState(true)

    let [isOpenPartes, setIsOpenPartes] = useState(true)


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModalPartes() {
        setIsOpenPartes(false)
    }

    function openModalPartes() {
        setIsOpenPartes(true)
    }

    function myFunctionProcessos(key: KeyboardEvent<HTMLImageElement>) {
        // Declare variables
        let input, filter, table, tr, td, tdPartes, tdRelator, i, txtValue, textPartes, textRelator;
        input = document.getElementById("myInput");
        filter = info.toUpperCase();
        console.log(info)
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        console.log(tr)
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            tdPartes = tr[i].getElementsByTagName("td")[1];
            tdRelator = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                txtValue = txtValue + " " + tdPartes.textContent || tdPartes.innerText;
                txtValue = txtValue + " " + tdRelator.textContent || tdRelator.innerText;
                console.log(txtValue)
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    function createDate(array: any) {
        return new Date(array[0], array[1], array[2])
    }


    return (

        <div className="overflow-x-auto relative">

            <>
                <h3 className="font-medium leading-tight text-5xl m-2 ml-6 text-indigo-500">Lista de Processos</h3>
                <input type="text"
                    id="myInput"
                    className='my-2 w-full rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    onKeyUp={myFunctionProcessos}
                    placeholder="Pesquise pelo número, partes ou relator..."
                    onChange={event => { setInfo(event.target.value) }}
                >

                </input>
            </>

            <table id="myTable" className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                    <tr>
                        {campos.map((campo) => (
                            <th key={campo.name} scope="col" className="py-3 px-4">
                                {campo.label}
                            </th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}
                            className="text-sm border border-solid border-b-2 bg-white transition duration-300 ease-in-out hover:bg-gray-100  hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none"
                            onClick={() => { console.log(item) }}>
                            <td className="py-3 px-4">{item.numero}</td>
                            
                            {/* Partes */}
                            <td className="py-3 px-4">
                            <div className="flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={openModalPartes}
                                        className="relative right-8 rounded-md bg-black bg-opacity-20  text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                    >
                                        <span className="flex rounded-lg bg-indigo-800 p-2 hover:bg-indigo-700">

                                            <UserGroupIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </span>
                                    </button>
                                </div>

                                <Transition appear show={isOpenPartes} as={Fragment}>
                                    <Dialog as="div" className="relative z-10" onClose={closeModalPartes}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                                        </Transition.Child>

                                        <div className="fixed inset-0 overflow-y-auto">
                                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                >
                                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-lg font-medium leading-6 text-gray-900"
                                                        >
                                                            Partes do processo
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                {item.partes}
                                                            </p>
                                                        </div>

                                                        <div className="mt-4">
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={closeModalPartes}
                                                            >
                                                                Fechar
                                                            </button>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                                {/* {item.partes} */}
                                
                            </td>
                            <td className="py-3 px-4">{item.relator}</td>

                            {/*  Resumo*/}
                            <td className="py-3 px-4">

                                <div className="flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={openModal}
                                        className="relative right-8 rounded-md bg-black bg-opacity-20  text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                    >
                                        <span className="flex rounded-lg bg-indigo-800 p-2 hover:bg-indigo-700">

                                            <DocumentMagnifyingGlassIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </span>
                                    </button>
                                </div>

                                <Transition appear show={isOpen} as={Fragment}>
                                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                                        </Transition.Child>

                                        <div className="fixed inset-0 overflow-y-auto">
                                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                >
                                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-lg font-medium leading-6 text-gray-900"
                                                        >
                                                            Resumo
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                {item.resumo}
                                                            </p>
                                                        </div>

                                                        <div className="mt-4">
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={closeModal}
                                                            >
                                                                Fechar
                                                            </button>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>

                                {/* {item.resumo} */}
                            </td>
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