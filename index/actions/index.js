export const actionTypes = {

}

export const loadTest = () => {
	return dispatch => {
		Ajax.get({ url: "/test.json" })
			.then(data => {
				console.log(data);
			});
	}
}