import { useNavigate } from "react-router-dom"
// import { PrivateRoutes } from "../../models/enum/Route"

const ClienteHeader = ( {clienteRef}: {clienteRef: React.RefObject<HTMLDivElement>}) => {
    const navigate = useNavigate()
    const handleNavigate = () =>{
        navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.NUEVO_CLIENTE}`, {replace: true})
       }
  return (
    <div ref={clienteRef} className="flex justify-between items-center border-b-2 border-gray-200 pb-2 mt-5">
    <h2 className="text-xl font-semibold text-gray-700">
      Clientes
    </h2>
    <button onClick={handleNavigate} className="inline-flex items-center justify-center rounded-md text-sm 
    font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-ring focus-visible:ring-offset-2 
    hover:bg-primary/90 h-10 px-4 py-2 bg-green-500 text-white">
      Agregar Clientes
    </button>
  </div>
  )
}

export default ClienteHeader