import { useState, useRef } from "react"

const bases = [
    'https://larmee.mo.cloudinary.net/400/',
    'https://larmee.mo.cloudinary.net/800/',
    'https://res.cloudinary.com/hallhassi/image/upload/kevin/'
]

export default function Images({ items, classNames }) {
    return (
        <section className={classNames} >
            {
                Object.entries(items).map((item, index) => {
                    return (
                        <Div key={index} image={item[1].url} index={index} />
                    )
                })
            }
        </section >
    )
}
function Div({ image, index }) {
    const [state, setState] = useState(0)
    const className = 'size' + state.toString()
    let src = bases[state] + image
    return (
        <div
            onWheel={state === 2 ? handleScale : undefined}
            onMouseMove={state === 2 ? handleTranslate : undefined}
            className={className}
        >
            <img onClick={handleImgClick} src={src} />
            <div>{index + 1}</div>
        </div>
    )
    function handleImgClick(e) {
        e.preventDefault();
        let img = e.currentTarget
        let div = e.currentTarget.parentElement
        let displacedHeight = div.getBoundingClientRect().x === 0 ? 0 : div.getBoundingClientRect().height
        if (state === 2) {
            setState(1)
            img.style = '';
        }
        if (state === 0) {
            if (window.innerWidth === parseInt(getComputedStyle(img).width)) setState(2)
            else {
                console.log(div.getBoundingClientRect().top, displacedHeight);
                window.scrollBy(0, div.getBoundingClientRect().top + displacedHeight)
                setState(1)
            }
        }
        if (state === 1) setState(2)
    }
    function handleScale(e) {
        e.preventDefault();
        let img = e.currentTarget.querySelector('img'),
            scale = Math.min(Math.max(0.125, (e.deltaY * -0.001) + Number(getComputedStyle(img).scale)), 4);
        img.style.scale = scale;
    }
    function handleTranslate(e) {
        e.preventDefault();
        let img = e.currentTarget.querySelector('img'),
            iw = img.naturalWidth + 300,
            ih = img.naturalHeight + 300,
            wh = window.innerHeight,
            ww = window.innerWidth,
            mx = e.clientX,
            my = e.clientY,
            x = -(iw - ww) * (mx / ww),
            y = -(ih - wh) * (my / wh)
        img.style.translate = `${x}px ${y}px`
        console.log(img.style.translate);
    }

}