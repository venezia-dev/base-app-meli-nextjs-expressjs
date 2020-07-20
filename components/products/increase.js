import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { productService } from '../../services/product.service';

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

const Increase = ({ product, onChildClick, closeModalP}) => {
	// Modal
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => {
		const { type, newprice } = data;
		const oldPrice = product.variations[0].price;
        const productEdit = {
            id: product.id,
            variations: product.variations
        }
		switch (type) {
			case 'val':
                productEdit.newprice = newprice;
                productService.increase(productEdit)
                .then((res) => {
                    setIsOpen(false);
                    onChildClick();
                    closeModalP();
                    toast.success('La modificación fue completado exitosamente!');
                })
                .catch((err) => {
                    console.log('error');
                    toast.error(err);
                });
				break;
			case 'val$':
                let result = parseInt(oldPrice) + parseInt(newprice);
                productEdit.newprice = result
                console.log(result);
                productService.increase(productEdit)
                .then((res) => {
                    setIsOpen(false);
                    onChildClick();
                    closeModalP();
                    toast.success('La modificación fue completado exitosamente!');
                })
                .catch((err) => {
                    console.log('error');
                    toast.error(err);
                });
				break;
			case 'val%':
                let res= parseInt(oldPrice) + [parseInt(oldPrice) * parseInt(newprice)] / 100;
                productEdit.newprice = res;
                productService.increase(productEdit)
                .then((res) => {
                    setIsOpen(false);
                    onChildClick();
                    closeModalP();
                    toast.success('La modificación fue completado exitosamente!');
                })
                .catch((err) => {
                    console.log('error');
                    toast.error(err);
                });
				break;
			default:
                toast.warning("Error");
				break;
		}
	};

	return (
		<div>
			<button className="btn btn-info" onClick={() => openModal()}>
				Modificar Precio
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
									<div className="col-10">
										<h3>Modificar Precio</h3>
									</div>
									<div className="col-2">
										<button className="btn btn-warning float-right" onClick={closeModal}>
											<i className="fas fa-times"></i>
										</button>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-12">
										<h4>
											Precio Actual:
											<span className="text-info"> ${product.variations[0].price}</span>
										</h4>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<form onSubmit={handleSubmit(onSubmit)}>
											<div className="form-row mt-3">
												<div className="col-12">
													<label>Elegir el modo</label>
													<select
														name="type"
														ref={register({ required: true })}
														className="form-control"
													>
														<option value="val">Editar Valor</option>
														<option value="val$">Aumento en Cifras</option>
														<option value="val%">Aumento Porcentual</option>
													</select>
												</div>
											</div>
											<div className="form-row mt-3">
												<div className="col-12">
													<input
														type="number"
														placeholder="Valor"
														className="form-control"
														name="newprice"
														ref={register({ required: true })}
													/>
													<p className="text-danger">
														{errors.newprice?.type === 'required' && 'Campo requerido.'}
													</p>
												</div>
											</div>
											<div className="form-row mt-3">
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
};

export default Increase;
