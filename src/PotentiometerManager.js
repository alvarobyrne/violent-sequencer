let globals = require('./globalsSC');
const SVG_NS = globals.SVG_NS;
const SVGElementSC = require('./SVGElementSC');
class Potentiometer extends SVGElementSC{
    constructor(parent){
        super(parent);
        const circle = document.createElementNS(SVG_NS,'circle');
        circle.setAttribute('r',30)
        this.setAsCut(circle);
        this.parent.appendChild(circle)
        this.element = circle;
    }
}
class PotentiometerManager extends SVGElementSC{
    constructor(parent){
        super(parent)
    }
    render(){
        const pot = new Potentiometer(this.parent);
        for (let index = 0; index < 8; index++) {
            const clone = pot.element.cloneNode();
            this.parent.appendChild(clone);
            clone.setAttribute('transform',`translate(${index*30})`)
        }
    }
}
module.exports = PotentiometerManager;