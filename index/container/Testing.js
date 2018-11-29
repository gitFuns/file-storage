import React from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Testing extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.actions.loadTest();
	}

	render() {
		return <div>12345679</div>
	}
}

export default connect(state => {
	return {}
}, dispatch => {
	return { actions: bindActionCreators(actions, dispatch) }
})(Testing);