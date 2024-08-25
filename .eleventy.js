const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier-terser");
const { minify_sync } = require("terser");
const path = require("path");
const sizeOf = require("image-size");

module.exports = function (eleventyConfig) {
    // Copy files into the output directory
    eleventyConfig.addPassthroughCopy({"src/_passthrough": "/"});
    eleventyConfig.addPassthroughCopy({"src/_assets": "/assets"}, {filter: path => (path.indexOf('/partners') == -1)});

    // Move files in 'src/content' to root of site
    eleventyConfig.addFilter("dropContentFolder", function (path) {
        if (path.endsWith("/index")) {
            path = path.slice(0, -6);
        }

        const pathToDrop = "/content"
        if (path.indexOf(pathToDrop) !== 0) {
            return path;
        }

        return path.slice(pathToDrop.length);
    });

    // Change fileSlug value on index files
    eleventyConfig.addFilter("fixFileSlug", function(slug) {
        if (slug == "content") {
            return "index";
        }

        return slug;
    });

    // Process CSS files
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        compile: async function (input) {
            return async () => {
                return input;
            };
        },
    });

    // Process JS files
    eleventyConfig.addTemplateFormats("js");
    eleventyConfig.addExtension("js", {
        outputFileExtension: "js",
        compile: async function (input) {
            return async () => {
                return input;
            };
        },
    });

    // Minify output files
    eleventyConfig.addTransform("minify", function (content, outputPath) {
        const extname = path.extname(outputPath);
        switch (extname) {
            case ".html":
                return htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true
                });
            case ".css":
                return new CleanCSS({level: 2}).minify(content).styles;
            case ".js":
                return minify_sync(content).code;
            default:
                return content;
        }
    });

    // Shortcode for questions
    eleventyConfig.addShortcode("pregunta", function(num, question, answers) {
        let img1Dimensions = sizeOf(`src/_assets/img/q${num}/1.webp`);
        let img2Dimensions = sizeOf(`src/_assets/img/q${num}/2.webp`);
        let img3Dimensions = sizeOf(`src/_assets/img/q${num}/3.webp`);
        let img4Dimensions = sizeOf(`src/_assets/img/q${num}/4.webp`);
        let img5Dimensions = sizeOf(`src/_assets/img/q${num}/5.webp`);
        let imgImgDimensions = sizeOf(`src/_assets/img/q${num}/img.webp`);

        let next = (num === 8 ? "/resultado" : `/q${num + 1}`);

        return `
            <section class="que-laureado">
                <h2>
                    ¿Qué lauread@ del Nobel de la Paz eres?
                </h2>
            </section>

            <h3>
                ${question}
            </h3>

            <section class="cuestionario">
                <article class="pregunta">
                    <section class="respuestas">
                        <a href="${next}" class="${answers[0][1]}">
                            <figure>
                                <img src="/assets/img/q${num}/1.webp" alt="" width="${img1Dimensions.width}" height="${img1Dimensions.height}">
                            </figure>
                            <span>${answers[0][0]}</span>
                        </a>
                        <a href="${next}" class="${answers[1][1]}">
                            <figure>
                                <img src="/assets/img/q${num}/2.webp" alt="" width="${img2Dimensions.width}" height="${img2Dimensions.height}">
                            </figure>
                            <span>${answers[1][0]}</span>
                        </a>
                        <a href="${next}" class="${answers[2][1]}">
                            <figure>
                                <img src="/assets/img/q${num}/3.webp" alt="" width="${img3Dimensions.width}" height="${img3Dimensions.height}">
                            </figure>
                            <span>${answers[2][0]}</span>
                        </a>
                        <a href="${next}" class="${answers[3][1]}">
                            <figure>
                                <img src="/assets/img/q${num}/4.webp" alt="" width="${img4Dimensions.width}" height="${img4Dimensions.height}">
                            </figure>
                            <span>${answers[3][0]}</span>
                        </a>
                        <a href="${next}" class="${answers[4][1]}">
                            <figure>
                                <img src="/assets/img/q${num}/5.webp" alt="" width="${img5Dimensions.width}" height="${img5Dimensions.height}">
                            </figure>
                            <span>${answers[4][0]}</span>
                        </a>
                    </section>
                </article>
                <aside class="imagen">
                    <figure>
                        <img src="/assets/img/q${num}/img.webp" alt="" width="${imgImgDimensions.width}" height="${imgImgDimensions.height}">
                    </figure>
                </aside>
            </section>
        `;
    });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};
