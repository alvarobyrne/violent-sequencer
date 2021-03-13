const mmppx = 3.7796;
function to_px(value) {
    return mmppx * value
}
const violentData={
    dimensions :{
        width:21,
        height:12,
        units:'cm'
    }
}
let globals = {
    SVG_NS : "http://www.w3.org/2000/svg",
    to_px,
    violentData
}

module.exports = globals;