import Link from 'next/link';
const axios = require('axios');
import React, { Component } from 'react';
import Logout from '../components/logout';

class Home extends Component {
	state = {
		user: []
	};

	async componentDidMount() {
		let res = await axios('api/user');
		const data = res.data;
		this.setState({
			user: data
		});
	}

	render() {
		let { user } = this.state;

		if (!user) {
			return (
				<div>
					<p>Cargando...</p>
				</div>
			);
		}

		if (user) {
			console.log(user);

			return (
				<div>
					<div className="container">
						<div className="row mt-3">
							<div className="col-12">
								<div className="card">
									<div className="card-header">
										<div className="row text-center">
											<div className="col-12 col-md-10">
												<h1>INICIO</h1>
											</div>
											<div className="col-12 col-md-2">
												<Logout />
											</div>
										</div>
									</div>
									<div className="card-body">
										<div className="row mt-4 text-center align-content-center">
											<div className="col-12 col-md-6">
												<img src="/user.png" className="img-fluid w-40 h-30"></img>
											</div>
											<div className="col-12 col-md-6 mt-5">
												<div className="card card-body">
													<div className="row">
														<div className="col-12">
															<h2>Tu Mercado Libre</h2>
														</div>
													</div>
													<div className="row mt-3">
														<div className="col-12">
															<h3>ID: {user.id}</h3>
															<h3>Usuario: {user.nickname}</h3>
															<h3>
																{user.first_name} {user.last_name}
															</h3>
														</div>
													</div>
													<div className="row mt-5">
														<div className="col-12 text-center">
															<Link href="/products">
																<h1>
																	<button className="btn btn-dark">
																		Tus Productos
																	</button>
																</h1>
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Home;
