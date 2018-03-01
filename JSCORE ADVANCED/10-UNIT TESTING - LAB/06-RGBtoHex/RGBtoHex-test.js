let rgbToHexColor=require('./RGBtoHex').rgbToHexColor
let expect = require('chai').expect

describe('test',()=>{

  it('should return #000000 for 0,0,0)', () => {
    expect(rgbToHexColor(0,0,0)).to.be.equal('#000000');
  });

  it('should return #FFFFFF for 255,255,255)', () => {
    expect(rgbToHexColor(255,255,255)).to.be.equal('#FFFFFF');
  });

  it('should return undefined for 1,-1,1)', () => {
    expect(rgbToHexColor(1,-1,1)).to.be.undefined
  });

  it('should return undefined for -1,1,1)', () => {
    expect(rgbToHexColor(-1,1,1)).to.be.undefined
  });

  it('should return undefined for 1,1,-1)', () => {
    expect(rgbToHexColor(1,1,-1)).to.be.undefined
  });

  it('should return undefined for 256,1,1)', () => {
    expect(rgbToHexColor(256,1,1)).to.be.undefined
  });

  it('should return undefined for 1,256,1)', () => {
    expect(rgbToHexColor(1,256,1)).to.be.undefined
  });

  it('should return undefined for 1,1,256)', () => {
    expect(rgbToHexColor(1,1,256)).to.be.undefined
  });

  it('should return undefined for 1.5,1,1)', () => {
    expect(rgbToHexColor(1.5,1,1)).to.be.undefined
  });

  it('should return undefined for 1,1.5,1)', () => {
    expect(rgbToHexColor(1,1.5,1)).to.be.undefined
  });

  it('should return undefined for 1,1,1.5)', () => {
    expect(rgbToHexColor(1,1,1.5)).to.be.undefined
  });

  it('should return undefined for [],255,255)', () => {
    expect(rgbToHexColor([],255,255)).to.be.undefined
  });

})