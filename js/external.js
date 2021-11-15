
    // get rectangle values
    const canvas_rectangle = document.querySelector('#rectangle');
    const rectangle_width = canvas_rectangle.getAttribute("width") - 100;
    const rectangle_hight = canvas_rectangle.getAttribute("height") - 100;
    
    //function print for the rectangle - can do in css with stroke (?)
    /*function draw_rectangle()
    {
        const ctx = canvas_rectangle.getContext("2d");
        ctx.beginPath();
        ctx.rect(20, 20, rectangle_width, rectangle_hight);
        ctx.stroke();
    }*/
    /**********************************************************************************************/

    const discs = document.querySelectorAll("#discs")
    //discs.forEach(item => setLocation)
    //discs.forEach(item => draw_disc_on_point(item)) - not working need to set location

    //set random location for disc
    //function set_random_location()
    //{

    //}
    //print disc at his location

    //randomize starting point for each disc

    function draw_disc_on_point(disc_to_draw,x,y)
    {
        const disc_ctx = disc_to_draw.getContext('2d');
        const disc_radius = disc_to_draw.getAttribute("radius");
        disc_ctx.beginPath();
        disc_ctx.arc(x+disc_radius,y+disc_radius, disc_radius, 0, Math.PI * 2, true);
        disc_ctx.stroke();      
    }


    //discs.forEach(item => draw_disc(item));
    

    /**********************************************************************************************/
    //Buttons section
    const btn_start = document.querySelector('#btn_start');
    btn_start.addEventListener('click',handle_start);

    const btn_pause = document.querySelector('#btn_pause');
    btn_pause.addEventListener('click',handle_pause);
    
    const btn_reset = document.querySelector('#btn_reset');
    btn_reset.addEventListener('click',handle_reset);
    
    function handle_start()
    {
        alert(btn_start.getAttribute("id"));
    }
    
    function handle_pause()
    {
        alert(btn_pause.getAttribute("id"));
    }
    
    function handle_reset()
    {
        alert(btn_reset.getAttribute("id"));
    }




