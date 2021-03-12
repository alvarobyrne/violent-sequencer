class Exporter{
    constructor(){
        console.log('Exporter')
        this.svg = null;
    }
    run(svg){
        const outerHTML = svg.outerHTML;
        fs.writeFileSync('tmp.svg',outerHTML,'utf8')
        const shell = nw.Shell;
        const filePath = path.join(CWD, 'tmp.svg');
        console.log('filePath: ', filePath);

        shell.openItem(filePath)

    }
}
module.exports = new Exporter()