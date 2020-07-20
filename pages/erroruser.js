import Link from 'next/link';



const ErrorUser = () => {
	return (
		
			<div className="container">
				<div className="row mt-5 text-center">
					<div className="col-12">
						<h2>Error al Iniciar Sesión</h2>
                        <Link href="/">
                            <a><h3>Volver a Intentar!</h3></a>
                        </Link>
					</div>
				</div>
			</div>
		
	)
};

export default ErrorUser;
