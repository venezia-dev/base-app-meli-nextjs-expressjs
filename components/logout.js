

const Logout = () => {

    const logout = () => {
        console.log("cerrar")
    }

    return (
        <div>
            <button className="btn btn-warning" onClick={() => logout()}>Cerrar sesión</button>
        </div>
    )
}

export default Logout;