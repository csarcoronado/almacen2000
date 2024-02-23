import './estilos.css'
import { Link } from 'react-router-dom'
// import './clientes.css'
// import { ClientesPropsModel } from "../../models/clientes/clientes.model";
// import Cliente from "./Cliente";
// import useScreenSize from "../../hooks/useScreenSize";
// import CustomDropdown from './CustomDropdown';
// import ClientePagination from "./ClientePagination";
// import { useTablaFiltro } from "../../hooks/useTablaFiltro";
// import { useHeightTabla } from '../../hooks/useHeightTabla';
// import ClienteHeader from './ClienteHeader';
// import { CiSearch } from "react-icons/ci";
// import ClienteFiltrado from './ClienteFiltrado';
// import MostrarFilas from './MostrarFilas';
// import { IoReturnUpBack } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CgShutterstock } from "react-icons/cg";
import { useState,useEffect } from 'react';
import Input from '../componentesjesus/input';
import CustomDropdown from './CustomDropdown';
import { nuevoAlmacen } from '../interfaces/InterfacesAlmacen';

interface ConfirmarProps {
    onConfirmarCompra: () => void
}

const Almacen = ({ onConfirmarCompra}: ConfirmarProps) => {   {/*{clientes}: {clientes: ClientesPropsModel[]}*/}
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
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value);
  setCurrentPage(1); 
  }
  const [valueSelect, setValueSelect] = useState<keyof nuevoAlmacen>('empresa')


  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [empresa, setEmpresa] = useState('');
  const [almacen, setAlmacen] = useState('');
  const [activo, setActivo] = useState('');
  const [datosAlmacen, setDatosAlmacen] = useState<nuevoAlmacen[]>([]);
  const [empresaEdit, setEmpresaEdit] = useState('');
  const [almacenEdit, setAlmacenEdit] = useState('');
  const [activoEdit, setActivoEdit] = useState('');
  const [editadoIndex, setEditadoIndex] = useState('');

  const filteredProducts = datosAlmacen.filter((empresa) => {
    return empresa[valueSelect]?.toString()?.toLowerCase()?.includes(searchTerm.toLowerCase());
    }
  
    );
    const indexOfLastItem = currentPage * itemShow;
    const indexOfFirstItem = indexOfLastItem - itemShow;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleAlmacen = () => {
        // Verificar si todos los campos obligatorios están llenos
        if (!empresa || !almacen || !activo) {
          // Mostrar un mensaje de error o realizar alguna acción si falta algún campo obligatorio
          alert('No completó todos los campos, inténtelo de nuevo');
          return; // Salir de la función sin agregar los datos
        }
       // Crear un objeto con los datos del producto
       const nuevoAlmacen = {
        empresa,
        almacen,
        activo
      };
    
      // Agregar el nuevo producto a la lista de datos de la tabla
      setDatosAlmacen([...datosAlmacen, nuevoAlmacen]);
    
      // Limpiar los campos de entrada después de agregar los datos
      setEmpresa('');
      setAlmacen('');
      setActivo('');
        // Aquí puedes realizar cualquier otra validación necesaria antes de agregar los datos
      
        // Si todos los campos están llenos, puedes agregar los datos a la tabla o realizar cualquier otra acción necesaria
        // Por ejemplo, puedes agregar los datos a un arreglo que luego se utilizará para renderizar la tabla
  }

  const guardarCambios = () => {
    if (editadoIndex !== null) {
      const nuevosDatos = [...datosAlmacen];
      nuevosDatos[editadoIndex] = {
        ...nuevosDatos[editadoIndex],
        empresa:empresaEdit,
        almacen: almacenEdit,
        activo: activoEdit
      };
      setDatosAlmacen(nuevosDatos);
      setEditadoIndex(null);
    }
  };

  const abrirModal = (index) => {
    const productoEdit = datosAlmacen[index];
    setEmpresaEdit(productoEdit.empresa);
    setAlmacenEdit(productoEdit.almacen);
    setActivoEdit(productoEdit.activo);
    setEditadoIndex(index);
  };

  const eliminarAlmacen = (index) => {
    const nuevosDatos = [...datosAlmacen];
    nuevosDatos.splice(index, 1);
    setDatosAlmacen(nuevosDatos);
  };

  // Función para ordenar los productos alfabéticamente
  const ordenarAlmacenesAlfabeticamente = () => {
    const productosOrdenados = [...datosAlmacen].sort((a, b) => {
      const nombreA = a.almacen.toUpperCase();
      const nombreB = b.almacen.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    setDatosAlmacen(productosOrdenados);
  };

  // Función para ordenar los productos alfabéticamente
  const ordenarEmpresasAlfabeticamente = () => {
    const productosOrdenados = [...datosAlmacen].sort((a, b) => {
      const nombreA = a.empresa.toUpperCase();
      const nombreB = b.empresa.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    setDatosAlmacen(productosOrdenados);
  };

  const optionsEmpresas = [
    {
      label:"Alfabeticamente",
      onClick: ordenarEmpresasAlfabeticamente
    },
  ]

  const optionsAlmacenes = [
    {
      label:"Alfabeticamente",
      onClick: ordenarAlmacenesAlfabeticamente
    },
  ]

  return (
    <>
     <div className="bg-white p-3 ">
    {/* <ClienteHeader clienteRef={clienteRef}/> */}
    <div  className="bg-gray-200 p-2 mb-2">{/* ref={filtradoRef} */}
      
      <div>{/* className={ windowWidth > 992 ? "flex justify-between items-center  " : ' flex-column  '} */}
        <div className={ ' flex space-x-2 gap-3 mb-2'}>{/* className={ windowWidth > 992 ?  "flex space-x-2 gap-3 " : ' flex space-x-2 gap-3 mb-2'} */}
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-yellow-300">
          Back
          </button>

          <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-300">
          <BsPlus/>
          </button>
          <div className='izquierdas'>
            <select onChange={(e)=> setValueSelect(e.target.value)}>
              <option>Buscar por</option>
              <option value='empresa'>Empresa</option>
              <option value='almacen'>Almacén</option>
              <option value='activo'>Activo</option>
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
              <CustomDropdown title='Empresa' options={optionsEmpresas}/>
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              <CustomDropdown title='Almacen' options={optionsAlmacenes}/>
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              Activo
              </th>
              <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              Existencias
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
            {currentItems.map((item,index)=>(
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{item.empresa}</td>
              <td style={{ textAlign: 'center' }}>{item.almacen}</td>
              <td style={{ textAlign: 'center' }}>{item.activo}</td>
              <td style={{ textAlign: 'center' }}>
                <Link to='/Clientes' onClick={onConfirmarCompra} className="amarillo inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2"><CgShutterstock /></Link>
              </td>
              <td style={{ textAlign: 'center' }}>
                <button data-bs-toggle="modal" data-bs-target="#exampleModali" onClick={() => abrirModal(index)} className="azul inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2"><CiEdit /></button>
                <button onClick={() => eliminarAlmacen(index)} className="rojo inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2"><MdDelete /></button>
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
        <h5 className="modal-title">Nuevo Almacén</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Empresa</p><Input value={empresa} onChange={(e) => setEmpresa(e.target.value)}/>
        <p>Almacén</p><Input value={almacen} onChange={(e) => setAlmacen(e.target.value)}/>
        {/* <div className="form-floating">
          <textarea className="form-control" id="floatingTextarea2"></textarea>
          <label>Descripción</label>
        </div> */}
        <p>Activo</p>
        <div>
          <label>
            Si
            <input className='seleccion' type="checkbox" checked={activo === 'Si'} onChange={() => setActivo('Sí')}/>
          </label>
          <label>
            No
            <input className='seleccion' type="checkbox" checked={activo === 'No'} onChange={() => setActivo('No')}/>
          </label>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleAlmacen}>Agregar</button>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="exampleModali" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Editar Almacén</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <p>Empresa</p><Input value={empresaEdit} onChange={(e) => setEmpresaEdit(e.target.value)}/>
        <p>Almacén</p><Input value={almacenEdit} onChange={(e) => setAlmacenEdit(e.target.value)}/>
        {/* <div className="form-floating">
          <textarea className="form-control" id="floatingTextarea2"></textarea>
          <label>Descripción</label>
        </div> */}
        <p>Activo</p><Input value={activoEdit} onChange={(e) => setActivoEdit(e.target.value)}/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={guardarCambios}>Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>
</>
  )
}
export default Almacen