
const ViewProduct = ({ product }) => {
	console.log(product);

	return (
		<div>
			<div className="row">
				<div className="col-12 col-md-7">
					<div className="row">
						<div className="col-12">
							<h3>{product.title}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h5>Marca: {product.attributes[0].value_name}</h5>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h5>Id: {product.id}</h5>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h5>Precio: ${product.price}</h5>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h5>Stock: {product.available_quantity} u.</h5>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-12">
							<a href={product.permalink} target="__black" className="btn btn-info">
								Ver Publicación
							</a>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-5 text-left text-md-center">
					<div className="row mt-2 mt-md-0">
						<div className="col-12">
							<h4>
								{product.status == 'active' ? (
									<span className="text-success">
										<i className="far fa-check-circle"></i> Activado
									</span>
								) : (
									<span className="text-danger">
										<i className="fas fa-times"></i> Pausado
									</span>
								)}
							</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-12 w-100">
							<img src={product.pictures[0].secure_url} className="img-fluid rounded" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewProduct;
