const Exporter = require('./Exporter');
const dat = require('dat.gui');
const ServoManager = require('./ServoMotor');
const globals = require('./globalsSC');
const to_px = globals.to_px;
const violentData = globals.violentData;
const SVG_NS = globals.SVG_NS;
class App{
    constructor(){
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttributeNS(SVG_NS,'viewbox','0 0 1000 1000')
        svg.setAttribute('xmlns', SVG_NS)
        svg.setAttribute('id', 'svg')
        svg.setAttribute('width', `${to_px(210*1.25)}`)
        svg.setAttribute('height', `${to_px(210)}`)
        svg.style.zoom=0.6;
        svg.style.border='1px solid black';
        document.body.appendChild(svg)

        const gui = new dat.GUI;
        gui.add(this,'export')
        
        this.svg = svg;
    }
    render(){
        const mainGroup = document.createElementNS(SVG_NS, 'g');
        const rect = document.createElementNS(SVG_NS, 'rect');
        mainGroup.setAttribute('transform','translate(10,10)')
        rect.setAttribute('width',to_px(violentData.dimensions.width*10))
        rect.setAttribute('height',to_px(violentData.dimensions.height*10))
        rect.setAttribute('fill','none')
        rect.setAttribute('stroke','red')
        svg.appendChild(mainGroup)
        mainGroup.appendChild(rect)
        let servoManager = new ServoManager(mainGroup,{distanceUpperMM:10});
        servoManager.render()
        
    }
    export(){
        Exporter.run(this.svg)
    }
}
module.exports = App;