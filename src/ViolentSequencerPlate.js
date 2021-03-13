const SVGElementSC = require("./SVGElementSC");
let globals = require('./globalsSC');
const SVG_NS = globals.SVG_NS;
const to_px = globals.to_px;
const violentData = globals.violentData;

class ViolentSequencerPlate extends SVGElementSC{
    constructor(parent){
        super(parent)
        const rect = document.createElementNS(SVG_NS, 'rect');
        const wPX = to_px(violentData.dimensions.width);
        const hPX = to_px(violentData.dimensions.height);
        rect.setAttribute('width',wPX)
        rect.setAttribute('height',hPX)
        this.setAsCut(rect);
        const circle = document.createElementNS(SVG_NS, 'circle');
        const rPX = to_px(1.5);
        circle.setAttribute('r',rPX);
        this.setAsCut(circle)
        const vMarginPX = to_px(3)+rPX;
        const hMarginPX = to_px(5)+rPX;
        this.getCircle(circle,vMarginPX,hMarginPX)
        this.getCircle(circle,wPX-vMarginPX,hMarginPX)
        this.getCircle(circle,wPX-vMarginPX,hPX-hMarginPX)
        this.getCircle(circle,vMarginPX,hPX-hMarginPX)
        this.element.appendChild(rect)
        this.element.appendChild(circle)
        circle.remove()
    }
    getCircle(circle,x,y){
        const c = circle.cloneNode();
        c.setAttribute('transform',`translate(${x},${y})`)
        this.element.appendChild(c);
    }
}
module.exports = ViolentSequencerPlate