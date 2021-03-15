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
        svg.setAttribute('width', `${to_px(350)}`)
        svg.setAttribute('height', `${to_px(250)}`)
        svg.style.zoom=0.4;
        svg.style.border='1px solid black';
        document.body.appendChild(svg)

        const gui = new dat.GUI;
        gui.add(this,'export')
        gui.add(Exporter,'clearGuides')
        gui.add(Exporter,'clearEngravings')
        
        this.svg = svg;
        
        const frameMarginMM = 6;//px
        const frameMarginPX = to_px(frameMarginMM);//px
        const frameHeightMM = violentData.dimensions.height;
        const frameWidthMM = violentData.dimensions.width;
        console.log('frameWidthMM', frameWidthMM)
        console.log('frameHeightMM', frameHeightMM)
        const frameWidthPX = to_px(frameWidthMM)-frameMarginPX*2;
        const frameHeightPX = to_px(frameHeightMM)-frameMarginPX*2;
        this.sequenceStepsAmount = 8;
        const columnsAmount= this.sequenceStepsAmount;
        this.columnWidthPX = frameWidthPX/columnsAmount;
        this.config = {
            frameHeightPX,
            frameWidthPX,
            frameMargin: frameMarginPX
        }
        const mainGroup = document.createElementNS(SVG_NS, 'g');
        this.mainGroup = mainGroup;
        svg.appendChild(mainGroup);
        this.isOverlap =true;
        this.isOverlap =false;

    }
    render(){
        const mainGroup = this.mainGroup;
        mainGroup.setAttribute('transform','translate(30,8)')
        const distanceUpperMM = 5;
        let distanceUpperPX = to_px(distanceUpperMM);
        let servoManager = new ServoManager(mainGroup,{
            distanceUpperMM,
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
            ,isSwitch:true
            ,isSwitch:false
            ,...this.config
        }
        const potManager = new PotentiometerManager(mainGroup, potsConfig);
        potManager.render();
        let overlapV_PX = this.config.frameHeightPX;
        if(!this.isOverlap){
            overlapV_PX=to_px(violentData.dimensions.height);
            servoManager.element.setAttribute('transform',`translate(0,${overlapV_PX+23})`);
        }
    }
    export(){
        Exporter.runAndOpen(this.svg)
    }
}
module.exports = App;