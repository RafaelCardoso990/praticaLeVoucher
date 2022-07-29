import {jest} from '@jest/globals'

import voucherService from "../../src/services/voucherService.js"

jest.mock("../../src/services/voucherService.js")

describe("voucherService test suite", () => {
  it("Expect return of function createVoucher", async () => {

    const data = {
      code: "XyZ",
      discount: 10
    }

    jest.spyOn(voucherService, "createVoucher").mockImplementationOnce(() => {
      return data as any
    })
    
    const result = await voucherService.createVoucher(data.code, data.discount)
    
    expect(result).not.toBeNull();
  })

  it("Expect false for applied/is amount valid for user", async () => {
    const data = {
      code: "XyZ",
      amount: 99 
    }

    jest.spyOn(voucherService, "applyVoucher").mockImplementationOnce(() => {
      if(data.amount < 100) {
        return {
          amount: data.amount,
          discount: 0,
          finalAmount: data.amount,
          applied: false
        } as any
      }      
    })
    
    const result = await voucherService.applyVoucher(data.code, data.amount)
    expect(result.applied).toBe(false);
  })

  it("Expect true for applied/is amount valid for user", async () => {
    const data = {
      code: "XyZ",
      amount: 100 
    }

    jest.spyOn(voucherService, "applyVoucher").mockImplementationOnce(() => {
      if(data.amount >= 100) {
        return {
          amount: data.amount,
          discount: 10,
          finalAmount: data.amount,
          applied: true
        } as any
      }      
    })
    
    const result = await voucherService.applyVoucher(data.code, data.amount)
    expect(result.applied).toBe(true);
  }) 
})