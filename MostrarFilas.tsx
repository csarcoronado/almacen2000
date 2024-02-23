const MostrarFilas = ( {setItemShow} :
    {setItemShow: (value: React.SetStateAction<number>) => void}) => {
  return (
    <select className="" onChange={e => setItemShow(Number(e.target.value))}>
    <option value={10}>Mostrar 10 filas</option>
    <option value={7}>Mostrar 7 filas</option>
    <option value={5}>Mostrar 5 filas</option>
    <option value={3}>Mostrar 3 filas</option>
  </select>
  )
}

export default MostrarFilas