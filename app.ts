import {FeedBackForm}  from "./typescript/feedback-form";

const feedbackForm = new FeedBackForm(); 

window['validateAndSubmit'] = () => {
    feedbackForm.validateAndSubmit();
}