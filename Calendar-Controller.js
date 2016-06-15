// CIS 371 AJAX Assignment 15
// Ron Patrick
// Calendar-Controller.js

function CalendarController(model, view) {
    this._model = model;
    this._view = view;
    view.initCalendar();
}

CalendarController.prototype = {
};