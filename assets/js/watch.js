class Watch {
	/**
	 * Fired on instantiation
	 *
	 * @param String|Element|jQuery element A selector, DOM element or jQuery object to be watched
	 * @param Object params IntersectionObserver parameters
	 */
	constructor(element, params) {
		this.in_view = false;
		this.params = (params) ? params : {};
		this.getElement(element);
		this.observe();
		this.in_view_cbs = [];
		this.out_view_cbs = [];
	}

	/**
	 * Resolves element to a DOM element
	 *
	 * @param String|Element|jQuery element A selector, DOM element or jQuery object to be watched
	 */
	getElement(element) {
		if (typeof element === "string") {
			this.element = document.querySelector(element);
		} else if (element instanceof Element) {
			this.element = element;
		} else if (element instanceof jQuery) {
			this.element = element[0];
		} else {
			throw `Watch.js: You must provide a selector string, DOM Element or jQuery object to watch. ${typeof element} provided`;
		}
	}

	/**
	 * Fired when the element comes into view
	 */
	in_view_cb() {
		if (this.in_view_cbs.length > 0) {
			this.in_view_cbs.forEach((cb) => {
				cb.run();
			});
		} else {
			console.warn("Watch.js: No functions have been set for when this element comes in to view"); /*RemoveLogging:skip*/
		}
	}

	/**
	 * Fired when the element goes out of view
	 */
	out_view_cb() {
		if (this.out_view_cbs.length > 0) {
			this.out_view_cbs.forEach((cb) => {
				cb.run();
			});
		} else {
			console.warn("Watch.js: No functions have been set for when this element goes out of view"); /*RemoveLogging:skip*/
		}
	}

	/**
	 * Sets the function to be called when the element comes into view
	 *
	 * @param function func
	 * @return Watch
	 */
	inView(func) {
		this.in_view_cbs.push(new Watch_CB(func));
		return this;
	}

	/**
	 * Sets the function to be called when the element goes out of view
	 *
	 * @param function func
	 * @return Watch
	 */
	outView(func) {
		this.out_view_cbs.push(new Watch_CB(func));
		return this;
	}

	/**
	 * Sets the function to be called when the element comes into view
	 *
	 * @param function func
	 * @return Watch
	 */
	oneInView(func) {
		this.in_view_cbs.push(new Watch_CB(func, { single: true }));
		return this;
	}

	/**
	 * Sets the function to be called when the element goes out of view
	 *
	 * @param function func
	 * @return Watch
	 */
	oneOutView(func) {
		this.out_view_cbs.push(new Watch_CB(func, { single: true }));
		return this;
	}

	/**
	 * Sets up IntersectionObserver
	 *
	 * IntersectionObserver is instantiated and set to observe the element.
	 * When the element comes in to view after being out of view the in view function is fired.
	 * When the element goes out of view after being in view the out view function is fired.
	 */
	observe() {
		const options = Object.assign({
				threshold: 0
			}, this.params),
			observer = new IntersectionObserver((entries, observer) => {
				const response = { entries: entries, observer: observer };

				if (entries[0].isIntersecting) {
					if (!this.in_view) {
						this.in_view_cb(response);
					}

					this.in_view = true;
				} else {
					if (this.in_view) {
						this.out_view_cb(response);
					}

					this.in_view = false;
				}
			}, options);

		observer.observe(this.element);
	}
}