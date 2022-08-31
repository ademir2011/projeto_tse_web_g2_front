import Header from "../components/Header";


export default function FormProcesso(){
    return (
        <>
        
        
            <Header/>
            
            <h1 className="font-medium leading-tight text-5xl m-2 ml-6 text-indigo-500">Cadastro de Processo</h1>



          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
    
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              
              <div className="mt-5 md:col-span-3 md:mt-0">
                <form action="#" method="POST">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="lg:col-span-1 col-span-6 sm:col-span-3">
                          <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                            Número do Processo
                          </label>
                          <input
                            type="text"
                            name="numero"
                            id="numero"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
    
                        <div className="lg:col-span-5 col-span-6 sm:col-span-3">
                          <label htmlFor="partes" className="block text-sm font-medium text-gray-700">
                            Partes Interessadas
                          </label>
                          <input
                            type="text"
                            name="partes"
                            id="partes"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
    
                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="relator" className="block text-sm font-medium text-gray-700">
                            Relator
                          </label>
                          <input
                            type="text"
                            name="relator"
                            id="relator"
                            // autoComplete="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="lg:col-span-5 col-span-6 sm:col-span-4">
                          <label htmlFor="resumo" className="block text-sm font-medium text-gray-700">
                            Resumo
                          </label>
                          <textarea
                            name="resumo"
                            id="resumo"
                            // autoComplete="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
    
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
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