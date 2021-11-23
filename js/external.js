/**********************************************************************************************/

function Disc(x, y, radius) { 
    this.origin_x=x;
    this.origin_y=y;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.is_visible = true;
    this.x_direction = (Math.round(Math.random()) * 2 - 1);     //positive or negative 
    this.y_direction = (Math.round(Math.random()) * 2 - 1);     //positive or negative
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
    needs_reset: false,
    rectangle: new Rectangle(),
    discs: create_discs_array(),
    interval_handle: null,
    timer: document.querySelector('#timer'),
    ticks: null,

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

/**********************************************************************************************/

function draw_discs_array() {
    g_state.discs.forEach(element => {
        if (element.is_visible) {
            draw_disc(element);
        }
    });
}

draw_discs_array();

function draw_disc(disc_to_draw) {
    g_state.rectangle.context.beginPath();
    g_state.rectangle.context.arc(disc_to_draw.x, disc_to_draw.y, disc_to_draw.radius, 0, Math.PI * 2, true);
    g_state.rectangle.context.stroke();
}

function set_direction(disc) {
    //future
}

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
    if((!g_state.has_been_started) && (!is_timer_empty()))
    {
        let tick = 0;
        g_state.has_been_started = true;
        g_state.interval_handle = setInterval(() => {
            if((!is_timer_over())&&(game_should_continue())) {
                manage_discs_movement();
                tick += 10;
                if(is_milliseconds_full_seconds(tick))
                {
                    update_timer();
                }
            }
            else {
                handle_pause();
                summarize_message(tick);
            }
        }, 10)
    }
}

function manage_discs_movement() {
    move_discs();
    check_collision();
    clear_canvas();
    draw_discs_array();
}

function is_timer_empty() {
    if (g_state.timer.value==="" || g_state.timer.valueAsNumber<0)
    {
        window.alert("Please fill the timer field with a positive value");
        return true;
    }
    return false;
}

function game_should_continue() {
    let visible_discs_Counter=count_visible_discs();

    if(visible_discs_Counter>1){
        return true;
    }
    return false;
}

function count_visible_discs() {
    let visible_discs_Counter = 0;

    g_state.discs.forEach(disc => {
        if(disc.is_visible===true)
        {
            visible_discs_Counter++;
        }
    })

    return visible_discs_Counter;
}

function is_timer_over() {
    if(g_state.timer.valueAsNumber>0)
    {
        return false;
    }
    return true;
}

function update_timer() {
    let timer_update = g_state.timer.value - 1;
    g_state.timer.valueAsNumber=timer_update;
}

function summarize_message(ticks) {
    const discs_remain = count_visible_discs();
    const seconds_passed= ticks/1000;
    const message = "After " + seconds_passed + " seconds - " + discs_remain + " discs remains visible";

    window.alert(message);
}

function is_milliseconds_full_seconds(tick){
    if(tick%1000===0) {
        return true;
    }
    return false;
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

window.onbeforeunload = confirmExit;

function confirmExit(){
    alert("confirm exit is being called");
    return false;
}
