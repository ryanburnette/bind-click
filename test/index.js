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
before (async function () {
  global.expect = expect
  global.browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
    timeout: 10000,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  server = await cp.spawn('npm',['run','server'])
})

after (function () {
  browser.close()
  global.browser = globalVariables.browser
  global.expect = globalVariables.expect
  server.kill('SIGINT')
})

describe('sanity check',function () {
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

  context('node',function () {
    it('invokes the callback when the element is clicked', async function () {
      let span = await page.$('.test1')
      await span.click()
      let list = await page.evaluate('document.querySelector(".test1").classList')
      list = _.map(list,function (v,k) {
        return v
      })
      expect(list).to.include('clicked')
    })
  })

  context('nodelist',function () {
    it('invokes the callback when the elements are clicked', async function () {
      let span1 = await page.$('.test10')
      let span2 = await page.$('.test11')
      await span1.click()
      await span2.click()
      let list1 = await page.evaluate('document.querySelector(".test10").classList')
      let list2 = await page.evaluate('document.querySelector(".test11").classList')
      list1 = _.map(list1,function (v,k) {
        return v
      })
      list2 = _.map(list2,function (v,k) {
        return v
      })
      expect(list1).to.include('clicked')
      expect(list2).to.include('clicked')
    })
  })

  context('string/live',function () {
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

function timeout(cb,ms) {
  return new Promise(function (resolve) {
    setTimeout(cb,ms)
    setTimeout(function () {
      resolve()
    },ms)
  })
}
