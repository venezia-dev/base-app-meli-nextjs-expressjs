const axios = require('axios');
import Link from 'next/link';
import React, { Component } from 'react';
import Modal from 'react-modal';
import Product from '../components/products/product';
import Increaseall from '../components/products/increaseall';

Modal.setAppElement('#__next');

class Products extends Component {
	state = {
		products: [],
		pIncrease: [],
		models: [],
		modalIsOpen: false,
	};

	// Modal State
	openModal = () => {
		this.setState({
			modalIsOpen: true
		});
	};

	closeModal = () => {
		this.setState({
			modalIsOpen: false
		});
	};

	async componentDidMount() {
		let res = await axios('api/products');
		const data = res.data;
		console.log(data);
		this.complete(data);
		this.searchModels(data);
		this.setState({
			products: data
		});
	}

	// Completar pIncrease para incrementar todo
	complete = (data) => {
		console.log('entrego complete');
		const productsPrMod = [];
		for (let i = 0; i < data.length; i++) {
			let datos = {
				id: data[i].body.id,
				model: data[i].body.attributes[0].value_name,
				variations: data[i].body.variations
			};
			productsPrMod.push(datos);
			this.setState({
				pIncrease: productsPrMod
			});
		}
	};

	// Buscar Modelos para incrementar
	searchModels = (data) => {
		const sModels = [];
		for (let i = 0; i < data.length; i++) {
			if (!sModels.includes(data[i].body.attributes[0].value_name)) {
				sModels.push(data[i].body.attributes[0].value_name);
				console.log(sModels);
				this.setState({
					models: sModels
				});
			}
		}
	};

	// Actualizar listado de publicacion
	refresh = async () => {
		let res = await axios('api/products');
		const data = res.data;
		console.log(data);
		this.setState({
			products: data
		});
	};

	render() {
		let { products, pIncrease, models } = this.state;

		if (products.length == 0) {
			return (
				<div>
					<p>Cargando Productos</p>
				</div>
			);
		}

		console.log(pIncrease);

		if (products.length > 0) {
			return (
				<div>
					<div className="container">
						<div className="row mt-3">
							<div className="col-12">
								<div className="card">
									<div className="card-header">
										<div className="row">
											<div className="col-2 col-md-2 mt-1 mt-md-2">
												<Link href="/home">
													<a>
														<h3>
															<i className="fas fa-arrow-circle-left"></i>
														</h3>
													</a>
												</Link>
											</div>
											<div className="col-10 col-md-5">
												<h2>Tus Productos</h2>
											</div>
											<div className="col-12 col-md-5 text-md-right">
												{pIncrease.length > 0 ? (
													<Increaseall
														pIncrease={pIncrease}
														models={models}
														onChildClick={() => this.refresh()}
													/>
												) : (
													<p>Cargando Productos</p>
												)}
											</div>
										</div>
									</div>
									<div className="card-body">
										<div className="row">
											<div className="col-5">
												<form>
													<input
														className="form-control form-control-lg"
														type="text"
														placeholder="Buscador"
													/>
												</form>
											</div>
											<div className="col-5 mt-2">
												<a><h5>Filtros</h5></a>
											</div>
										</div>
										<div className="row">
											<div className="col-12">
												<div className="row mt-1">
													{products.map((product, i) => (
														<div className="col-12 col-md-4 mt-3" key={i}>
															<Product
																product={product.body}
																onChildClick={() => this.refresh()}
															/>
														</div>
													))}
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

export default Products;
