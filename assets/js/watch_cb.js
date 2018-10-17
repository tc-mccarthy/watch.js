class Watch_CB {
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

	run() {
		if (this.run_cb) {
			if (this.single) {
				this.run_cb = false;
			}

			this.func();
		}
	}
}