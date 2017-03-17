var assert = require('assert');
var expect = require('chai').expect;

describe('The Jeans Retailer app', () => {
  beforeEach(() => {
    browser.url('/');
  })
  it('has the expected page title', () => {
    assert.equal(browser.getTitle(), 'Jeans Retailer Inc.');
  });

  it('has 8 expected filters at start', () => {
    expect(browser.getText('.data-filters ul li a').length).to.equal(8);
  });

  it('filters by 1 level: "deliveryCountry" and shows 11 groups', () => {
    browser.element('[name="deliveryCountry"]').click();
    expect(browser.getText('.data-viewer .order-group').length).to.equal(11);
  });

  it('filters by 2 levels: "deliveryCountry" and "size" and shows all groups', () => {
    browser.click('[name="deliveryCountry"]').click('[name="size"]');
    var results = browser.getText('.data-viewer .order-group');
    expect(results.length).to.equal(27);
    expect(results[0]).to.equal("Size: 35\nTotal: 624");
    expect(results[results.length-1]).to.equal("Size: 17\nTotal: 286");
  });

  it('hides tags', () => {
    browser.click('=Hide Tags...');
    expect(browser.getText('.show')).to.equal('Show Tags...');
    expect(browser.element('.tag-cloud').length).to.equal(undefined);
  })

  it('shows tags after hiding them', () => {
    browser.click('=Hide Tags...');
    expect(browser.getText('.show')).to.equal('Show Tags...');
    browser.click('=Show Tags...');
    expect(browser.getText('.hide')).to.equal('Hide Tags...');
  });

});
