// CIS 371 AJAX Assignment 15
// Ron Patrick
// Calendar.js MVC starter

var model;
var view;
var controller;

function calendar() {
    model = new CalendarModel();
    view = new CalendarView(model);
    controller = new CalendarController(model, view);
}