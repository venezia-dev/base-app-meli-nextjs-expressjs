import ReactModal from 'react-modal';

import { useForm } from 'react-hook-form';
import { productService } from '../../services/product.service';
import { useEffect } from 'react';

import { toast } from 'react-toastify';
toast.configure();

ReactModal.setAppElement('#__next');

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

const Increaseall = ({ pIncrease, models, onChildClick }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const [modelsSelect, setMSelect] = React.useState('');
	useEffect(() => {
		setMSelect(models);
		console.log(modelsSelect);
	}, [modelsSelect]);

	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => {
		console.log(data, pIncrease);
		// Si se quiere modificar Todo
		if (data.models == 'Todos') {
			switch (data.type) {
				case 'val$':
					for (let i = 0; i < pIncrease.length; i++) {
						const vari = pIncrease[i].variations;
						// Se suma el valor viejo por el que se quiere sumar y se actualiza la variable
						for (let i = 0; i < vari.length; i++) {
							const newPrice = parseInt(vari[i].price) + parseInt(data.increase);
							vari[i].price = newPrice;
						}
					}
					setTimeout(() => {
						console.log(pIncrease);
						productService
							.increaseAll(pIncrease)
							.then((res) => {
								setIsOpen(false);
								onChildClick();
								toast.success('El aumento de todo fue completado exitosamente!');
							})
							.catch((err) => {
								console.log('error');
								toast.error(err);
							});
					}, 700);
					break;
				case 'val%':
					// Si se queire aumentar en %
					for (let i = 0; i < pIncrease.length; i++) {
						const vari = pIncrease[i].variations;
						for (let i = 0; i < vari.length; i++) {
							const newPrice =
								parseInt(vari[i].price) + [parseInt(vari[i].price) * parseInt(data.increase)] / 100;
							vari[i].price = newPrice;
						}
					}
					setTimeout(() => {
						productService
							.increaseAll(pIncrease)
							.then((res) => {
								setIsOpen(false);
								onChildClick();
								toast.success('El aumento de todo fue completado exitosamente!');
							})
							.catch((err) => {
								console.log('error');
								toast.error(err);
							});
					}, 700);
					break;
				default:
					console.log('error');
					break;
			}
		} else {
			console.log('se arranco depende el modelo');
			console.log(data, pIncrease);
			pIncrease = pIncrease.filter((product) => product.model.includes(data.models));
			setTimeout(() => {
				switch (data.type) {
					case 'val$':
						for (let i = 0; i < pIncrease.length; i++) {
							const vari = pIncrease[i].variations;
							// Se suma el valor viejo por el que se quiere sumar y se actualiza la variable
							for (let i = 0; i < vari.length; i++) {
								const newPrice = parseInt(vari[i].price) + parseInt(data.increase);
								vari[i].price = newPrice;
							}
						}
						setTimeout(() => {
							console.log(pIncrease);
							productService
								.increaseAll(pIncrease)
								.then((res) => {
									setIsOpen(false);
									onChildClick();
									toast.success(
										'El aumento de todo del modelo selecionado fue completado exitosamente!'
									);
								})
								.catch((err) => {
									console.log('error');
									toast.error(err);
								});
						}, 700);
						break;
					case 'val%':
						// Si se queire aumentar en %
						for (let i = 0; i < pIncrease.length; i++) {
							const vari = pIncrease[i].variations;
							for (let i = 0; i < vari.length; i++) {
								const newPrice =
									parseInt(vari[i].price) + [parseInt(vari[i].price) * parseInt(data.increase)] / 100;
								vari[i].price = newPrice;
							}
						}
						setTimeout(() => {
							productService
								.increaseAll(pIncrease)
								.then((res) => {
									setIsOpen(false);
									onChildClick();
									toast.success(
										'El aumento de todo del modelo selecionado fue completado exitosamente!'
									);
								})
								.catch((err) => {
									console.log('error');
									toast.error(err);
								});
						}, 700);
						break;
					default:
						console.log('error');
						break;
				}
			}, 500);
		}
	};

	if (modelsSelect.length == 0) {
		return <p>Cargando Formulario</p>;
	}

	if (modelsSelect.length > 0) {
		return (
			<div>
				<button className="btn btn-info" onClick={() => openModal()}>
					Modificación de precios
				</button>
				<ReactModal
					isOpen={modalIsOpen}
					style={customStyles}
					shouldCloseOnOverlayClick={true}
					onRequestClose={closeModal}
				>
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body p-4">
									<div className="row">
										<div className="col-12">
											<button className="btn btn-warning float-right" onClick={closeModal}>
												<i className="fas fa-times"></i>
											</button>
										</div>
									</div>
									<div className="row">
										<div className="col-12">
											<form onSubmit={handleSubmit(onSubmit)}>
												<div className="form-row">
													<div className="col-12 mt-3">
														<label>
															<h4>Elegir que aumentar</h4>
														</label>
														<select name="models" ref={register} className="form-control">
															<option value="Todos">Todos</option>
															{modelsSelect.map((model, i) => (
																<option key={i} value={model}>
																	{model}
																</option>
															))}
															;
														</select>
													</div>
												</div>
												<div className="form-row mt-4">
													<div className="col-12">
														<select name="type" ref={register} className="form-control">
															<option value="val$">Aumentar en $</option>
															<option value="val%">Aumentar en %</option>
														</select>
													</div>
												</div>
												<div className="form-row mt-4">
													<div className="col-12">
														<input
															type="number"
															placeholder="Valor"
															className="form-control"
															name="increase"
															ref={register({ required: true, maxLength: 6 })}
														/>
													</div>
												</div>
												<div className="form-row mt-4">
													<div className="col-12">
														<button className="btn btn-info" type="submit">
															Confirmar
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
				</ReactModal>
			</div>
		);
	}
};

export default Increaseall;
