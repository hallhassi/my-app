import React from 'react';
import { useEffect } from 'react';
import data from './data.js';
import Images from './Images.js'

const buttons = []
const ranges = []
const imageSections = []
const bioSection = []
const infoSection = []

export default function App() {
  useEffect(() => {
    if (document.querySelector('section') && document.querySelector('input')) {
      let columns = getComputedStyle(document.querySelector('section')).getPropertyValue('--columns')
      let rangeValue = Math.round(100 - (10 * columns))
      document.querySelectorAll('input').forEach(x => x.value = rangeValue)
    }
  })
  return (
    <>
      <nav>
        {buttons}
        {ranges}
      </nav>
      {imageSections}
      {bioSection}
      {infoSection}
    </>
  )
}

function Button({ title, classNames }) {
  return (
    <button className={classNames} onClick={changeIndex}>
      {title}
    </button>
  )
}
function Range({ classNames }) {
  return (
    <input type="range" step="10" className={classNames}
      onChange={changeRange} />
  )
}
function Bio({ items, classNames }) {
  return (
    <section className={classNames} >
      {
        Object.entries(items).map((item, i) => {
          item = item[1]
          return (
            <div key={i}>
              <h2>{item.h2}</h2>
              <ul>
                {
                  item.lis.map((li, i2) =>
                  (
                    <li key={i2}>
                      {
                        Object.values(li).map((value, i3) =>
                        (
                          <span key={i3}>
                            {value}
                          </span>
                        )
                        )
                      }
                    </li>
                  )
                  )
                }
              </ul>
            </div>
          )
        })
      }
    </section >
  )
}
function Info({ items, classNames }) {
  return (
    <section className={classNames} >
      <h2>PAINTINGS</h2>
      <ul>
        {
          Object.entries(items).map((item, i) => {
            item = item[1]
            return (
              <li key={i}>
                <span>
                  {i + 1 + '. '}
                </span>
                {
                  Object.entries(item).map(([key, value], index) =>
                  (
                    <span className={key} key={index}>
                      {value}
                    </span>
                  ))
                }
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
Object.entries(data).map(([title, items], index) => {
  let active = index === 0 ? 'active' : ''
  let classNames = title + ' ' + active
  buttons.push(
    <Button key={index} title={title} classNames={classNames} />
  )
  ranges.push(
    index < 2 &&
    <Range key={index} title={title} classNames={classNames} />
  )
  if (index === 0) {
    infoSection.push(
      <Info key="info" items={items} classNames="info" />
    )
  }
  if (index < 2) {
    imageSections.push(
      <Images key={index} items={items} classNames={classNames} />
    )
  } else {
    bioSection.push(
      <Bio key={index} items={items} classNames={classNames} />
    )
  }
})
buttons.push(
  <Button key="info" title="info" classNames="info" />
)




function changeIndex(e) {
  let name = e.target.classList[0]
  document.querySelectorAll('.active').forEach(x => x.classList.remove('active'))
  document.querySelectorAll(`.${name}`).forEach(x => x.classList.add('active'))
}

function changeRange(e) {
  let name = e.target.classList[0]
  let numberOfColumns = Math.round((100 - e.target.value) / 10)
  document.querySelectorAll('.size1').forEach(x => {
    x.classList.remove('size1')
  })
  document.querySelector('style').innerHTML += `\n section.${name}{--columns: ${numberOfColumns}}`
  if (numberOfColumns === 1) {
  }
}