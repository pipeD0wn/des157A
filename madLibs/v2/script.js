(function(){
    'use strict';
    console.log("reading JS");

    const page1=document.querySelector('#page1');
    const page2=document.querySelector('#page2');
    const page3=document.querySelector('#page3');

    const button1=document.querySelector('.next1');
    const button2=document.querySelector('.next2');
    const form=document.querySelector('#directions');

    const result=document.querySelector('.recipe-card');
    
    let properNoun = "";
    let serving = "";
    let human = "";

    let container = "";
    let shape = "";
    let food = "";
    let unit = "";
    let onion = "";

    let verb = "";
    let part = "";
    let place = "";
    let spice = "";
    let exclaim = "";    
    let abstract = "";

    let blanksFilled = " ";

    button1.addEventListener('click', function(event){
        //before overlay pops up, check fields to see if filled with if else statement
        properNoun = document.querySelector('#properNoun').value;
        serving = document.querySelector('#servesNumber').value;
        human = document.querySelector('#servesAdj').value;

            if(properNoun === ""){
                blanksFilled="dont forget this one!";
                document.querySelector('#properNoun').focus();
            }else if(serving === ""){
                blanksFilled="dont forget this one!";
                document.querySelector('#servesNumber').focus();
            }else if(human === ""){
                blanksFilled="dont forget this one!";
                document.querySelector('#servesAdj').focus();
            }else{
                //when next is clicked it changes overlay
                page1.classList.add('hidden');
                page1.classList.remove('visible');
                page2.classList.remove('hidden');
                page2.classList.add('visible');
            }
    });

    button2.addEventListener('click', function(event){
        container = document.querySelector('#tomatoNoun').value;
        shape = document.querySelector('#pastaAdj').value;
        food = document.querySelector('#food').value;
        unit = document.querySelector('#unit').value;
        onion = document.querySelector('#onionAdj').value;

        if(container === ""){
            blanksFilled="dont forget this one!";
            document.querySelector('#tomatoNoun').focus();
        }else if(shape === ""){
            blanksFilled="dont forget this one!";
            document.querySelector('#pastaAdj').focus();
        }else if(food === ""){
            blanksFilled="dont forget this one!"
            document.querySelector('#food').focus();
        }else if(unit === ""){
            blanksFilled="dont forget this one!"
            document.querySelector('#unit').focus();
        }else if(onion === ""){
            blanksFilled="dont forget this one!"
            document.querySelector('#onionAdj').focus();
        }else{
            //when next is clicked it changes overlay
            page3.classList.remove('hidden');
            page3.classList.add('visible');
            page2.classList.add('hidden');
            page2.classList.remove('visible');
        }
    });

    form.addEventListener('submit', function(event){
        event.preventDefault();
        properNoun = document.querySelector('#properNoun').value;
        serving = document.querySelector('#servesNumber').value;
        human = document.querySelector('#servesAdj').value;

        container = document.querySelector('#tomatoNoun').value;
        shape = document.querySelector('#pastaAdj').value;
        food = document.querySelector('#food').value;
        unit = document.querySelector('#unit').value;
        onion = document.querySelector('#onionAdj').value;

        verb = document.querySelector('#verb').value;
        part = document.querySelector('#bodyPart').value;
        place = document.querySelector('#place').value;
        spice = document.querySelector('#spiceAdj').value;
        exclaim = document.querySelector('#exclamation').value;
        abstract = document.querySelector('#abstractNoun').value;
    
        if(verb === ""){
            blanksFilled="dont forget this one!"
            document.querySelector('#verb').focus();
        }else if(part === ""){
            blanksFilled="dont forget this one!"
            document.querySelector('#bodyPart').focus();
        }else if(place === ""){
            blanksFilled="dont forget this one!"
            document.querySelector('#place').focus();
        }else if(spice === ""){
            blanksFilled="dont forget this one!"
            document.querySelector('#spiceAdj').focus();
        }else if(exclaim === ""){
            blanksFilled="dont forget this one!"
            document.querySelector('#exclamation').focus();
        }else if(abstract === ""){
            blanksFilled="dont forget this one!"
            document.querySelector('#abstractNoun').focus();
        }else{

        blanksFilled = `<h2>The <strong>${properNoun}</strong> Recipe</h2>
            <p>Serves <strong>${serving} ${human}</strong> humans.</p>
            <h3>Ingredients</h3>
            <ul>
                <li>A whole <strong>${container}</strong> of tomatoes</li>
                <li>4 cups of <strong>${shape}</strong> pasta</li>
                <li>2 cups of <strong>${food}</strong></li>
                <li>3 <strong>${unit}</strong> of water</li>
                <li>2 <strong>${onion}</strong> onions, diced</li>
            </ul>

            <h3>Directions</h3>
            <ol>
                <li>Start by <strong>${verb}</strong> the tomatoes with your <strong>${part}</strong>.</li>
                <li>Set a pot on the stove and fill with water. <br>Add all ingredients into the pot and
                    simmer until your kitchen is smelling just like <strong>${place}</strong>!</li>
                <li>Plate and top with your favorite <strong>${spice}</strong> spice.</li>
                <li>Shout <strong>${exclaim}</strong> to enhance the flavor and serve with lots of <strong>${abstract}</strong>.</li>
                <li>Enjoy!</li>
            </ol>`
        }   
        result.innerHTML = blanksFilled;   
        document.querySelector('#recipe-overlay').classList.remove('hidden');
    });

    document.querySelector('#reset').addEventListener('click', function () {
        document.querySelector('#recipe-overlay').classList.add('hidden');
        
        const allInputs = document.querySelectorAll('.reset');
        allInputs.forEach(input => input.value = "");

        properNoun = "";
        serving = "";
        human = "";

        container = "";
        shape = "";
        food = "";
        unit = "";
        onion = "";

        verb = "";
        part = "";
        place = "";
        spice = "";
        exclaim = "";    
        abstract = "";

        blanksFilled = "";
        result.innerHTML =  "";

        document.querySelector('.recipe-card').innerHTML = '';
      
        page1.classList.remove('hidden');
        page1.classList.add('visible');

        page2.classList.add('hidden');
        page2.classList.remove('visible');

        page3.classList.add('hidden');
        page3.classList.remove('visible');

        document.querySelector('#properNoun').focus();
    });
})()