//Todo:
// 3. summary message.
// 4. media query / bootstrap for size.
// 5. design.
// 6. make code more simple, readable & beautiful.
// 7. testing with another browser and with phone


/**********************************************************************************************/

function Disc(x, y, radius) {  // todo - take out to another file
    this.origin_x=x;
    this.origin_y=y;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.is_visible = true;
    this.x_direction = (Math.round(Math.random()) * 2 - 1);     //positive or negative 
    this.y_direction = (Math.round(Math.random()) * 2 - 1);     //positive or negative
    // color - should be css?
}

Disc.prototype.change_direction = function (key) {
    this[key] = (Math.round(Math.random()) * 2 - 1);
}

Disc.prototype.has_collide_with = function (disc) {
        const distance = Math.sqrt((Math.pow((disc.x-this.x),2))+(Math.pow((disc.y-this.y),2)));
        const radius_sum=this.radius+disc.radius;
    
    return distance<=radius_sum?true:false;
}

/**********************************************************************************************/

//Rectangle

function Rectangle() { 
    this.canvas_rectangle = document.querySelector('#rectangle');
    this.context = this.canvas_rectangle.getContext('2d');
    this.width = this.canvas_rectangle.getAttribute("width");
    this.height = this.canvas_rectangle.getAttribute("height");
}

/**********************************************************************************************/

// initialize

let g_state = {
    has_been_started: false,
    rectangle: new Rectangle(),
    discs: create_discs_array(),
    interval_handle: null,
    timer_milliseconds: null,
    timer_seconds: null,
}

function create_random_up_to(num) {
    return (Math.round(Math.random()*num*100))%num;
}

function create_discs_array() {
    const radius = 20;                  //ask - should take outside?
    

    const disc_top = new Disc(radius + create_random_up_to(this.rectangle.width - 2 * radius), radius, radius);
    const disc_bot = new Disc(radius + create_random_up_to(this.rectangle.width - 2 * radius), this.rectangle.height-radius, radius);
    const disc_left = new Disc(radius, radius + create_random_up_to(this.rectangle.height - 2 * radius), radius);
    const disc_right = new Disc(this.rectangle.width - radius, radius + create_random_up_to(this.rectangle.height - 2 * radius), radius);
    
    return [disc_top, disc_bot, disc_left, disc_right];
}

function reset_discs_state() {
    g_state.discs.forEach(disc => {
        disc.is_visible = true;
        disc.x=disc.origin_x;
        disc.y=disc.origin_y;
    })
}

draw_discs_array();

/**********************************************************************************************/

function draw_discs_array() {
    g_state.discs.forEach(element => {
        if (element.is_visible) {
            draw_disc(element);
        }
    });
}

function draw_disc(disc_to_draw) {
    g_state.rectangle.context.beginPath();
    g_state.rectangle.context.arc(disc_to_draw.x, disc_to_draw.y, disc_to_draw.radius, 0, Math.PI * 2, true);
    g_state.rectangle.context.stroke();
}

function set_direction(disc) {
    //future
}

//todo -
//add discs collection
//make it more nice looking
function move_discs() {
    g_state.discs.forEach(element => {
        if (element.is_visible) {
            let x_right_side = element.x + element.x_direction + element.radius;
            let x_left_side = element.x + element.x_direction - element.radius;

            let y_top_side = element.y + element.y_direction - element.radius;
            let y_bottom_side = element.y + element.y_direction + element.radius;

            while (x_left_side <= 0 || x_right_side >= g_state.rectangle.width) {               //todo - make one boolean function
                element.change_direction('x_direction');
                x_right_side = element.x + element.x_direction + element.radius;
                x_left_side = element.x + element.x_direction - element.radius;
            }

            while (y_top_side <= 0 || y_bottom_side >= g_state.rectangle.height) {               //todo - make one boolean function
                element.change_direction('y_direction');
                y_top_side = element.y + element.y_direction + element.radius;
                y_bottom_side = element.y + element.y_direction - element.radius;
            }

            element.x += element.x_direction;
            element.y += element.y_direction;
        }
    })
}

function check_collision() {
    g_state.discs.forEach(disc_being_checked => {
        if (disc_being_checked.is_visible===true)
        {
            g_state.discs.forEach(disc_being_collide => {
                if((disc_being_collide.is_visible===true) && (disc_being_checked!==disc_being_collide))
                {
                    if(disc_being_checked.has_collide_with(disc_being_collide))
                    {
                        disc_being_collide.is_visible=false;
                        return;
                    }
                }
            })        

        }
    })
}

/**********************************************************************************************/

function clear_canvas() {
    g_state.rectangle.context.clearRect(0, 0, g_state.rectangle.width, g_state.rectangle.height);
}

/**********************************************************************************************/

//Buttons section
const btn_start = document.querySelector('#btn_start');
btn_start.addEventListener('click', handle_start);

const btn_pause = document.querySelector('#btn_pause');
btn_pause.addEventListener('click', handle_pause);

const btn_reset = document.querySelector('#btn_reset');
btn_reset.addEventListener('click', handle_reset);

function handle_start() {
    if (!g_state.has_been_started) {
        g_state.has_been_started = true;
        g_state.timer_seconds = document.querySelector('#timer').value;
        g_state.timer_milliseconds = g_state.timer_seconds  * 1000;
        g_state.interval_handle = setInterval(() => {
            if(g_state.timer_seconds>0)
            {
                move_discs();
                check_collision();
                clear_canvas();
                draw_discs_array();
                update_timer();
                }
            else 
            {
                handle_pause();                
            }
        }, 10)
    }

}

function update_timer() {
    g_state.timer_milliseconds -= 10;
    if(g_state.timer_milliseconds%1000===0)
    {
        g_state.timer_seconds.x.setAttribute("value", toString(g_state.timer_milliseconds/1000));
    }
}

function handle_pause() {
    if (g_state.has_been_started) {
        clearInterval(g_state.interval_handle);
        g_state.has_been_started = false;
    }
}

function handle_reset() {
    clearInterval(g_state.interval_handle);

    g_state.has_been_started = false;
    g_state.interval_handle = null;
    
    reset_discs_state();
    clear_canvas();
    draw_discs_array();
};

