import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from '../redux/store/index';
import '../styles/style.css';
import 'bootswatch/dist/slate/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-toastify/dist/ReactToastify.css';

class Application extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
		};
	}

	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<Provider store={store}>
				<Head>
					<title>Mi Meli</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
					></meta>
				</Head>
				<Component {...pageProps} />
			</Provider>
		);
	}
}
export default withRedux(createStore)(Application);
