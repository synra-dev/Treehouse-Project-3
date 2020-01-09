class Input {
	constructor(name, id, regex) {
		this.name = name;
		this.id = id;
		this.node = document.getElementById(this.id);
		this.regex = regex;
		this.li = this.createLi();
		this.listener = 'keyup';
		this.eventHandler = () => {
			if(this.checkEmpty()) {
				this.li.style.display = 'block';
				this.li.textContent = `${this.name} cannot be empty`;
	
			} else if(!this.checkValid()) {
				this.li.style.display = 'block';
				this.li.textContent = `You have entered an invalid value for ${this.name}`;
			} else {
				this.li.style.display = 'none';
				this.li.textContent = ""
			}
		}
	}

	checkEmpty() {
		return this.node.value === "";
	}

	checkValid() {
		return this.regex.test(this.node.value);
	}

	createLi() {
		const li = document.createElement('li')
		li.style.display = 'none';

		return li;
	}

}