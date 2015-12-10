"use strict";

/**
 * Constructor
 * @param container
 * @constructor
 */
var Walle = function (container) {

  this.document = jQuery(document);

  //init vars;
  this.grid = {intersections: Snap.set(), horizontal: Snap.set(), vertical: Snap.set()};
  this.drawers = {};
  this.width = container.offsetWidth;
  this.height = container.offsetHeight;

  // init wrapper
  this.wrapper = jQuery("<div/>", {
    width: this.width,
    height: this.height,
    class: 'walle-wrapper'
  });
  this.wrapper.appendTo(container);

  //init paper
  this.paper = Snap(this.width, this.height);
  this.paper.appendTo(this.wrapper.get(0));

  //init abort
  this.document.on("keyup", (event) => {
    if (event.keyCode == 27) {
      this.document.trigger("walle.abort");
    }
  });
};


Walle.prototype.registerAbort = function (handle, context) {
  context = context || this;
  this.document.one("walle.abort", handle.bind(context));
};

Walle.prototype.unregisterAbort = function (handle) {
  this.document.off("walle.abort");
};

/**
 * Easter egg
 */
Walle.prototype.easterEgg = function () {
  let bigCircle = this.paper.circle(150, 150, 100);
  bigCircle.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 5
  });

  this.paper.click(function (d) {
    bigCircle.animate({
      cx: d.x,
      cy: d.y,
      r: (Math.random() * 100) + 50
    }, 1000, mina.bounce);
  });

};

/**
 * wallsDrawer
 * @returns {WallsDrawer}
 */
Walle.prototype.wallsDrawer = function () {
  if (!this.drawers.hasOwnProperty("walls")) {
    this.drawers.wallsDrawer = new WallsDrawer(this);
  }
  return this.drawers.wallsDrawer;
};

/**
 * showGrid
 */
Walle.prototype.showGrid = function () {
  let width = this.paper.attr("width");
  let height = this.paper.attr("height");
  let step = 30;

  //horizontal
  for (let x = 0; x <= width; x += step) {
    let line = this.paper.line(x, 0, x, height);
    line.attr({strokeWidth: 1, stroke: "#eee"});
    this.grid.vertical.push(line);
  }

  //vertical
  for (let y = 0; y <= height; y += 30) {
    let line = this.paper.line(0, y, width, y);
    line.attr({strokeWidth: 1, stroke: "#eee"});
    this.grid.horizontal.push(line);
  }
};


/**
 * hideGrid
 */
Walle.prototype.hideGrid = function () {

  this.grid.vertical.forEach(function (element) {
    element.remove();
  });
  this.grid.horizontal.forEach(function (element) {
    element.remove();
  });

};


/**
 * changeCursor
 */
Walle.prototype.changeCursor = function (cursor) {
  this.wrapper.css('cursor', cursor);
};


