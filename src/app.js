const Exporter = require('./Exporter');
const dat = require('dat.gui');
class App{
    constructor(){
        const gui = new dat.GUI;
        const SVG_NS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttributeNS(SVG_NS,'viewbox','0 0 1000 1000')
        svg.setAttribute('xmlns', SVG_NS)
        svg.setAttribute('id', 'svg')
        svg.setAttribute('width', '800')
        svg.setAttribute('height', '600')

        gui.add(this,'export')
        gui.add(this,'bang')
        const mmppx = 3.7796;
        function to_px(value) {
            return mmppx * value
        }
        this.svg = svg;
        document.body.appendChild(svg)
        const rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttribute('x',to_px(10))
        rect.setAttribute('y',to_px(15))
        rect.setAttribute('width',to_px(100))
        rect.setAttribute('height',to_px(50))
        rect.setAttribute('fill','none')
        rect.setAttribute('stroke','black')
        svg.appendChild(rect)
    }
    export(){
        console.log('Boom!')
        this
        console.log('this: ', this);
        Exporter.run(this.svg)
    }
    bang(){
        console.log('Bang!')
    }
}
module.exports = App;