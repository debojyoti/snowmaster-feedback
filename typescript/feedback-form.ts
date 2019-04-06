declare var $: any;
declare var toastr: any;


export class FeedBackForm {
    
    fields = {};
    isValidationActive = false;
    
    constructor() {
        this.initForm();
        this.fetchProducts();
        this.setToastrOptions();
    }

    initForm() {
        this.fields = {
            'name': {
                element: $('#name-input')
            },
            'company': {
                element: $('#company-input')
            },
            'date': {
                element: $('#date-input')
            },
            'products': {
                element: $('#product-select')
            },
            'service-rating': {
                element: $('.service-star-label'),
                value: 0
            },
            'product-rating': {
                element: $('.product-star-label'),
                value: 0
            },
            'comment': {
                element: $('#comment-input')
            }
        }

        this.registerServiceRatingEvents();
        this.registerProductRatingEvents();
    }

    registerServiceRatingEvents() {
        Object.keys(this.fields['service-rating'].element).forEach(index => {
            const field = $(this.fields['service-rating'].element[index]);
            if (index !== 'length' && index !== 'prevObject') {
                field.on('click', (e) => {
                    this.updateServiceRating(e);
                })
            }
        })
    }

    registerProductRatingEvents() {
        Object.keys(this.fields['product-rating'].element).forEach(index => {
            const field = $(this.fields['product-rating'].element[index]);
            if (index !== 'length' && index !== 'prevObject') {
                field.on('click', (e) => {
                    this.updateProductRating(e);
                })
            }
        })
    }

    updateProductRating(e) {
        if (this.isValidationActive) {
            this.validate();
        }
        this.fields['product-rating'].value = Number(e.currentTarget.attributes[0].value);
    }

    updateServiceRating(e) {
        if (this.isValidationActive) {
            this.validate();
        }
        this.fields['service-rating'].value = Number(e.currentTarget.attributes[0].value);
    }

    fetchProducts() {
        const products = ['Item 1', 'item 2', 'item 3'];
        this.fields['products'].element.html(`<option value='default' >Select a product</option>`);
        products.forEach(product => {
            const prevProducts = this.fields['products'].element.html();
            this.fields['products'].element.html(prevProducts + `<option value="${product}">${product}</option>`);
        })
    }

    validateAndSubmit() {
        this.isValidationActive = true;
        if (this.validate()) {
            this.submit()
                .then(() => {
                    this.clearFormFields();
                    this.showSuccessMessage();
                })
        }
    }

    validate() {
        let isValid = true;
        Object.keys(this.fields).forEach(fieldName => {
            let value = '';
            switch (fieldName) {
                case 'name':
                    value = this.fields[fieldName].element.val();
                    if (value === '') {
                        isValid = false;
                        this.fields[fieldName].element.attr('placeholder', 'Required');
                        this.fields[fieldName].element.css('border-bottom', '1px solid red');
                    } else {
                        this.fields[fieldName].element.css('border-bottom', '1px solid white');
                    }
                    this.fields[fieldName].element.on('keyup', () => {
                        this.validate();
                    })
                    break;
                case 'company':
                    value = this.fields[fieldName].element.val();
                    if (value === '') {
                        isValid = false;
                        this.fields[fieldName].element.attr('placeholder', 'Required');
                        this.fields[fieldName].element.css('border-bottom', '1px solid red');
                    } else {
                        this.fields[fieldName].element.css('border-bottom', '1px solid white');
                    }
                    this.fields[fieldName].element.on('keyup', () => {
                        this.validate();
                    })
                    break;
                case 'products':
                    value = this.fields[fieldName].element.val();
                    if (value === 'default') {
                        isValid = false;
                        this.fields[fieldName].element.attr('placeholder', 'Required');
                        this.fields[fieldName].element.css('border-bottom', '1px solid red');
                        this.fields[fieldName].element.css('color', 'rgb(255, 151, 151)');
                    } else {
                        this.fields[fieldName].element.css('color', 'white');
                        this.fields[fieldName].element.css('border-bottom', '1px solid white');
                    }
                    this.fields[fieldName].element.on('change', () => {
                        this.validate();
                    })
                    break;
                case 'date':
                    value = this.fields[fieldName].element.val();
                    if (value === '') {
                        isValid = false;
                        this.fields[fieldName].element.css('color', ' rgb(255, 151, 151)');
                        this.fields[fieldName].element.css('border-bottom', '1px solid red');
                    } else {
                        this.fields[fieldName].element.css('color', 'white');
                        this.fields[fieldName].element.css('border-bottom', '1px solid white');
                    }
                    this.fields[fieldName].element.on('change', () => {
                        this.validate();
                    })
                    break;
                case 'service-rating':
                    if (this.fields['service-rating'].value === 0) {
                        isValid = false;
                        toastr.error('Please provide ratings')
                    }
                    break;
                case 'product-rating':
                    if (this.fields['product-rating'].value === 0) {
                        isValid = false;
                        toastr.error('Please provide ratings')
                    }
                    break;
                case 'comment':
                    value = this.fields[fieldName].element.val();
                    if (value === '') {
                        isValid = false;
                        this.fields[fieldName].element.attr('placeholder', 'Required');
                        this.fields[fieldName].element.css('border-bottom', '1px solid red');
                    } else {
                        this.fields[fieldName].element.css('border-bottom', '1px solid white');
                    }
                    this.fields[fieldName].element.on('keyup', () => {
                        this.validate();
                    })
                    break;
            }
        })
        return isValid;
    }

    clearFormFields() {
        this.isValidationActive = false;
        Object.keys(this.fields).forEach(fieldName => {
            let value = '';
            switch (fieldName) {
                case 'name':
                    value = this.fields[fieldName].element.val('');
                    break;
                case 'company':
                    value = this.fields[fieldName].element.val('');
                    break;
                case 'products':
                    value = this.fields[fieldName].element.val('');
                    break;
                case 'date':
                    value = this.fields[fieldName].element.val('');
                    break;
                case 'comment':
                    value = this.fields[fieldName].element.val('');
                    break;
            }
        })
    }

    submit() {
        return new Promise(resolve => {
            // $.ajax({
            //     url: 'http://some-url',
            //     method: 'POST',
            //     params: {
            //         a: 1
            //     },
            //     success: () => {
            //         console.log('k');
            //         resolve(true);
            //     }
            // })
            resolve(true);
        })
    }

    showSuccessMessage() {
        $('.dim').css('display', 'block');
    }

    setToastrOptions() {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
    }

}