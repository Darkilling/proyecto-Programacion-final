export default function Header() {
    return (
        <main>
            <div className="mb-32 grid text-center lg:max-w-12xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-center">
                <h1 className="text-4xl font-bold">Bienvenido a Ludoteca</h1>
                <p className="text-xl">Aquí encontrarás los mejores productos Para Jugar con tus amigos o compañeros</p>
                <form className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Nombre de usuario
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Nombre de usuario"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}