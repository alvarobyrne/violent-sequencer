const { to_px } = require('./globalsSC');
let globals = require('./globalsSC');
const SVG_NS = globals.SVG_NS;
const SVGElementSC = require('./SVGElementSC');
class Potentiometer extends SVGElementSC{
    constructor(parent){
        super(parent);
        const boundsWidthPX = to_px(17);
        const boundsHeightPX = to_px(25);
        const diameter = 7;
        this.element =this.getGroup();
        const potGroup = this.drawPotentiometer(diameter,boundsWidthPX,boundsHeightPX);
        const switchGroup = this.drawSwitch(boundsWidthPX);
        // this.element.setAttribute('transform',`translate(${-w*0.5},${-w*0.5})`)
        // this.element.setAttribute('y',-w*0.5)
        this.element.appendChild(switchGroup);
        this.element.appendChild(potGroup);
        this.parent.appendChild(this.element)
    }
    drawPotentiometer(d,w,h){
        const gr = this.getGroup();
        const circle = document.createElementNS(SVG_NS,'circle');
        const rect = document.createElementNS(SVG_NS,'rect');
        rect.setAttribute('width',w)
        rect.setAttribute('height',h)
        this.setAsRaw(rect);
        rect.setAttribute('x',-w*0.5)
        rect.setAttribute('y',-w*0.5)
        circle.setAttribute('r',to_px(d*0.5))
        this.setAsCut(circle);
        gr.appendChild(circle)
        gr.appendChild(rect)

        return gr;
    }
    drawSwitch(boundsWidthPX){
        const holeWidthMM = 5;
        const holeHeightMM = 10;
        const boundsHeightMM = 20;
        const boundsWidthMM = holeWidthMM;
        const holeHeightPX = to_px(holeHeightMM);
        const wholeHeightPX = to_px(boundsHeightMM);
        const boltHoleDiameterMM = 2;
        const boltHoleRadiusMM = boltHoleDiameterMM*0.5;
        const boltHoleVertGapMM = 1.5;
        const boltHoleVertSep = boltHoleVertGapMM + boltHoleRadiusMM;
        const heightDiffPX = to_px(boundsHeightMM - holeHeightMM);
        const gr = this.getGroup();
        const rect = document.createElementNS(SVG_NS,'rect');
        const rectBound = document.createElementNS(SVG_NS,'rect');
        rect.setAttribute('width',to_px(holeWidthMM));
        rect.setAttribute('height',holeHeightPX);
        this.setAsCut(rect);
        rectBound.setAttribute('width',to_px(boundsWidthMM));
        rectBound.setAttribute('height',wholeHeightPX);
        rectBound.setAttribute('y',-0.5*heightDiffPX);
        this.setAsRaw(rectBound)
        const circle = document.createElementNS(SVG_NS,'circle');
        circle.setAttribute('r',to_px(boltHoleRadiusMM));
        circle.setAttribute('cx',to_px(holeWidthMM*0.5))
        circle.setAttribute('cy',to_px(-(boltHoleVertSep)))
        this.setAsCut(circle);
        const circleClone = circle.cloneNode();
        circleClone.setAttribute('transform',`translate(${0},${to_px(2*boltHoleVertSep+holeHeightMM)})`)
        gr.appendChild(rect);
        gr.appendChild(circle);
        gr.appendChild(rectBound);
        gr.appendChild(circleClone);
        gr.setAttribute('transform',`translate(${-to_px(5*0.5)},${boundsWidthPX+heightDiffPX})`)
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