let globals = require('./globalsSC');
const SVG_NS = globals.SVG_NS;
class SVGElementSC{
    constructor(parent){
        this.parent = parent;
        this.element= null;
    }
    getGroup(){
        const group = document.createElementNS(SVG_NS, 'g');
        this.parent.appendChild(group);
        return group;
    }
    setAsCut(element){
        element.setAttribute('stroke','red')
        element.setAttribute('fill','none')
    }
    setAsRaw(element){
        element.setAttribute('stroke','darkgreen')
        element.setAttribute('fill','none')
        element.classList.add('guide');
    }
    setAsEngraving(element){
        element.setAttribute('stroke','blue')
        element.setAttribute('fill','none')
    }
}
module.exports = SVGElementSC;