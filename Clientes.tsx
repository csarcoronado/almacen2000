import './estilos.css'
import { Link } from 'react-router-dom'
// import './clientes.css'
// import { ClientesPropsModel } from "../../models/clientes/clientes.model";
// import Cliente from "./Cliente";
// import useScreenSize from "../../hooks/useScreenSize";
// import CustomDropdown from './CustomDropdown';
// import ClientePagination from "./ClientePagination";
// import { IoReturnUpBack } from "react-icons/io5";
// import { useTablaFiltro } from "../../hooks/useTablaFiltro";
// import { useHeightTabla } from '../../hooks/useHeightTabla';
// import ClienteHeader from './ClienteHeader';
import { BsPlus } from "react-icons/bs";
// import ClienteFiltrado from './ClienteFiltrado';
// import MostrarFilas from './MostrarFilas';
import { CiEdit } from "react-icons/ci";
// import { TiArrowSortedDown } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { useState,useEffect } from 'react';
import Input from '../componentesjesus/input';
import CustomDropdown from './CustomDropdown';
import { nuevoProducto } from '../interfaces/InterfacesAlmacen';
const iva = 0.16;
const Clientes = () => {    {/*{clientes}: {clientes: ClientesPropsModel[]}*/}
// const {width} = useScreenSize() 
// const name: keyof ClientesPropsModel = 'name'
const [itemShow, setItemShow] = useState(10);
// const {clienteRef, botonRef, filtradoRef, theadRefs, tablaMedida} = useHeightTabla()
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      useEffect(() => {
        // Agregar un listener para el evento de cambio de tamaño de la ventana
        window.addEventListener('resize', handleResize);
        // Limpiar el listener cuando el componente se desmonta
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
  

  const [fecha,setFecha] = useState('');
  const [producto, setProducto] = useState('');
  const [folio, setFolio] = useState('');
  const [minimo, setMinimo] = useState('');
  const [maximo, setMaximo] = useState('');
  const [existencias, setExistencias] = useState('');
  const [subtotal, setSubtotal] = useState('');
  const [datosTabla, setDatosTabla] = useState<nuevoProducto[]>([]);
  const [fechaEdit,setFechaEdit] = useState('');
  const [productoEdit, setProductoEdit] = useState('');
  const [folioEdit, setFolioEdit] = useState('');
  const [minimoEdit, setMinimoEdit] = useState('');
  const [maximoEdit, setMaximoEdit] = useState('');
  const [existenciasEdit, setExistenciasEdit] = useState('');
  const [subtotalEdit, setSubtotalEdit] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value);
  setCurrentPage(1); 
  }
  const [valueSelect, setValueSelect] = useState<keyof nuevoProducto>('producto')

  const filteredProducts = datosTabla.filter((producto) => {
  return producto[valueSelect]?.toString()?.toLowerCase()?.includes(searchTerm.toLowerCase());
   }

   );
   const indexOfLastItem = currentPage * itemShow;
   const indexOfFirstItem = indexOfLastItem - itemShow;
   const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAgregar = () => {
    // Verificar si todos los campos obligatorios están llenos
    if (!producto || !folio || !minimo || !maximo || !existencias || !subtotal) {
      // Mostrar un mensaje de error o realizar alguna acción si falta algún campo obligatorio
      alert('No completo todos los campos, intentelo de nuevo');
      return; // Salir de la función sin agregar los datos
    }
   // Crear un objeto con los datos del producto
   const nuevoProducto = {
    producto,
    folio,
    minimo,
    maximo,
    existencias,
    subtotal
  };

  // Agregar el nuevo producto a la lista de datos de la tabla
  setDatosTabla([...datosTabla, nuevoProducto]);

  // Limpiar los campos de entrada después de agregar los datos
  setFecha('');
  setProducto('');
  setFolio('');
  setMinimo('');
  setMaximo('');
  setExistencias('');
  setSubtotal('');
    // Aquí puedes realizar cualquier otra validación necesaria antes de agregar los datos
  
    // Si todos los campos están llenos, puedes agregar los datos a la tabla o realizar cualquier otra acción necesaria
    // Por ejemplo, puedes agregar los datos a un arreglo que luego se utilizará para renderizar la tabla
  };

  const guardarCambios = () => {
    if (editandoIndex !== null) {
      const nuevosDatos = [...datosTabla];
      nuevosDatos[editandoIndex] = {
        ...nuevosDatos[editandoIndex],
        fecha: fechaEdit,
        producto: productoEdit,
        folio: folioEdit,
        minimo: minimoEdit,
        maximo: maximoEdit,
        existencias: existenciasEdit,
        subtotal: subtotalEdit
      };
      setDatosTabla(nuevosDatos);
      setEditandoIndex(null);
    }
  };

  const abrirModalEdicion = (index) => {
    const productoEdit = datosTabla[index];
    setFechaEdit(productoEdit.fecha);
    setProductoEdit(productoEdit.producto);
    setFolioEdit(productoEdit.folio);
    setMinimoEdit(productoEdit.minimo);
    setMaximoEdit(productoEdit.maximo);
    setExistenciasEdit(productoEdit.existencias);
    setSubtotalEdit(productoEdit.subtotal);
    setEditandoIndex(index);
  };

  const eliminarProducto = (index) => {
    const nuevosDatos = [...datosTabla];
    nuevosDatos.splice(index, 1);
    setDatosTabla(nuevosDatos);
  };

  const calcularMontoTotalConIVA = (item) => {
    const subtotal = parseFloat(item.subtotal);
    const subtotalConIVA = subtotal * (1 + iva);
    return subtotalConIVA.toFixed(2); // Redondear el resultado a dos decimales
  };

  
// Función para ordenar los productos según el criterio seleccionado por el minimo
  const sortMinimo = (criterio) => {
    const sortedData = [...datosTabla];

    if (criterio === 'Mayor') {
      sortedData.sort((a, b) => parseFloat(b.minimo) - parseFloat(a.minimo));
    } else if (criterio === 'Menor') {
      sortedData.sort((a, b) => parseFloat(a.minimo) - parseFloat(b.minimo));
    }

    setDatosTabla(sortedData);
  };

  // Función para manejar el cambio de opción en el menú desplegable
  const handleSortOptionMinimo = (option) => {
    setSortBy(option.label); // Actualizar el estado del criterio de ordenamiento seleccionado
    sortMinimo(option.label); // Ordenar los productos
  };


// Función para ordenar los productos según el criterio seleccionado por el maximo
const sortMaximo = (criterio) => {
  const sortedData = [...datosTabla];

  if (criterio === 'Mayor') {
    sortedData.sort((a, b) => parseFloat(b.maximo) - parseFloat(a.maximo));
  } else if (criterio === 'Menor') {
    sortedData.sort((a, b) => parseFloat(a.maximo) - parseFloat(b.maximo));
  }

  setDatosTabla(sortedData);
};

// Función para manejar el cambio de opción en el menú desplegable
const handleSortOptionMaximo = (option) => {
  setSortBy(option.label); // Actualizar el estado del criterio de ordenamiento seleccionado
  sortMaximo(option.label); // Ordenar los productos
};

// Función para ordenar los productos según el criterio seleccionado por las existencias
const sortExistencias = (criterio) => {
  const sortedData = [...datosTabla];

  if (criterio === 'Mayor') {
    sortedData.sort((a, b) => parseFloat(b.existencias) - parseFloat(a.existencias));
  } else if (criterio === 'Menor') {
    sortedData.sort((a, b) => parseFloat(a.existencias) - parseFloat(b.existencias));
  }

  setDatosTabla(sortedData);
};

// Función para manejar el cambio de opción en el menú desplegable
const handleSortOptionexitencias = (option) => {
  setSortBy(option.label); // Actualizar el estado del criterio de ordenamiento seleccionado
  sortExistencias(option.label); // Ordenar los productos
};

  // Función para ordenar los productos según el criterio seleccionado por el subtotal
  const sortProductos = (criterio) => {
    const sortedData = [...datosTabla];

    if (criterio === 'Mayor') {
      sortedData.sort((a, b) => parseFloat(b.subtotal) - parseFloat(a.subtotal));
    } else if (criterio === 'Menor') {
      sortedData.sort((a, b) => parseFloat(a.subtotal) - parseFloat(b.subtotal));
    }

    setDatosTabla(sortedData);
  };

  // Función para manejar el cambio de opción en el menú desplegable
  const handleSortOptionChange = (option) => {
    setSortBy(option.label); // Actualizar el estado del criterio de ordenamiento seleccionado
    sortProductos(option.label); // Ordenar los productos
  };

  // Función para ordenar los productos según la opción seleccionada (Reciente o Antiguo)
  const ordenarProductos = (opcion) => {
    if (opcion === 'Actual') {
      const productosOrdenados = [...datosTabla].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setDatosTabla(productosOrdenados);
    } else if (opcion === 'Antiguo') {
      const productosOrdenados = [...datosTabla].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      setDatosTabla(productosOrdenados);
    }
  };

  // Función para ordenar los productos alfabéticamente
  const ordenarProductosAlfabeticamente = () => {
    const productosOrdenados = [...datosTabla].sort((a, b) => {
      const nombreA = a.producto.toUpperCase();
      const nombreB = b.producto.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    setDatosTabla(productosOrdenados);
  };

  const optionsfecha = [
    {
      label: "Actual",
      onClick: () => ordenarProductos("Actual")
    },
    {
      label: "Antiguo",
      onClick: () => ordenarProductos("Antiguo")
    }
  ]
  
  const optionsalfa = [
    {
      label:"Alfabeticamente",
      onClick: ordenarProductosAlfabeticamente
    },
  ]

  const optionsMinimo = [
    {
      label:"Mayor",
      onClick: () => handleSortOptionMinimo({ label: "Mayor" })
    },
    {
      label:"Menor",
      onClick: () => handleSortOptionMinimo({ label: "Menor" })
    }
  ]

  const optionsMaximo = [
    {
      label:"Mayor",
      onClick: () => handleSortOptionMaximo({ label: "Mayor" })
    },
    {
      label:"Menor",
      onClick: () => handleSortOptionMaximo({ label: "Menor" })
    }
  ]


  const optionsExistencias = [
    {
      label:"Mayor",
      onClick: () => handleSortOptionexitencias({ label: "Mayor" })
    },
    {
      label:"Menor",
      onClick: () => handleSortOptionexitencias({ label: "Menor" })
    }
  ]

  const optionsSubtotal = [
    {
      label:"Mayor",
      onClick: () => handleSortOptionChange({ label: "Mayor" })
    },
    {
      label:"Menor",
      onClick: () => handleSortOptionChange({ label: "Menor" })
    }
  ]

  return (
    <>
     <div className="bg-white p-3 ">
    {/* <ClienteHeader clienteRef={clienteRef}/> */}
    <div  className="bg-gray-200 p-2 mb-2">{/* ref={filtradoRef} */}
      
      <div>
        <div className={ ' flex space-x-2 gap-3 mb-2'}>
          <Link to='/' className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-yellow-300">
          Back
          </Link>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="mas inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-300">
          <BsPlus />
          </button>
          <div className='izquierdas'>
          <select onChange={(e)=> setValueSelect(e.target.value)}>
              <option>Buscar por</option>
              <option value='producto'>Producto</option>
              <option value='folio'>Folio</option>
            </select>
          </div>
          <div className='izquierda'>
            <Input onChange={onSearch} placeholder='Buscar'/>
          </div>
       {/* <MostrarFilas setItemShow={setItemShow}/> */}
        </div>
     {/* <ClienteFiltrado 
     search={searchTerm} 
     onSearch={onSearch} 
     setValueSelect={setValueSelect}/> */}
      </div>
    </div>
    <div className="overflow-x-auto">
      <div className="relative w-full ProductsOver" >{/*style={{ maxHeight: tablaMedida }}*/}
        <table className="w-full caption-bottom text-sm">
           <thead  className="[&_tr]:border-b bg-pos thead-sticky bg-pos"> {/*ref={theadRefs} */}
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
              <CustomDropdown title='Fecha' options={optionsfecha}/>
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
              <CustomDropdown title='Producto' options={optionsalfa}/>
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              Folio
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              <CustomDropdown title='Minimo' options={optionsMinimo}/>
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              <CustomDropdown title='Maximo' options={optionsMaximo}/>
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              <CustomDropdown title='Existencias' options={optionsExistencias}/>
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              <CustomDropdown title='Subtotal' options={optionsSubtotal}/>
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              Con IVA
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0 ">
            {/* {currentItems.slice(0, itemShow).map((cliente) => (
            <Cliente key={cliente.id} {...cliente}/>
            ))} */}
            {currentItems.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}></td>
              <td style={{ textAlign: 'center' }}>{item.producto}</td>
              <td style={{ textAlign: 'center' }}>{item.folio}</td>
              <td style={{ textAlign: 'center' }}>{item.minimo}</td>
              <td style={{ textAlign: 'center' }}>{item.maximo}</td>
              <td style={{ textAlign: 'center' }}>{item.existencias}</td>
              <td style={{ textAlign: 'center' }}>{item.subtotal}</td>
              <td style={{ textAlign: 'center' }}>{calcularMontoTotalConIVA(item)}</td>
              <td style={{ textAlign: 'center' }}>
                <button data-bs-toggle="modal" data-bs-target="#exampleModali" onClick={() => abrirModalEdicion(index)} className="azul inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2"><CiEdit /></button>
                <button onClick={() => eliminarProducto(index)} className="rojo inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2"><MdDelete /></button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div  className="mt-1">
    {/*<ClientePagination  handlePageChange={handlePageChange} currentPage={currentPage} />*/}{/*botonRef={botonRef}*/}{/*itemShow={itemShow}*/}
    </div>
  </div>
  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Nuevo Producto</h5>
        </div>
        <div className="modal-body">
          {/* <p>Fecha</p><Input type='date' value={fecha} onChange={(e) => setFecha(e.target.value)}/> */}
          <p>Producto</p><Input value={producto} onChange={(e) => setProducto(e.target.value)}/>
          <p>Folio</p><Input value={folio} onChange={(e) => setFolio(e.target.value)}/>
          <p>Minimo</p><Input type='number' value={minimo} onChange={(e) => setMinimo(Math.max(0, e.target.value))}/>
          <p>Maximo</p><Input type='number' value={maximo} onChange={(e) => setMaximo(Math.max(0, e.target.value))}/>
          <p>Existencias</p><Input type='number' value={existencias} onChange={(e) => setExistencias(Math.max(0, e.target.value))}/>
          <p>Subtotal</p><Input type='number' value={subtotal} onChange={(e) => setSubtotal(Math.max(0, e.target.value))}/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleAgregar}>Agregar</button>
        </div>
      </div>
    </div>
  </div>

{/* SEPARACIÓN DE MODALES */}

  <div className="modal fade" id="exampleModali" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Editar Producto</h5>
        </div>
        <div className="modal-body">
          {/* <p>Fecha</p><Input type='date' value={fechaEdit} onChange={(e) => setFechaEdit(e.target.value)}/> */}
          <p>Producto</p><Input type='text' value={productoEdit} onChange={(e) => setProductoEdit(e.target.value)}/>
          <p>Folio</p><Input type='text' value={folioEdit} onChange={(e) => setFolioEdit(e.target.value)}/>
          <p>Minimo</p><Input type='number' value={minimoEdit} onChange={(e) => setMinimoEdit(Math.max(0, e.target.value))}/>
          <p>Maximo</p><Input type='number' value={maximoEdit} onChange={(e) => setMaximoEdit(Math.max(0, e.target.value))}/>
          <p>Existencias</p><Input type='number' value={existenciasEdit} onChange={(e) => setExistenciasEdit(Math.max(0, e.target.value))}/>
          <p>Subtotal</p><Input type='number' value={subtotalEdit} onChange={(e) => setSubtotalEdit(Math.max(0, e.target.value))}/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={guardarCambios}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>
</>
  )
}
export default Clientes