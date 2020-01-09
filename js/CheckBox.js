class CheckBox {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.node = document.querySelectorAll(`input[type=checkbox]`);
		this.li = this.createLi();
	}

	checkEmpty() {
        const list = [];
        this.node.forEach(node =>{
            node.checked ? list.push(node) : false
        })

		return list.length < 1;
	}


	createLi() {
		const fieldset = document.querySelector(`fieldset:nth-child(3)`);
		const span = document.createElement("span");
		const ul = document.createElement("ul");

		fieldset.appendChild(span);
		span.appendChild(ul);
		ul.id = this.id;

		const li = document.createElement('li')
		li.style.display = 'none';

		ul.appendChild(li);
		return li;
	}

	startListen() {
		document.querySelector('fieldset:nth-child(3)').addEventListener('click', () => {
			if(this.checkEmpty()) {
				this.li.style.display = 'block';
				this.li.textContent = `Please choose atleast 1 ${this.name}`;
			} else {
				this.li.style.display = 'none';
				this.li.textContent = "";
			}
		})
    }
    
    checkValue() {
        return true;
    }
}