declare var $: any;
declare var toastr: any;


export class FeedBackForm {

    fields = {};
    isValidationActive = false;
    toastrShown = false;
    baseUrl = 'https://us-central1-snowmaster-feedback.cloudfunctions.net';

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
            'order-submission': {
                element: $('.order-submission-star-label'),
                value: 0
            },
            'punctuality-rating': {
                element: $('.punctuality-star-label'),
                value: 0
            },
            'discipline-rating': {
                element: $('.discipline-star-label'),
                value: 0
            },
            'product-handling-rating': {
                element: $('.product-handling-star-label'),
                value: 0
            },
            'product-satisfaction-rating': {
                element: $('.product-satisfaction-star-label'),
                value: 0
            },
            'comment': {
                element: $('#comment-input')
            }
        }
        this.registerOrderSubmissionEvents();
        this.registerPunctualityRatingEvents();
        this.registerDisciplineRatingEvents();
        this.registerProductHandlingRatingEvents();
        this.registerProductSatisfactionRatingEvents();
    }

    registerOrderSubmissionEvents() {
        Object.keys(this.fields['order-submission'].element).forEach(index => {
            const field = $(this.fields['order-submission'].element[index]);
            if (index !== 'length' && index !== 'prevObject') {
                field.on('click', (e) => {
                    this.updateOrderSubmissionRating(e);
                })
            }
        })
    }

    registerPunctualityRatingEvents() {
        Object.keys(this.fields['punctuality-rating'].element).forEach(index => {
            const field = $(this.fields['punctuality-rating'].element[index]);
            if (index !== 'length' && index !== 'prevObject') {
                field.on('click', (e) => {
                    this.updatePunctualityRating(e);
                })
            }
        })
    }

    registerDisciplineRatingEvents() {
        Object.keys(this.fields['discipline-rating'].element).forEach(index => {
            const field = $(this.fields['discipline-rating'].element[index]);
            if (index !== 'length' && index !== 'prevObject') {
                field.on('click', (e) => {
                    this.updateDisciplineRating(e);
                })
            }
        })
    }

    registerProductHandlingRatingEvents() {
        Object.keys(this.fields['product-handling-rating'].element).forEach(index => {
            const field = $(this.fields['product-handling-rating'].element[index]);
            if (index !== 'length' && index !== 'prevObject') {
                field.on('click', (e) => {
                    this.updateProductHandlingRating(e);
                })
            }
        })
    }

    registerProductSatisfactionRatingEvents() {
        Object.keys(this.fields['product-satisfaction-rating'].element).forEach(index => {
            const field = $(this.fields['product-satisfaction-rating'].element[index]);
            if (index !== 'length' && index !== 'prevObject') {
                field.on('click', (e) => {
                    this.updateProductSatisfactionRating(e);
                })
            }
        })
    }

    updatePunctualityRating(e) {
        if (this.isValidationActive) {
            this.validate();
        }
        this.fields['punctuality-rating'].value = Number(e.currentTarget.attributes[0].value);
    }

    updateOrderSubmissionRating(e) {
        if (this.isValidationActive) {
            this.validate();
        }
        this.fields['order-submission'].value = Number(e.currentTarget.attributes[0].value);
    }

    updateDisciplineRating(e) {
        if (this.isValidationActive) {
            this.validate();
        }
        this.fields['discipline-rating'].value = Number(e.currentTarget.attributes[0].value);
    }

    updateProductHandlingRating(e) {
        if (this.isValidationActive) {
            this.validate();
        }
        this.fields['product-handling-rating'].value = Number(e.currentTarget.attributes[0].value);
    }

    updateProductSatisfactionRating(e) {
        if (this.isValidationActive) {
            this.validate();
        }
        this.fields['product-satisfaction-rating'].value = Number(e.currentTarget.attributes[0].value);
    }

    fetchProducts() {
        let products = [];
        $.ajax({
            url: this.baseUrl + '/getAllProducts',
            method: 'POST',
            success: (response) => {
                products = response;
                this.fields['products'].element.html(`<option value='default' >Select a product</option>`);
                products.forEach(product => {
                    const prevProducts = this.fields['products'].element.html();
                    this.fields['products'].element.html(prevProducts + `<option value="${product.id}">${product.name}</option>`);
                })
            }
        })
    }

    validateAndSubmit() {
        this.isValidationActive = true;
        this.toastrShown = false;
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
                case 'order-submission':
                    if (!this.toastrShown && this.fields['order-submission'].value === 0) {
                        this.toastrShown = true;
                        isValid = false;
                        toastr.error('Please provide ratings')
                    }
                    break;
                case 'punctuality-rating':
                    if (!this.toastrShown && this.fields['punctuality-rating'].value === 0) {
                        this.toastrShown = true;
                        isValid = false;
                        toastr.error('Please provide ratings')
                    }
                    break;
                case 'discipline-rating':
                    if (!this.toastrShown && this.fields['discipline-rating'].value === 0) {
                        this.toastrShown = true;
                        isValid = false;
                        toastr.error('Please provide ratings')
                    }
                    break;
                case 'product-handling-rating':
                    if (!this.toastrShown && this.fields['product-handling-rating'].value === 0) {
                        this.toastrShown = true;
                        isValid = false;
                        toastr.error('Please provide ratings')
                    }
                    break;
                case 'product-satisfaction-rating':
                    if (!this.toastrShown && this.fields['product-satisfaction-rating'].value === 0) {
                        this.toastrShown = true;
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

    formatData() {
        return {
            name: this.fields['name'].element.val(),
            company: this.fields['company'].element.val(),
            date: this.fields['date'].element.val(),
            product: this.fields['products'].element.val(),
            order_submission_rating: this.fields['order-submission'].value,
            punctuality_rating: this.fields['punctuality-rating'].value,
            discipline_rating: this.fields['discipline-rating'].value,
            product_handling_rating: this.fields['product-handling-rating'].value,
            product_satisfaction_rating: this.fields['product-satisfaction-rating'].value,
            comment: this.fields['comment'].element.val(),
            recorded_on: + new Date()
        }
    }

    submit() {
        const feedBack = this.formatData();
        $('#submit-button').html('Submitting');
        $('#submit-button').attr('disabled', 'true');
            return new Promise(resolve => {
            $.ajax({
                url: this.baseUrl + '/submitFeedback',
                method: 'POST',
                data: feedBack,
                success: () => {
                    console.log('k');
                    resolve(true);
                }
            })
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