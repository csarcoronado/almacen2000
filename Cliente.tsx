import { FaWhatsapp } from "react-icons/fa6"
import useScreenSize from "../../hooks/useScreenSize"
import DeleteClient from "./DeleteClient"
import UpdateClient from "./UpdateClient"
import CustomButton from "../componentesjesus/boton"
import { BsThreeDotsVertical } from "react-icons/bs"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { AiOutlineDelete } from "react-icons/ai"
import ClienteContactar from "./ClienteContactar"

const Cliente = ( {name, id, rfc, email, telefono, estado} 
  :{ name: string; id: string; clave: string; rfc: string; email: string; telefono: string; delegacion: string; estado: string; }) => {
   const {width} = useScreenSize()
   const initials = name && name
   .split(' ')
   .map((word) => word[0])
   .join('')
   .toUpperCase()
   .slice(0, 2);


  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="px-4  py-3 text-sm text-gray-700 align-middle font-medium">
   {name}
    </td>
    <td className="px-4 py-3 text-sm text-gray-700 align-middle font-medium">
      {email}
    </td>
    <td className="px-4 py-3 text-sm text-gray-700 align-middle font-medium">
    {telefono}
    </td>
    <td className="px-4 py-3 text-sm text-gray-700 align-middle font-medium">
    {estado}
    </td>
    <td className="px-4 py-3 text-sm text-gray-700 align-middle font-medium" >
      {rfc}
    </td>
    <td className="px-4 py-3 text-sm text-gray-700 align-middle font-medium flex gap-2">
      <ClienteContactar phoneNumber={telefono}/>
      <UpdateClient id={id}/>
      <DeleteClient id={id} name={name}/>
      <div className="dropdown" >
      <CustomButton
      title={ <BsThreeDotsVertical/>}
      buttonType="button"
      customClass="btn"
      id="dropdownMenuButton1"
      database="dropdown"
      style={{ display: width > 830 ? 'none' : 'block' }}
      />
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item  text-sm text-gray-700 align-middle font-medium" href="#"><FaWhatsapp/> WhatsApp</a></li>
    <li><a className="dropdown-item  text-sm text-gray-700 align-middle font-medium" href="#"><HiOutlinePencilAlt/> Editar</a></li>
    <li><a className="dropdown-item  text-sm text-gray-700 align-middle font-medium" href="#"><AiOutlineDelete/> Borrar</a></li>
  </ul>
</div>
</td>
  </tr>
  )
}

export default Cliente