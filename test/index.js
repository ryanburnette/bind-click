// jshint ignore:start
const mocha = require('mocha')
const chai = require('chai')
const puppeteer = require('puppeteer')
const _ = require('lodash')
const describe = mocha.describe
const expect = chai.expect
const globalVariables = _.pick(global, ['browser', 'expect'])
const cp = require('child_process')

let server
let page
before (async function () {
  global.expect = expect
  global.browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
    timeout: 10000,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  server = await cp.spawn('npm',['run','server'])
  page = await browser.newPage()
  await page.goto('http://localhost:8080')
})

after (async function () {
  await page.close()
  browser.close()
  global.browser = globalVariables.browser
  global.expect = globalVariables.expect
  server.kill()
  process.exit()
})

it('is a working test environment',async function () {
  let version = await browser.version()
  expect(version).to.include('Chrome')
})

it('bindClick exists in the test environment', async function () {
  let f = await page.evaluate('typeof bindClick')
  expect(f).to.eq('function')
})

context('select',function () {
  context('a Node',function () {
    it('invokes the callback on click',async function () {
      let foo = await page.evaluate(`
        var foo = false
        bindClick(document.body,function () {
          foo = true
        })
        document.body.click()
        foo
      `)
      expect(foo).to.eq(true)
    })
  })
  context('a NodeList',function () {
    it('invokes the callback on click',async function () {
      let bar = await page.evaluate(`
        var elements = document.querySelectorAll('.item')
        var bar = false
        bindClick(elements,function () {
          bar = true
        })
        elements[0].click()
        bar
      `)
      expect(bar).to.eq(true)
    })
  })
  context('a string',function () {
    it('invokes the callback on click',async function () {
      let baz = await page.evaluate(`
        var baz = false
        bindClick('.item',function () {
          baz = true
        })
        document.querySelector('.item').click()
        baz
      `)
      expect(baz).to.eq(true)
    })
  })
})

it('adds .x-bind-click class to elements',async function () {
  await page.evaluate("bindClick('.item',function () {})")
  let list = await page.evaluate("document.querySelector('.item').classList")
  list = _.map(list,(v,k) => v)
  expect(list).to.include('x-bind-click')
})

it('works on elements that are created later',async function () {
  await page.evaluate(`
    bindClick('.live-item',function (e) {
      e.target.classList.add('clicked')
    })

    var el = document.createElement('span')
    el.classList.add('live-item')
    document.body.appendChild(el)
  `)
  await page.evaluate("document.querySelector('.live-item').click()")
  let list = await page.evaluate("document.querySelector('.live-item').classList")
  list = _.map(list,(v,k) => v)
  expect(list).to.include('clicked')
})

it('bubbles',async function () {
  await page.evaluate(`
    var container = document.querySelector('.container')
    bindClick(container,function () {
      container.classList.add('clicked')
    })
  `)
  await page.evaluate(`document.querySelector('.item').click()`)
  let list = await page.evaluate("document.querySelector('.container').classList")
  list = _.map(list,(v,k) => v)
  expect(list).to.include('clicked')
})

it('when there is both a mouse and touch event, the callback only fires one time',async function () {
  await page.evaluate(`
    var item = document.querySelector('.item')
    bindClick(item,function (e) {
      item.classList.add(e.type)
    })
  `)
  await page.evaluate(`
    var item = document.querySelector('.item')
    fireEvent(item,'click')
    fireEvent(item,'touchstart')
  `)
  let list = await page.evaluate(`document.querySelector('.item').classList`)
  list = _.map(list,(v,k) => v)
  expect(list).to.include('click')
  expect(list).to.not.include('touchstart')
})
