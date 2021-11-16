function Disc(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.visible = true;
    this.x_direction = (Math.round(Math.random()) * 2 - 1)*10;     //positive or negative 
    this.y_direction = (Math.round(Math.random()) * 2 - 1)*10;     //positive or negative
}

/**********************************************************************************************/

// initialize

const canvas_rectangle = document.querySelector('#rectangle');

const rectangle_width = canvas_rectangle.getAttribute("width");
const rectangle_hight = canvas_rectangle.getAttribute("height");

let g_state = {
    has_been_started: false,
    discs: create_discs_array(),
};

draw_discs_array();

/**********************************************************************************************/

function create_discs_array() {
    const radius = 20;
    let disc_top = new Disc(rectangle_width / 2, radius, radius);
    let disc_bot = new Disc(rectangle_width / 2, rectangle_hight - radius, radius);
    let disc_left = new Disc(radius, rectangle_hight / 2, radius);
    let disc_right = new Disc(rectangle_width - radius, rectangle_hight / 2, radius);
    return [disc_top, disc_bot, disc_left, disc_right];
}

function draw_discs_array() {
    g_state.discs.forEach(element => {
        if (element.visible) {
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

function set_direction(disc)
{
    //future
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
        setInterval(() => {
            draw_discs_array(discs);

        }, 1000)
    }

}

function handle_pause() {
    alert(btn_pause.getAttribute("id"));
}

function handle_reset() {
    alert(btn_reset.getAttribute("id"));
}




