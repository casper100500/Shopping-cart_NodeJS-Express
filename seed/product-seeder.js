var Product = require('../models/product')
var mongoose=require('mongoose')
const { exists } = require('../models/product')
mongoose.connect('mongodb://localhost:27017/shopping')

var products =[

new Product({
    imagePath:'https://www.mobygames.com/images/covers/l/31670-gothic-windows-front-cover.jpg',
    title: 'Gothic Video Game',
    description: 'Awesome Game!!!',
    price: 11
}),
new Product({
    imagePath:'https://en.wikipedia.org/wiki/File:Project_I.G.I._I%27m_Going_In_(cover).jpg',
    title: 'IGI Project',
    description: 'Project I.G.I. (released in North America as Project I.G.I.: Im Going In) is a tactical first-person shooter video game. It was developed by Innerloop Studios and released in December 2000 by Eidos Interactive.[1] The game received mixed reviews due to shortcomings including a poorly programmed A.I., lack of a mid-game save option, and the lack of multiplayer features. However it was praised for its sound design and graphics, thanks in part to its use of a proprietary game engine that was previously used in Innerloops Joint Strike Fighter.',
    price: 50
}),
new Product({
    imagePath:'https://en.wikipedia.org/wiki/File:Mortal_Kombat_Logo.svg',
    title: 'Mortal Kombat',
    description: 'Mortal Kombat is an American media franchise centered on a series of video games originally developed by Midway Games in 1992. The development of the first game was originally based on an idea that Ed Boon and John Tobias had of making a video game starring Jean-Claude Van Damme.',
    price: 45
}),
new Product({
    imagePath:'https://en.wikipedia.org/wiki/File:Far_Cry_3_PAL_box_art.jpg',
    title: 'Far Cry 3',
    description: 'Far Cry 3 is a 2012 first-person shooter game developed by Ubisoft Montreal and published by Ubisoft. It is the third main installment in the Far Cry series after Far Cry 2. ',
    price: 10
})

];
//Server in ASYNC mode! that's why we need:
var done = 0; //REM by NG. to disconnect from mongoDB when all records been saved. otherwise the connection can be lost earlier then the save process will be finished!!!

for (var i = 0; i<products.length;i++) {
    
    products[i].save(function(err,result){
        done++;
        console.log(done) 
        console.log(result) //by NG
        if (done=== products.length) {
            exit();
        }
    });
}

function exit()
{
mongoose.disconnect;
}



