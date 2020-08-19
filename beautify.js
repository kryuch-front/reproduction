const fs = require("fs");
const glob = require("glob");
const htmlBeautify = require("js-beautify")["html_beautify"];

const options = {
    indent_inner_html: true,
    indent_size: 4,
    unformatted: [],
    content_unformatted: [],
    inline: [],
    extra_liners: []
};

glob("./build/*.html", { absolute: true }, (er, files) => {
    files.forEach(file => {
        console.log(`js-beautify ${file}`);
        const data = fs.readFileSync(file, "utf8");
        const nextData = htmlBeautify(data, options);
        fs.writeFileSync(file, nextData, "utf8");
    });
});