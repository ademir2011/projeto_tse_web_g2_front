import Header from "../components/Header";
import React, { Fragment, FormEvent, useState, useEffect } from "react";
import { getUserToken, postPauta, getPautas } from '../service/auth.service';
import { Combobox, Transition, RadioGroup } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { DateTime } from 'luxon';
import Loading from '../components/Loagind';


const turmas = [
    { id: 1, name: '1ª Turma' },
    { id: 2, name: '2ª Turma' },
    { id: 3, name: '3ª Turma' },
    { id: 4, name: '4ª Turma' },
    { id: 5, name: '5ª Turma' },
    { id: 6, name: '6ª Turma' },
    { id: 7, name: '7ª Turma' },
    { id: 8, name: '8ª Turma' },
    { id: 9, name: 'Órgão Especial' },
    { id: 10, name: 'Tribunal Pleno' },
    { id: 11, name: 'SDC' },
    { id: 12, name: 'SDI' },
    { id: 13, name: 'SbDI-1' },
    { id: 14, name: 'SbDI-2' }
]

const sistemas = [
    { name: 'TST' },
    { name: 'PJe' }
]

const meios = [
    { name: 'HIBRIDO' },
    { name: 'VIRTUAL' },
    { name: 'PRESENCIAL' }
]

export default function FormJulgamentoPauta() {
    const [selectedTurma, setSelectedTurma] = useState(turmas[0])
    const [selectedSistema, setSelectedSistema] = useState(sistemas[0])
    const [selectedMeio, setSelectedMeio] = useState(meios[0])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState<boolean>(false);


    const filteredPeople =
        query === ''
            ? turmas
            : turmas.filter((turma) =>
                turma.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )


    async function handleCadastroProcesso(event: FormEvent) {

        event.preventDefault()
        setLoading(true);

        // console.log(getUserToken());

        // Pegando as info de data;
        
        const ano = Number(localStorage.getItem("ano"));
        const mes = Number(localStorage.getItem("mes"));
        const dia = Number(localStorage.getItem("dia"));
        const nowDate = new Date()

        localStorage.removeItem("ano");
        localStorage.removeItem("mes");
        localStorage.removeItem("dia");

        const pauta = {
            orgaoJudicante: selectedTurma.name,
            sistemaPauta: selectedSistema.name,
            meioJulgamento: selectedMeio.name,
            dataSessao: new Date(ano, mes, dia),
            dataDivulgacao: new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate()),
            dataPublicacao: new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate())
        }

        console.log(pauta)

        // const response = postPauta(pauta)
        // console.log(response)
        await postPauta(pauta)
            .then(
                (res) => {

                   

                    setLoading(false);
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
            <h3 className="font-medium leading-tight text-5xl m-2 ml-6 text-indigo-500">Cadastro de Pauta</h3>

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
                                                Órgão Judicante
                                            </label>

                                            <Combobox value={selectedTurma} onChange={setSelectedTurma}>
                                                <div className="relative relative mt-1">
                                                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                        <Combobox.Input
                                                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                            displayValue={(turma: any) => turma.name}
                                                            onChange={(turma) => setQuery(turma.target.value)}
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
                                                                filteredPeople.map((person) => (
                                                                    <Combobox.Option
                                                                        key={person.id}
                                                                        className={({ active }) =>
                                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                                            }`
                                                                        }
                                                                        value={person}
                                                                    >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                                <span
                                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                        }`}
                                                                                >
                                                                                    {person.name}
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
                                            <label htmlFor="sistema" className="block text-sm font-medium text-gray-700">
                                                Sistema de Pauta
                                            </label>
                                            <RadioGroup className="flex flex-col w-full" value={selectedSistema} onChange={setSelectedSistema}>
                                                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                                <div className="flex items-center">
                                                    {sistemas.map((sistema) => (
                                                        <RadioGroup.Option
                                                            key={sistema.name}
                                                            value={sistema}
                                                            className={({ active, checked }) =>
                                                                `${active
                                                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                                                    : ''
                                                                }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                                                }
                    relative flex mr-4 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                                            }
                                                        >
                                                            {({ active, checked }) => (
                                                                <>
                                                                    <div className="flex w-auto items-center justify-between">
                                                                        <div className="flex items-center">
                                                                            <div className="text-sm">
                                                                                <RadioGroup.Label
                                                                                    as="p"
                                                                                    className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                                        }`}
                                                                                >
                                                                                    {sistema.name}
                                                                                </RadioGroup.Label>

                                                                            </div>
                                                                        </div>
                                                                        {checked && (
                                                                            <div className="shrink-0 text-white">
                                                                                <CheckIcon className="h-6 w-6" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>



                                        <div className="lg:col-span-4 col-span-4 sm:col-span-4">
                                            <label htmlFor="meioJulgamento" className="block text-sm font-medium text-gray-700">
                                                Meio de Julgamento
                                            </label>
                                            <RadioGroup className="flex flex-col w-full" value={selectedMeio} onChange={setSelectedMeio}>
                                                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                                <div className="flex items-center">
                                                    {meios.map((meio) => (
                                                        <RadioGroup.Option
                                                            key={meio.name}
                                                            value={meio}
                                                            className={({ active, checked }) =>
                                                                `${active
                                                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                                                    : ''
                                                                }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                                                }
                    relative flex mr-4 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                                            }
                                                        >
                                                            {({ active, checked }) => (
                                                                <>
                                                                    <div className="flex w-auto items-center justify-between">
                                                                        <div className="flex items-center">
                                                                            <div className="text-sm">
                                                                                <RadioGroup.Label
                                                                                    as="p"
                                                                                    className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                                        }`}
                                                                                >
                                                                                    {meio.name}
                                                                                </RadioGroup.Label>

                                                                            </div>
                                                                        </div>
                                                                        {checked && (
                                                                            <div className="shrink-0 text-white">
                                                                                <CheckIcon className="h-6 w-6" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>


                                    </div>
                                </div>
                                <div className="mt-40 bg-gray-50 px-4 py-3 text-right sm:px-6">
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
                                        Cadastrar
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

    )
}