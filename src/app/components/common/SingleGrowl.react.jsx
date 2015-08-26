var React = require('react');
var Alert = require('react-bootstrap').Alert;

var delay = 3000;
var animations = true;

var SingleGrowl = React.createClass({

	getInitialState: function() {
		return {
			remove: false,
			opacity: 1.0
		};
	},

	setRemove: function() {

		// Just in case this was triggered some other way than the timeout itself.
		clearTimeout(this.props.notification.timeout);
			
		console.log('SingleGrowl.react: setRemove animations', animations);
		this.setState({ remove: true });
		if (animations) {
			this.fadeOut();
		} else {
			this.props.onDidRemove(this.props.notification.uid);
		}
	},

	statics: {
		setDelay: function(ms) {
			delay = ms;
		},
		getDelay: function() {
			return delay;
		}
	},
	
	getDefaultProps: function() {
		return {
			notification: null,
			onDidRemove: function(uid) {}
		};
	},

	startTimer: function() {
		var note = this.props.notification;
		var self = this;
		console.log('SingleGrowl.react: startTimer', this.props.notification.uid, delay + "ms");
		note.timeout = setTimeout(function() {
						self.setRemove();
					}, delay);
	},

	componentDidMount: function() {
		console.log('SingleGrowl.react: componentDidMount', this.props.notification.timeout);
		// This should always evaluate to true, but just in case...
		if(this.props.notification.timeout === false) {
			this.startTimer();
		}
	},

	fadeOut: function() {
		var self = this;
		var holder = this.getDOMNode();
		var opacity = this.state.opacity;
		console.log('SingleGrowl.react: fadeOut opacity', opacity);
		holder.style.opacity = opacity;
		if (opacity > 0) {
			opacity = opacity - 0.2;
			this.setState({ opacity: opacity });
			setTimeout(function() {
						self.fadeOut();
					}, 100);

		} else {
			this.props.onDidRemove(this.props.notification.uid);
		}
	},

	render: function() {
		var level = this.props.notification.level;
		if (level == 'error') {
			level = 'danger';
		}
		return (
			<Alert bsStyle={level} onDismiss={this.setRemove}>
	          	{this.props.notification.msg}
	        </Alert>
		);
	}

});


module.exports = SingleGrowl;