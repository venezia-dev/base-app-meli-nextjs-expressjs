import Head from 'next/head';

const Index = () => {

	return (
		<div className="container">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className="container">
					<div className="row mt-5">
						<div className="col-12 col-md-6 mx-auto">
							<div className="card">
								<div className="card-header">
									<div className="row">
										<div className="col-12">
											<h3>Iniciar Sesión</h3>
										</div>
									</div>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-12">
											<form action="/api/login" method="POST">
												<div className="row mt-2">
													<div className="col-12">
														<input
															type="text"
															name="user"
															id="user"
															className="form-control"
															placeholder="Usuario"
														/>
													</div>
												</div>
												<div className="row mt-2">
													<div className="col-12">
														<input
															type="password"
															name="password"
															id="password"
															className="form-control"
															placeholder="Password"
														/>
													</div>
												</div>
												<div className="row mt-2">
													<div className="col-12">
														<button type="submit" className="btn btn-primary">
															Iniciar
														</button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Index;
