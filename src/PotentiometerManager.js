const { to_px } = require('./globalsSC');
let globals = require('./globalsSC');
const SVG_NS = globals.SVG_NS;
const SVGElementSC = require('./SVGElementSC');
class Potentiometer extends SVGElementSC{
    constructor(parent){
        super(parent);
        this.element =this.getGroup();
        const potGroup = this.drawPotentiometer();
        const switchGroup = this.drawSwitch();
        const w = to_px(17);
        // this.element.setAttribute('transform',`translate(${-w*0.5},${-w*0.5})`)
        switchGroup.setAttribute('transform',`translate(${-to_px(5*0.5)},${to_px(17)})`)
        // this.element.setAttribute('y',-w*0.5)
        this.element.appendChild(switchGroup);
        this.element.appendChild(potGroup);
        this.parent.appendChild(this.element)
    }
    drawPotentiometer(){
        const gr = this.getGroup();
        const circle = document.createElementNS(SVG_NS,'circle');
        const rect = document.createElementNS(SVG_NS,'rect');
        const w = to_px(17);
        const h = to_px(25);
        rect.setAttribute('width',w)
        rect.setAttribute('height',h)
        this.setAsRaw(rect);
        rect.setAttribute('x',-w*0.5)
        rect.setAttribute('y',-w*0.5)
        circle.setAttribute('r',to_px(7/2))
        this.setAsCut(circle);
        gr.appendChild(circle)
        gr.appendChild(rect)

        return gr;
    }
    drawSwitch(){
        const gr = this.getGroup();
        const rect = document.createElementNS(SVG_NS,'rect');
        const rectGuide = document.createElementNS(SVG_NS,'rect');
        rect.setAttribute('width',to_px(5));
        const holeHeightMM = 12;
        const holeHeightPX = to_px(holeHeightMM);
        rect.setAttribute('height',holeHeightPX);
        rectGuide.setAttribute('width',to_px(5));
        const wholeHeightMM = 20;
        const wholeHeightPX = to_px(wholeHeightMM);
        rectGuide.setAttribute('height',wholeHeightPX);
        rectGuide.setAttribute('y',-0.5*to_px(wholeHeightMM-holeHeightMM));
        this.setAsCut(rect);
        this.setAsRaw(rectGuide)
        const circle = document.createElementNS(SVG_NS,'circle');
        circle.setAttribute('r',to_px(1));
        this.setAsCut(circle);
        circle.setAttribute('cx',to_px(5*0.5))
        circle.setAttribute('cy',to_px(-2))
        const clone = circle.cloneNode();
        clone.setAttribute('transform',`translate(${0},${holeHeightPX+to_px(4)})`)
        gr.appendChild(rect);
        gr.appendChild(circle);
        gr.appendChild(rectGuide);
        gr.appendChild(clone);
        return gr;
    }
}
class PotentiometerManager extends SVGElementSC{
    constructor(parent,config){
        super(parent);
        this.columnWidthPX=config.columnWidthPX;
        this.frameWidthPX=config.frameWidthPX;
        this.frameHeightPX = config.frameHeightPX;
        this.frameMargin = config.frameMargin;
        this.distanceUpperPX = config.distanceUpperPX;
    }
    render(){
        const frameGroup = this.getGroup();
        const frame = document.createElementNS(SVG_NS,'rect');
        this.setAsEngraving(frame);
        frame.setAttribute('width',this.frameWidthPX)
        frame.setAttribute('height',this.frameHeightPX)
        frameGroup.setAttribute('transform',`translate(${this.frameMargin},${this.frameMargin})`)
        frameGroup.appendChild(frame);
        const pot = new Potentiometer(this.parent);
        for (let index = 0; index < 8; index++) {
            const clone = pot.element.cloneNode(true);
            frameGroup.appendChild(clone);
            let y = index%2===0?0:this.frameHeightPX/2;
            y+=this.distanceUpperPX;
            clone.setAttribute('transform',`translate(${(index+0.5)*this.columnWidthPX},${y})`)
        }
        pot.element.remove()
    }
}
module.exports = PotentiometerManager;