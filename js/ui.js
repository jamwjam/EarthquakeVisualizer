var guiOption = function () {
    this.timeCounter = 0;
};

function setUpGUI() {
    var options = new guiOption();
    var gui = new dat.GUI();
    gui.add(options, 'timeCounter', 0, 360).listen();
}
