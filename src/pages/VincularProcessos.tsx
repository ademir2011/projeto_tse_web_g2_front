import { SortableItemProps, SortableItem, SortableList, ItemRenderProps } from '@thaddeusjiang/react-sortable-list'
import { Fragment, useEffect, useState, FormEvent } from 'react'
import Header from "../components/Header";
import { Combobox, Transition, RadioGroup } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, ArrowsUpDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import { DateTime } from 'luxon';

import { getProcessosSemVinculo, getPautaId, postVinculacaoListPauta, desvincularProcesso } from '../service/auth.service'

import Loading from '../components/Loagind';


export default function VincularProcesso() {

    const [selectedProcesso, setSelectedProcesso] = useState<any>({})
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState<boolean>(false);
    const [processos, setProcessos] = useState([])
    const [removerProcessoSelecionado, setRemoverProcessoSelecionado] = useState<any>({})
    const [pauta, setPauta] = useState<any>([])
    const [isPauta, setIsPauta] = useState(false)
    const [numero, setNumero] = useState('');


    // processos selecionado 
    const [items, setItems] = useState<SortableItemProps[]>([

    ]);



    useEffect(() => {
        async function carregarDados() {
            const response = await getProcessosSemVinculo();
            // console.log(response)
            setProcessos(response)
            // Pegando o processo
            let id: any;
            id = JSON.parse(String(localStorage.getItem("idPauta")));
            const responsePauta = await getPautaId(id)
            console.log(responsePauta)
            setPauta(responsePauta)
            setIsPauta(true)
            // localStorage.removeItem("idPauta")
            const { processos } = responsePauta
            processos.sort(function (a: any, b: any) {
                return a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0;
            });
            setItems(processos)
            // ordenando itens



        }
        // Verificar se já carregou uma vez

        carregarDados()
            .catch(console.error)
        //console.log("Teste")
    }, [])

    function createDate(array: any) {
        if (array) {
            return new Date(array[0], array[1], array[2])
        }
        return
    }

    // adcionar processos selecionado
    function adicionarProcesso(e: FormEvent) {
        e.preventDefault()
        if (selectedProcesso.numero) {
            // copiando processos selecionados
            let listProcesso = [...items]
            listProcesso.push(selectedProcesso)
            // items.push(selectedProcesso)
            setItems(listProcesso)

            // removendo o processo selecionado
            let processosSemVinculo = [...processos]
            processosSemVinculo = processosSemVinculo.filter((processo: any) => processo.id != selectedProcesso.id);
            console.log(processosSemVinculo)
            setProcessos(processosSemVinculo);
        }

        setSelectedProcesso({})

    }




    // remover processo da pauta
    async function removerProcesso(event: FormEvent) {
        event.preventDefault()

        let pro: any
        pro = items.filter((processo: any) => processo.numero === numero.toString());

        console.log(numero.toString())
        console.log(pro)

        if (pro[0].id) {
            const response = await desvincularProcesso(pauta, pro[0])
            // console.log(response)
            window.history.pushState("", "", "/cadastros");
            window.location.reload();
        }

        setNumero('')
    }

    const filteredPeople =
        query === ''
            ? processos
            : processos.filter((processo: any) =>
                processo.numero
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )


    async function handleCadastroProcesso(event: FormEvent) {

        event.preventDefault()
        setLoading(true);


        console.log(pauta)
        console.log(items)

        // const response = postVinculacaoListPauta(pauta, items)
        // console.log(response)
        // vinculando os processos
        await postVinculacaoListPauta(pauta, items)
            .then(
                (res) => {
                    console.log(res)
                    setLoading(false);
                    localStorage.removeItem("idPauta")
                    window.history.pushState("", "", "/cadastros");
                    window.location.reload();
                },
                (error) => {
                    console.log(error)
                    setLoading(false);
                }
            )

    }



    return (

        <>

            <Header logado={true} />
            <h3 className="font-medium leading-tight text-5xl m-2 ml-6 text-indigo-500">
                Vincular processos a pauta da {pauta.orgaoJudicante} - <span> </span>
                {isPauta && DateTime.fromISO(createDate(pauta.dataSessao).toISOString()).toFormat('dd/MM/yyyy')}
            </h3>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>

            <div className=" mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">

                    <div className="mt-5 md:col-span-3 md:mt-0">
                        <form action="#" method="POST">
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="lg:col-span-1 col-span-4 sm:col-span-4">
                                            <label htmlFor="orgao" className="block text-sm font-medium text-gray-700">
                                                Processos à vincular
                                            </label>

                                            <Combobox value={selectedProcesso} onChange={setSelectedProcesso}>
                                                <div className="relative relative mt-1">
                                                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                        <Combobox.Input
                                                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                            displayValue={(processo: any) => processo.numero}
                                                            onChange={(processo) => setQuery(processo.target.value)}
                                                        />
                                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </Combobox.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                        afterLeave={() => setQuery('')}
                                                    >
                                                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {filteredPeople.length === 0 && query !== '' ? (
                                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                    Não encontrado.
                                                                </div>
                                                            ) : (
                                                                filteredPeople.map((processo: any) => (
                                                                    <Combobox.Option
                                                                        key={processo.id}
                                                                        className={({ active }) =>
                                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                                            }`
                                                                        }
                                                                        value={processo}
                                                                    >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                                <span
                                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                        }`}
                                                                                >
                                                                                    {processo.numero}
                                                                                </span>
                                                                                {selected ? (
                                                                                    <span
                                                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                                            }`}
                                                                                    >
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Combobox.Option>
                                                                ))
                                                            )}
                                                        </Combobox.Options>
                                                    </Transition>
                                                </div>
                                            </Combobox>

                                        </div>


                                        <div className="lg:col-span-1 col-span-4 sm:col-span-4">

                                            <button
                                                type="submit"
                                                className=" mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={adicionarProcesso}
                                            >

                                                Adicionar
                                            </button>


                                        </div>


                                        <div className="lg:col-span-2 col-span-4 sm:col-span-4">
                                            <label htmlFor="processos" className="block text-sm font-medium text-gray-700">
                                                Processos vinculados
                                            </label>


                                            < SortableList
                                                items={items}
                                                setItems={setItems}
                                                itemRender={({ item }: ItemRenderProps) => (
                                                    <div className="flex items-center justify-start rounded-lg w-1/2 h-10 m-2 text-white bg-indigo-700 text-center" >
                                                        <span className="ml-1  flex rounded-lg bg-indigo-700 p-2 hover:bg-indigo-600">

                                                            <ArrowsUpDownIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                                        </span>

                                                        {item.numero}

                                                    </div >
                                                )}
                                            />


                                        </div>


                                        <div className="lg:col-span-1 col-span-6 sm:col-span-3">
                                            <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                                                Excluir processo da pauta
                                            </label>
                                            <input
                                                type="text"
                                                placeholder='Digite o número'
                                                name="numero"
                                                id="numero"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                onChange={event => { setNumero(event.target.value) }}
                                            />
                                        </div>

                                        <div className="lg:col-span-1 col-span-4 sm:col-span-4">

                                            <button
                                                type="submit"
                                                className=" mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={removerProcesso}
                                            >

                                                Excluir
                                            </button>


                                        </div>




                                    </div>
                                </div>
                                <div className="mt-20 bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={handleCadastroProcesso}
                                        disabled={loading}
                                    >
                                        {/* ícone de loading */}
                                        {loading && (
                                            <Loading />
                                        )}
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>

        </>





        // <div>



        //     <Header logado={true} />
        //     <h3 className="font-medium leading-tight text-5xl m-2 ml-6 text-indigo-500">Vincular processos a pauta xx</h3>

        //     <div className="hidden sm:block" aria-hidden="true">
        //         <div className="py-5">
        //             <div className="border-t border-gray-200" />
        //         </div>
        //     </div>






        //     <button onClick={teste}>Ok</button>




        //     < SortableList
        //         items={items}
        //         setItems={setItems}
        //         itemRender={({ item }: ItemRenderProps) => (
        //             <div className="w-1/2 h-10 m-8 bg-blue-400 text-center" >
        //                 {item.name}
        //             </div >
        //         )}
        //     />

        // </div>

    );
}
