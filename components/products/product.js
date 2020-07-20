import ReactModal from 'react-modal';
import ViewProduct from './viewproduct';
import { productService } from '../../services/product.service';
ReactModal.setAppElement('#__next');

import { toast } from 'react-toastify';
import Increase from './increase';
import Stock from './stock';
toast.configure()

const Product = ({ product, onChildClick }) => {
	// Adm model
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function closeModalProduct() {
		setIsOpen(false);
	}

	// Change Status
	const status = () => {
		const changeStatus = {
			id: product.id,
			status: product.status == 'active' ? 'paused' : 'active'
		};
		productService.status(changeStatus)
			.then((res) => {
				console.log(res);
				closeModalProduct()
				onChildClick();
				toast.success('El cambio de estado fue completado exitosamente!')
			}).catch((err) => {
				console.log(err)
				toast.error(err);
			})
	};

	const editPrice = () => {
		console.log("modificar el precio")
	}

	return (
		<div>
			<div className="card card-body product rounded" onClick={() => openModal(product)}>
				<div className="row">
					<div className="col-4">
						<img src={product.secure_thumbnail} className="img-fluid rounded" />
					</div>
					<div className="col-8">
						<div className="row">
							<div className="col-12">{product.title}</div>
						</div>
						<div className="row">
							<div className="col-12">
								Marca:
								{product.attributes[0].value_name}
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-8">$ {product.price}</div>
							<div className="col-12 col-md-4">{product.available_quantity} u.</div>
						</div>
					</div>
				</div>
			</div>
			<ReactModal
				isOpen={modalIsOpen}
				className="Modal"
				shouldCloseOnOverlayClick={true}
				onRequestClose={closeModalProduct}
			>
				<div className="card card-body">
					<div className="row">
						<div className="col-10 mt-2">
							<h3>Información</h3>
						</div>
						<div className="col-2">
							<button className="btn btn-warning float-right" onClick={closeModalProduct}>
							<i className="fas fa-times"></i>
							</button>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-12">
							<ViewProduct product={product} />
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-6 float-left">
							<Increase product={product} onChildClick={onChildClick} closeModalP={() => closeModalProduct()} />
						</div>
						<div className="col-6">
						<button className="btn btn-warning float-right" onClick={() => status()}>
								{product.status == 'active' ? 'Desactivar' : 'Activar'}
							</button>
						</div>
					</div>
				</div>
			</ReactModal>
		</div>
	);
};

export default Product;
