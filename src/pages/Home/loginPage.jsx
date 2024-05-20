import { useForm } from "react-hook-form";
import { UseAuth } from "../../context/auth/authContext.jsx";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function loginPage() {
  /**INICIANDO EL USE FORM PARA TRABAJAR LOS FORMS */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //ejecutar el context
  const { signin, isAuthenticated, errors: AuthErrors } = UseAuth();
  //ejecutar la funcion para navegacion
  const navigate = useNavigate();
  //usseEffect para validar autenticacion
  useEffect(() => {
    if (isAuthenticated == true) navigate("/Dashboard");
  }, [isAuthenticated]);
  /**FUNCION ONSUBMIT PARA EL FORM */
  const onSubmit = handleSubmit(async (values) => {
    await signin(values);
  });
  

  /**RETORNAR PAGINA */
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {AuthErrors.map((error, i) => (
            <div className="bg-red-400 p-2 text-white text-center my-2" key={i}>
              {error}
            </div>
          ))}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center mb-5 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia Session
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-red-500">Debe ingresar un email</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500">Debe ingresar su contraseña</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                <a
                  href="/recover"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Ingresar
              </button>
              <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Sin cuenta?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Regístrate y obtén 15 días gratis.
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default loginPage;
