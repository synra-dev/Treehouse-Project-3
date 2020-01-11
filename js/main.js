// create new Input instances
const userName = new Input("Name", "name", /^[\w\s]+$/i);
const mail = new Input("Email Address", "mail", /^[^@()\#%]+@[^\s@\+#]+\.[a-z]{2,}(\.[a-z]{2})?$/i);
const otherJob = new Input("Job Role", "other-title", /.*/i);
const ccnum = new Input("Credit Card Number", "cc-num", /^\d{13,16}$/);
const zip = new Input("Zip Code", "zip", /^[\d]{5}$/);
const cvv = new Input("CVV", "cvv", /^\d{3}$/);

// create new Option instances
const jobs = new Option("Job Roles", "title", new Group('other', otherJob));
const design = new Option("T-Shirt Design", 'design')
const paymentOpt = new Option("Payment Method", "payment", new Group('credit card', ccnum, zip, cvv))

// group all 
const field1 = new Group('basic', userName, mail, jobs)
const field2 = new Group('shirt', design);
const field3 = new CheckBox('Activity','activity');
const field4 = new Group('method', paymentOpt)

// initialize data
field1.initialize(1);
field2.initialize(2);
field4.initialize(4);
field1.startListen();
field2.startListen();
field3.startListen();
field4.startListen();

// creditcard listener
paymentOpt.other.startListen()

// group all form fields
const setForm = [field1, field2, field3, field4];


const $other = $('#other-title');
const $opt = $('#color option');
const $cbox = $('.activities input[type=checkbox]');
const form = document.querySelector('form');

// focus name field automatically on load
$('#name').focus();

$('#payment option').eq(1).attr('selected','true')

// hide job field
$other.hide();

// hide payment divs
	$opt.parent().parent().hide();
	$('fieldset:eq(3) > div').each((index, value) => {
		const self = $(value)
		self.attr('id') == 'credit-card' ? self.show() : self.hide()
	});

// append label node to store total
$('.activities').append(`<label id="total"></tabel>`);


$('#title').change(function() {
	this.value == 'other' ? $other.show() : $other.hide();
});


// show color div depending on design value
$('#design').change(function() {
	$opt.parent().parent().show();
	const action = this.value.replace(/\s/g,'');

	function option(s,e) {
		for(let i = 0; i < $opt.length; i++) {
				$($opt[i]).removeAttr('selected')
				i >= s && i <= e ? $($opt[i]).show() : $($opt[i]).hide();
			 }
			 $($opt[s]).attr('selected','');
	}

	const shirt = {
		jspuns: () => option(0,2),
		heartjs: () => option(3,5),
		SelectTheme: () => $opt.parent().parent().hide()
	}
	shirt[action]();
});


/**
 * disable other checkboxes that will conflict your current chosen checkbox
 * updates the total value
 */
$cbox.click(function() {
	let settings = $(this).prop("checked");
	$cbox.each((index,value) => {
		if($(this).data('day-and-time') == $(value).data('day-and-time') && value.name !== $(this).attr('name')) {
		$(value).prop('disabled',settings)
		}
	});

	let total = 0;
	$cbox.each((index,value) => {
		$(value).prop('checked') ? total += $(value).data(('cost')) : false
	})
	$('#total').text('Total: ' + total);
});


// check value of the payment option then show the corresponding dive
$('#payment').change(function(e) {
	const method = this.value.replace(/\s/,'-');
	$('fieldset:eq(3) > div').hide();
	$('#'+method).show();
});


// event listener for submition. check for empty and invalid values.
form.addEventListener('submit', function(e) {
	const li1 = document.querySelector('#formEmpty')
	const li2 = document.querySelector('#formInvalid')
	if(setForm.some(group => group.checkEmpty())) {
		e.preventDefault()
		li1.textContent = 'One or more field(s) is empty, please fill up all necessary informations';
		li1.style.display = 'block';	
	} else {
		li1.textContent = '';
		li1.style.display = 'none';	
	}

	if(setForm.some(group => !group.checkValue())) {
		e.preventDefault()
		li2.textContent = 'One or more field(s) has an invalid value, please check up all the information passed in';
		li2.style.display = 'block';
	} else {
		li2.textContent = '';
		li2.style.display = 'none';	
	}
})