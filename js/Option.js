class Option {
	constructor(name, id, other = null) {
		this.name = name;
		this.id = id;
		this.node = document.getElementById(this.id);
		this.other = other;
		this.li = this.createLi();
		this.listener = 'change';
		this.eventHandler = () => {
			if(this.checkEmpty())	{
				this.li.style.display = 'block';
				this.li.textContent = `${this.name} cannot be empty`;
			} else {
				this.li.style.display = 'none';
				this.li.textContent = "";
			}
		
			if(this.other && this.checkValue()) {
				this.other.startListen();
			} else if(this.other) {
				this.other.stopListen();
			}
		}
	}

	checkEmpty() {
        return /^Select/i.test(this.node.value);
	}

	checkValue() {
		return this.node.value == this.other.name;
	}

	createLi() {
		const li = document.createElement('li')
		li.style.display = 'none';

		return li;
	}

}