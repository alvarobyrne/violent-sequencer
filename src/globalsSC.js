const mmppx = 3.7796;
function to_px(value) {
    return mmppx * value
}
const violentData={
    dimensions :{
        width:210,
        height:120
    }
}
const servoData={
    width:11.8,
    height:22.5
}
let globals = {
    SVG_NS : "http://www.w3.org/2000/svg",
    to_px,
    violentData,
    servoData
}

module.exports = globals;