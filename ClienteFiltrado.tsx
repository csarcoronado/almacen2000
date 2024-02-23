import { ClientesPropsModel } from "../../models/clientes/clientes.model"

interface ClienteFiltradoProps {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValueSelect: (value: React.SetStateAction<keyof ClientesPropsModel>) => void
}

const ClienteFiltrado = ({search, onSearch, setValueSelect} : ClienteFiltradoProps) => {
  return (
    <div className="flex gap-3">
    <select className="" onChange={e => setValueSelect(e.target.value  as keyof ClientesPropsModel)}>
      <option value='name'>Buscar por nombre</option>
      <option value='email'>Buscar por email</option>
      <option value='rfc'>Buscar por rfc</option>
      <option value='estado'>Buscar por estado</option>
    </select>
    <input
      className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-1/4 ml-auto"
      placeholder="Búsqueda"
      value={search}
      onChange={onSearch}
    />
  </div>
  )
}

export default ClienteFiltrado