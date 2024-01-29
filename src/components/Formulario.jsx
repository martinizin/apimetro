import Mensajes from "./Mensajes"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
export const Formulario = ({setEstado}) => {

    const [error, setError] = useState(false)
    const [mensaje, setMensaje] = useState(false)
    const [form, setform] = useState({
            nombre:"",
            sector:"",
            salida:"",
            llegada:"",
            maquinista:"",
            detalles:""
        })
        const handleChange = (e) => { 
            setform({
                ...form, //Copiar las propiedades del objeto inicial
                [e.target.name]: e.target.value.trim() //Actualizar las propiedades del objeto inicial
            })
        }

        const handleSubmit = async(e)=>{
            e.preventDefault() 
            //Validación
            if (Object.values(form).includes("") || Object.entries(form).length === 0)
            {
                setError(true)//Si el formulario esta vacío o posee partes en blanco, cambiará el estado de error a verdadero despues de 1sg
                setTimeout(() => {
                    setError(false)
                }, 1000);
                return
            }
            try {
                const url ="https://65b819b246324d531d55f1cf.mockapi.io/metro"
                            form.id = uuidv4()
                await fetch(url,{
                    method:'POST', //Especificar el tipo de acción
                    body:JSON.stringify(form), //Convertir la vvariable form a un json
                    headers:{'Content-Type':'application/json'} //Especificar el tipo de contenido de la aplicación
                })
                setMensaje(true)
                setEstado(true)
                setTimeout(() => {
                    setMensaje(false)
                    setEstado(false)
                    setform({})
                }, 1000);
            } catch (error) {
                console.log(error);
            }
    
        }

    return (
        <form onSubmit={handleSubmit}>
             {error && <Mensajes tipo="bg-red-900">"Existen campos vacíos"</Mensajes>}
	         {mensaje && <Mensajes tipo="bg-green-900">"Registro exitoso"</Mensajes>}
            <Mensajes tipo={"bg-red-900"}>validar campos</Mensajes>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de la ruta'
                    name='nombre'
                    value={form.nombre || ""} 
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='sector'
                    className='text-gray-700 uppercase font-bold text-sm'>Sector: </label>
                <input
                    id='sector'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='sector de la ruta'
                    name='sector'
                    value={form.sector || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='salida'
                    className='text-gray-700 uppercase font-bold text-sm'>Punto de salida: </label>
                <input
                    id='salida'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de salida'
                    name='salida'
                    value={form.salida || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='llegada'
                    className='text-gray-700 uppercase font-bold text-sm'>Punto de llegada: </label>
                <input
                    id='llegada'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de llegada'
                    name='llegada'
                    value={form.llegada || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='maquinista'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del maquinista: </label>
                <input
                    id='maquinista'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del maquinista'
                    name='maquinista'
                    value={form.maquinista || ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='detalles'
                    className='text-gray-700 uppercase font-bold text-sm'>Detalles: </label>
                <textarea
                    id='detalles'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    name='detalles'
                    value={form.detalles || ""}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-sky-900 w-full p-3 
        text-white uppercase font-bold rounded-lg 
        hover:bg-red-900 cursor-pointer transition-all'
                value='Registrar ruta' />

        </form>
    )
}
