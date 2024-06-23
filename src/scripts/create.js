const { error } = require('console');
const fs = require('fs');
const exec = require('child_process').exec;
const cmpt = process.argv[2];
fs.readFile('./src/components/template.html', 'utf8', (err, source) =>{
        if (err) return console.error(err);
        const content = source.replace(/COMPONENT_NAME/g, cmpt);
        if (fs.existsSync(`./src/components/${cmpt}.html`)) {
            return console.error(`${cmpt}.html already exist, use another name`);
        }
        fs.writeFile(`./src/components/${cmpt}.html`, content, (err) => {
            if (err) return console.error(`there is a problem in creating ${cmpt}.html`);
            else{
                fs.writeFile(`./src/assets/sass/components/${cmpt}.scss`, '', (err)=>{
                    if (err) return console.error(`there is a problme in creating ${cmpt}.sass`);
                    console.log(`${cmpt} created successfully!`);
                    exec(`code -r ./src/components/${cmpt}.html` , (err)=>{
                        if (err) return console.error(err);
                    });
                    exec(`code -r ./src/assets/sass/coponents/${cmpt}.scss` , (err)=>{
                        if (err) return console.error(err);
                    });
                });
            }
        });
});