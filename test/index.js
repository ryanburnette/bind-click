// jshint ignore:start
const mocha = require('mocha')
const chai = require('chai')
const puppeteer = require('puppeteer')
const _ = require('lodash')
const describe = mocha.describe
const expect = chai.expect
const bindClick = require('../dist/bind-click.js')
const globalVariables = _.pick(global, ['browser', 'expect'])

before (function (done) {
  global.expect = expect

  puppeteer
    .launch({
      headless: true,
      slowMo: 100,
      timeout: 10000
    })
    .then(function (browser) {
      global.browser = browser
      done()
    })
})

after (function () {
  browser.close()
  global.browser = globalVariables.browser
  global.expect = globalVariables.expect
})

describe('sanity check',function () {
  it('should be a function',function () {
    expect(bindClick).to.be.a('function')
  })

  it('should work', function (done) {
    browser
      .version()
      .then(function (version) {
        expect(version).to.include('Chrome')
        done()
      })
  })
})

describe('bindClick()',function () {
  let page

  before(async function () {
    page = await browser.newPage()
    await page.goto('http://localhost:8080')
  })

  after(async function () {
    await page.close()
  })

  context('sanity check',function () {
    it('should have the correct page title', async function () {
      expect(await page.title()).to.eql('Puppeteer Mocha')
    })
  })

  it('invokes the callback when the element is clicked', async function () {
    let span = await page.$('.test1')
    await span.click()
    let list = await page.evaluate('document.querySelector(".test1").classList')
    list = _.map(list,function (v,k) {
      return v
    })
    expect(list).to.include('clicked')
  })

  context('elements that are created later',function () {
    it('works', async function () {
      let span = await page.$('.test2')
      await span.click()
      let list = await page.evaluate('document.querySelector(".test1").classList')
      list = _.map(list,function (v,k) {
        return v
      })
      expect(list).to.include('clicked')
    })
  })
})
