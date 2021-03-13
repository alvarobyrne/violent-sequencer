let globals = require('./globalsSC');
const SVGElementSC = require('./SVGElementSC');
const to_px = globals.to_px;
const SVG_NS = globals.SVG_NS;
const violentData = globals.violentData;
class ServoMotor extends SVGElementSC{
    constructor(mainGroup){
        super(mainGroup)
        const servoGroup = this.getGroup();
        const mainRect = document.createElementNS(SVG_NS, 'rect');
        this.widthPX = to_px(11.8);
        this.horizontalCenterPX = this.widthPX*0.5;
        this.heightPX = to_px(22.5);
        mainRect.setAttribute('width',this.widthPX);
        mainRect.setAttribute('height',this.heightPX);
        this.setAsCut(mainRect);
        servoGroup.appendChild(mainRect);
        const axisGuide = document.createElementNS(SVG_NS, 'circle');
        axisGuide.setAttribute('cx',this.horizontalCenterPX)
        axisGuide.setAttribute('cy',this.horizontalCenterPX)
        axisGuide.setAttribute('r',this.horizontalCenterPX);
        this.setAsRaw(axisGuide);
        let hole = document.createElementNS(SVG_NS,'circle');
        hole.setAttribute('cx',this.horizontalCenterPX);
        const circDist = 2.4;
        hole.setAttribute('cy',to_px(-circDist))
        hole.setAttribute('r',to_px(1));
        this.setAsCut(hole);
        let hole2 = hole.cloneNode();
        hole2.setAttribute('transform',`translate(0,${to_px(22.5+2*circDist)})`)
        servoGroup.appendChild(mainRect);
        servoGroup.appendChild(hole);
        servoGroup.appendChild(hole2);
        servoGroup.appendChild(axisGuide);
        this.element = servoGroup;
    }
}
class ServoManager extends SVGElementSC{
    constructor(mainGroup,config){
        super(mainGroup)
        this.distanceUpperPX= config.distanceUpperMM;
        this.columnWidthPX=config.columnWidthPX;
        this.sequenceStepsAmount=config.sequenceStepsAmount;
    }
    render(){
        const managerGroup = this.getGroup();
        let servoMotor = new ServoMotor(managerGroup);
        const frame = document.createElementNS(SVG_NS,'rect');
        const frameGroup = this.getGroup();
        this.element = frameGroup;
        const frameMargin = 5;//px
        frameGroup.setAttribute('transform',`translate(${frameMargin},${frameMargin})`)
        const frameWidthPX = to_px(violentData.dimensions.width)-frameMargin*2;
        const frameHeightPX = to_px(violentData.dimensions.height)-frameMargin*2;
        this.setAsEngraving(frame);
        frame.setAttribute('width',frameWidthPX)
        frame.setAttribute('height',frameHeightPX)
        frameGroup.appendChild(frame);
        let sequenceAmount = this.sequenceStepsAmount;
        let columnsAmount= sequenceAmount;
        const columnWidthPX = this.columnWidthPX;
        this.drawGuides(frameGroup,columnWidthPX,frameWidthPX,frameHeightPX);
        const distanceUpperPX=to_px(this.distanceUpperPX);
        const secondRowY_PX =frameHeightPX/2
        for (let index = 0; index < columnsAmount; index++) {
            const servoClone = servoMotor.element.cloneNode(true);
            const x = columnWidthPX*(index+0.5)-servoMotor.widthPX*0.5;
            let y = index%2===0?0:secondRowY_PX;
            y+=distanceUpperPX;
            servoClone.setAttribute('transform',`translate(${x},${y})`)
            frameGroup.appendChild(servoClone)
        }
        managerGroup.remove()
    }
    drawGuides(frameGroup,width,frameWidthPX,frameHeightPX){
        for (let index = 0; index < this.sequenceStepsAmount; index++) {
            if(index===0)continue
            const w = width*index;
            const line = document.createElementNS(SVG_NS,'line');
            frameGroup.appendChild(line);
            line.setAttribute('x1',w);
            line.setAttribute('x2',w);
            line.setAttribute('y1',0);
            line.setAttribute('y2',`${frameHeightPX}`);
            this.setAsRaw(line)

        }
        const secondRowY_PX =frameHeightPX/2
        const line = document.createElementNS(SVG_NS,'line');
        frameGroup.appendChild(line);
        line.setAttribute('x1',0);
        line.setAttribute('x2',`${frameWidthPX}`);
        line.setAttribute('y1',`${secondRowY_PX}`);
        line.setAttribute('y2',`${secondRowY_PX}`);
        this.setAsRaw(line)

    }
}

module.exports = ServoManager;