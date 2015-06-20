var guiOption = function (startDate, endDate) {
    this.timeCounter = startDate;
    this.startDate = startDate;
    this.endDate = endDate;
    this.start = function() {
        console.log('you presed start');
    }
};

function setUpGUI(options) {
    var options;
    var gui = new dat.GUI({width: 550 });
    gui.add(options, 'timeCounter', options.startDate, options.endDate).listen();


}
