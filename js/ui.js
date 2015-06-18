var guiOption = function (startDate, endDate) {
    this.timeCounter = startDate;
    this.startDate = startDate;
    this.endDate = endDate;
};

function setUpGUI(options) {
    var options;
    var gui = new dat.GUI({width: 550 });
    gui.add(options, 'timeCounter', options.startDate, options.endDate).listen();
}
