const Exporter = require('./Exporter');
const dat = require('dat.gui');
const ServoManager = require('./ServoMotor');
const PotentiometerManager = require('./PotentiometerManager');
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
        
        const frameMargin = 5;//px
        const frameHeightMM = violentData.dimensions.height;
        const frameWidthMM = violentData.dimensions.width;
        console.log('frameWidthMM', frameWidthMM)
        console.log('frameHeightMM', frameHeightMM)
        const frameWidthPX = to_px(frameWidthMM)-frameMargin*2;
        const frameHeightPX = to_px(frameHeightMM)-frameMargin*2;
        this.sequenceStepsAmount = 8;
        const columnsAmount= this.sequenceStepsAmount;
        this.columnWidthPX = frameWidthPX/columnsAmount;
        this.config = {
            frameHeightPX,
            frameWidthPX,
            frameMargin
        }
    }
    render(){
        const mainGroup = document.createElementNS(SVG_NS, 'g');
        const rect = document.createElementNS(SVG_NS, 'rect');
        mainGroup.setAttribute('transform','translate(10,10)')
        rect.setAttribute('width',to_px(violentData.dimensions.width))
        rect.setAttribute('height',to_px(violentData.dimensions.height))
        rect.setAttribute('fill','none')
        rect.setAttribute('stroke','red')
        svg.appendChild(mainGroup)
        let distanceUpperPX = to_px(10);
        mainGroup.appendChild(rect)
        let servoManager = new ServoManager(mainGroup,{
            distanceUpperMM:10,
            columnWidthPX:this.columnWidthPX
            ,sequenceStepsAmount:this.sequenceStepsAmount
            ,...this.config
        });
        servoManager.render();
        const servoOffsetY_PX = to_px(globals.servoData.width*0.5);
        const potsConfig={
            distanceUpperPX:distanceUpperPX+servoOffsetY_PX,
            columnWidthPX:this.columnWidthPX
            ,sequenceStepsAmount:this.sequenceStepsAmount
            ,...this.config
        }
        new PotentiometerManager(mainGroup,potsConfig).render()
    }
    export(){
        Exporter.run(this.svg)
    }
}
module.exports = App;