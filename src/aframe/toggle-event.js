AFRAME.registerComponent('toggle-event', {
  multiple: true,

  schema: {
    event: {type: 'string', default: 'click'},
    event1: {type: 'string', default: 'click1'},
    event2: {type: 'string', default: 'click2'},
  },

  init: function() {
    this.ind = 1;
    this.onEvent = this.onEvent.bind(this);
    this.el.addEventListener(this.data.event, this.onEvent);
  },

  remove: function() {
    this.el.removeEventListener(this.data.event, this.onEvent);
  },

  onEvent: function(evt) {
    if(this.ind === 1) {
      this.el.emit(this.data.event1);
      this.ind = 0;
    } else {
      this.el.emit(this.data.event2);
      this.ind = 1;
    }
  },

});