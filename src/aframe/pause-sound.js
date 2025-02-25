AFRAME.registerComponent('pause-sound', {
  multiple: true,

  schema: {
    event: {type: 'string', default: 'click'},
  },

  init: function() {
    this.onEvent = this.onEvent.bind(this);
    this.el.addEventListener(this.data.event, this.onEvent);
  },

  remove: function() {
    this.el.removeEventListener(this.data.event, this.onEvent);
  },

  onEvent: function(evt) {
      this.el.components.sound.pauseSound();
  },

});