import React from 'react/addons';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router';

export default class Dashboard extends React.Component {
	
	render() {
		return(
			<div className="row">
				<div className="col-md-12">
					<h1>Halo, Selamat Datang di Jualio</h1>
					<Link to="login">login</Link>
				</div>
			</div>
		);
	}
}

ReactMixin(Dashboard.prototype, React.addons.LinkedStateMixin);