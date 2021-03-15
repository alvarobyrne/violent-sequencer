class Exporter{
    constructor(){
        console.log('Exporter')
        this.svg = null;
        this.fileName = 'tmp.svg';
    }
    run(svg){
        const outerHTML = svg.outerHTML;
        fs.writeFileSync(this.fileName,outerHTML,'utf8')
        
        
    }
    runAndOpen(svg){
        const filePath = path.join(CWD, this.fileName);
        console.log('filePath: ', filePath);
        this.run(svg)
        const shell = nw.Shell;
        shell.openItem(filePath);
    }
    clearGuides(){
        const guides = document.querySelectorAll('.guide');
        guides.forEach(element => {
            element.remove();
        });
    }
    clearEngravings(){
        const guides = document.querySelectorAll('.engraving');
        guides.forEach(element => {
            element.remove();
        });
    }
}
module.exports = new Exporter()