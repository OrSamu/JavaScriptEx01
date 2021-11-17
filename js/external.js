function Disc(x, y, radius) {  // todo - take out to another file
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.is_visible = true;
    this.x_direction = (Math.round(Math.random()) * 2 - 1) * 10;     //positive or negative 
    this.y_direction = (Math.round(Math.random()) * 2 - 1) * 10;     //positive or negative
}

Disc.prototype.change_direction = function (key) {
    this[key] = (Math.round(Math.random()) * 2 - 1) * 10;
}

/**********************************************************************************************/

// initialize

const canvas_rectangle = document.querySelector('#rectangle');              //ask - should be inside state?
const rectangle_width = canvas_rectangle.getAttribute("width");
const rectangle_hight = canvas_rectangle.getAttribute("height");

let g_state = {
    has_been_started: false,
    discs: create_discs_array(),
    interval_handle: null,                  //ask - should be in state?
};

draw_discs_array();

/**********************************************************************************************/

function create_discs_array() {
    const radius = 20;                  //ask - should take outside?

    const disc_top = new Disc(rectangle_width / 2, radius, radius);
    const disc_bot = new Disc(rectangle_width / 2, rectangle_hight - radius, radius);
    const disc_left = new Disc(radius, rectangle_hight / 2, radius);
    const disc_right = new Disc(rectangle_width - radius, rectangle_hight / 2, radius);

    return [disc_top, disc_bot, disc_left, disc_right];
}

function draw_discs_array() {
    g_state.discs.forEach(element => {
        if (element.is_visible) {
            draw_disc(element);
        }
    });
}

function draw_disc(disc_to_draw) {
    const rectangle = canvas_rectangle.getContext('2d');

    rectangle.beginPath();
    rectangle.arc(disc_to_draw.x, disc_to_draw.y, disc_to_draw.radius, 0, Math.PI * 2, true);
    rectangle.stroke();
}

function set_direction(disc) {
    //future
}

function move_discs() {
    g_state.discs.forEach(element => {
        if (element.is_visible) {
            let x_right_side = element.x + element.x_direction + element.radius;
            let x_left_side = element.x + element.x_direction - element.radius;

            let y_top_side = element.y + element.y_direction + element.radius;
            let y_bottom_side = element.y + element.y_direction - element.radius;

            while (x_left_side <= 0 || x_right_side >= rectangle_width) {               //todo - make one boolean function
                element.change_direction('x_direction');
                x_right_side = element.x + element.x_direction + element.radius;
                x_left_side = element.x + element.x_direction - element.radius;
            }

            while (y_top_side <= 0 || y_bottom_side >= rectangle_hight) {               //todo - make one boolean function
                element.change_direction('y_direction');
                y_top_side = element.y + element.y_direction + element.radius;
                y_bottom_side = element.y + element.y_direction - element.radius;
            }

            element.x += element.x_direction;
            element.y += element.y_direction;
        }

    })
}

/**********************************************************************************************/

function clear_canvas() {
    const context = canvas_rectangle.getContext("2d");
    context.clearRect(0, 0, rectangle_width, rectangle_hight);
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
        g_state.interval_handle = setInterval(() => {
            move_discs();
            clear_canvas();
            draw_discs_array();
        }, 25)
    }

}

function handle_pause() {
    if (g_state.has_been_started) {
        clearInterval(g_state.interval_handle);
    }
}

function handle_reset() {
    alert(btn_reset.getAttribute("id"));
}