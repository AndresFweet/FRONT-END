import {useForm} from 'react-hook-form'

function registerCompany() {
  /**INICIANDO EL USE FORM PARA TRABAJAR LOS FORMS */
  const {register, handleSubmit} = useForm()
  /**FUNCION ONSUBMIT PARA EL FORM */
  const onSubmit = handleSubmit(values => {
    console.log(values);
  })
  /**RETORNAR PAGINA */
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" {...register('nameCompany', {required: true})} />
        <input type="text" {...register('descripcion')} />
        <input type="text" {...register('dirname', {required: true} )} />
        <button type='submit'>
          Guardar
        </button>
      </form>
    </div>
  )
}

export default registerCompany