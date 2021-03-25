//List of words

const quotes = [
    "N’a de convictions que celui qui n’a rien approfondi.", 
    "Espérer, c’est démentir l’avenir",
    "Nous sommes tous des farceurs : nous survivons à nos problèmes.",
    "L’on ne peut goûter à la saveur des jours que si l’on se dérobe à l’obligation d’avoir un destin.",
    "Les penseurs de première main méditent sur des choses ; les autres, sur des problèmes.",
    "On ne devrait écrire des livres que pour y dire des choses qu'on n'oserait confier à personne.",
    "Si l'on pouvait se voir avec les yeux des autres, on disparaîtrait sur-le-champ.",
    "L'interminable est la spécialité des indécis.",
    "Ce qui n'est pas déchirant est superflu, en musique tout au moins.",
    "La lâcheté rend subtil.",
    "Je sens que je suis libre mais je sais que je ne le suis pas.",
    "Se méfier des penseurs dont l'esprit ne fonctionne qu'à partir d'une citation.",
    "Dans un monde sans mélancolie, les rossignols se mettraient à roter."
];

/* const splitQuotes = quotes.toString().split(/[ ,]+/); */

function wordFreq(string) {
    var words = string.replace(/[.]/g, '').split(/\s/);
    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;
}

const sizedWords = wordFreq(quotes.toString());
console.log(sizedWords);

//set graph dimensions
const margin = {top: 10, right: 10, bottom: 10, left: 10};
const width = 1000 - margin.left - margin.right;
const height = 1000 - margin.top - margin.bottom;

//append svg to page
const svg = d3.select("#word-cloud").append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', 'translate('+ margin.left + ',' + margin.top +")");
                //take the output of layout above and draw words

const draw = (words) => (
    svg.append('g')
        .attr('transform', `translate(${layout.size()[0]/2}, ${layout.size()[1]/2})`)
        .selectAll("text")
        .data(words)
    .enter().append('text')
        .style('font-size', d => d.size +'px')
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text(d => d.text)

)

//construct a cloud instance
const layout = d3.layout.cloud()
                  .size([width, height])
                  .words(Object.entries(sizedWords).map(d => {
                    return {text: d[0], size: d[1]}
                    }))
                  .padding(10)
                  .fontSize(d => d.size * 10)
                  .on('end', draw);
layout.start();





