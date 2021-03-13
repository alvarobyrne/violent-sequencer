const { to_px } = require('./globalsSC');
let globals = require('./globalsSC');
const SVG_NS = globals.SVG_NS;
const SVGElementSC = require('./SVGElementSC');
const ViolentSequencerPlate = require('./ViolentSequencerPlate');
class Potentiometer extends SVGElementSC{
    constructor(parent){
        super(parent);
        const boundsWidthPX = to_px(17);
        this.boundsWidthPX = boundsWidthPX;
        this.boundsHeightPX = to_px(25);
        const boundsHeightPX = this.boundsHeightPX;
        const diameter = 7;
        this.ledRadiusPX = to_px(2.5);
        this.element =this.getGroup();
        const potGroup = this.drawPotentiometer(diameter,boundsWidthPX,boundsHeightPX);
        this.ledGroup = this.drawLED(0,boundsHeightPX);
        this.element.appendChild(this.ledGroup);
        this.element.appendChild(potGroup);
        this.parent.appendChild(this.element);

    }
    drawPotentiometer(d,w,h){
        const gr = this.getGroup();
        const rect = document.createElementNS(SVG_NS,'rect');
        rect.setAttribute('width',w)
        rect.setAttribute('height',h)
        rect.setAttribute('x',-w*0.5)
        rect.setAttribute('y',-w*0.5)
        this.setAsRaw(rect);
        const circle = document.createElementNS(SVG_NS,'circle');
        circle.setAttribute('r',to_px(d*0.5))
        this.setAsCut(circle);
        gr.appendChild(circle)
        gr.appendChild(rect)

        return gr;
    }
    drawLED(x,y){
        const circle = document.createElementNS(SVG_NS,'circle');
        circle.setAttribute('r',this.ledRadiusPX)
        circle.setAttribute('transform',`translate(${x},${y})`)
        this.setAsCut(circle)
        return circle
    }
    
}
class PotentiometerWithSwitch extends Potentiometer{
    constructor(main){
        super(main)
        this.holeWidthMM = 5;
        this.holeHeightMM = 10;
        const boundsHeightMM = 20;
        this.wholeHeightPX = to_px(boundsHeightMM);
        this.heightDiffPX = 0.5*to_px(boundsHeightMM - this.holeHeightMM);
        this.holeHeightPX = to_px(this.holeHeightMM);

        const switchGroup = this.drawSwitch(this.boundsWidthPX);
        this.element.appendChild(switchGroup);
        const ledYPX = -this.boundsWidthPX*0.5+this.boundsHeightPX+this.wholeHeightPX+this.ledRadiusPX+1;
        this.ledGroup.setAttribute('transform',`translate(${0},${ledYPX})`)

    }
    drawSwitch(boundsWidthPX){
        const holeWidthMM = this.holeWidthMM;
        const holeHeightMM = this.holeHeightMM;
        const boundsHeightMM = this.boundsHeightMM;
        const boundsWidthMM = this.holeWidthMM;
        // const holeHeightPX = to_px(holeHeightMM);
        // const wholeHeightPX = to_px(boundsHeightMM);
        const boltHoleDiameterMM = 2;
        const boltHoleRadiusMM = boltHoleDiameterMM*0.5;
        const boltHoleVertGapMM = 1.5;
        const boltHoleVertSep = boltHoleVertGapMM + boltHoleRadiusMM;
        const gr = this.getGroup();
        const rect = document.createElementNS(SVG_NS,'rect');
        const rectBound = document.createElementNS(SVG_NS,'rect');
        rect.setAttribute('width',to_px(holeWidthMM));
        rect.setAttribute('height',this.holeHeightPX);
        this.setAsCut(rect);
        rectBound.setAttribute('width',to_px(boundsWidthMM));
        rectBound.setAttribute('height',this.wholeHeightPX);
        rectBound.setAttribute('y',-this.heightDiffPX);
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
        gr.setAttribute('transform',`translate(${-to_px(5*0.5)},${boundsWidthPX+this.heightDiffPX})`)
        return gr;
    }
}
class PotentiometerManager extends ViolentSequencerPlate{
    constructor(parent,config){
        super(parent);
        this.columnWidthPX=config.columnWidthPX;
        this.frameWidthPX=config.frameWidthPX;
        this.frameHeightPX = config.frameHeightPX;
        this.frameMargin = config.frameMargin;
        this.distanceUpperPX = config.distanceUpperPX;
        this.isSwitch = config.isSwitch;
    }
    render(){
        const frameGroup = this.getGroup();
        this.element.appendChild(frameGroup);
        const frame = document.createElementNS(SVG_NS,'rect');
        this.setAsEngraving(frame);
        frame.setAttribute('width',this.frameWidthPX)
        frame.setAttribute('height',this.frameHeightPX)
        frameGroup.setAttribute('transform',`translate(${this.frameMargin},${this.frameMargin})`)
        frameGroup.appendChild(frame);
        const pot = this.isSwitch?new PotentiometerWithSwitch(this.parent):new Potentiometer(this.parent);
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