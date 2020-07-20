import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';
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

const Stock = ({ product, onChildClick, closeModalP}) => {
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
		console.log(data);
	};

	return (
		<div>
			<button className="btn btn-info" onClick={() => openModal()}>
				Modificar Stock
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
										<h3>Modificar Stock</h3>
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
											Stock Actual:
											<span className="text-info"> {product.variations[0].available_quantity}</span>
										</h4>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<form onSubmit={handleSubmit(onSubmit)}>
										
											<div className="form-row mt-3">
												<div className="col-12">
													<input
														type="number"
														placeholder="Nuevo Stock"
														className="form-control"
														name="newstock"
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

export default Stock;
