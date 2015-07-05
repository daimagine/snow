var React = require('react');
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');


var ProductDescription = React.createClass({

	propTypes: {
		product: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductDescription.react: getInitialState')
		return {
		}
	},

	componentDidMount: function() {
    	console.log('ProductDescription.react: componentDidMount')
	},

	componentWillUnmount: function() {
    	console.log('ProductDescription.react: componentWillUnmount')
	},

	_onChange: function() {
    	console.log('ProductDescription.react: _onChange')
		this.state({
		});
	},

	render: function() {
		return (
			<div ref="product-description" id="product-description">
              <div className="m-b-20">
	              <p>&nbsp;</p>
	            </div>
	            <ul id="tab-01" className="nav nav-tabs">
	              <li className="active"><a href="#product-tab-00" aria-controls="product-tab-00" role="tab" data-toggle="tab">Description</a></li>
	              <li><a href="#product-tab-01" aria-controls="product-tab-01" role="tab" data-toggle="tab">About Seller</a></li>
	              <li><a href="#product-tab-02" aria-controls="product-tab-02" role="tab" data-toggle="tab">Testimonial</a></li>
	            </ul>
	            <div className="tab-content">
	              <div id="product-tab-00" className="tab-pane active">
	                <div className="row">
	                  <div className="col-md-12">
	                    <h4>About Product Name</h4>
	                    <hr />
	                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur blanditiis reiciendis magnam ut doloribus eum omnis nisi vitae soluta at repellendus maxime iste sint voluptatum voluptas veniam laudantium maiores explicabo temporibus, ipsum. Ullam optio obcaecati sit minus velit ipsum doloremque non? Esse nam repellendus perferendis unde facilis pariatur inventore ullam, vero ad accusamus illo laboriosam molestias iure, voluptates repudiandae aliquid eaque alias qui consequatur voluptatibus? Soluta et, consectetur maxime expedita vero fugiat explicabo voluptas maiores repellendus! Repellat tenetur aliquid praesentium minus deleniti ipsam non dicta, quaerat. Dolorum fugit, veritatis eos, nemo quo labore corporis, molestias fuga nobis praesentium unde recusandae illo sapiente reprehenderit consequatur odio sint accusamus iste minus voluptas placeat voluptatum? Excepturi, dolorum voluptatibus sint minus, magnam accusamus corporis tempora praesentium. Qui maiores enim, corporis perspiciatis repudiandae laudantium voluptas nostrum iusto vitae id assumenda aut ipsum voluptatum inventore reprehenderit magnam culpa impedit eum amet, doloribus labore. Corporis mollitia necessitatibus at minima perspiciatis excepturi reprehenderit eligendi delectus ex minus quaerat consequuntur optio architecto et ullam eum aliquid doloremque itaque quasi sunt quas, autem possimus ipsa ducimus laudantium. Aliquid incidunt quam quo qui soluta, modi earum quisquam.</p>
	                  </div>
	                </div>
	              </div>
	              <div id="product-tab-01" className="tab-pane">
	                <div className="row">
	                  <div className="col-md-12">
	                    <h4>About Seller</h4>
	                    <hr />
	                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolorum fuga, distinctio ea aut quis nobis quas totam incidunt sit tempora asperiores, suscipit atque necessitatibus earum blanditiis iure quasi omnis?</p>
	                  </div>
	                </div>
	              </div>
	              <div id="product-tab-02" className="tab-pane">
	                <div className="row">
	                  <div className="col-md-12">
	                    <h4>Testimonial</h4>
	                    <hr />
	                    <div className="row">
	                      <div className="col-md-12 post testimonial">
	                        <div className="info-wrapper one-block">
	                          <div className="username"><span className="dark-text">Bravocado</span></div>
	                          <div className="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam repellendus quae, excepturi veritatis suscipit doloribus voluptatibus eos accusantium, ex eligendi dolores animi libero mollitia? Assumenda pariatur praesentium, officiis quasi similique?</div>
	                          <div className="more-details">
	                            <ul className="post-links">
	                              <li><span className="muted">2 Minutes ago</span></li>
	                              <li><span className="muted">99 people agree</span></li>
	                              <li className="last-child"><a href="javascript:;" className="text-warning"><i className="fa fa-star">&nbsp;&nbsp;</i>Agree</a></li>
	                            </ul>
	                          </div>
	                        </div>
	                      </div>
	                      <div className="col-md-12 post testimonial">
	                        <div className="info-wrapper one-block">
	                          <div className="username"><span className="dark-text">Bravocado Lagi</span></div>
	                          <div className="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam repellendus quae, excepturi veritatis suscipit doloribus voluptatibus eos accusantium, ex eligendi dolores animi libero mollitia? Assumenda pariatur praesentium, officiis quasi similique?</div>
	                          <div className="more-details">
	                            <ul className="post-links">
	                              <li><span className="muted">10 Days ago</span></li>
	                              <li><span className="muted">10 people agree</span></li>
	                              <li className="last-child"><a href="javascript:;" className="text-warning"><i className="fa fa-star">&nbsp;&nbsp;</i>Agree</a></li>
	                            </ul>
	                          </div>
	                        </div>
	                      </div>
	                      <div className="col-md-12 post testimonial">
	                        <div className="info-wrapper one-block">
	                          <div className="username"><span className="dark-text">Bravocado Dong</span></div>
	                          <div className="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam repellendus quae, excepturi veritatis suscipit doloribus voluptatibus eos accusantium, ex eligendi dolores animi libero mollitia? Assumenda pariatur praesentium, officiis quasi similique?</div>
	                          <div className="more-details">
	                            <ul className="post-links">
	                              <li><span className="muted">2 Months ago</span></li>
	                              <li><span className="muted">11 people agree</span></li>
	                              <li className="last-child"><a href="javascript:;" className="text-warning"><i className="fa fa-star">&nbsp;&nbsp;</i>Agree</a></li>
	                            </ul>
	                          </div>
	                        </div>
	                      </div>
	                      <div className="col-md-12 post testimonial">
	                        <h3>Write Your Own</h3>
	                        <form action="javascript:;">
	                          <div className="form-group">
	                            <label htmlFor="testiName" className="form-label">Your Name :</label>
	                            <input id="testiName" type="text" className="form-control" />
	                          </div>
	                          <div className="form-group">
	                            <label htmlFor="testiContent" className="form-label">Testimonal :</label>
	                            <textarea id="testiContent" rows="5" className="form-control"></textarea>
	                          </div>
	                          <div className="form-group text-right">
	                            <button type="submit" className="btn btn-primary btn-normal">Submit</button>
	                          </div>
	                        </form>
	                        <hr />
	                        <div className="col-md-12 text-right">
	                          <div className="btn-group">
	                            <button type="button" className="btn btn-white"><i className="fa fa-chevron-left"></i></button>
	                            <button className="btn btn-white">1</button>
	                            <button className="btn btn-white active">2</button>
	                            <button className="btn btn-white">3</button>
	                            <button className="btn btn-white">4</button>
	                            <button type="button" className="btn btn-white"><i className="fa fa-chevron-right"></i></button>
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

});

module.exports = ProductDescription;