class Watch_CB {

	/**
	 * Constructor
	 *
	 * @param function func Function to be called
	 * @param Object params Settings to be adopted by this Watch_CB instance. Good for flagging single use functions
	 */
	constructor(func, params) {
		if (!params) {
			params = {};
		}


		// integrate defaults and params into instance
		Object.assign(this, {
			single: false,
			run_cb: true
		}, params);

		if (!func) {
			throw "You must provide a function to run";
		}

		this.func = func;
	}

	/**
	 * Run the function
	 *
	 * Determines first if this Watch_CB instance is still run-able. If it is, it checks if it's a single run CB and toggles it off prior to executing
	 * the function so that it doesn't run again. If it is not runnable it does nothing.
	 */
	run() {
		if (this.run_cb) {
			if (this.single) {
				this.run_cb = false;
			}

			this.func();
		}
	}
}