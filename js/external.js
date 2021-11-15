    const btn_start = document.querySelector('#btn_start');
    btn_start.addEventListener('click',handle_start);

    const btn_pause = document.querySelector('#btn_pause');
    btn_pause.addEventListener('click',handle_pause);

    const btn_reset = document.querySelector('#btn_reset');
    btn_reset.addEventListener('click',handle_reset);

    function handle_start()
    {

    }

    function handle_pause()
    {

    }

    function handle_reset()
    {

    }

    const canvas_rectangle = document.querySelector('#rectangle');
    const rectangle_width = canvas_rectangle.getAttribute("width");
    const rectangle_hight = canvas_rectangle.getAttribute("height");

    const ctx = canvas_rectangle.getContext("2d");

    ctx.beginPath();
	ctx.rect(10, 10, canvas_rectangle.width, rectangle_hight);
	ctx.stroke();
