// Basic Info Form Validation
class Group {
	constructor(name, ...fields) {
		this.name = name;
		this.fields = fields;
	}

	initialize(set) {
		/* create a span for error msgs */
		const fieldset = document.querySelector(`fieldset:nth-child(${set})`);
		const span = document.createElement("span");
		const ul = document.createElement("ul");

		fieldset.appendChild(span);
		span.appendChild(ul);
		ul.id = this.name;
		
		this.appendLi(this.fields);
	}

	startListen() {
		for(let field of this.fields) {
			field.node.addEventListener(field.listener, field.eventHandler);
		}
	}

	stopListen() {
		for(let field of this.fields) {
			field.li.style.display = "none";
			field.node.addEventListener(field.listener, field.eventHandler);
		}
	}

	appendLi(fields) {
		for(let field of fields) {
			document.getElementById(this.name).appendChild(field.li);
			if(field.other) {
				this.appendLi(field.other.fields);
			}
		}
	}

	checkEmpty() {
		return this.fields.some(field => {
			if(field.listener == 'change' && field.other && field.checkValue()) {
				return field.other.checkEmpty()
			}
			return field.checkEmpty();
		});
	
	}
	checkValue() {
		return this.fields.every(field => {
			if (field.listener == 'keyup') {
				return field.checkValid();
			} else if(field.listener == 'change' && field.other && field.checkValue()) {
				return field.other.checkValue();
			} else {
				return true;
			}
		});
	}
	
}