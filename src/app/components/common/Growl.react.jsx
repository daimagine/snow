var React = require('react');
var SingleGrowl = require('./SingleGrowl.react.jsx');

// Private vars
var holder = null;
var position = "tr";
var valid_positions = ["tl", "tr", "bl", "br", "tc", "bc"];
var delay = 3000;
var animations = true;
var maxShown = 8;

var movePosition = function() {
	holder.style.position = 'fixed';
	holder.style.zIndex = '1040';
	var y = position.slice(0, 1);
	if(y == "t") {
		holder.style.top = "140px";
		holder.style.bottom = "auto";
	} else {
		holder.style.top = "auto";
		holder.style.bottom = "60px";
	}

	var x = position.slice(1, 2);
	if(x == "l") {
		holder.style.left = "8px";
		holder.style.right = "auto";
	} else if(x == "r") {
		holder.style.left = "auto";
		holder.style.right = "8px";
	} else {
		var neg = holder.clientWidth / 2;
		var left = (window.innerWidth / 2) - neg;
		holder.style.left = left + "px";
		holder.style.right = "auto";
	}
}

var Growl = React.createClass({

	// This is just a counter, don't modify directly
	uid: 5200,

	levels: ['info', 'warn', 'error', 'success', 'danger'],

	// Convenience constans for setting notification level
	WARN: 'warn',
	INFO: 'info',
	ERROR: 'error',
	SUCCESS: 'success',
	DANGER: 'danger',

	// Use these statics to configure all Growls from anywhere in your application
	statics: {
		setPosition: function(pos) {
			if(inArray(pos, valid_positions)) {
				position = pos;
			} else {
				console.log('Unknown position supplied.');
			}

			if(holder !== null) {
				movePosition();
			}
		},
		setMaxToShow: function(ct) {
			maxShown = ct;
		},
		setDelay: function(del) {
			delay = parseInt(del);
			SingleGrowl.setDelay(del);
		},
		getDelay: function() {
			return delay;
		},
		noAnimations: function() {
			animations = false;
			SingleGrowl.noAnimations();
		}		
	},

	getInitialState: function() {
		return {
			notifications: []
		}
	},

	getDefaultProps: function() {		
		return {};
	},	

	handleRemovedNotification: function(uid) {
		console.log('Growl.react: handleRemovedNotification', uid);
		var notifications = this.state.notifications;
		var n = notifications.filter(function(ele) {
			return ele.uid !== uid;
		});
		console.log('Growl.react: handleRemovedNotification filtered', n);
		this.setState( { notifications: n} );
	},

	addNotification: function(note) {
		var n = this.state.notifications;
		var self = this;
		try {
			console.log('Growl.react: addNotification note:', note);
			if(note.level) {
				if(!inArray(note.level, this.levels)) {
					throw "Invalid level supplied";
				} else {
					note.uid = this.uid;
					note.ref = "notification-"+this.uid;
					this.uid += 1;
					note.timeout = false;

					n.push(note);
					
					this.setState({ notifications: n });
					console.log('Growl.react: addNotification', n);
				}
			}
		} catch (ex) {
			console.log('Error adding notification: '+ex);
		}
	},

	componentDidMount: function() {
		if(holder === null) {
			holder = this.getDOMNode();
		}
		movePosition();
	},

	render: function() {
		var that = this;

		console.log('Growl.react: render notifications:', this.state.notifications);
		if(this.state.notifications.length == 0 ) {
			return <div className="row-fluid"><div id="growl-wrapper" className="col-xs-12 pull-right"></div></div>;
		}
		var isMore = "";
		var count = 0;
		if(this.state.notifications.length > maxShown) {
			// var amt = this.state.notifications.length - maxShown;
			// isMore = <li key="more-still"><span>{amt} more</span></li>
		}

		return (
		  <div className="row-fluid">
			<div id="growl-wrapper" className="col-xs-12 pull-right">
			  <div className="message-notice">
				{this.state.notifications.map(function(n) {					
					count += 1;
					if(count >= maxShown) {
						return "";
					} else {
						return <SingleGrowl key={n.uid} ref={n.ref} notification={n} onDidRemove={that.handleRemovedNotification} />
					}
				})}
				{isMore}
			  </div>
			</div>
		  </div>
		);
	
	}
});

function inArray(needle, haystack) {
	var length = haystack.length;
	for(var i=0; i < length; i++) {
		if(haystack[i] == needle) return true;
	}
	return false;
}

module.exports = Growl;