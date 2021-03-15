let globals = require('./globalsSC');
const SVG_NS = globals.SVG_NS;
class SVGElementSC{
    constructor(parent){
        this.parent = parent;
        this.element= this.getGroup();
    }
    getGroup(parent){
        const group = document.createElementNS(SVG_NS, 'g');
        if(parent){
            parent.appendChild(group);
        }else{
            this.parent.appendChild(group);
        }
        return group;
    }
    drawRectFrame(wPX,hPX){
        const rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttribute('width',wPX)
        rect.setAttribute('height',hPX)
        this.setAsCut(rect);
        this.parent.appendChild(rect)
    }
    setAsCut(element){
        element.setAttribute('stroke','red')
        element.setAttribute('fill','none')
        element.classList.add('cut');
    }
    setAsRaw(element){
        element.setAttribute('stroke','darkgreen')
        element.setAttribute('fill','none')
        element.classList.add('guide');
    }
    setAsEngraving(element){
        element.setAttribute('stroke','blue')
        element.setAttribute('fill','none')
        element.classList.add('engraving');
    }
}
module.exports = SVGElementSC;