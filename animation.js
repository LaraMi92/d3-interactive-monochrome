//create a new two-dimensional brush to allow an interactive specification, such as clicking and dragging
const brush = d3.brush();

const svg = d3.select("svg");

//'g' is a specific SVG element used to group SVG shapes together. Once grouped, the whole group of shapes can be transformed as if it were just one shape.
svg.append('g')
    //The 'brush' class renders no filling attribute
    .attr('class', 'brush')
    //invoking the brush function 
    .call(brush)
    //setting the maximum value on which the selection can be set
    .call(brush.extent([[0,0], [1000, 1000]]))
    //set the inital selection values
    .call(brush.move, [[50, 50], [300, 300]])
    //applying a class to our object that renders no filling
    .select('.selection')
    //sets an id to selection
    .attr('id', 'brush-selection')
    
//create a clip path
svg.append("clipPath")
    //give it an id
    .attr("id", "brush-clip")
    //apply use element
    .append("use")
    //give it the id previously set so that the element dynamically selected renders the image without any fill
    .attr("xlink:href", "#brush-selection");
    

//clip path will only be applied to the dynamic selection
svg.select("#color-image")
    .attr("clip-path", "url(#brush-clip)")
    
/**
1) First we'll create the area that can dynamically be selected within our SVG pattern
2) We'll define this area as our clip-path
3) Through the attributes, we'll apply the desired effect to our selection
 */