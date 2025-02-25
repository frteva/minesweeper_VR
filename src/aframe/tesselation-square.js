AFRAME.registerComponent('tesselation-square', {
  schema: {
    row: {type: 'number', default: 10},
    col: {type: 'number', default: 10},
    boxSize: {type: 'number', default: 1},
    gap: {type: 'number', default: 0.1},
    color: {type: 'color', default: '#777777'},
    base_position_x: {type: 'number', default: 0},
    base_position_y: {type: 'number', default: 0},
    mine: {type: 'boolean', default: false},
  },
  init: function () {
    console.log('tesselation-square');
    console.log(this.el);
    const box = document.createElement('a-box');
    box.setAttribute('width', this.data.boxSize);
    box.setAttribute('height', this.data.boxSize);
    box.setAttribute('depth', this.data.boxSize);
    box.setAttribute('color', this.data.color);

    for (let x = 0; x < this.data.row; x++) {
      for(let y = 0; y< this.data.col; y++) {
        const clone = box.cloneNode();
        clone.setAttribute('position', `${this.data.base_position_x + x * (this.data.boxSize + this.data.gap)} 0 ${this.data.base_position_y + y * (this.data.boxSize + this.data.gap)}`);
        this.el.appendChild(clone);
      }
    }
    // setTimeout(() => this.el.setAttribute('tesselation-square', {depth: 20, width: 20}), 5000);
  },
  update: function () {
    console.log(this.data);
  },
  tick: function () {

  }
});